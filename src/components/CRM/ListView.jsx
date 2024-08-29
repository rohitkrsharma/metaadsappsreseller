import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, fetchToken } from '../utils/auth';

const UserListView = () => {
  const [usersData, setUsersData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const defaultImage = 'https://metaadsapp.s3.ap-south-1.amazonaws.com/profile_user.png';
  const baseImageUrl = 'http://3.110.160.106:8080/';

  const fetchData = async () => {
    try {
      const token = await fetchToken();
      const response = await axios.get(
        `${API_BASE_URL}/UserManagement/GetResellerCustomers?resellerId=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('API Data:', response.data);

      const fetchedData = response.data.data.map(user => ({
        acName: user.accountName,
        memberSince: user.createdDate,
        userId: user.userId,
        contact: user.contactNumber,
        image: user.profilePicture ? `${baseImageUrl}${user.profilePicture}` : defaultImage,
        userType: user.userTypeId
      }));
      setUsersData(fetchedData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === usersData.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(usersData.map(user => user.userId));
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = usersData.slice(startIndex, startIndex + pageSize);

  const handleNextPage = () => {
    if (startIndex + pageSize < usersData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(usersData.length / pageSize);

  return (
    <>
      <div className='flex justify-between mb-3'></div>
      <div className="overflow-x-auto border border-customPurple rounded-md shadow-custom p-4">
        <table className="min-w-full bg-white text-xs ">
          <thead className="bg-customPurple text-white">
            <tr>
              <th className="px-2 py-1 border border-customPurple text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === usersData.length}
                  onChange={handleSelectAll}
                  className='w-4 h-4'
                />
              </th>
              <th className="px-4 py-2 border border-customPurple text-left">Image</th>
              <th className="px-4 py-2 border border-customPurple text-left">A/C Name</th>
              <th className="px-4 py-2 border border-customPurple text-left">Member Since</th>
              <th className="px-4 py-2 border border-customPurple text-left">User ID</th>
              <th className="px-4 py-2 border border-customPurple text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((user, index) => (
              <tr key={user.userId} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                <td className="px-2 py-1 border border-customPurple">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.userId)}
                    onChange={() => toggleSelectUser(user.userId)}
                    className='w-4 h-4'
                  />
                </td>
                <td className="px-1 py-1 border border-customPurple">
                  <img src={user.image} alt={user.acName} className="w-8 h-8 rounded-full" />
                </td>
                <td className="px-1 py-1 border border-customPurple">{user.acName}</td>
                <td className="px-1 py-1 border border-customPurple">{new Date(user.memberSince).toLocaleDateString()}</td>
                <td className="px-1 py-1 border border-customPurple">{user.userId}</td>
                <td className="px-1 py-1 border border-customPurple">{user.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex text-xs justify-between items-center mt-2">
          <span>Showing {startIndex + 1} to {Math.min(startIndex + pageSize, usersData.length)} of {usersData.length} entries</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded mr-2" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border border-gray-300 rounded ${currentPage === i + 1 ? 'bg-customPurple text-white' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className="px-3 py-1 border border-gray-300 rounded ml-2" onClick={handleNextPage} disabled={startIndex + pageSize >= usersData.length}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListView;

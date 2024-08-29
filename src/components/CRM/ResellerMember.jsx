import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, fetchToken } from '../utils/auth';

const ResellerMember = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await fetchToken();
        console.log('Fetched Token:', token);

        const response = await axios.get(
          `${API_BASE_URL}/UserManagement/GetResellerCustomers?resellerId=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('API Response:', response.data);

        // Extract the relevant data from the response
        const data = response.data.data;

        if (Array.isArray(data)) {
          setUsersData(data);
        } else {
          throw new Error('Unexpected data format');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.response ? err.response.data : err.message);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="overflow-x-auto border border-customPurple rounded-md shadow-custom p-4">
        <table className="min-w-full bg-white text-xs">
          <thead className="bg-customPurple text-white">
            <tr>
              <th className="px-2 py-2 border border-customPurple text-left">User ID</th>
              <th className="px-2 py-2 border border-customPurple text-left">A/C Name</th>
              <th className="px-2 py-2 border border-customPurple text-left">Member Since</th>
              <th className="px-2 py-2 border border-customPurple text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                <td className="px-2 py-2 border border-customPurple">{user.userId}</td>
                <td className="px-2 py-2 border border-customPurple">{user.accountName}</td>
                <td className="px-2 py-2 border border-customPurple">{new Date(user.createdDate).toLocaleDateString()}</td>
                <td className="px-2 py-2 border border-customPurple">{user.contactNumber}</td>
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

export default ResellerMember;

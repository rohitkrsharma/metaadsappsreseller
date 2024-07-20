import React, { useState } from 'react';

const ResellerMember = () => {
  const usersData = [
    { acName: 'Rohit Sharma', memberSince: '11-june-2024', userId: 'UID59110', contact: '+91 9800263240', userType: 'Customer' },
    { acName: 'Raj Malhotra', memberSince: '11-june-2024', userId: 'UID59112', contact: '+91 9800263240', userType: 'Customer' },
    { acName: 'Rajeev', memberSince: '11-june-2024', userId: 'UID59114', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rakesh Tomar', memberSince: '11-june-2024', userId: 'UID59115', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59116', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59117', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59118', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59119', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59120', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59121', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59122', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59123', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59124', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59125', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59126', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59127', contact: '+91 9800263240', userType: 'Reseller' },
    { acName: 'Rajesh', memberSince: '11-june-2024', userId: 'UID59128', contact: '+91 9800263240', userType: 'Reseller' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;



  // Get the current page data
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = usersData.slice(startIndex, startIndex + pageSize);

  // Function to handle next page
  const handleNextPage = () => {
    if (startIndex + pageSize < usersData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(usersData.length / pageSize);

  return (
    <>
      <div className='flex justify-between mb-3'>
      </div>
      <div className="overflow-x-auto border border-customPurple rounded-md shadow-custom p-4">
        <table className="min-w-full bg-white text-xs ">
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
                <td className="px-2 py-2 border border-customPurple">{user.acName}</td>
                <td className="px-2 py-2 border border-customPurple">{user.memberSince}</td>
                <td className="px-2 py-2 border border-customPurple">{user.contact}</td>
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

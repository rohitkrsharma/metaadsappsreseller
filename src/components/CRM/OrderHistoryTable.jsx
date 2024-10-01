import { DuplicateIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL, fetchToken } from '../utils/auth';

const OrderHistoryTable = () => {
  const resellerId = localStorage.getItem('resellerId');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await fetchToken();
        const response = await fetch(`${API_BASE_URL}/BMAdsOrders/GetResellerBMAdsOrders?resellerId=${resellerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data);
        setFilteredData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [resellerId]);

  const getStatusButtonColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-600';
      case 'Pending':
        return 'bg-purple-500';
      case 'Processing':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleRowClick = async (row) => {
    try {
      const token = await fetchToken();
      const response = await fetch(`${API_BASE_URL}/BMAdsOrders/${row.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setFormData(row);
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    try {
      const token = await fetchToken();
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (!formData.updatedate) {
        formDataToSend.append('updatedate', new Date().toISOString());
      }
      if (!formData.reedemamount) {
        formDataToSend.append('reedemamount', '0');
      }

      const response = await fetch(`${API_BASE_URL}/BMAdsOrders/${editingRow}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const updatedData = filteredData.map(item => item.id === editingRow ? result : item);
      setFilteredData(updatedData);
      setData(updatedData); // Also update the full data state if necessary
      setEditingRow(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    e.stopPropagation();
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSearchTermChange = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const filtered = data.filter((item) =>
      item.orderNo.toLowerCase().includes(lowercasedTerm) ||
      item.bmId.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredData(filtered); // Update filteredData based on search term
    setCurrentPage(1); // Reset to first page after filtering
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>

      <div className='mt-[1px]'>
        <div>
          <table className="min-w-full border-t border-l border-r text-xs border-b border-customPurple">
            <thead className="bg-customPurple text-white">
              <tr>
                <th className="px-4 py-1 border-r border-customPurple text-left">S.N</th>
                <th className="px-4 py-1 border-r border-customPurple text-left">Order No</th>
                <th className="px-4 py-1 border-r border-customPurple text-left">BM ID</th>
                <th className="px-4 py-1 border-r border-customPurple text-left">Order Date</th>
                <th className="px-4 py-1 border-r border-customPurple text-left">Status</th>
                <th className="px-4 py-1 border-r border-customPurple text-left">BM Name</th>
                <th className="px-4 py-1 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentPageData.map((item, index) => (
                <tr key={item.id} className={`border-b border-customPurple ${index % 2 === 0 ? 'bg-gray-200' : ''}`} onClick={() => handleRowClick(item)}>
                  <td className="px-4 py-1 border-r border-customPurple">{startIndex + index + 1}</td>
                  <td className="px-4 py-1 border-r border-customPurple">
                    {editingRow === item.id ? (
                      <input
                        id="orderNo"
                        type="text"
                        value={formData.orderNo}
                        onChange={handleChange}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      item.orderNo
                    )}
                  </td>
                  <td className="px-4 py-1 border-r border-customPurple">
                    {editingRow === item.id ? (
                      <input
                        id="bmId"
                        type="text"
                        value={formData.bmId}
                        onChange={handleChange}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      item.bmId
                    )}
                  </td>
                  <td className="px-4 py-1 border-r border-customPurple">
                    {editingRow === item.id ? (
                      <input
                        id="createdDate"
                        type="text"
                        value={formData.createdDate}
                        onChange={handleChange}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      item.createdDate
                    )}
                  </td>
                  <td className="px-4 py-1 border-r border-customPurple">
                    {editingRow === item.id ? (
                      <input
                        id="status"
                        type="text"
                        value={formData.status}
                        onChange={handleChange}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      <button className={`px-2 py-1 text-white rounded ${getStatusButtonColor(item.status)}`}>
                        {item.status}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-1 border-r border-customPurple">
                    {editingRow === item.id ? (
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="px-4 py-1 flex space-x-2">
                    {editingRow === item.id ? (
                      <>
                        <button className="bg-blue-500 p-1 rounded text-white" onClick={(e) => { e.stopPropagation(); handleSave(e) }}>
                          Save
                        </button>
                        <button className="bg-gray-500 p-1 rounded text-white" onClick={(e) => { e.stopPropagation(); setEditingRow(null) }}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="bg-green-500 p-1 rounded text-white" onClick={(e) => { e.stopPropagation(); handleEdit(item) }}>
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="bg-yellow-500 p-1 rounded text-white" onClick={(e) => { e.stopPropagation(); }}>
                          <DuplicateIcon data-tooltip-id="tooltip" data-tooltip-content="Duplicate" className="h-3 w-3" />
                        </button>
                        <button className="bg-red-500 p-1 rounded text-white" onClick={(e) => { e.stopPropagation(); }}>
                          <TrashIcon data-tooltip-id="tooltip" data-tooltip-content="Delete" className="h-3 w-3" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex text-xs justify-between mt-4">
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <div className='flex space-x-1'>
              <button
                onClick={handlePreviousPage}
                className='px-2 py-1 bg-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed'
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border border-gray-300 rounded ${currentPage === i + 1 ? 'bg-customPurple text-white' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                className='px-2 py-1 bg-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed'
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryTable;

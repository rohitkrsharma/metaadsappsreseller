import React, { useEffect, useState } from 'react';
import { DuplicateIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import SearchBar from '../SearchBar';
import ListWalletView from './ListWalletView';
import { API_BASE_URL, fetchToken } from '../utils/auth';

const ListWallet = ({ onAdd, onToggleView, view }) => {
  const resellerId = localStorage.getItem('resellerId');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  // Determines whether to use filtered data or the entire data
  const currentData = filteredData.length > 0 ? filteredData : data;
  const reversedData = [...currentData].reverse();
  const paginatedData = reversedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(currentData.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await fetchToken();
        const response = await fetch(`${API_BASE_URL}/Invoices/GetResellerInvoices?resellerId=${resellerId}`, {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (Array.isArray(result.data)) {
          const formattedData = result.data.map(invoice => ({
            id: invoice.id,
            InvoiceNo: invoice.invoiceNumber,
            Date: new Date(invoice.invoiceDate).toISOString(),
            status: invoice.status,
            chargeAmount: invoice.chargeAmount,
            invoiceDocument: invoice.invoiceDocument,
          }));
          setData(formattedData);
          setFilteredData(formattedData); // Initialize filtered data
        } else {
          console.error('Expected result.data to be an array but got:', result.data);
          setData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchTermChange = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const filtered = data.filter((item) =>
      item.InvoiceNo.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleEditClick = (row, e) => {
    e.stopPropagation();
    setEditRowId(row.id);
    setEditRowData(row);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRowData({
      ...editRowData,
      [name]: value,
    });
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    try {
      const token = await fetchToken();
      const formData = new FormData();
      for (const key in editRowData) {
        formData.append(key, editRowData[key]);
      }
      if (!formData.has('transactionId')) {
        formData.append('transactionId', editRowData.Token);
      }
      const response = await fetch(`${API_BASE_URL}/Invoices/${editRowId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      setData(data.map(item => item.id === editRowId ? editRowData : item));
      setEditRowId(null);
      setFilteredData(data.map(item => item.id === editRowId ? editRowData : item)); // Sync filteredData
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setEditRowId(null);
  };

  const handleBack = () => {
    setSelectedRow(null);
  };

  const handleRowClick = (row) => {
    if (!editRowId) {
      setSelectedRow(row);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const getStatusLabelAndColor = (status) => {
    switch (status) {
      case 0:
        return { label: 'Pending', color: 'bg-yellow-500 rounded text-white font-bold' };
      case 1:
        return { label: 'Approved', color: 'bg-green-700 rounded text-white' };
      case 2:
        return { label: 'ReOpened', color: 'bg-blue-500 rounded text-white' };
      case 3:
        return { label: 'Rejected', color: 'bg-red-500 rounded text-white' };
      default:
        return { label: 'Unknown', color: 'text-gray-500' };
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedRow) {
    return <ListWalletView data={selectedRow} onBack={handleBack} />;
  }
  const handleFilterChange = (status) => {
    setFilterStatus(status); // Store selected status
    const filtered = data.filter((item) => {
      if (status === '') return true; // If no status is selected, show all
      const statusMap = {
        Pending: 0,
        Approved: 1,
        ReOpened: 2,
        Rejected: 3,
      };
      return item.status === statusMap[status];
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  return (
    <>
      <div className='md:flex justify-between mb-4'>
        <div className="text-gray-700 flex gap-1">
          <div></div>
        </div>
        <div>
          <SearchBar
            onSearchTermChange={handleSearchTermChange}
            onAdd={onAdd}
            onToggleView={onToggleView}
            currentView={view}
            showAddAndView={true}
            searchPlaceholder="Search by invoice No"
            filterOptions={['Approved', 'Pending', 'ReOpened', 'Rejected']}
            groupByOptions={['Category', 'Price', 'Brand']}
            favoritesOptions={['Favorite1', 'Favorite']}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="p-4 border border-customPurple rounded-md shadow-custom">
        <table className="min-w-full border-t border-l border-r text-xs border-b border-customPurple">
          <thead className="bg-customPurple text-white">
            <tr>
              <th className="px-4 py-1 border-r border-customPurple text-left">S.N</th>
              <th className="px-4 py-1 border-r border-customPurple text-left">Invoice No</th>
              <th className="px-4 py-1 border-r border-customPurple text-left">Charge $</th>
              <th className="px-4 py-1 border-r border-customPurple text-left">Invoice Date</th>
              <th className="px-4 py-1 border-r border-customPurple text-left">Status</th>
              <th className="px-4 py-1 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedData.map((item, index) => {
              const { label, color } = getStatusLabelAndColor(item.status);
              return ( // Add the return statement here
                <tr
                  key={item.id}
                  className={`cursor-pointer border-b border-customPurple ${index % 2 === 0 ? 'bg-gray-200' : ''}`}
                  onClick={() => handleRowClick(item)}
                >
                  <td className="px-4 py-1 border-r border-customPurple">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-4 py-1 border-r border-customPurple">
                    {editRowId === item.id ? (
                      <input
                        type="text"
                        name="InvoiceNo"
                        value={editRowData.InvoiceNo}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    ) : (
                      item.InvoiceNo
                    )}
                  </td>
                  <td className="px-4 py-1 border-r border-customPurple">
                    {editRowId === item.id ? (
                      <input
                        type="text"
                        name="InvoiceNo"
                        value={editRowData.chargeAmount}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    ) : (
                      item.chargeAmount
                    )}
                  </td>
                  <td className="px-4 py-1 border-r border-customPurple">
                    {editRowId === item.id ? (
                      <input
                        type="text"
                        name="Date"
                        value={editRowData.Date}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    ) : (
                      item.Date
                    )}
                  </td>
                  <td className="px-4 py-1 border-r border-customPurple">
                    <span className={`px-2 py-1 ${color}`}>
                      {label}
                    </span>
                  </td>
                  <td className="px-4 py-1 flex space-x-2">
                    {editRowId === item.id ? (
                      <>
                        <button className="bg-blue-500 p-1 rounded text-white" onClick={handleSaveClick}>
                          Save
                        </button>
                        <button className="bg-gray-500 p-1 rounded text-white" onClick={handleCancelClick}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="bg-green-500 p-1 rounded text-white" onClick={(e) => handleEditClick(item, e)}>
                        <PencilIcon className="h-3 w-3" />
                      </button>
                    )}
                    <button className="bg-yellow-500 p-1 rounded text-white">
                      <DuplicateIcon className="h-3 w-3" />
                    </button>
                    <button className="bg-red-500 p-1 rounded text-white">
                      <TrashIcon className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
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
    </>
  );
};

export default ListWallet;

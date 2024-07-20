import { DuplicateIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import ListWalletView from './ListWalletView';

const ListWallet = ({ breadcrumbs, onAdd, onToggleView, view }) => {
  const data = [
    { id: 1, InvoiceNo: 'UC20240530-0001', Charge: '380', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Pending', },
    { id: 2, InvoiceNo: 'UC20240530-0002', Charge: '230', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Approve', },
    { id: 3, InvoiceNo: 'UC20240530-0003', Charge: '432', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Pending', },
    { id: 4, InvoiceNo: 'UC20240530-0004', Charge: '564', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Approve', },
    { id: 5, InvoiceNo: 'UC20240530-0005', Charge: '234', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Approve', },
    { id: 6, InvoiceNo: 'UC20240530-0006', Charge: '765', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Pending', },
    { id: 7, InvoiceNo: 'UC20240530-0007', Charge: '234', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Approve', },
    { id: 8, InvoiceNo: 'UC20240530-0008', Charge: '234', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Pending', },
    { id: 9, InvoiceNo: 'UC20240530-0009', Charge: '234', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Pending', },
    { id: 10, InvoiceNo: 'UC20240530-00010', Charge: '234', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Approve', },
    { id: 11, InvoiceNo: 'UC20240530-00011', Charge: '234', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Pending', },
    { id: 12, InvoiceNo: 'UC20240530-00012', Charge: '234', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Approve', },
    { id: 13, InvoiceNo: 'UC20240530-00013', Charge: '234', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Pending', },
    { id: 14, InvoiceNo: 'UC20240530-00014', Charge: '234', Date: '22-05-2024 10:01:30', Token: 'TRON(TRC20)', status: 'Approve', },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusButtonColor = (status) => {
    switch (status) {
      case 'Approve':
        return 'bg-green-600';
      case 'Pending':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleBack = () => {
    setSelectedRow(null);
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  if (selectedRow) {
    return <ListWalletView data={selectedRow} onBack={handleBack} />;
  }

  return (
    <>
      <div className='flex justify-between mb-4'>
        <div className="text-gray-700 flex gap-1">
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={index} className='cursor-pointer'>
              {breadcrumb}
              {index < breadcrumbs.length - 1 && ' > '}
            </span>
          ))}
        </div>
        <div>
          <SearchBar onAdd={onAdd} showAddAndView={true} view={view} onToggleView={onToggleView} />
        </div>
      </div>
      <div className="p-4 border border-customPurple rounded-md shadow-custom">
        <table className="min-w-full border-t border-l border-r text-xs border-b border-customPurple">
          <thead className="bg-customPurple text-white">
            <tr>
              <th className="px-4 py-1 border-r border-customPurple text-left">S.N</th>
              <th className="px-4 py-1 border-r border-customPurple text-left">Invoice No</th>
              <th className="px-4 py-1 border-r border-customPurple text-left">Charge</th>
              <th className="px-4 py-1 border-r border-customPurple text-left">Date</th>
              <th className="px-4 py-1 border-r border-customPurple text-left">Token</th>
              <th className="px-4 py-1 border-r border-customPurple text-left">Status</th>
              <th className="px-4 py-1 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentData.map((item, index) => (
              <tr key={item.id} className={`cursor-pointer border-b border-customPurple ${index % 2 === 0 ? 'bg-gray-200' : ''}`} onClick={() => handleRowClick(item)}>
                <td className="px-4 py-1 border-r border-customPurple">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-1 border-r border-customPurple">{item.InvoiceNo}</td>
                <td className="px-4 py-1 border-r border-customPurple">{item.Charge}</td>
                <td className="px-4 py-1 border-r border-customPurple">{item.Date}</td>
                <td className="px-4 py-1 border-r border-customPurple">{item.Token}</td>
                <td className="px-4 py-1 border-r border-customPurple">
                  <button className={`px-2 py-1 text-white rounded ${getStatusButtonColor(item.status)}`}>
                    {item.status}
                  </button>
                </td>
                <td className="px-4 py-1 flex space-x-2">
                  <button className="bg-green-500 p-1 rounded text-white">
                    <PencilIcon data-tooltip-id="tooltip" data-tooltip-content="Edit" className="h-3 w-3" />
                  </button>
                  <button className="bg-yellow-500 p-1 rounded text-white">
                    <DuplicateIcon data-tooltip-id="tooltip" data-tooltip-content="Duplicate" className="h-3 w-3" />
                  </button>
                  <button className="bg-red-500 p-1 rounded text-white">
                    <TrashIcon data-tooltip-id="tooltip" data-tooltip-content="Delete" className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex text-xs justify-between items-center mt-2">
          <span>Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries</span>
          <div className="flex items-center">
            <button
              className="px-3 py-1 border border-gray-300 rounded mr-2"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-3 py-1 border border-gray-300 rounded mx-1 ${currentPage === index + 1 ? 'bg-customPurple text-white' : ''}`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border border-gray-300 rounded ml-2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListWallet;

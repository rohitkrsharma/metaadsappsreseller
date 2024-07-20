import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaClipboard } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const AddForm = ({ onBack }) => {
  const location = useLocation();
  const showBackButton = location.state?.showBackButton ?? true;

  const [fileName, setFileName] = useState('No file chosen');
  const [usdOptions, setUsdOptions] = useState([]);
  const [selectedUsd, setSelectedUsd] = useState('');
  const [networkInfo, setNetworkInfo] = useState({ label: '', img: '' });
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    // Example data from backend
    const usdData = [
      { id: 'tron', label: 'TRON(TRC20)', network: { label: 'TRON(TRC20)', img: '../images/default-avatar.png' } },
      { id: 'token', label: 'Token', network: { label: 'Token', img: '../images/default-avatar.png' } },
      { id: 'network', label: 'Network', network: { label: 'Network', img: '../images/default-avatar.png' } },
    ];

    setUsdOptions(usdData);
  }, []);

  const handleFileChange = (event) => {
    setFileName(event.target.files[0] ? event.target.files[0].name : 'No file chosen');
  };

  const handleUsdChange = (event) => {
    const selected = usdOptions.find(option => option.id === event.target.value);
    setSelectedUsd(selected ? selected.id : '');
    setNetworkInfo(selected ? selected.network : { label: '', img: '' });
  };

  const handleCopyToClipboard = () => {
    const address = document.getElementById('USD').value;
    if (address) {
      navigator.clipboard.writeText(address)
        .then(() => {
          setCopyMessage('copied to clipboard!');
          setTimeout(() => setCopyMessage(''), 5000);
        })
        .catch((error) => {
          console.error('Failed to copy text: ', error);
        });
    } else {
      setCopyMessage('No address selected!');
      setTimeout(() => setCopyMessage(''), 5000);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          {showBackButton && (
            <button className="flex items-center gap-1 bg-customPurple rounded-md px-4 py-2 text-white hover:bg-hcolor" onClick={onBack}>
              <FaArrowLeft /> Back
            </button>
          )}
          <button className="flex items-center bg-green-500 rounded-md px-4 py-2 text-white hover:bg-green-600">Submit</button>
        </div>
      </div>
      <div className="bg-white border border-customPurple rounded-md shadow-custom p-4">
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-xl font-bold" id="invoiceNumber">Invoice number: </h3>
          <h3 className="text-xl font-bold">#UC20240710-3830</h3>
        </div>
        <div className="flex mb-4">
          <label className="w-44">Invoice Date:</label>
          <label className='text-gray-500 font-semibold'>18/07/2024</label>
        </div>
        <div className="flex mb-4 items-center">
          <label className="w-52">Deposit/USDT address:</label>
          <div className="relative w-full flex items-center">
            <select
              className="form-control w-full p-2 border border-gray-300 rounded"
              id="USD"
              value={selectedUsd}
              onChange={handleUsdChange}
            >
              <option value="" disabled>Select USDT/deposit address</option>
              {usdOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            <div>
              <button
                className="flex items-center ml-2 bg-customPurple text-white p-2 rounded"
                onClick={handleCopyToClipboard}
              >
                <FaClipboard />
              </button>
              <div className='absolute top-10 right-0'>
                {copyMessage && (
                  <div className="text-gray-500 font-bold">
                    {copyMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-4 items-center">
          <label className="w-52">Network:</label>
          <div className="relative w-full flex items-center">
            {networkInfo.img && (
              <img
                src={networkInfo.img}
                alt={networkInfo.label}
                className="w-8 h-8 rounded-md ml-2"
              />
            )}
            <label>{networkInfo.label}</label>
          </div>
        </div>
        <div className="flex mb-4">
          <label className="w-52">Charge Amount:</label>
          <input type="text" className="form-control w-full p-2 border border-gray-300 rounded" id="chargeAmount" placeholder="Enter amount in USDT" />
        </div>
        <div className="flex mb-4">
          <label className="w-52">Hash/Transaction ID:</label>
          <input type="text" className="form-control w-full p-2 border border-gray-300 rounded" id="transactionId" placeholder="Enter transaction ID" />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-52">Screenshot/Image/PDF:</label>
          <div className="flex items-center w-full">
            <label
              htmlFor="fileUpload"
              className="bg-customPurple border-2 border-customPurple text-white px-4 py-2 cursor-pointer rounded-l-md hover:bg-hcolor"
            >
              Browse
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".jpg, .jpeg, .png, .pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              type="text"
              className="form-control w-full p-2 border border-gray-300 rounded-r-md"
              value={fileName}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;

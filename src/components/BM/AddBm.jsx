import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AddBM = ({ onBack, showBackButton }) => {
  return (
    <div className="container">
      <div className='flex gap-3 mb-3'>
        {showBackButton && (
          <div className="gap-2 flex">
            <button
              className='flex items-center gap-1 bg-customPurple rounded-md px-4 py-2 text-white hover:bg-hcolor'
              onClick={onBack}
            >
              <FaArrowLeft /> Back
            </button>
          </div>
        )}
        <div>
          <button className="flex items-center bg-green-500 rounded-md px-4 py-2 text-white hover:bg-green-600">Submit</button>
        </div>
      </div>
      <div className="p-4 border bg-white border-customPurple rounded-md shadow-custom">
        <div className="mb-4">
          <h5 id="orderNumber" className="text-lg font-bold">Order No: OR-BM-ADS-20240706-0921</h5>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex items-center gap-5'>
              <label htmlFor="accountName" className="text-sm font-medium w-36 text-gray-700">Name :</label>
              <input type="text" id="accountName" className="form-control w-full p-2 border border-gray-300 rounded" placeholder="Enter name" />
            </div>
            <div className='flex items-center gap-5'>
              <label htmlFor="pageName" className="text-sm font-medium w-36 text-gray-700">BM ID :</label>
              <input type="text" id="pageName" className="form-control w-full p-2 border border-gray-300 rounded" placeholder="Enter BM ID" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex items-center gap-5'>
              <label htmlFor="baseFee" className="text-sm font-medium w-36 text-gray-700">No of A/C :</label>
              <input type="text" id="baseFee" className="form-control w-full p-2 border border-gray-300 rounded" placeholder="Enter No of A/C" />
            </div>
            <div className='flex items-center gap-5'>
              <label htmlFor="commission" className="text-sm font-medium w-36 text-gray-700">No of Pages :</label>
              <input type="text" id="commission" className="form-control w-full p-2 border border-gray-300 rounded" placeholder="Enter No of Pages" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex items-center gap-5'>
              <label htmlFor="additionalFee" className="text-sm font-medium w-36 text-gray-700">A/C Time Zone :</label>
              <input type="text" id="additionalFee" className="form-control w-full p-2 border border-gray-300 rounded" placeholder="Enter A/C Time Zone" />
            </div>
            <div className='flex items-center gap-5'>
              <label htmlFor="coupon" className="text-sm font-medium w-36 text-gray-700">Self Profit Link :</label>
              <input type="text" id="coupon" className="form-control w-full p-2 border border-gray-300 rounded" placeholder="Enter Self Profit Link" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex items-center gap-5'>
              <label htmlFor="topUpAmount" className="text-sm font-medium w-36 text-gray-700">Top Up Amount :</label>
              <input type="text" id="topUpAmount" className="form-control w-full p-2 border border-gray-300 rounded" placeholder="Enter Top Up Amount" />
            </div>
          </div>
          <div className="form-check flex items-center">
            <input type="checkbox" id="redeemCheckbox" className="form-check-input h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="redeemCheckbox" className="ml-2  block text-md text-gray-900 font-bold">Redeem</label>
            <span className="ml-2 text-gray-500 font-bold text-md">$12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBM;

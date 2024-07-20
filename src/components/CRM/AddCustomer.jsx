import React, { useState } from 'react';
import { FaArrowLeft, FaEdit, FaRedo, FaSave } from 'react-icons/fa';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import AddCustomerEveryBM from './AddCustomerEveryBM';
import OrderHistoryTable from './OrderHistoryTable';
import ResellerMember from './ResellerMember';

const AddCustomer = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const orderHistoryData = [
    { id: 1, OrderNo: 'OR-BM-ADS-20240706-0921', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Processing', },
    { id: 2, OrderNo: 'OR-BM-ADS-20240706-0924', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Done', },
    { id: 3, OrderNo: 'OR-BM-ADS-20240706-0925', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Pending', },
    { id: 4, OrderNo: 'OR-BM-ADS-20240706-0926', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Processing', },
    { id: 5, OrderNo: 'OR-BM-ADS-20240706-0927', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Done', },
    { id: 6, OrderNo: 'OR-BM-ADS-20240706-0922', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Pending', },
    { id: 7, OrderNo: 'OR-BM-ADS-20240706-0920', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Processing', },
    { id: 8, OrderNo: 'OR-BM-ADS-20240706-0928', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Done', },
    { id: 9, OrderNo: 'OR-BM-ADS-20240706-0929', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Pending', },
    { id: 10, OrderNo: 'OR-BM-ADS-20240706-0930', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Processing', },
    { id: 11, OrderNo: 'OR-BM-ADS-20240706-0931', BMID: 'C00456', Date: '22-05-2024 10:01:30', status: 'Done', },
  ];

  const columns = ['S.N', 'Order No', 'BM ID', 'Order Date', 'Status'];
  return (
    <div>
      <div className='flex justify-between mb-3'>
        <div>
          <button className='bg-customPurple hover:bg-hcolor flex gap-1 items-center text-white px-4 py-2 rounded-md' onClick={onBack}>
            <FaArrowLeft /> Back
          </button>
        </div>
        <div className='flex gap-2'>
          <button className='flex items-center gap-1 px-2 py-1 text-white bg-green-500 hover:bg-green-600 rounded'>
            <FaSave /> Save
          </button>
          <button className='flex items-center gap-1 px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded'>
            <FaEdit /> Edit
          </button>
          <button className='flex items-center gap-1 px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded'>
            <FaRedo /> Reset
          </button>
        </div>
      </div>
      <div className='p-4 border border-customPurple rounded-md shadow-custom'>
        <div className='flex justify-between gap-20'>
          <div className='flex-1 space-y-4'>
            <div className='flex gap-2 items-center'>
              <label className='w-40'>User ID :</label>
              <label className='font-semibold text-gray-500'>201452</label>
            </div>
            <div className='flex gap-2 items-center'>
              <label className='w-48'> Account Name :</label>
              <input className='border w-full  border-gray-300 rounded-md p-2' type='text' placeholder='Enter account name' />
            </div>
            <div className='flex gap-2 items-center'>
              <label className='w-48'>Password :</label>
              <input className='border w-full border-gray-300 rounded-md p-2' type='Password' placeholder='Enter Password' />
            </div>
          </div>
          <div className='flex'>
            <div className='flex flex-col items-center mr-5'>
              <div
                className='border-4 border-gray-200 rounded-full overflow-hidden cursor-pointer'
                onClick={() => document.getElementById('fileInput').click()}
              >
                <img src={selectedImage || 'https://metaadsapp.s3.ap-south-1.amazonaws.com/avatar+.png'} alt='upload' className='w-32 h-32 object-cover' />
              </div>
              <input
                type='file'
                id='fileInput'
                className='hidden'
                onChange={handleImageUpload}
              />
              <label className='mt-2 cursor-pointer' onClick={() => document.getElementById('fileInput').click()}>
                <div className='py-1 text-gray-700'>
                  Choose Image
                </div>
              </label>
            </div>
            <div>
              <div className="form-check flex items-center">
                <input type="checkbox" id="redeemCheckbox" disabled checked className="form-check-input h-4 w-4 text-indigo-600 border-gray-300 rounded bg-purple-200 focus:ring-purple-500" />
                <label htmlFor="redeemCheckbox" className="ml-1 block text-lg font-bold text-purple-500">Customer</label>
              </div>

            </div>
          </div>
        </div>
        <Tabs className='rounded-t-md overflow-hidden'>
          <TabList className='flex gap-1 pt-2 mt-4 bg-customPurple rounded-t-md'>
            <Tab className='text-white px-4 py-2 ml-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none rounded-none'>
              Every BM/ADS
            </Tab>
            <Tab className='text-white px-4 py-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none '>
              Order History
            </Tab>
            <Tab className='text-white px-4 py-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none'>
              Reseller Members
            </Tab>
            <Tab className='text-white px-4 py-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none'>
              Reward Points
            </Tab>
            <Tab className='text-white px-4 py-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none'>
              Referral History
            </Tab>
            <Tab className='text-white px-4 py-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none'>
              Other Info
            </Tab>
            <Tab className='text-white px-4 py-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none'>
              Return History
            </Tab>
            <Tab className='text-white px-4 py-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none'>
              Card Info
            </Tab>
          </TabList>

          <TabPanel>
            <div><AddCustomerEveryBM /></div>
          </TabPanel>
          <TabPanel>
            <div className='mt-1'><OrderHistoryTable data={orderHistoryData} columns={columns} /></div>
          </TabPanel>
          <TabPanel>
            <div> <ResellerMember /> </div>
          </TabPanel>
          <TabPanel>
            <div>Reward Points Content</div>
          </TabPanel>
          <TabPanel>
            <div>Referral History Content</div>
          </TabPanel>
          <TabPanel>
            <div>Other Info Content</div>
          </TabPanel>
          <TabPanel>
            <div>Return History</div>
          </TabPanel>
          <TabPanel>
            <div>Crad Info</div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AddCustomer;

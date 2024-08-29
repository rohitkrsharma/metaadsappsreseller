import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { API_BASE_URL, fetchToken } from '../utils/auth';
import AddCustomerEveryBM from './AddCustomerEveryBM';
import OrderHistoryTable from './OrderHistoryTable';
import ResellerMember from './ResellerMember';


const AddCustomer = ({ onBack }) => {
  const resellerId = localStorage.getItem('resellerId');

  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    accountName: '',
    userName: '',
    createdBy: resellerId,
    commission: '',
    additionalAccountFees: '',
    baseFee: '',
    numberOfFreeAccountsOrCoupons: '',
    numberOfPages: '',
    profilePicture: selectedImage,
    ContactNumber: '',
    UserTypeId: '2',
    ResellerId: resellerId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
      }));
    }
  };

  const handleSubmit = async () => {
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    try {
      const token = await fetchToken();
      let response;

      // Check if updating or adding
      if (formData.id) {
        // Update logic
        response = await fetch(`${API_BASE_URL}/UserManagement/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: submissionData,
        });
      } else {
        // Add logic
        response = await fetch(`${API_BASE_URL}/UserManagement`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: submissionData,
        });
      }

      if (response.ok) {
        console.log('Data submitted successfully');
        // Optionally reset the form or show a success message
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
          const firstErrorField = Object.keys(errorData.errors)[0]; // Get the first field with error
          const firstErrorMessage = errorData.errors[firstErrorField][0]; // Get the first error message for that field

          toast.error(firstErrorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error('An error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during submission', error);
      toast.error('An error occurred. Please check your connection.');
    }
  };

  const columns = ['S.N', 'Order No', 'BM ID', 'Order Date', 'Status'];

  return (
    <div>
      <div className='flex justify-between mb-3'>
        <div className='flex mb-2 md:mb-0 gap-2'>
          <button className='bg-customPurple hover:bg-hcolor flex gap-1 items-center text-white px-4 py-2 rounded-md' onClick={onBack}>
            <FaArrowLeft /> Back
          </button>
          <button
            className='flex items-center gap-1 px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className='p-4 border border-customPurple rounded-md shadow-custom'>
        <div className='flex justify-between gap-20'>
          <div className='flex-1 space-y-4'>
            <div className='flex gap-2 items-center'>
              <label className='w-48'>User Name :</label>
              <input
                className='border w-full border-gray-300 rounded-md p-2'
                type='text'
                name='userName'
                placeholder='Enter userName'
                value={formData.userName}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex gap-2 items-center'>
              <label className='w-48'>Contact Number :</label>
              <input
                className='border w-full border-gray-300 rounded-md p-2'
                type='text'
                name='ContactNumber'
                placeholder='Enter contact number'
                value={formData.ContactNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex gap-2 items-center'>
              <label className='w-48'>Account Name :</label>
              <input
                className='border w-full border-gray-300 rounded-md p-2'
                type='text'
                name='accountName'
                placeholder='Enter accountName'
                value={formData.accountName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='flex'>
            <div className='flex flex-col items-center mr-5'>
              <div
                className='border-4 border-gray-200 rounded-full overflow-hidden cursor-pointer'
                onClick={() => document.getElementById('fileInput').click()}
              >
                <img
                  src={selectedImage || 'https://metaadsapp.s3.ap-south-1.amazonaws.com/avatar+.png'}
                  alt='upload'
                  className='w-32 h-32 object-cover'
                />
              </div>
              <input
                type='file'
                id='fileInput'
                className='hidden'
                onChange={handleImageUpload}
              />
              <label
                className='mt-2 cursor-pointer'
                onClick={() => document.getElementById('fileInput').click()}
              >
                <div className='py-1 text-gray-700'>Choose Image</div>
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
            <div><AddCustomerEveryBM formData={formData} setFormData={setFormData} /></div>
          </TabPanel>
          <TabPanel>
            <div><OrderHistoryTable columns={columns} /></div>
          </TabPanel>
          <TabPanel>
            <div><ResellerMember /></div>
          </TabPanel>
        </Tabs>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCustomer;

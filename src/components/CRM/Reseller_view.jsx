import React, { useState } from 'react';
import { FaArrowLeft, FaEdit, FaRedo, FaSave } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import EveryBmAds from './EveryBmAds';

const CustomerView = ({ onBack }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    accountName: 'Rohit Kumar',
    password: '*******',
    contact: '8802643240',
  });
  const [originalData, setOriginalData] = useState(formData);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/crm/customer');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setOriginalData(formData);
    setIsEditing(false);
  };

  const handleResetClick = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className='flex justify-between mb-3'>
        <div>
          <button className='bg-customPurple hover:bg-hcolor flex gap-1 items-center text-white px-4 py-2 rounded-md' onClick={handleBackClick}>
            <FaArrowLeft /> Back
          </button>
        </div>
        <div className='flex gap-2'>
          <button className='flex items-center gap-1 px-2 py-1 text-white bg-green-500 hover:bg-green-600 rounded'
            onClick={handleSaveClick}
            disabled={!isEditing}
          >
            <FaSave /> Save
          </button>
          <button className='flex items-center gap-1 px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded'
            onClick={handleEditClick}
            disabled={isEditing}
          >
            <FaEdit /> Edit
          </button>
          <button className='flex items-center gap-1 px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded'
            onClick={handleResetClick}
            disabled={!isEditing}
          >
            <FaRedo /> Reset
          </button>
        </div>
      </div>
      <div className='p-4 border border-customPurple rounded-md shadow-custom'>
        <div className='flex justify-between'>
          <div className='space-y-7'>
            <div className='flex gap-2'>
              <div className='w-32'>Account Name :</div>
              {isEditing ? (
                <input
                  type='text'
                  name='accountName'
                  value={formData.accountName}
                  onChange={handleChange}
                  className='border px-2 py-1 rounded-md'
                />
              ) : (
                <div>{formData.accountName}</div>
              )}
            </div>
            <div className='flex gap-2'>
              <div className='w-32'>User ID :</div>
              <div>{userId}</div>
            </div>
            <div className='flex gap-2'>
              <div className='w-32'>Password :</div>
              {isEditing ? (
                <input
                  type='text'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='border px-2 py-1 rounded-md'
                />
              ) : (
                <div>{formData.password}</div>
              )}
            </div>
            <div className='flex gap-2'>
              <div className='w-32'>Contact :</div>
              {isEditing ? (
                <input
                  type='text'
                  name='contact'
                  value={formData.contact}
                  onChange={handleChange}
                  className='border px-2 py-1 rounded-md'
                />
              ) : (
                <div>{formData.contact}</div>
              )}
            </div>
          </div>
          <div className='flex gap-2'>
            <div>
              <div className='px-2 py-1 text-white rounded-md bg-pink-500 block items-center justify-center text-sm font-poppins'>Reseller</div>
            </div>
            <div>
              <div className='px-2 py-1 text-white rounded-md bg-orange-600 block items-center justify-center text-sm font-poppins'>Individual</div>
            </div>
          </div>
          <div className='flex flex-col items-center mr-20'>
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
              <div className='py-1 text-gray-700 font-bold'>
                Choose Image
              </div>
            </label>
          </div>
        </div>
        <Tabs className='rounded-t-md overflow-hidden'>
          <TabList className='flex gap-1 pt-2 mt-4 bg-customPurple rounded-t-md'>
            <Tab className='text-white px-4 py-2 cursor-pointer ml-1 rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none rounded-none'>
              Every BM/ADS
            </Tab>
            <Tab className='text-white px-4 py-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none '>
              Order History
            </Tab>
            <Tab className='text-white px-4 py-2 cursor-pointer rounded-t-md hover:bg-white hover:text-customPurple focus:outline-none' selectedClassName='bg-white text-customPurple border-none'>
              Membership
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
          </TabList>

          <TabPanel>
            <div><EveryBmAds isEditing={isEditing} /></div>
          </TabPanel>
          <TabPanel>
            <div>Order History Content</div>
          </TabPanel>
          <TabPanel>
            <div>Membership Content</div>
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
        </Tabs>
      </div>
    </>
  );
};

export default CustomerView;

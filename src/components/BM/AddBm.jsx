import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Select from 'react-select';
import axios from 'axios';
import { API_BASE_URL, fetchToken } from '../utils/auth';
import { DateTime } from 'luxon';
import { toast, ToastContainer } from 'react-toastify';

const timeZoneOptions = [
  { value: 'Asia/Kolkata', label: 'Asia/India' },
  { value: 'America/Toronto', label: 'Canada/Toronto' },
  { value: 'America/New_York', label: 'USA/New York' },
  { value: 'Europe/London', label: 'UK/London' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin' }
];

const AddBM = ({ onBack, showBackButton }) => {
  const resellerId = localStorage.getItem('resellerId');

  const [formData, setFormData] = useState({
    UserTypeId: 1,
    UserManagementId: resellerId, // Set UserManagementId to resellerId initially
    ResellerId: resellerId, // Make sure ResellerId is set correctly
    Name: '',
    bmId: '',
    numberOfAccounts: '',
    numberOfPages: '',
    accountTimeZone: '',
    selfProfileLink: '',
    topUpAmount: '',
    Status: 0,
    CreatedBy: resellerId, // Set CreatedBy to resellerId
    CreatedDate: new Date().toISOString(),
    UpdatedDate: new Date().toISOString(),
    UpdatedBy: resellerId,
    RedeemedAmount: '12',
  });


  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeZonesWithCurrentTime, setTimeZonesWithCurrentTime] = useState([]);

  useEffect(() => {
    const updateTimeZones = () => {
      const updatedOptions = timeZoneOptions.map(option => {
        const currentTime = DateTime.now().setZone(option.value).toFormat('hh:mm');
        return {
          ...option,
          label: `${option.label} (${currentTime})`
        };
      });
      setTimeZonesWithCurrentTime(updatedOptions);
    };

    updateTimeZones();
    const interval = setInterval(updateTimeZones, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const token = await fetchToken();
      const response = await axios.get(`${API_BASE_URL}/UserManagement/GetResellerCustomersDrp?resellerId=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const customerOptions = response.data.data.map((customer) => ({
        value: customer.id,
        label: customer.name,
        name: customer.name,
      }));

      setCustomers(customerOptions);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUserTypeChange = (e) => {
    const newUserType = parseInt(e.target.value, 10);

    setFormData((prevFormData) => ({
      ...prevFormData,
      UserTypeId: newUserType,
      UserManagementId: newUserType === 1 ? resellerId : prevFormData.UserManagementId, // Set resellerId for Self
      Name: '', // Clear name field when changing user type
    }));
  };


  useEffect(() => {
    console.log('Form Data:', formData);
  }, [formData]);


  const handleCustomerSelect = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      UserManagementId: selectedOption ? selectedOption.value : '', // Update UserManagementId based on selected customer
      Name: selectedOption ? selectedOption.name : '',
    }));
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    console.log('Submitting data:', formData); // Check the value of ResellerId here

    try {
      const token = await fetchToken();
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const response = await fetch(`${API_BASE_URL}/BMAdsOrders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);

        // Assuming errorData contains an array of validation errors
        for (const [field, errors] of Object.entries(errorData.errors)) {
          if (Array.isArray(errors) && errors.length > 0) {
            toast.error(errors[0]); // Show the first error message
            break; // Stop after showing the first error message
          }
        }

        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Data submitted successfully:', responseData);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };


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
          <button
            onClick={handleSubmit}
            className="flex items-center bg-green-500 rounded-md px-4 py-2 text-white hover:bg-green-600">
            Submit
          </button>
        </div>
      </div>
      <div className="p-4 border bg-white border-customPurple rounded-md shadow-custom">
        <div className="mb-4">
          <div>
            <div className="flex items-center gap-5 mt-4">
              <label htmlFor="UserTypeId" className="text-sm font-medium w-36 text-gray-700">User Type:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="self"
                  name="UserTypeId"
                  value="1"
                  checked={formData.UserTypeId === 1}
                  onChange={handleUserTypeChange}
                  className="mr-2"
                />
                <label htmlFor="self" className="mr-4">Self</label>
                <input
                  type="radio"
                  id="customer"
                  name="UserTypeId"
                  value="2"
                  checked={formData.UserTypeId === 2}
                  onChange={handleUserTypeChange}
                  className="mr-2"
                />
                <label htmlFor="customer">Customer</label>
              </div>
            </div>
            {formData.UserTypeId === 2 && (
              <div className='flex gap-3 mt-4'>
                <label className='w-28 mr-2'>Customer :</label>
                <Select
                  id="customer"
                  options={customers}
                  value={customers.find(option => option.value === formData.UserManagementId)}
                  onChange={handleCustomerSelect}
                  placeholder="Select Customer"
                  isClearable
                  className='w-[38%]'
                  onMenuOpen={fetchCustomers}  // Fetch customers when dropdown opens
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex items-center gap-5'>
              <label htmlFor="Name" className="text-sm font-medium w-36 text-gray-700">Name :</label>
              <input
                type="text"
                id="Name"
                className="form-control w-full p-2 border border-gray-300 rounded"
                placeholder="Enter name"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>
            <div className='flex items-center gap-5'>
              <label htmlFor="bmId" className="text-sm font-medium w-36 text-gray-700">BM ID :</label>
              <input
                type="text"
                id="bmId"
                className="form-control w-full p-2 border border-gray-300 rounded"
                placeholder="Enter BM ID"
                value={formData.bmId}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex items-center gap-5'>
              <label htmlFor="numberOfAccounts" className="text-sm font-medium w-36 text-gray-700">Number of Accounts :</label>
              <input
                type="number"
                id="numberOfAccounts"
                className="form-control w-full p-2 border border-gray-300 rounded"
                placeholder="Enter number of accounts"
                value={formData.numberOfAccounts}
                onChange={handleChange}
              />
            </div>
            <div className='flex items-center gap-5'>
              <label htmlFor="numberOfPages" className="text-sm font-medium w-36 text-gray-700">Number of Pages :</label>
              <input
                type="number"
                id="numberOfPages"
                className="form-control w-full p-2 border border-gray-300 rounded"
                placeholder="Enter number of pages"
                value={formData.numberOfPages}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex items-center gap-5'>
              <label htmlFor="accountTimeZone" className="text-sm font-medium w-36 text-gray-700">Account Time Zone :</label>
              <Select
                id="accountTimeZone"
                options={timeZonesWithCurrentTime}
                value={timeZonesWithCurrentTime.find(option => option.value === formData.accountTimeZone)}
                onChange={(selectedOption) => setFormData(prevFormData => ({
                  ...prevFormData,
                  accountTimeZone: selectedOption ? selectedOption.value : ''
                }))}
                placeholder="Select Time Zone"
                className='w-full'
              />
            </div>
            <div className='flex items-center gap-5'>
              <label htmlFor="selfProfileLink" className="text-sm font-medium w-36 text-gray-700">Self Profile Link :</label>
              <input
                type="text"
                id="selfProfileLink"
                className="form-control w-full p-2 border border-gray-300 rounded"
                placeholder="Enter self profile link"
                value={formData.selfProfileLink}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex items-center gap-5'>
              <label htmlFor="topUpAmount" className="text-sm font-medium w-36 text-gray-700">Top Up Amount :</label>
              <input
                type="number"
                id="topUpAmount"
                className="form-control w-full p-2 border border-gray-300 rounded"
                placeholder="Enter top-up amount"
                value={formData.topUpAmount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <input
              type="checkbox"
              id="redeem"
              className="form-checkbox"
              checked={formData.redeem}
              onChange={handleChange}
            />
            <label htmlFor="redeem" className="text-md w-36 text-gray-700 font-semibold">Redeem $12</label>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddBM;

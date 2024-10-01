import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Select from 'react-select';
import axios from 'axios';
import { API_BASE_URL, fetchToken } from '../utils/auth';
import { DateTime } from 'luxon';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const timeZoneOptions = [
  { value: 'Asia/Kolkata', label: 'Asia/India' },
  { value: 'America/Toronto', label: 'Canada/Toronto' },
  { value: 'America/New_York', label: 'USA/New York' },
  { value: 'Europe/London', label: 'UK/London' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin' }
];

const AddBM = ({ onBack, showBackButton }) => {
  const resellerId = localStorage.getItem('resellerId');
  const navigate = useNavigate();
  const [calculationData, setCalculationData] = useState(null); // State for holding the calculation data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    UserTypeId: 1,
    UserManagementId: resellerId, // Set UserManagementId to resellerId initially
    ResellerId: resellerId,
    Name: '',
    bmId: '',
    numberOfAccounts: '',
    numberOfPages: '',
    accountTimeZone: '',
    selfProfileLink: '',
    topUpAmount: '',
    Status: 0,
    CreatedBy: resellerId,
    CreatedDate: new Date().toISOString(),
    UpdatedDate: new Date().toISOString(),
    UpdatedBy: resellerId,
    numberOfFreeAccountsOrCoupons: 0,
    RedeemedAmount: 0,
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

  useEffect(() => {
    if (formData.UserTypeId === 2) {
      fetchCustomers();
    }
  }, [formData.UserTypeId]);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const token = await fetchToken();
      const response = await axios.get(`${API_BASE_URL}/UserManagement/GetResellerCustomers?resellerId=${resellerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const customerOptions = response.data.data.map((customer) => ({
        value: customer.id,
        label: customer.accountName,
        name: customer.accountName,
        numberOfFreeAccountsOrCoupons: customer.numberOfFreeAccountsOrCoupons,
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
      UserManagementId: newUserType === 1 ? resellerId : '', // Set resellerId for Self
      Name: '', // Clear name field when changing user type
      numberOfFreeAccountsOrCoupons: newUserType === 1 ? formData.numberOfFreeAccountsOrCoupons : 0, // Reset for customer
      RedeemedAmount: 0, // Reset redeem amount
    }));
  };

  useEffect(() => {
    console.log('Form Data:', formData);
  }, [formData]);


  const handleCustomerSelect = (selectedOption) => {
    const selectedCustomer = customers.find(customer => customer.value === selectedOption.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      UserManagementId: selectedOption ? selectedOption.value : '',
      Name: selectedOption ? selectedOption.name : '',
      numberOfFreeAccountsOrCoupons: selectedCustomer ? selectedCustomer.numberOfFreeAccountsOrCoupons : 0,
      RedeemedAmount: 0, // Reset the redeemed amount initially
    }));
  };


  // const handleChange = (e) => {
  //   const { id, value, type, checked } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [id]: type === 'checkbox' ? checked : value,
  //   }));
  // };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleRedeemCheckboxChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      RedeemedAmount: e.target.checked ? formData.numberOfFreeAccountsOrCoupons : 0, // If checked, use the redeem amount
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = await fetchToken();
      const apiUrl = `${API_BASE_URL}/UserManagement/GetResellerCustomers?resellerId=${resellerId}`;
      // Fetch all data concurrently
      const response = await axios.get(apiUrl, { headers: { Authorization: `Bearer ${token}` } });
      const data = response.data.data;

      const selectedOption = formData.UserManagementId;
      const customerData = data.find(item => item.id === selectedOption);
      const {
        baseFee,
        commission: totalCommission,
        numberOfAccounts: noOfAccountUser,
        numberOfPages: noOfPagesUser,
        additionalAccountFees: additionalAccountFee,
        additionalPageFees: additionalPageFee,
        numberOfFreeAccountsOrCoupons: numberOfFreeAccountsOrCoupons,
      } = customerData;
      // Calculate additional fees
      const additionalAcoountFee = formData.numberOfAccounts > noOfAccountUser
        ? (formData.numberOfAccounts - noOfAccountUser) * additionalAccountFee
        : 0;

      const additionalPageFees = formData.numberOfPages > noOfPagesUser
        ? (formData.numberOfPages - noOfPagesUser) * additionalPageFee
        : 0;

      // Calculate the total
      const total = (
        Number(baseFee) +
        Number(formData.topUpAmount) +
        Number(totalCommission) +
        Number(additionalAcoountFee) +
        Number(additionalPageFees) -
        Number(numberOfFreeAccountsOrCoupons)
      );
      console.log("T", total);

      const calculatedData = {
        baseFee,
        topUpAmount: formData.topUpAmount,
        totalCommission,
        noOfAccountBm: formData.numberOfAccounts,
        noOfAccountUser,
        noOfPagesBm: formData.numberOfPages,
        noOfPagesUser,
        additionalAcoountFee,
        additionalPageFees,
        numberOfFreeAccountsOrCoupons,
        total,
      };
      console.log('Calculated Data:', calculatedData);
      setCalculationData(calculatedData);
      setIsModalOpen(true);

    } catch (error) {
      console.error('Error fetching calculation data:', error);
      toast.error('Error fetching calculation data');
    }
  };

  const handleConfirmSubmit = async () => {
    // Submit after confirmation
    try {
      const token = await fetchToken();
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const response = await fetch(`${API_BASE_URL}/BMAdsOrders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        for (const [errors] of Object.entries(errorData.errors)) {
          if (Array.isArray(errors) && errors.length > 0) {
            toast.error(errors[0]);
            break;
          }
        }
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log('Data submitted successfully:', responseData);
      navigate('/bm/approval');
      onBack();
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Error submitting data');
    } finally {
      setIsModalOpen(false);
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
                  onMenuOpen={fetchCustomers}
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
          {formData.numberOfFreeAccountsOrCoupons > 0 && (
            <div className='flex items-center gap-5'>
              <input
                type="checkbox"
                id="redeemCheckbox"
                className="form-checkbox"
                checked={formData.RedeemedAmount > 0}
                onChange={handleRedeemCheckboxChange}
              />
              <label htmlFor="redeemCheckbox" className="text-md w-36 text-gray-700 font-semibold">
                Redeem ${formData.numberOfFreeAccountsOrCoupons}
              </label>
            </div>
          )}
        </div>
      </div>
      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
          {calculationData ? (
            <div className="space-y-3">
              <div className="flex justify-between font-semibold px-1">
                <p>Base Fee:</p>
                <p>{calculationData.baseFee}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold px-1">
                <p>Top-up Amount:</p>
                <p>{formData.topUpAmount}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold px-1">
                <p>Total Commission:</p>
                <p>{calculationData.totalCommission}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold px-1">
                <p>No of Account BM/ADS:</p>
                <p>{formData.numberOfAccounts}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold px-1">
                <p>No of Account User:</p>
                <p>{calculationData.noOfAccountUser}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold px-1">
                <p>Additional Account Fee:</p>
                <p>{calculationData.additionalAcoountFee}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold px-1">
                <p>No of pages BM:</p>
                <p>{formData.numberOfPages}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold px-1">
                <p>No of pages User:</p>
                <p>{calculationData.noOfPagesUser}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold px-1">
                <p>Additional Page Fee:</p>
                <p>{calculationData.additionalPageFees}</p>
              </div>
              <hr />

              {/* Conditional Redeem Amount Display */}
              {formData.RedeemedAmount > 0 && (
                <>
                  <div className="flex justify-between font-bold px-1 text-red-600">
                    <p>Redeem Amount</p>
                    <p>- {formData.RedeemedAmount}</p>
                  </div>
                  <hr />
                </>
              )}

              {/* Total with or without Redeem Amount */}
              <div className="flex justify-between font-bold px-1 text-lg">
                <p>Total:</p>
                <p>
                  {formData.RedeemedAmount > 0
                    ? calculationData.total - formData.RedeemedAmount
                    : calculationData.total}
                </p>
              </div>

              <div className="flex justify-end mt-6 ">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-4"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={handleConfirmSubmit}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Modal>


      <ToastContainer />
    </div>
  );
};

export default AddBM;

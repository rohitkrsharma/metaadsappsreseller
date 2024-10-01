import React, { useEffect, useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, fetchToken } from '../utils/auth';
import Select from 'react-select';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AddForm = ({ onBack, onAddSuccess }) => {
  const resellerId = localStorage.getItem('resellerId');
  const [fileName, setFileName] = useState('No file chosen');
  const [formData, setFormData] = useState({
    UserTypeId: 1,
    UserManagementId: resellerId,
    ResellerId: resellerId,
    USD: '',
    network: '',
    chargeAmount: '',
    transactionId: '',
    file: null,
    cryptoNetworkImage: '',
    cryptoNetworkName: '',
    Name: '',
  });
  const [loading, setLoading] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [invoice, setInvoice] = useState({});
  const [copyMessage, setCopyMessage] = useState('');
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const token = await fetchToken();

      // Fetch the latest invoice data
      const invoiceResponse = await fetch(`${API_BASE_URL}/Invoices`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const invoiceData = await invoiceResponse.json();
      const latestInvoice = invoiceData.data.length;
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const newInvoiceNumber = `INV${today}-${(latestInvoice + 1).toString().padStart(4, '0')}`;

      setInvoice({
        invoiceNumber: newInvoiceNumber,
        invoiceDate: new Date().toISOString().split('T')[0],
      });

      // Fetch deposit data
      const depositsResponse = await fetch(`${API_BASE_URL}/CryptoAddresses/GetActiveCryptoAddresses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const depositsData = await depositsResponse.json();
      setDeposits(depositsData.data);
      if (depositsData.data.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          USD: depositsData.data[0].address,
          network: depositsData.data[0].cryptoNetworkId,
          cryptoNetworkImage: depositsData.data[0].cryptoNetworkImage,
          cryptoNetworkName: depositsData.data[0].cryptoNetworkName,
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
      UserManagementId: newUserType === 1 ? resellerId : '',
      Name: '',
    }));
  };

  const handleCustomerSelect = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      UserManagementId: selectedOption ? selectedOption.value : '',
      Name: selectedOption ? selectedOption.name : '',
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : 'No file chosen');
    setFormData({ ...formData, file });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (event) => {
    const address = event.target.value;
    const selectedDeposit = deposits.find((deposit) => deposit.address === address);
    setFormData((prevData) => ({
      ...prevData,
      USD: address,
      network: selectedDeposit ? selectedDeposit.cryptoNetworkId : '',
      cryptoNetworkImage: selectedDeposit ? selectedDeposit.cryptoNetworkImage : '',
      cryptoNetworkName: selectedDeposit ? selectedDeposit.cryptoNetworkName : '',
    }));
  };

  const handleCopyToClipboard = () => {
    const address = formData.USD;
    if (address) {
      navigator.clipboard.writeText(address)
        .then(() => {
          setCopyMessage('Copied to clipboard!');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedDeposit = deposits.find((deposit) => deposit.address === formData.USD);
    const submitData = new FormData();
    submitData.append('InvoiceDate', invoice.invoiceDate);
    submitData.append('CryptoAddressId', selectedDeposit ? selectedDeposit.id : '');
    submitData.append('CryptoNetworkId', selectedDeposit ? selectedDeposit.cryptoNetworkId : '');
    submitData.append('ChargeAmount', parseFloat(formData.chargeAmount));
    submitData.append('TransactionId', formData.transactionId);
    submitData.append('InvoiceDocument', invoice.invoiceNumber);
    submitData.append('DocFile', formData.file);
    submitData.append('CreatedBy', 'Rohit');
    submitData.append('UserTypeId', formData.UserTypeId);
    submitData.append('ResellerId', formData.ResellerId);
    submitData.append('UserManagementId', formData.UserManagementId);
    submitData.append('Name', formData.Name);

    for (let pair of submitData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setLoading(true);
      const token = await fetchToken();
      const response = await fetch(`${API_BASE_URL}/Invoices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errors = Object.values(errorData.errors || {}).flat();
        if (errors.length > 0) {
          toast.error(errors[0]); // show the first error message as the toast 
        }
        throw new Error(errors[0] || 'Unknown error');
      }

      const result = await response.json();
      console.log('Form submitted successfully', result);
      // onAddSuccess(result);
      navigate('/wallet/topup');
    } catch (error) {
      console.error('Error adding data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && (
        <div className="fixed top-0 right-0 m-4 p-4 bg-white border border-gray-300 rounded shadow-lg">
          <p>Loading...</p>
        </div>
      )}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <button className='flex items-center bg-green-500 rounded-md px-4 py-2 text-white hover:bg-green-600' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="bg-white border border-customPurple rounded-md shadow-custom p-4">
        <div className="mb-4">
          <div>
            <div className="flex justify-between items-center gap-5 mt-4 mb-4">
              <div className='flex'>
                <label htmlFor="UserTypeId" className='w-44'>User Type:</label>
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
              <div className="flex font-semibold">
                <label className='w-44'>Invoice Date:</label>
                <div className="form-control ">
                  {invoice.invoiceDate}
                </div>
              </div>
            </div>
            {formData.UserTypeId === 2 && (
              <div className='flex gap-3 mt-4 mb-4'>
                <label className='w-48'>Customer :</label>
                <Select
                  id="customer"
                  options={customers}
                  value={customers.find(option => option.value === formData.UserManagementId)}
                  onChange={handleCustomerSelect}
                  placeholder="Select Customer"
                  isClearable
                  className='w-[100%]'
                  onMenuOpen={fetchCustomers}
                  isLoading={isLoading}
                />
              </div>
            )}
            {
              formData.UserTypeId === 1 && (
                <div className="flex mb-4">
                  <label className='w-52'>Name:</label>
                  <input
                    type="text"
                    name="Name"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    value={formData.Name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                  />
                </div>
              )}
            <div className="flex mb-4  items-center">
              <label className='w-52'>USD/deposit Address:</label>
              <select
                name="USD"
                className="form-control w-full p-2 border border-gray-300 rounded"
                value={formData.USD}
                onChange={handleAddressChange}
              >
                <option value="">Select Address</option>
                {deposits.map((deposit) => (
                  <option key={deposit.id} value={deposit.address}>
                    {deposit.address}
                  </option>
                ))}
              </select>
              <div className='relative'>
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
            <div className="flex mb-4">
              <label className='w-44'>Network:</label>
              <div className="flex items-center">
                <img
                  src={formData.cryptoNetworkImage ? `http://3.110.160.106:8080/${formData.cryptoNetworkImage}` : "https://metaadsapp.s3.ap-south-1.amazonaws.com/default_network_image.png"}
                  alt="Network"
                  className="w-6 h-6 mr-2"
                />
                {formData.cryptoNetworkName}
              </div>
            </div>
            <div className="flex mb-4">
              <label className='w-52'>Charge Amount:</label>
              <input
                type="number"
                name="chargeAmount"
                className="form-control w-full p-2 border border-gray-300 rounded"
                value={formData.chargeAmount}
                onChange={handleInputChange}
                placeholder="Enter amount in USDT"
              />
            </div>
            <div className="flex mb-4">
              <label className='w-52'>Hash/Transaction ID:</label>
              <input
                type="text"
                name="transactionId"
                className="form-control w-full p-2 border border-gray-300 rounded"
                value={formData.transactionId}
                onChange={handleInputChange}
                placeholder="Enter transaction ID"
              />
            </div>
            <div className="flex items-center mb-4">
              <label className='w-52'>Screenshot/Image/PDF:</label>
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddForm;
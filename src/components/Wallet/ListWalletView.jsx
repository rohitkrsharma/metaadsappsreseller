import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL, fetchToken } from '../utils/auth';

const ListWalletView = ({ data, onBack }) => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await fetchToken();
        const response = await axios.get(`${API_BASE_URL}/Invoices/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Assuming the data is inside the `data` property of the response
        setInvoiceData(response.data.data);
      } catch (error) {
        console.error('Error fetching detailed data:', error);
      }
    };

    fetchData();
  }, [data.id]);


  return (
    <div>
      <div className="text-gray-700 mb-4 flex items-center justify-between gap-1">
        <button onClick={onBack} className='flex gap-1 items-center bg-customPurple rounded-md px-4 py-2 text-white hover:bg-hcolor'>
          <FaArrowLeft />Back
        </button>
        <div className="bttn-group flex">
          <div className="bttn active text-sm">Darft</div>
          <div className="bttn next text-sm">Applied</div>
          <div className="bttn next next-inner text-sm">Checked</div>
          <div className="bttn next next-inner text-sm">Meta-team-received</div>
          <div className="bttn next next-inner text-sm">A/C Arrived</div>
          <div className="bttn next next-inner text-sm">Share Fail</div>
          <div className="bttn next next-inner text-sm">Share Pass</div>
        </div>
      </div>

      {invoiceData ? (
        <div className="form-row mt-3">
          <div className="p-5 border border-customPurple rounded-md shadow-custom">
            <div className='flex space-x-0 flex-wrap lg:space-x-60'>
              <div className="space-y-8">
                <div className="flex items-center gap-5 font-bold">
                  <label>Invoice No - </label>
                  <div>
                    <label>{invoiceData.invoiceNumber}</label>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className='w-32'>Charge :-</label>
                  <div>
                    <label>${invoiceData.chargeAmount}</label>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className='w-32'>Network :-</label>
                  <div>
                    <label>{invoiceData.cryptoNetworkId}</label>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className='w-32'>Date :-</label>
                  <div>
                    <div>
                      <label>{new Date(invoiceData.invoiceDate).toLocaleDateString()}</label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className='w-32'>Token :-</label>
                  <div>
                    <div>
                      <label>{invoiceData.transactionId}</label>
                    </div>
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <label className='w-32'>USDT/Deposit :-</label>
                  <div>
                    <label>${invoiceData.usdtDeposit}</label>
                  </div>
                </div> */}
                <div className="flex items-center">
                  <label className='w-32'>Transaction Id :-</label>
                  <div>
                    <label>{invoiceData.transactionId}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ListWalletView;

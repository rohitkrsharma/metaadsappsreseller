import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL, fetchToken } from '../utils/auth';

const ListWalletView = ({ data, onBack }) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [approvalHistory, setApprovalHistory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await fetchToken();

        // Fetch the invoice data
        const invoiceResponse = await axios.get(`${API_BASE_URL}/Invoices/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvoiceData(invoiceResponse.data.data);

        // Fetch the invoice approval history data
        const approvalHistoryResponse = await axios.get(`${API_BASE_URL}/Invoices/GetInvoiceApprovalHistory/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApprovalHistory(approvalHistoryResponse.data.data); // Assuming response.data.data contains the history array
      } catch (error) {
        console.error('Error fetching data:', error);
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
        {/* <div className="bttn-group flex">
          <div className="bttn active text-sm">Draft</div>
          <div className="bttn next text-sm">Applied</div>
          <div className="bttn next next-inner text-sm">Checked</div>
          <div className="bttn next next-inner text-sm">Meta-team-received</div>
          <div className="bttn next next-inner text-sm">A/C Arrived</div>
          <div className="bttn next next-inner text-sm">Share Fail</div>
          <div className="bttn next next-inner text-sm">Share Pass</div>
        </div> */}
      </div>

      {invoiceData ? (
        <div className="form-row mt-3">
          <div className="p-5 border border-customPurple rounded-md shadow-custom">
            <div className='flex flex-wrap justify-between'>
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
                {/* <div className="flex items-center">
                  <label className='w-32'>Network :-</label>
                  <div>
                    <label>{invoiceData.cryptoNetworkname}</label>
                  </div>
                </div> */}
                <div className="flex items-center">
                  <label className='w-32'>Date :-</label>
                  <div>
                    <div>
                      <label>{new Date(invoiceData.invoiceDate).toLocaleDateString()}</label>
                    </div>
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <label className='w-32'>Token :-</label>
                  <div>
                    <div>
                      <label>{invoiceData.transactionId}</label>
                    </div>
                  </div>
                </div> */}
                <div className="flex items-center">
                  <label className='w-32'>Transaction Id :-</label>
                  <div>
                    <label>{invoiceData.transactionId}</label>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-end'>
                {approvalHistory && approvalHistory.length > 0 ? (
                  <div className="font-bold border border-gray-500 p-5 space-y-4 rounded-lg max-h-72 overflow-auto custom-scrollbar">
                    {approvalHistory.map((history, index) => {
                      // Create a mapping object for status colors
                      const statusColors = {
                        Pending: 'text-yellow-500',
                        Approved: 'text-green-600',
                        ReOpened: 'text-blue-600',
                        Rejected: 'text-red-600',
                      };

                      // Get the color based on statusText (default to gray if not found)
                      const statusColor = statusColors[history.statusText] || 'text-gray-600';

                      return (
                        <div key={index} className="space-y-4">
                          <div className='flex items-center gap-16'>
                            <label className='w-28 text-xl'>Status:</label>
                            <label className={statusColor}>{history.statusText}</label>
                          </div>
                          <div className='flex items-center gap-16'>
                            <label className='w-28 text-xl'>Remark:</label>
                            <label>{history.remarks}</label>
                          </div>
                          <div className='flex items-center gap-16'>
                            <label className='w-28 text-xl'>Date:</label>
                            <label>{new Date(history.createdDate).toLocaleDateString()}</label>
                          </div>
                          <div className='flex items-center gap-16'>
                            <label className='w-28 text-xl'>Created By:</label>
                            <label>{history.createdBy}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No approval history available.</p>
                )}
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

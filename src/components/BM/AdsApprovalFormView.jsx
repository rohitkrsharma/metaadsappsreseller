import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AdsApprovalFormView = ({ data, onBack }) => {
  return (
    <div>
      <div className="text-gray-700 mb-4 flex items-center justify-between">
        <button onClick={onBack} className='flex gap-1 items-center bg-customPurple rounded-md px-4 py-2 text-white hover:bg-hcolor'>
          <FaArrowLeft />Back
        </button>
        <div className="bttn-group flex">
          <div className="bttn active text-sm">Draft</div>
          <div className="bttn next text-sm">Applied</div>
          <div className="bttn next next-inner text-sm">Checked</div>
          <div className="bttn next next-inner text-sm">Meta-team-received</div>
          <div className="bttn next next-inner text-sm">A/C Arrived</div>
          <div className="bttn next next-inner text-sm">Share Fail</div>
          <div className="bttn next next-inner text-sm">Share Pass</div>
        </div>
      </div>
      <div className="form-row mt-3">
        <div className="p-5 border border-customPurple rounded-md shadow-custom">
          <div className='flex space-x-0 flex-wrap lg:space-x-60'>
            <div className="space-y-8">
              <div className="flex items-center gap-5 font-bold">
                <label>Order No - </label>
                <div>
                  <label>{data.OrderNo}</label>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>BM Name :-</label>
                <div>
                  <label>Rohit Kumar</label>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>BM ID :-</label>
                <div>
                  <div>
                    <label>{data.BMID}</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>No of A/C :-</label>
                <div>
                  <div>
                    <label>5</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>Time Zone :-</label>
                <div>
                  <div>
                    <label>IST +5:30</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>Topup Amount :-</label>
                <div>
                  <div>
                    <label>$550</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8 flex flex-col">
              <div className="flex items-center gap-5 mt-5 font-bold"></div>
              <div className="flex items-center gap-5">
                <label className='w-32'>Order Date :-</label>
                <div>
                  <label>{data.Date}</label>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <label className='w-32'>Related user :-</label>
                <div>
                  <div>
                    <label>Meraj Khan</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <label className='w-32'>No Of Page :-</label>
                <div>
                  <div>
                    <label>3</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <label className='w-32'>Self profit Link :-</label>
                <div>
                  <div>
                    <label>.......</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <table className="lg:w-[54%] w-full border-collapse border border-customPurple">
              <tbody>
                <tr className="bg-gray-200">
                  <td className="border border-customPurple px-4 py-2">Base fare</td>
                  <td className="border border-customPurple px-4 py-2">50.00 USD</td>
                </tr>
                <tr>
                  <td className="border border-customPurple px-4 py-2">Top Up</td>
                  <td className="border border-customPurple px-4 py-2">550.00 USD</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-customPurple px-4 py-2">Commission</td>
                  <td className="border border-customPurple px-4 py-2">27.50 USD</td>
                </tr>
                <tr>
                  <td className="border border-customPurple px-4 py-2">A/C fee</td>
                  <td className="border border-customPurple px-4 py-2">10.00 USD</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-customPurple px-4 py-2">Page Fee</td>
                  <td className="border border-customPurple px-4 py-2">2.00 USD</td>
                </tr>
                <tr>
                  <td className="border border-customPurple px-4 py-2">Redeem BM</td>
                  <td className="border border-customPurple px-4 py-2">-40.00 USD</td>
                </tr>
                <tr className="font-bold bg-gray-200">
                  <td className="border border-customPurple px-4 py-2">Total</td>
                  <td className="border border-customPurple px-4 py-2">599.50 USD</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdsApprovalFormView;

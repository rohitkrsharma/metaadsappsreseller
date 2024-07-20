import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const ListWalletView = ({ data, onBack }) => {
  // const [isActive, setIsActive] = useState(true);
  // const handleToggle = () => {
  //   setIsActive(!isActive);
  // };

  return (
    <div>
      <div className="text-gray-700 mb-4 flex items-center justify-between gap-1">
        <button onClick={onBack} className='flex gap-1 items-center bg-customPurple rounded-md px-4 py-2 text-white hover:bg-hcolor'>
          <FaArrowLeft />Back
        </button>
        {/* <div className='mr-6'>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isActive} onChange={handleToggle} />
              <div className={`block w-14 h-8 rounded-full transition-colors ${isActive ? 'bg-customPurple' : 'bg-red-500'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isActive ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <div className={`ml-3 font-medium ${isActive ? 'text-customPurple' : 'text-red-500'}`}>
              {isActive ? 'Approved' : 'Pending'}
            </div>
          </label>
        </div> */}

        <div className="bttn-group flex">
          <div className="bttn active text-sm">{data.status}</div>
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
                <label>Invoice No - </label>
                <div>
                  <label>{data.InvoiceNo}</label>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>Charge :-</label>
                <div>
                  <label>$150</label>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>Date :-</label>
                <div>
                  <div>
                    <label>{data.Date}</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>Token :-</label>
                <div>
                  <div>
                    <label>TROC-202</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>Image:</label>
                <div>
                  <div>
                    <label><img src='https://metaadsapp.s3.ap-south-1.amazonaws.com/profile_user.png' alt='default' className='h-12 rounded-2xl' /> </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className='w-32'>Transaction ID:</label>
                <div>
                  <div>
                    <label>0987123456</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListWalletView;

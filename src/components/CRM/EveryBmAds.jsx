import React from 'react';

const EveryBmAds = ({ isEditing }) => {
  const [bmAdsData, setBmAdsData] = React.useState({
    accountName: 'Rohit',
    baseFee: '550',
    additionalFee: '50',
    pageName: '20',
    commission: '300',
    couponFee: '120',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBmAdsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className='flex justify-between mt-2 gap-5'>
        <div className='flex-1 space-y-5'>
          <div className='flex gap-2 items-center'>
            <label className='w-60'>Name of Account :</label>
            {isEditing ? (
              <input
                type='text'
                name='accountName'
                value={bmAdsData.accountName}
                onChange={handleChange}
                className='border px-2 py-1 rounded-md'
              />
            ) : (
              <label>{bmAdsData.accountName}</label>
            )}
          </div>
          <div className='flex gap-2 items-center'>
            <label className='w-60'>Base Fee :</label>
            {isEditing ? (
              <input
                type='text'
                name='baseFee'
                value={bmAdsData.baseFee}
                onChange={handleChange}
                className='border px-2 py-1 rounded-md'
              />
            ) : (
              <label>{bmAdsData.baseFee}</label>
            )}
          </div>
          <div className='flex gap-2 items-center'>
            <label className='w-60'>Additional A/C Fee :</label>
            {isEditing ? (
              <input
                type='text'
                name='additionalFee'
                value={bmAdsData.additionalFee}
                onChange={handleChange}
                className='border px-2 py-1 rounded-md'
              />
            ) : (
              <label>{bmAdsData.additionalFee}</label>
            )}
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex-1 space-y-5'>
            <div className='flex gap-2 items-center'>
              <label className='w-60'>Name of Page :</label>
              {isEditing ? (
                <input
                  type='text'
                  name='pageName'
                  value={bmAdsData.pageName}
                  onChange={handleChange}
                  className='border px-2 py-1 rounded-md'
                />
              ) : (
                <label>{bmAdsData.pageName}</label>
              )}
            </div>
            <div className='flex gap-2 items-center'>
              <label className='w-60'>Commission :</label>
              {isEditing ? (
                <input
                  type='text'
                  name='commission'
                  value={bmAdsData.commission}
                  onChange={handleChange}
                  className='border px-2 py-1 rounded-md'
                />
              ) : (
                <label>{bmAdsData.commission}</label>
              )}
            </div>
            <div className='flex gap-2 items-center'>
              <label className='w-60'>A/C Fee/Free coupon :</label>
              {isEditing ? (
                <input
                  type='text'
                  name='couponFee'
                  value={bmAdsData.couponFee}
                  onChange={handleChange}
                  className='border px-2 py-1 rounded-md'
                />
              ) : (
                <label>{bmAdsData.couponFee}</label>
              )}
            </div>
          </div>
        </div>

      </div>
      <hr className='my-10 border-gray-300' />
      <div className='text-red-600 font-extrabold text-lg'>
        Free Coupon
      </div>
      <div className='flex-1 justify-between'>
        <div className='flex gap-2 items-center'>
          <label className='w-44'>No of A/C :</label>
          <label>1234</label>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default EveryBmAds;

import React from 'react'

const AddCustomerEveryBM = () => {
  return (
    <>
      <div className='flex justify-between p-2 gap-5'>
        <div className='flex-1 space-y-3'>
          <div className='flex gap-2 items-center'>
            <label className='w-60'>Name of Account :</label>
            <input className='border w-full  border-gray-300 rounded-md p-2' type='text' placeholder='Enter account name' />
          </div>
          <div className='flex gap-2 items-center'>
            <label className='w-60'>Base Fee :</label>
            <input className='border w-full border-gray-300 rounded-md p-2' type='text' placeholder='Enter base fee' />
          </div>
          <div className='flex gap-2 items-center'>
            <label className='w-60'>Additional A/C Fee :</label>
            <input className='border w-full border-gray-300 rounded-md p-2' type='text' placeholder='Enter additonal A/C fee' />
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex-1 space-y-3'>
            <div className='flex gap-2 items-center'>
              <label className='w-60'>Name of Page :</label>
              <input className='border w-full  border-gray-300 rounded-md p-2' type='text' placeholder='Enter page name' />
            </div>
            <div className='flex gap-2 items-center'>
              <label className='w-60'>Commission :</label>
              <input className='border w-full border-gray-300 rounded-md p-2' type='text' placeholder='Enter commission' />
            </div>
            <div className='flex gap-2 items-center'>
              <label className='w-60'>A/C Fee/Free coupon :</label>
              <input className='border w-full border-gray-300 rounded-md p-2' type='text' placeholder='Enter A/C free or free coupon' />
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr className='my-10 border-gray-300' />
      </div>
      <div className='text-red-600 font-extrabold text-lg'>
        Free Coupon
      </div>
      <div className='flex-1 justify-between'>
        <div className='flex gap-2 items-center'>
          <label className='w-44'>No of A/C :</label>
          <input className='border w-1/3 border-gray-300 rounded-md p-2' type='text' placeholder='Enter free coupon account no' />
        </div>
        <div></div>
      </div>
    </>
  )
}

export default AddCustomerEveryBM;
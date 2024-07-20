import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const Resubmitted = ({ onBack }) => {
  return (
    <>
      <div className='flex justify-between mb-6'>
        <button className='bg-customPurple hover:bg-hcolor flex gap-1 items-center text-white px-4 py-2 rounded-md' onClick={onBack}>
          <FaArrowLeft /> Back
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
      <div className='p-5 space-y-5 border bg-white border-customPurple rounded-md shadow-custom max-w-3xl'>
        <div className='flex items-center'>
          <label className='w-28 font-medium'>BM ID:</label>
          <input className='border w-full  border-gray-300 rounded-md p-2' type='text' placeholder='Enter New BMID' />
        </div>
        <div className='flex justify-end'>
          <button className="flex items-center  bg-green-500 rounded-md px-4 py-2 text-white hover:bg-green-600">Resubmit</button>
        </div>
      </div>
    </>
  )
}

export default Resubmitted
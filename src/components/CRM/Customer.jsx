import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const ProfileCard = ({ acName, memberSince, userId, contact, userType }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/customer-view/${userId}`);
  };

  const cardClasses = classNames(
    'bg-white border rounded-lg overflow-hidden shadow-custom',
    'border-purple-500 shadow-purple-500',
  );

  return (
    <div className="">
      <div className={cardClasses}>
        <div className="p-4">
          <div className='flex gap-5'>
            <div><img alt="" src="https://metaadsapp.s3.ap-south-1.amazonaws.com/profile_user.png" className="w-16 h-16 rounded-full" /></div>
            <div className='flex flex-col space-y-1 uppercase'>
              <div className='flex gap-1'>
                <div className='text-xs text-gray-400 font-medium'>A/C Name :</div>
                <div className='text-xs text-gray-600 font-medium'>{acName}</div>
              </div>
              <div className='flex gap-1'>
                <div className='text-xs text-gray-400 font-medium'>Member Since :</div>
                <div className='text-xs text-gray-600 font-medium'>{memberSince}</div>
              </div>
              <div className='flex gap-1'>
                <div className='text-xs text-gray-400 font-medium'>User ID :</div>
                <div className='text-xs text-gray-600 font-medium'>{userId}</div>
              </div>
              <div className='flex gap-1'>
                <div className='text-xs text-gray-400 font-medium'>Contact :</div>
                <div className='text-xs text-gray-600 font-medium'>{contact}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2 mt-5">
            <div className="text-xs bg-purple-500 hover:bg-purple-600 px-2 py-1 rounded-md text-white font-medium">Customer</div>
            <div
              className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1 rounded-md text-white font-medium cursor-pointer"
              onClick={handleViewDetails}
            >
              View Details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

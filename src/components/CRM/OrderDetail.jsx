import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="p-4">
      <button className="bg-customPurple hover:bg-hcolor flex gap-1 items-center text-white px-4 py-2 rounded-md" onClick={handleBackClick}>
        <FaArrowLeft /> Back
      </button>
      <h1 className="text-xl font-bold mt-4">Order Details for Order ID: {id}</h1>
      {/* Display order details here */}
    </div>
  );
};

export default OrderDetails;

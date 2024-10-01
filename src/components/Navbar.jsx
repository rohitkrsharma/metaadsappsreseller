/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { HiBell, HiMenu, HiMenuAlt1, HiPlus } from 'react-icons/hi';
import { FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, fetchToken } from './utils/auth'; // Assuming you have a utility to fetch the token

const Navbar = ({ isCollapsed, toggleCollapsed }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0); // State for wallet balance
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const token = await fetchToken();
        const response = await axios.get(`${API_BASE_URL}/Wallet/getbalance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userID: 7,
          },
        });

        setWalletBalance(response.data.data);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };
    fetchWalletBalance();
  }, []);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (profileOpen) {
      setProfileOpen(false);
    }
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    if (notificationsOpen) {
      setNotificationsOpen(false);
    }
  };

  const handleAddWalletClick = () => {
    navigate('/wallet/add', { state: { showBackButton: false } });
  };

  return (
    <div className="bg-white text-black relative flex justify-end items-center p-4">
      <button onClick={toggleCollapsed} className="absolute top-[20px] left-[20px] text-gray-600 z-40">
        {isCollapsed ? <HiMenu className="text-2xl" /> : <HiMenuAlt1 className="text-2xl" />}
      </button>
      <div className="flex items-center space-x-4">
        <button className="flex items-center px-4 py-2 bg-customPurple font-medium text-white rounded-md hover:bg-hcolor">
          <FaWallet className="mr-2" />
          Wallet $ {walletBalance}
        </button>
        <button
          className="flex items-center px-4 py-2 bg-green-500 font-medium text-white rounded-md hover:bg-green-600"
          onClick={handleAddWalletClick}
        >
          <HiPlus className="mr-2" />
          Add Topup
        </button>
      </div>
      <div className="relative ml-4">
        <button onClick={toggleNotifications}>
          <HiBell className="w-8 h-6" />
        </button>
        {notificationsOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">Notification 1</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">Notification 2</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">Notification 3</a>
          </div>
        )}
      </div>
      <div className="relative ml-4">
        <button onClick={toggleProfile}>
          <img
            className="w-8 rounded-full"
            src="https://metaadsapp.s3.ap-south-1.amazonaws.com/profile_user.png"
            alt="profile"
          />
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">Profile 1</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">Profile 2</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">Logout</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

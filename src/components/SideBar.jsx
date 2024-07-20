import React, { useEffect, useState } from 'react';
import { FaBriefcase, FaShareAlt, FaShekelSign, FaSignOutAlt, FaUserMd } from 'react-icons/fa';
import { HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const Sidebar = ({ isCollapsed }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  useEffect(() => {
    if (isCollapsed) {
      setActiveMenu(null);
    }
  }, [isCollapsed]);

  return (
    <div className={`flex ${isCollapsed ? 'w-20' : 'w-[270px]'} h-screen bg-customPurple text-white overflow-hidden transition-all duration-500`}>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between p-4 relative">
          <Link to="/dashboard">
            <img src="https://metaadsapp.s3.ap-south-1.amazonaws.com/img_logo.png" alt="Logo" className="rounded-full" />
          </Link>
        </div>
        {!isCollapsed && (
          <>
            <div className="flex items-center p-4">
              <img src="https://metaadsapp.s3.ap-south-1.amazonaws.com/profile_user.png" alt="User" className="h-10 w-10 rounded-full" />
              <div className="ml-4">
                <h4 className="text-white">Maria Gomez</h4>
                <p className="text-gray-300">Administrator</p>
              </div>
            </div>
            <div className="p-4 text-sm">
              <input
                type="text"
                placeholder="Start typing to search..."
                className="w-full px-4 py-2 rounded-full bg-search placeholder-gray-300 focus:outline-none"
              />
            </div>
          </>
        )}
        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            <li className="flex flex-col transition-transform duration-300 transform hover:scale-105">
              <Link to="/dashboard" className={`flex items-center p-2 rounded-md ${activeMenu === 'dashboard' ? 'bg-hcolor' : 'hover:bg-hcolor'} w-full text-left`} onClick={() => handleMenuClick('dashboard')}>
                <MdDashboard data-tooltip-id="tooltip" data-tooltip-content="Dashboard" />
                {!isCollapsed && <span className="ml-4">Dashboard</span>}
              </Link>
            </li>
            <MenuItem
              title="CRM"
              icon={<FaUserMd data-tooltip-id="tooltip" data-tooltip-content="CRM" />}
              menuKey="crm"
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
              isCollapsed={isCollapsed}
              location={location}
            >
              <SubMenuLink to="/crm/customer" text="Customer" isCollapsed={isCollapsed} icon={<FaUserMd data-tooltip-id="tooltip" data-tooltip-content="Customer" />} location={location} />
            </MenuItem>
            <MenuItem
              title="BM/Ads Management"
              icon={<FaBriefcase data-tooltip-id="tooltip" data-tooltip-content="BM/Ads Management" />}
              menuKey="bm"
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
              isCollapsed={isCollapsed}
              location={location}
            >
              <SubMenuLink to="/bm/approval" text="List BM/ADS Applied" isCollapsed={isCollapsed} icon={<FaBriefcase data-tooltip-id="tooltip" data-tooltip-content="List BM/ADS Applied" />} location={location} />
              <SubMenuLink to="/bm/add" text="Add BM/ADS Applied" isCollapsed={isCollapsed} icon={<FaBriefcase data-tooltip-id="tooltip" data-tooltip-content="Add BM/ADS Applied" />} location={location} />
            </MenuItem>
            <MenuItem
              title="Wallets Management"
              icon={<FaShekelSign data-tooltip-id="tooltip" data-tooltip-content="Wallets Management" />}
              menuKey="wallets"
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
              isCollapsed={isCollapsed}
              location={location}
            >
              {/* <SubMenuLink to="/wallet/list" text="Wallet" isCollapsed={isCollapsed} icon={<FaShekelSign data-tooltip-id="tooltip" data-tooltip-content="Wallet" />} location={location} /> */}
              <SubMenuLink to="/wallet/topup" text="Top Up Status" isCollapsed={isCollapsed} icon={<FaShekelSign data-tooltip-id="tooltip" data-tooltip-content="Top Up Status" />} location={location} />
              <SubMenuLink to="/wallet/history" text="History of Wallet" isCollapsed={isCollapsed} icon={<FaShekelSign data-tooltip-id="tooltip" data-tooltip-content="History of Wallet" />} location={location} />
            </MenuItem>
            <MenuItem
              title="Shared Management"
              icon={<FaShareAlt data-tooltip-id="tooltip" data-tooltip-content="Shared Management" />}
              menuKey="shared"
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
              isCollapsed={isCollapsed}
              location={location}
            >
              <SubMenuLink to="/shared/list" text="List of Shared BM/Ads" isCollapsed={isCollapsed} icon={<FaShareAlt data-tooltip-id="tooltip" data-tooltip-content="List of Shared BM/Ads" />} location={location} />
            </MenuItem>
            <li className="flex flex-col transition-transform duration-300 transform hover:scale-105">
              <Link to="/logout" className={`flex items-center p-2 rounded-md ${activeMenu === 'logout' ? 'bg-hcolor' : 'hover:bg-hcolor'} w-full text-left`} onClick={() => handleMenuClick('logout')}>
                <FaSignOutAlt data-tooltip-id="tooltip" data-tooltip-content="Logout" />
                {!isCollapsed && <span className="ml-4">Logout</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Tooltip id="tooltip" place="right" effect="solid" />
    </div>
  );
};

const MenuItem = ({ title, icon, menuKey, activeMenu, handleMenuClick, isCollapsed, children, location }) => {
  const isOpen = activeMenu === menuKey;

  return (
    <li className="flex flex-col">
      <button
        className={`flex items-center p-2 rounded-md w-full text-left ${isOpen ? 'bg-hcolor' : 'hover:bg-hcolor'} transition-transform duration-300 transform hover:scale-105`}
        onClick={() => handleMenuClick(menuKey)}
      >
        {icon}
        {!isCollapsed && <span className="ml-4">{title}</span>}
        {!isCollapsed && children && (
          <div className="ml-auto transition-transform duration-300">
            {isOpen ? <HiOutlineChevronDown /> : <HiOutlineChevronRight />}
          </div>
        )}
      </button>
      <ul className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'} ${isCollapsed ? 'pl-4' : 'pl-8'}`}>
        {children}
      </ul>
    </li>
  );
};

const SubMenuLink = ({ to, text, isCollapsed, icon, location }) => {
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`flex items-center p-2 gap-1 rounded-md transition-transform duration-300 transform hover:scale-105 ${isActive ? 'bg-hcolor' : 'hover:bg-hcolor'}`}>
      {icon} {/* Display icon regardless of collapse state */}
      {!isCollapsed && <span className="flex items-center rounded-md w-full text-left">{text}</span>}
    </Link>
  );
};

export default Sidebar;

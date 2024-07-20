import React, { useState } from 'react';
import ProfileCard from './Customer';
import SearchBar from '../SearchBar';
import UserListView from './ListView';
import AddCustomer from './AddCustomer';

const UserGrid = () => {
  const [view, setView] = useState('grid');
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const users = [
    {
      acName: 'Rohit Sharma',
      memberSince: '11-june-2024',
      userId: 'UID59110',
      contact: '+91 9800263240',
      userType: 'Customer'
    },
    {
      acName: 'Raj Malhotra',
      memberSince: '11-june-2024',
      userId: 'UID59112',
      contact: '+91 9800263240',
      userType: 'Customer'
    },
    {
      acName: 'Rajeev',
      memberSince: '11-june-2024',
      userId: 'UID59114',
      contact: '+91 9800263240',
      userType: 'Reseller'
    },
    {
      acName: 'Rakesh Tomar',
      memberSince: '11-june-2024',
      userId: 'UID59115',
      contact: '+91 9800263240',
      userType: 'Reseller'
    },
    {
      acName: 'Rajesh ',
      memberSince: '11-june-2024',
      userId: 'UID59116',
      contact: '+91 9800263240',
      userType: 'Reseller'
    },
  ];

  const onToggleView = (view) => {
    setView(view);
  };

  const onAddCustomer = () => {
    setShowAddCustomer(true);
  };

  const onBack = () => {
    setShowAddCustomer(false);
  };

  return (
    <>
      {!showAddCustomer && (
        <div className='flex justify-between mb-3'>
          <div></div>
          <div><SearchBar onToggleView={onToggleView} showAddAndView={true} currentView={view} onAdd={onAddCustomer} /></div>
        </div>
      )}
      {showAddCustomer ? (
        <AddCustomer onBack={onBack} />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <ProfileCard
              key={user.userId}
              acName={user.acName}
              memberSince={user.memberSince}
              userId={user.userId}
              contact={user.contact}
              userType={user.userType}
            />
          ))}
        </div>
      ) : (
        <UserListView users={users} />
      )}
    </>
  );
};

export default UserGrid;

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddBM from './components/BM/AddBm';
import AdsApproval from './components/BM/AdsApproval';
import CustomerView from './components/CRM/Customer_view';
import UserListView from './components/CRM/ListView';
import UserGrid from './components/CRM/USerGrid';
import Dashboard from './components/Dashboard';
import LandingPage from './components/Login/LandingPage';
import ResellerLogin from './components/Login/Reseller';
import Logout from './components/Logout/Logout';
import Navbar from './components/Navbar';
import ListShared from './components/SharedManagement/ListShared';
import Sidebar from './components/SideBar';
import AddForm from './components/Wallet/AddWallet';
import ListWallet from './components/Wallet/ListWallet';
import TopUpStatus from './components/Wallet/TopUpStatus';
import WalletHistory from './components/Wallet/WalletHistory';
import ListSharedFormView from './components/SharedManagement/ListSharedFormView';
import OrderDetails from './components/CRM/OrderDetail';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddBM, setShowAddBM] = useState(false);
  const [showSharedList, setShowSharedList] = useState(false);
  const [view, setView] = useState('grid');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<ResellerLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="flex h-screen overflow-hidden bg-gray-100 font-Palatino">
                <Sidebar isCollapsed={isCollapsed} toggleCollapsed={toggleCollapsed} />
                <div className="flex flex-col flex-grow">
                  <Navbar isCollapsed={isCollapsed} toggleCollapsed={toggleCollapsed} />
                  <div className="flex-grow overflow-y-auto p-4">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route
                        path="/crm/customer"
                        element={
                          view === 'grid' ? (
                            <UserGrid onToggleView={setView} />
                          ) : (
                            <UserListView onToggleView={setView} />
                          )
                        }
                      />
                      <Route
                        path="/bm/approval"
                        element={
                          showAddBM ? (
                            <AddBM onBack={() => setShowAddBM(false)} showBackButton={true} />
                          ) : (
                            <AdsApproval
                              view={view}
                              onToggleView={setView}
                              onAdd={() => setShowAddBM(true)}
                              breadcrumbs={['BM/ADS Management', 'AdsApproval']}
                            />
                          )
                        }
                      />
                      <Route path="/bm/add" element={<AddBM />} />
                      <Route
                        path="/wallet/list"
                        element={
                          showAddForm ? (
                            <AddForm onBack={() => setShowAddForm(false)} showBackButton={true} />
                          ) : (
                            <ListWallet
                              view={view}
                              onToggleView={setView}
                              breadcrumbs={['Wallet', 'ListWallet']}
                              onAdd={() => setShowAddForm(true)}
                            />
                          )
                        }
                      />
                      <Route path="/wallet/add" element={<AddForm />} />
                      <Route
                        path="/wallet/topup"
                        element={
                          <TopUpStatus
                            view={view}
                            onToggleView={setView}
                            breadcrumbs={['Wallet', 'TopupStatus']}
                          />
                        }
                      />
                      <Route
                        path="/wallet/history"
                        element={
                          <WalletHistory
                            view={view}
                            onToggleView={setView}
                            breadcrumbs={['Wallet', 'ListWallet']}
                            onAdd={() => setShowAddForm(true)}
                          />
                        }
                      />
                      <Route
                        path="/shared/list"
                        element={
                          showSharedList ? (
                            <ListSharedFormView onBack={() => setShowSharedList(false)} />
                          ) : (
                            <ListShared
                              view={view}
                              onToggleView={setView}
                              onAdd={() => setShowSharedList(false)}
                              breadcrumbs={['Wallet', 'ListWallet']}
                            />
                          )
                        }
                      />
                      <Route path="/logout" element={<Logout />} />
                      <Route path="/customer-view/:userId" element={<CustomerView />} />
                      <Route path="/order-details/:id" element={<OrderDetails />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/landing" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

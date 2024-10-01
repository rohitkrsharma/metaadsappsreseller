import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import AddCustomer from "./AddCustomer";
import UserListView from "./ListView";
import { API_BASE_URL, fetchToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

// ProfileCard component
const ProfileCard = ({ userId, id, name, contact, member, profilePicture }) => {

  const navigate = useNavigate();

  const cardClasses = classNames(
    'bg-white border rounded-lg overflow-hidden shadow-custom',
    'border-purple-500 shadow-purple-500',
  );

  return (
    <div className={cardClasses}>
      <div className="p-4">
        <div className='flex gap-5'>
          <div>
            <img
              alt={name}
              src={`http://3.110.160.106:8080/${profilePicture}`}
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div className='flex flex-col space-y-1 uppercase'>
            <div className='flex gap-1'>
              <div className='text-xs text-gray-400 font-medium'>Name :</div>
              <div className='text-xs text-gray-600 font-medium'>{name}</div>
            </div>
            <div className='flex gap-1'>
              <div className='text-xs text-gray-400 font-medium'>Member Since :</div>
              <div className='text-xs text-gray-600 font-medium'>{member}</div>
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
          <div
            className="border border-purple-700 text-xs px-2 py-1 rounded-md text-purple-700 font-medium cursor-pointer"
          >
            Customer
          </div>
          <div
            className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1 rounded-md text-white font-medium cursor-pointer"
            onClick={() => navigate(`/customer-view/${id}`)}
          >
            View Details
          </div>
        </div>
      </div>
    </div>
  );
};

// UserGrid component
const UserGrid = () => {
  const resellerId = localStorage.getItem('resellerId');
  const [view, setView] = useState('grid');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users state
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = await fetchToken();
      const response = await fetch(`${API_BASE_URL}/UserManagement/GetResellerCustomers?resellerId=${resellerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      console.log('API Response:', result); // Log the API response structure

      // Adjust based on response structure
      if (Array.isArray(result.data)) {
        setUsers(result.data);
        setFilteredUsers(result.data);
      } else {
        setUsers([]); // Handle case where data is not an array
        setFilteredUsers([]); // Handle case where data is not an array
      }
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchTermChange = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const filtered = users.filter(user =>
      user.accountName.toLowerCase().includes(lowercasedTerm) ||
      user.contactNumber.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredUsers(filtered); // Update filtered users
  };

  const onToggleView = (view) => {
    setView(view);
  };

  const onAddCustomer = () => {
    setShowAddCustomer(true);
  };

  const onBack = () => {
    setShowAddCustomer(false);
  };

  const onCustomerAdded = () => {
    setShowAddCustomer(false);
    fetchData(); // Refresh the grid after adding a new customer
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {!showAddCustomer && (
        <div className='flex justify-between mb-3'>
          <div></div>
          <div>
            <SearchBar
              onSearchTermChange={handleSearchTermChange}
              onAdd={onAddCustomer}
              onToggleView={onToggleView}
              currentView={view}
              showAddAndView={true}
              searchPlaceholder="Search by name or contact number"
              filterOptions={['Filter1', 'Filter2', 'Filter3']}
              groupByOptions={['Category', 'Price', 'Brand']}
              favoritesOptions={['Favorite', 'Favorite']}
            />
          </div>
        </div>
      )}
      {showAddCustomer ? (
        <AddCustomer onBack={onBack} onCustomerAdded={onCustomerAdded} />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <ProfileCard
              key={user.id}
              id={user.id}
              userId={user.userId}
              name={user.accountName}
              member={user.createdDate}
              contact={user.contactNumber}
              profilePicture={user.profilePicture}
            />
          ))}
        </div>
      ) : (
        <UserListView users={filteredUsers} />
      )}
    </>
  );
};

export default UserGrid;

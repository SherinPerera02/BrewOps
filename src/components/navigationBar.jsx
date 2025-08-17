import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaBell, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';

export default function StaffDashboardNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState('ProductionManager');
  const [room, setRoom] = useState('general');
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
      const response = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login'); // Redirect to login if token is invalid
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove token on logout
    setDropdownOpen(false);
    navigate('/login');
  };

  // Function to handle new toast messages
  const handleNewNotification = (message) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]);
  };

  // Example: Simulate receiving a toast message
  useEffect(() => {
    const simulateToast = setTimeout(() => {
      handleNewNotification('New inventory update available!');
    }, 5000);

    return () => clearTimeout(simulateToast);
  }, []);

  // Toggle notification dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-green-600 shadow-md px-4 py-3 flex flex-col md:flex-row items-center justify-between">
      {/* Brand */}
      <div className="text-white text-2xl md:text-3xl font-bold mb-2 md:mb-0">BrewOps</div>

      {/* Icons + Profile */}
      <div className="flex items-center space-x-4 md:space-x-6 relative">
        {/* Message Icon */}
        <button
          className="relative text-white hover:text-yellow-400 transition-colors duration-300"
          onClick={() => navigate('/chat')}
        >
          <FaEnvelope size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse">3</span>
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <button
            className="relative text-white hover:text-blue-400 transition-colors duration-300"
            onClick={toggleDropdown}
          >
            <FaBell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse">
                {notifications.length}
              </span>
            )}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded shadow-lg z-50 ring-1 ring-gray-200">
              <ul className="max-h-64 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-gray-100 transition-colors">
                    {notification}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Image with Dropdown */}
        <div className="relative">
          <FaUserCircle
            className="text-white text-2xl cursor-pointer hover:text-green-300"
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              if (!user) fetchUserData(); // Fetch user data if not already loaded
            }}
          />

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded shadow-lg z-50 ring-1 ring-gray-200">
              <div className="px-4 py-2 text-sm text-gray-600">
                Logged in as: <strong>{user?.name || 'Loading...'}</strong>
              </div>
              <Link
                to="/staff/profile"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                My Profile
              </Link>
              <Link
                to="/staff/profile/setting"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Component */}
      {showChat && <Chat username={username} room={room} />}
    </nav>
  );
}

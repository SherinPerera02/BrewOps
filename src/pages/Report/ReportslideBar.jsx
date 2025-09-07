import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaBoxes, 
  FaBars, 
  FaTimes,
  FaChartBar,
  FaFileAlt,
  FaCog
} from 'react-icons/fa';

export default function ReportslideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, to: '/staffdashboard',  },
    { label: 'Supplier Report', icon: <FaBoxes />, to: '/reports',  },
    { label: 'Inventory Reports', icon: <FaBoxes />, to: '/inventory'},
    { label: 'Financial Reports', icon: <FaChartBar />, to: '/financial'},
    
  ];

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sidebar-container') && !event.target.closest('.hamburger-btn')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="hamburger-btn md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 rounded-lg shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          sidebar-container
          fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-white
          transform transition-all duration-300 ease-in-out z-40 shadow-2xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:block
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FaChartBar className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Reports Center</h2>
              <p className="text-gray-400 text-sm">Analytics & Insights</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-700/50 ${
                      isActive 
                        ? 'bg-blue-600 shadow-lg transform scale-[1.02]' 
                        : 'hover:transform hover:translate-x-1'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <span className={`mr-4 text-lg transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {item.icon}
                      </span>
                      <div className="flex-1">
                        <div className={`font-medium transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'
                        }`}>
                          {item.label}
                        </div>
                        <div className={`text-xs transition-colors duration-200 ${
                          isActive ? 'text-blue-100' : 'text-gray-400 group-hover:text-gray-300'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-1 h-8 bg-white rounded-full ml-2"></div>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl">
            <div className="bg-gray-600 p-2 rounded-lg">
              <FaCog className="text-sm text-gray-300" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-200">Settings</div>
              <div className="text-xs text-gray-400">Report Preferences</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
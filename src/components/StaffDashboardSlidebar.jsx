import React, { useState } from 'react';
import { FaHome, FaUsers, FaBox, FaChartBar, FaDollarSign, FaSignOutAlt, FaBars } from 'react-icons/fa';
import profile from '../assets/profile.png';
import { Link, useLocation } from 'react-router-dom';

export default function StaffDashboardSlidebar() {
  const [isOpen, setIsOpen] = useState(false); // For mobile toggle
  const location = useLocation();

  // Function to check if current path matches the link
  const isActiveLink = (path) => {
    if (path === '/StaffDashboard') {
      return location.pathname === '/StaffDashboard';
    }
    return location.pathname.startsWith(path);
  };

  // Function to get link classes based on active state
  const getLinkClasses = (path) => {
    const baseClasses = "flex items-center px-3 py-2 rounded transition-colors";
    const activeClasses = "bg-green-600 text-white";
    const hoverClasses = "hover:bg-green-600 hover:text-white";
    
    return isActiveLink(path) 
      ? `${baseClasses} ${activeClasses}` 
      : `${baseClasses} ${hoverClasses}`;
  };

  return (
    <>
      {/* Mobile Navbar with Hamburger */}
      <div className="md:hidden flex items-center bg-gray-800 text-white p-3">
        <button onClick={() => setIsOpen(!isOpen)} className="mr-3">
          <FaBars size={24} />
        </button>
        <p className="font-semibold">Dashboard</p>
      </div>

      {/* Sidebar */}
      <div className={`fixed md:relative z-50 h-screen w-64 bg-gray-800 text-white flex flex-col justify-between transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0`}>
        <div>
          {/* Profile Image */}
          

          {/* Navigation Links */}
          <nav className="flex flex-col px-4 py-6 space-y-4 text-white">
            <Link to="/StaffDashboard" className={getLinkClasses('/StaffDashboard')}>
              <FaHome className="mr-3" /> Dashboard
            </Link>
            <Link to="/supplier-management" className={getLinkClasses('/supplier-management')}>
              <FaUsers className="mr-3" /> Supplier Management
            </Link>
            <Link to="/inventories" className={getLinkClasses('/inventories')}>
              <FaBox className="mr-3" /> Inventory
            </Link>
            <Link to="/reports" className={getLinkClasses('/reports')}>
              <FaChartBar className="mr-3" /> Reports
            </Link>
            <Link to="/suppliers/payments" className={getLinkClasses('/suppliers/payments')}>
              <FaDollarSign className="mr-3" /> Payments
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="px-4 py-6 border-t border-green-600 text-white">
          <Link to="/login" className="flex items-center px-3 py-2 rounded hover:bg-red-600 transition-colors text-white">
            <FaSignOutAlt className="mr-3" /> Logout
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black opacity-50 md:hidden z-40"></div>}
    </>
  );
}

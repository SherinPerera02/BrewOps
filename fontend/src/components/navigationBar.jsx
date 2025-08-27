import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaUserCircle, FaTimes, FaSignOutAlt, FaBell, FaEnvelope, FaBars } from "react-icons/fa";


const NavigationBar = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuByRole = {
    admin: [
      { label: "Supplier Management", to: "/supplier-management" },
      { label: "Inventory Management", to: "/inventory-management" },
      { label: "User Management", to: "/user-management" },
    ],
    supplier: [
      { label: "Orders", to: "/orders" },
      { label: "Profile", to: "/profile" },
    ],
    other: [{ label: "Dashboard", to: "/" }],
  };

  const menuItems = menuByRole[user?.role] || menuByRole.other;

  const handleLogout = () => {
    setSidebarOpen(false);
    if (onLogout) onLogout();
    navigate("/login");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-green-600 px-6 py-4 flex justify-between items-center shadow-md relative">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-white text-3xl font-bold">BrewOps</h1>
      </div>
      


      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-white text-lg hover:text-green-900 transition">
          Home
        </Link>
        <Link to="/AboutUs" className="text-white text-lg hover:text-green-900 transition">
          About
        </Link>
        <Link to="/Service" className="text-white text-lg hover:text-green-900 transition">
          Services
        </Link>
        <Link to="/ContactUs" className="text-white text-lg hover:text-green-900 transition">
          Contact
        </Link>
        </div>
       

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 right-0 w-64 h-full bg-green-600 p-6 flex flex-col space-y-6 z-50">
            <h2 className="text-white text-2xl font-bold mb-4">Menu</h2>
            <Link
              to="/"
              className="text-white text-lg hover:text-green-900 transition"
              onClick={() => setSidebarOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/AboutUs"
              className="text-white text-lg hover:text-green-900 transition"
              onClick={() => setSidebarOpen(false)}
            >
              About
            </Link>
            <Link
              to="/Service"
              className="text-white text-lg hover:text-green-900 transition"
              onClick={() => setSidebarOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/ContactUs"
              className="text-white text-lg hover:text-green-900 transition"
              onClick={() => setSidebarOpen(false)}
            >
              Contact
            </Link>

           
          </div>
        </div>
      )}

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-white text-2xl cursor-pointer hover:text-green-300" />
        <FaEnvelope className="text-white text-2xl cursor-pointer hover:text-green-300" />
        <FaUserCircle className="w-7 h-7 rounded-full border-2  cursor-pointer text-white"
          onClick={() => setDropdownOpen(!dropdownOpen)} />

        {dropdownOpen && (
            <div className="absolute right-0 mt-40 w-44 bg-white text-gray-800 rounded shadow-lg z-50 ring-1 ring-gray-200">
              <a href="/staff/profile" className="block px-4 py-2 hover:bg-gray-100 transition-colors">My Profile</a>
              <a href="/staff/profile/setting" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Settings</a>
              <a href="/login" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Logout</a>
            </div>
          )}
      </div>

    </nav>
  );
};

export default NavigationBar;

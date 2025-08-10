import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaTimes, FaSignOutAlt } from "react-icons/fa";

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
    if (onLogout) {
      onLogout(); // call logout logic passed from parent
    }
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="bg-green-600 px-6 py-4 flex justify-between items-center shadow-md relative">
      {/* Logo and Title */}
      <div className="flex items-center">
        <h1 className="text-white text-3xl font-bold">BrewOps</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
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

      {/* Profile Icon */}
      <FaUserCircle
        className="text-white text-3xl cursor-pointer hover:text-green-900 transition"
        onClick={() => setSidebarOpen(true)}
      />

      {/* Floating Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end">
            <FaTimes
              className="text-gray-600 text-2xl cursor-pointer hover:text-red-600 transition"
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          {/* Profile Info */}
          <div className="mt-6 flex-grow">
            <h2 className="text-xl font-bold text-gray-800">{user?.name || "Guest"}</h2>
            <p className="text-gray-500 capitalize">{user?.role || "visitor"}</p>
            <hr className="my-4" />

            <nav className="space-y-4">
              {menuItems.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="block text-gray-700 hover:text-green-600 transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center text-red-600 hover:text-red-800 transition font-semibold space-x-2"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;

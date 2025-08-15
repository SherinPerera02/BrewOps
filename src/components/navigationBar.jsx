import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaTimes, FaSignOutAlt, FaBell, FaEnvelope } from "react-icons/fa";

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
      

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-white text-2xl cursor-pointer hover:text-green-300" />
        <FaEnvelope className="text-white text-2xl cursor-pointer hover:text-green-300" />
        <FaUserCircle className="text-white text-2xl cursor-pointer hover:text-green-300" />
      </div>
    </nav>
  );
};

export default NavigationBar;

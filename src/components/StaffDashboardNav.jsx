import React, { useState } from 'react'
import { FaSearch, FaEnvelope, FaBell } from 'react-icons/fa'
import profile from '../assets/Profile.png'

export default function StaffDashboardNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-green-600 shadow-md px-4 py-3 flex flex-col md:flex-row items-center justify-between">
      
      {/* Brand */}
      <div className="text-white text-2xl md:text-3xl font-bold mb-2 md:mb-0">
        BrewOps
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-full md:w-1/3 mb-2 md:mb-0">
        <FaSearch className="text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent outline-none w-full text-sm md:text-base"
        />
      </div>

      {/* Icons + Profile */}
      <div className="flex items-center space-x-4 md:space-x-6 relative">

        {/* Message Icon */}
        <button className="relative text-white hover:text-yellow-400 transition-colors duration-300">
          <FaEnvelope size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse">
            3
          </span>
        </button>

        {/* Notification Icon */}
        <button className="relative text-white hover:text-blue-400 transition-colors duration-300">
          <FaBell size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse">
            5
          </span>
        </button>

        {/* Profile Image with Dropdown */}
        <div className="relative">
          <img 
            src={profile} 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded shadow-lg z-50 ring-1 ring-gray-200">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition-colors">My Profile</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Settings</a>
              <a href="/login" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Logout</a>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

import React, { useState } from 'react'
import { FaSearch, FaEnvelope, FaBell } from 'react-icons/fa'
import profile from '../assets/Profile.png'

export default function StaffDashboardNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      <nav className="bg-green-600 shadow-md px-4 py-3 flex items-center justify-between">
        <div className="text-white text-3xl font-bold">BrewOps</div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-1/3">
          <FaSearch className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        {/* Icons + Profile */}
        <div className="flex items-center space-x-6 relative">
          {/* Message Icon */}
          <button className="relative text-white hover:text-yellow-400 transition-colors duration-300">
            <FaEnvelope size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </button>

          {/* Notification Icon */}
          <button className="relative text-white hover:text-blue-400 transition-colors duration-300">
            <FaBell size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              5
            </span>
          </button>

          {/* Profile Image */}
          <div className="relative">
            <img 
              src={profile} 
              alt="User" 
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50 ">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">My Profile</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

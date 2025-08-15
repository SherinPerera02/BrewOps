import React from 'react'
import { FaHome, FaUsers, FaBox, FaChartBar, FaDollarSign, FaSignOutAlt } from 'react-icons/fa'
import profile from '../assets/profile.png'

export default function StaffDashboardSlidebar() {
  return (
    <div>
      <div className="h-screen w-64 bg-gray-800 text-white flex flex-col justify-between">
    
      <div>
        

        {/* Profile Image */}
        <div className="flex items-center p-4 border-b border-green-600">
          <img src={profile} alt="User" className="w-12 h-12 rounded-full mr-3 border"/>
          <div>
            <p className="font-semibold text-white">Staff Name</p>
            <p className="text-sm text-white">Staff Role</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col px-4 py-6 space-y-4 text-white">
          <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-green-600 transition-colors">
            <FaHome className="mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-green-600 transition-colors">
            <FaUsers className="mr-3" /> Supplier
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-green-600 transition-colors">
            <FaBox className="mr-3" /> Inventory
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-green-600 transition-colors">
            <FaChartBar className="mr-3" /> Reports
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-green-600 transition-colors">
            <FaDollarSign className="mr-3" /> payments
          </a>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-4 py-6 border-t border-green-600 text-white">
        <a href="/logout" className="flex items-center px-3 py-2 rounded hover:bg-red-600 transition-colors text-white">
          <FaSignOutAlt className="mr-3" /> Logout
        </a>
      </div>
    </div>
    </div>
  )
}

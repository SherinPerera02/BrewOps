import React from 'react';
import { NavLink } from 'react-router-dom';
import profileImg from '../assets/profile.png';

export default function SupplierSidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-6 sticky top-0">
      <h2 className="text-2xl font-bold mb-6">Supplier</h2>
      <ul className="space-y-4">
        {/* Profile Image */}
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-green-700' : 'hover:bg-gray-700'}`
            }
          >
            <img
              src={profileImg}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
            />
          </NavLink>
        </li>

        {/* Home */}
        <li>
          <NavLink
            to="/HomePage"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-green-700' : 'hover:bg-gray-700'}`
            }
          >
            Home
          </NavLink>
        </li>

        {/* Supplier */}
        <li>
          <NavLink
            to="/SupplierHome"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-green-700' : 'hover:bg-gray-700'}`
            }
          >
            Supplier
          </NavLink>
        </li>

        {/* Supply Record */}
        <li>
          <NavLink
            to="/SupplierRecode"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-green-700' : 'hover:bg-gray-700'}`
            }
          >
            Supply Record
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaPager, FaUsers, FaBars, FaTimes } from 'react-icons/fa';

export default function SupplierSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, to: '/staffdashboard' },
    { label: 'Supplier Management', icon: <FaUsers />, to: '/SupplierHome' },
    { label: 'Supply Record', icon: <FaPager />, to: '/SupplierRecode' },
  ];

  // Auto-close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded shadow hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-6
          transform transition-transform duration-300 ease-in-out
          z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:block
        `}
      >
        <h2 className="text-2xl font-bold mb-6 text-green-400">Supplier</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded transition-colors duration-200 ${
                    isActive 
                      ? 'bg-green-700 text-white font-semibold' 
                      : 'hover:bg-gray-700 text-gray-200'
                  }`
                }
                onClick={() => setIsOpen(false)} // close sidebar on mobile click
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
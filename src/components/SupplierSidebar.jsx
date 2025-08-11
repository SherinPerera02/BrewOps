import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.png'

export default function SupplierSidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-6 sticky top-0">
    <h2 className="text-2xl font-bold mb-6">Supplier</h2>
      <ul className="space-y-4">
        <li>
          <Link to ="/profile" className="block hover:bg-gray-700 px-3 py-2 rounded">
            <img src={profileImg}
                 alt="Profile" 
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"  
      /></Link>
        </li>
        <li>
          <Link to="/HomePage" className="block hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
        </li>
        <li>
          <Link to="/SupplierHome" className="block hover:bg-gray-700 px-3 py-2 rounded">Supplier</Link>
        </li>
        <li>
          <Link to="/SupplierRecode" className="block hover:bg-gray-700 px-3 py-2 rounded">Supply Record</Link>
        </li>
       
      </ul>
      
      
    </aside>
  );
}

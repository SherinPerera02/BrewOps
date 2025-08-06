import React from 'react';
import { Link } from 'react-router-dom';

export default function SupplierSidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-6 sticky top-0">
    <h2 className="text-2xl font-bold mb-6">Supplier</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/HomePage" className="block hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
        </li>
        <li>
          <Link to="/SupplierHome" className="block hover:bg-gray-700 px-3 py-2 rounded">Supplier</Link>
        </li>
        <li>
          <Link to="/SupplierRecodeTable" className="block hover:bg-gray-700 px-3 py-2 rounded">Supply Record</Link>
        </li>
       
      </ul>
      
      
    </aside>
  );
}

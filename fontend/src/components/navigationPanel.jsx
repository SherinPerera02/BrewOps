import React from 'react';
import { Link } from 'react-router-dom';

const NavigationPanel = () => {
  return (
    <nav className="bg-green-600 px-6 py-3 flex items-center justify-center shadow-md relative">
      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/SupplierHome" className="text-white text-lg hover:text-green-900 transition">
          Supplier Management
        </Link>
        <Link to="/inventories" className="text-white text-lg hover:text-green-900 transition">
          Inventory Management
        </Link>
        <Link to="/raw-tea-leaves-management" className="text-white text-lg hover:text-green-900 transition">
          Raw Tea Leaves Management
        </Link>
      </div>
    </nav>
  );
};

export default NavigationPanel;

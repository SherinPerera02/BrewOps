// components/InventorySidebar.jsx
import { Link } from 'react-router-dom';

const InventorySidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-5 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-6">Inventory</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/HomePage" className="block hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
        </li>
        <li>
          <Link to="/inventorys" className="block hover:bg-gray-700 px-3 py-2 rounded">Inventory</Link>
        </li>
        <li>
          <Link to="/waste-management" className="block hover:bg-gray-700 px-3 py-2 rounded">Waste Management</Link>
        </li>
        <li>
          <Link to="/Pendingshipmentss" className="block hover:bg-gray-700 px-3 py-2 rounded">Pending Shipments</Link>
        </li>
        <li>
          <Link to="/Irawleaves" className="block hover:bg-gray-700 px-3 py-2 rounded">Raw Leaves Management</Link>
        </li>
      </ul>
    </div>
  );
};

export default InventorySidebar;

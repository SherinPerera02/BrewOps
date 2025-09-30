// components/InventorySidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaPlus, FaLeaf, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const InventorySidebar = () => {
  const location = useLocation();

  // Function to check if current path matches the link
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Function to get link classes based on active state
  const getLinkClasses = (path) => {
    const baseClasses = "flex items-center px-3 py-2 rounded transition-colors";
    const activeClasses = "bg-green-600 text-white";
    const hoverClasses = "hover:bg-green-600 hover:text-white";
    
    return isActiveLink(path) 
      ? `${baseClasses} ${activeClasses}` 
      : `${baseClasses} ${hoverClasses}`;
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white p-5 fixed left-0" style={{ top: '64px' }}>
      <div className="flex items-center mb-6 pb-4 border-b border-gray-700">
        <FaBoxOpen className="w-8 h-8 mr-2 text-green-500" />
        <span className="font-bold text-lg">Inventory Hub</span>
      </div>
      
      <nav className="space-y-2">
        <Link to="/" className={getLinkClasses('/')}>
          <FaHome className="mr-3" />
          <span>Dashboard</span>
        </Link>
        
        <Link to="/inventories" className={getLinkClasses('/inventories')}>
          <FaBoxOpen className="mr-3" />
          <span>View Inventory</span>
        </Link>
        
        <Link to="/inventory/creates" className={getLinkClasses('/inventory/creates')}>
          <FaPlus className="mr-3" />
          <span>Add Inventory</span>
        </Link>
        
        <Link to="/suppliers/leavesQuantity" className={getLinkClasses('/suppliers/leavesQuantity')}>
          <FaLeaf className="mr-3" />
          <span>Leaves Quantity</span>
        </Link>
        
        <Link to="/Production" className={getLinkClasses('/Production')}>
          <FaChartBar className="mr-3" />
          <span>Production</span>
        </Link>
        
        <Link to="/reports" className={getLinkClasses('/reports')}>
          <FaChartBar className="mr-3" />
          <span>Reports</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="border-t border-gray-700 pt-4">
          <Link to="/login" className="flex items-center px-3 py-2 rounded hover:bg-red-600 transition-colors text-white">
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InventorySidebar;

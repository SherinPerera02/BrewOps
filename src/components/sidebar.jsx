// components/TeaTypeSidebar.jsx
import { Link } from 'react-router-dom';

const TeaTypeSidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-5 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-6">Tea Types</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/HomePage" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link to="/teatypes" className="block bg-green-600 bg-opacity-40 px-3 py-2 rounded">
            Tea Types
          </Link>
        </li>
        <li>
          <Link to="/create-tea-type" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Create Tea type
          </Link>
        </li>
        
        
      </ul>
    </div>
  );
};

export default TeaTypeSidebar;

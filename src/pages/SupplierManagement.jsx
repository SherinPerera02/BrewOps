import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../components/navigationBar';
import { 
  FaUsers, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaSearch, 
  FaFilter,
  FaDownload,
  FaPrint,
  FaUserCheck,
  FaUserTimes,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSortUp,
  FaSortDown,
  FaSort
} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { 
  FaHome,
  FaWarehouse,
  FaFileAlt,
  FaDollarSign,
  FaSignOutAlt
} from 'react-icons/fa';

// Supplier Management Sidebar Component
const SupplierManagementSidebar = () => {
  const location = useLocation();

  const isActiveLink = (path) => {
    if (path === '/supplier-management') {
      return location.pathname === '/supplier-management';
    }
    return location.pathname.startsWith(path);
  };

  const getLinkClasses = (path) => {
    const baseClasses = "flex items-center px-3 py-2 rounded transition-colors";
    const activeClasses = "bg-blue-600 text-white";
    const hoverClasses = "hover:bg-blue-600 hover:text-white";
    
    return isActiveLink(path) 
      ? `${baseClasses} ${activeClasses}` 
      : `${baseClasses} ${hoverClasses}`;
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5 sticky top-0">
      {/* Header */}
      <div className="flex items-center mb-6 pb-4 border-b border-gray-700">
        <FaUsers className="w-8 h-8 mr-2 text-blue-500" />
        <span className="font-bold text-lg">Supplier Hub</span>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        <Link to="/StaffDashboard" className={getLinkClasses('/StaffDashboard')}>
          <FaHome className="mr-3" />
          <span>Dashboard</span>
        </Link>
        
        <Link to="/supplier-management" className={getLinkClasses('/supplier-management')}>
          <FaUsers className="mr-3" />
          <span>Supplier Overview</span>
        </Link>
        
        <Link to="/SupplierHome" className={getLinkClasses('/SupplierHome')}>
          <FaUserCheck className="mr-3" />
          <span>Manage Suppliers</span>
        </Link>
        
        <Link to="/inventories" className={getLinkClasses('/inventories')}>
          <FaWarehouse className="mr-3" />
          <span>Inventory Management</span>
        </Link>
        
        <Link to="/reports" className={getLinkClasses('/reports')}>
          <FaFileAlt className="mr-3" />
          <span>Reports</span>
        </Link>
        
        <Link to="/suppliers/payments" className={getLinkClasses('/suppliers/payments')}>
          <FaDollarSign className="mr-3" />
          <span>Payments</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <Link to="/login" className="flex items-center px-3 py-2 rounded hover:bg-red-600 transition-colors text-white">
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default function SupplierManagement() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [suppliersPerPage] = useState(10);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  // Sample supplier data
  const sampleSuppliers = [
    {
      id: 1,
      name: 'Green Valley Tea Estate',
      contactPerson: 'John Silva',
      email: 'john@greenvalley.lk',
      phone: '+94 77 123 4567',
      address: 'Nuwara Eliya, Sri Lanka',
      status: 'active',
      joinDate: '2023-01-15',
      teaType: 'Black Tea',
      rating: 4.8,
      totalSupplies: 145,
      lastSupply: '2024-09-25'
    },
    {
      id: 2,
      name: 'Highland Tea Gardens',
      contactPerson: 'Mary Fernando',
      email: 'mary@highland.lk',
      phone: '+94 76 987 6543',
      address: 'Kandy, Sri Lanka',
      status: 'active',
      joinDate: '2023-03-20',
      teaType: 'Green Tea',
      rating: 4.6,
      totalSupplies: 98,
      lastSupply: '2024-09-23'
    },
    {
      id: 3,
      name: 'Ceylon Premium Leaves',
      contactPerson: 'David Perera',
      email: 'david@ceylonpremium.lk',
      phone: '+94 75 456 7890',
      address: 'Hatton, Sri Lanka',
      status: 'inactive',
      joinDate: '2022-11-10',
      teaType: 'White Tea',
      rating: 4.2,
      totalSupplies: 67,
      lastSupply: '2024-08-15'
    },
    {
      id: 4,
      name: 'Mountain View Plantations',
      contactPerson: 'Sarah Jayawardena',
      email: 'sarah@mountainview.lk',
      phone: '+94 78 234 5678',
      address: 'Ella, Sri Lanka',
      status: 'active',
      joinDate: '2023-06-05',
      teaType: 'Oolong Tea',
      rating: 4.9,
      totalSupplies: 203,
      lastSupply: '2024-09-28'
    },
    {
      id: 5,
      name: 'Sunrise Tea Company',
      contactPerson: 'Michael Rajapaksa',
      email: 'michael@sunrise.lk',
      phone: '+94 71 345 6789',
      address: 'Badulla, Sri Lanka',
      status: 'pending',
      joinDate: '2024-09-01',
      teaType: 'Black Tea',
      rating: 0,
      totalSupplies: 0,
      lastSupply: null
    }
  ];

  // Load suppliers data
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuppliers(sampleSuppliers);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort suppliers
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);
  const totalPages = Math.ceil(filteredSuppliers.length / suppliersPerPage);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle supplier selection for bulk actions
  const handleSelectSupplier = (supplierId) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSuppliers.length === currentSuppliers.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(currentSuppliers.map(supplier => supplier.id));
    }
  };

  // Handle supplier status change
  const handleStatusChange = (supplierId, newStatus) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === supplierId 
        ? { ...supplier, status: newStatus }
        : supplier
    ));
    toast.success(`Supplier status updated to ${newStatus}`);
  };

  // Handle delete supplier
  const handleDeleteSupplier = (supplier) => {
    setSupplierToDelete(supplier);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== supplierToDelete.id));
    toast.success('Supplier deleted successfully');
    setShowDeleteModal(false);
    setSupplierToDelete(null);
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="w-3 h-3 text-gray-400" />;
    return sortDirection === 'asc' ? 
      <FaSortUp className="w-3 h-3 text-green-600" /> : 
      <FaSortDown className="w-3 h-3 text-green-600" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <NavigationBar />
        
        <div className="flex">
          {/* Sidebar */}
          <SupplierManagementSidebar />
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                      <FaUsers className="text-green-600" />
                      Supplier Management
                    </h1>
                    <p className="text-gray-600 mt-2">Manage your tea suppliers and their information</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate('/suppliers/create')}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <FaPlus />
                      Add New Supplier
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                      <FaDownload />
                      Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300">
                      <FaPrint />
                      Print
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Suppliers</p>
                      <p className="text-3xl font-bold text-gray-800">{suppliers.length}</p>
                    </div>
                    <FaUsers className="text-green-500 text-2xl" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Suppliers</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {suppliers.filter(s => s.status === 'active').length}
                      </p>
                    </div>
                    <FaUserCheck className="text-blue-500 text-2xl" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pending Approval</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {suppliers.filter(s => s.status === 'pending').length}
                      </p>
                    </div>
                    <FaCalendarAlt className="text-yellow-500 text-2xl" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Inactive Suppliers</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {suppliers.filter(s => s.status === 'inactive').length}
                      </p>
                    </div>
                    <FaUserTimes className="text-red-500 text-2xl" />
                  </div>
                </div>
              </div>

              {/* Filters and Search */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search suppliers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    {/* Status Filter */}
                    <div className="relative">
                      <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Bulk Actions */}
                  {selectedSuppliers.length > 0 && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Activate ({selectedSuppliers.length})
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                        Delete ({selectedSuppliers.length})
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Suppliers Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedSuppliers.length === currentSuppliers.length && currentSuppliers.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                        </th>
                        <th 
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center gap-2">
                            Supplier Name
                            {getSortIcon('name')}
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact Person
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact Info
                        </th>
                        <th 
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center gap-2">
                            Status
                            {getSortIcon('status')}
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tea Type
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Supply
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentSuppliers.map((supplier) => (
                        <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedSuppliers.includes(supplier.id)}
                              onChange={() => handleSelectSupplier(supplier.id)}
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                              <div className="text-sm text-gray-500">{supplier.address}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{supplier.contactPerson}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-gray-900">
                                <FaPhone className="text-gray-400 w-3 h-3" />
                                {supplier.phone}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaEnvelope className="text-gray-400 w-3 h-3" />
                                {supplier.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(supplier.status)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900">{supplier.teaType}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900">
                              {supplier.lastSupply ? new Date(supplier.lastSupply).toLocaleDateString() : 'Never'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => navigate(`/suppliers/details/${supplier.id}`)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <FaEye />
                              </button>
                              <button
                                onClick={() => navigate(`/suppliers/edit/${supplier.id}`)}
                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                title="Edit Supplier"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteSupplier(supplier)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete Supplier"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        Showing {indexOfFirstSupplier + 1} to {Math.min(indexOfLastSupplier, filteredSuppliers.length)} of {filteredSuppliers.length} suppliers
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-green-600 text-white border-green-600'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete supplier "{supplierToDelete?.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/navigationBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  FaBell, 
  FaUsers, 
  FaBoxOpen, 
  FaExclamationTriangle, 
  FaPlus, 
  FaFileAlt, 
  FaHome, 
  FaWarehouse, 
  FaTruck,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaCog,
  FaExpand,
  FaEye,
  FaChartBar,
  FaMoneyBillWave,
  FaLeaf,
  FaUserCircle,
  FaUser,
  FaShieldAlt,
  FaUserShield,
  FaKey,
  FaDatabase,
  FaClipboardList,
  FaIndustry,
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaTimes, 
  FaSave, 
  FaUndo,
  FaLock,
  FaUnlock,
  FaUserEdit,
  FaUserTimes,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUserPlus,
  FaDownload,
  FaUpload,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaDotCircle,
  FaCircle
} from 'react-icons/fa';
import { MdDashboard, MdTrendingUp, MdTrendingDown, MdSecurity, MdAdminPanelSettings } from 'react-icons/md';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@brewops.com',
      phone: '+94 71 234 5678',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2024-08-31 09:30:00',
      createdAt: '2024-01-15',
      department: 'Administration',
      avatar: null,
      permissions: ['all'],
      loginCount: 156,
      location: 'Colombo, Sri Lanka'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@brewops.com',
      phone: '+94 71 234 5679',
      role: 'Production Manager',
      status: 'Active',
      lastLogin: '2024-08-31 08:15:00',
      createdAt: '2024-02-10',
      department: 'Production',
      avatar: null,
      permissions: ['production', 'inventory'],
      loginCount: 89,
      location: 'Kandy, Sri Lanka'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@brewops.com',
      phone: '+94 71 234 5680',
      role: 'Quality Control',
      status: 'Active',
      lastLogin: '2024-08-30 16:45:00',
      createdAt: '2024-03-01',
      department: 'Quality Assurance',
      avatar: null,
      permissions: ['quality', 'reports'],
      loginCount: 67,
      location: 'Nuwara Eliya, Sri Lanka'
    },
    {
      id: 4,
      name: 'Lisa Chen',
      email: 'lisa.chen@supplier.com',
      phone: '+94 71 234 5681',
      role: 'Supplier',
      status: 'Inactive',
      lastLogin: '2024-08-29 14:20:00',
      createdAt: '2024-03-15',
      department: 'External',
      avatar: null,
      permissions: ['supplier_portal'],
      loginCount: 23,
      location: 'Galle, Sri Lanka'
    },
    {
      id: 5,
      name: 'David Kumar',
      email: 'david.kumar@brewops.com',
      phone: '+94 71 234 5682',
      role: 'Viewer',
      status: 'Active',
      lastLogin: '2024-08-31 07:00:00',
      createdAt: '2024-04-20',
      department: 'Finance',
      avatar: null,
      permissions: ['view_only'],
      loginCount: 34,
      location: 'Colombo, Sri Lanka'
    },
    {
      id: 6,
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@brewops.com',
      phone: '+94 71 234 5683',
      role: 'Production Manager',
      status: 'Pending',
      lastLogin: null,
      createdAt: '2024-08-30',
      department: 'Production',
      avatar: null,
      permissions: ['production'],
      loginCount: 0,
      location: 'Matale, Sri Lanka'
    }
  ]);

  // Available roles
  const roles = [
    'Super Admin',
    'Production Manager', 
    'Quality Control',
    'Supplier',
    'Viewer',
    'Finance Manager',
    'HR Manager'
  ];

  // Dashboard stats
  const [dashboardData, setDashboardData] = useState({
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    totalRoles: 5,
    systemHealth: 98.5,
    securityAlerts: 3,
    dataBackups: 7,
    systemUptime: 99.8,
    pendingApprovals: users.filter(u => u.status === 'Pending').length
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Viewer',
    department: '',
    location: '',
    status: 'Active'
  });

  // User management functions
  const handleCreateUser = () => {
    if (newUser.name && newUser.email && newUser.phone) {
      const user = {
        id: Date.now(),
        ...newUser,
        lastLogin: null,
        createdAt: new Date().toISOString().split('T')[0],
        avatar: null,
        permissions: getRolePermissions(newUser.role),
        loginCount: 0,
        status: 'Pending'
      };
      setUsers([...users, user]);
      setNewUser({
        name: '',
        email: '',
        phone: '',
        role: 'Viewer',
        department: '',
        location: '',
        status: 'Active'
      });
      setShowCreateUser(false);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
      location: user.location,
      status: user.status
    });
    setShowEditUser(true);
  };

  const handleUpdateUser = () => {
    if (selectedUser && newUser.name && newUser.email) {
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...newUser, permissions: getRolePermissions(newUser.role) }
          : user
      );
      setUsers(updatedUsers);
      setShowEditUser(false);
      setSelectedUser(null);
      setNewUser({
        name: '',
        email: '',
        phone: '',
        role: 'Viewer',
        department: '',
        location: '',
        status: 'Active'
      });
    }
  };

  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user && window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleToggleUserStatus = (userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    );
    setUsers(updatedUsers);
  };

  const getRolePermissions = (role) => {
    const rolePermissions = {
      'Super Admin': ['all'],
      'Production Manager': ['production', 'inventory', 'reports'],
      'Quality Control': ['quality', 'reports'],
      'Supplier': ['supplier_portal'],
      'Viewer': ['view_only'],
      'Finance Manager': ['finance', 'reports'],
      'HR Manager': ['hr', 'users']
    };
    return rolePermissions[role] || ['view_only'];
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      'Super Admin': 'bg-red-100 text-red-800 border-red-200',
      'Production Manager': 'bg-blue-100 text-blue-800 border-blue-200',
      'Quality Control': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Supplier': 'bg-green-100 text-green-800 border-green-200',
      'Viewer': 'bg-gray-100 text-gray-800 border-gray-200',
      'Finance Manager': 'bg-purple-100 text-purple-800 border-purple-200',
      'HR Manager': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />;
  };

  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const UserCard = ({ user }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <FaUserCircle className="text-white text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditUser(user)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit User"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleToggleUserStatus(user.id)}
            className={`p-2 rounded-lg transition-colors ${
              user.status === 'Active' 
                ? 'text-orange-600 hover:bg-orange-50' 
                : 'text-green-600 hover:bg-green-50'
            }`}
            title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
          >
            {user.status === 'Active' ? <FaLock /> : <FaUnlock />}
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete User"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Role:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Department:</span>
          <span className="font-medium">{user.department}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Location:</span>
          <span className="text-gray-800">{user.location}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Login Count: {user.loginCount}</span>
          <span>Joined: {user.createdAt}</span>
        </div>
        {user.lastLogin && (
          <div className="mt-1 text-xs text-gray-500">
            Last Login: {new Date(user.lastLogin).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );

  const UserTable = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>User</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center space-x-1">
                  <span>Role</span>
                  {getSortIcon('role')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('department')}
              >
                <div className="flex items-center space-x-1">
                  <span>Department</span>
                  {getSortIcon('department')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastLogin')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Login</span>
                  {getSortIcon('lastLogin')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <FaUserCircle className="text-white text-lg" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status === 'Active' && <FaDotCircle className="mr-1" />}
                    {user.status === 'Inactive' && <FaCircle className="mr-1" />}
                    {user.status === 'Pending' && <FaCog className="mr-1" />}
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-700" 
                      title="Edit User"
                    >
                      <FaUserEdit />
                    </button>
                    <button 
                      onClick={() => handleToggleUserStatus(user.id)}
                      className={user.status === 'Active' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                      title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    >
                      {user.status === 'Active' ? <FaLock /> : <FaUnlock />}
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700" 
                      title="Delete User"
                    >
                      <FaUserTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Global Navigation */}
      <NavigationBar />

      <div className="flex">
        {/* Enhanced Modern Admin Sidebar */}
        <div className="w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-r border-gray-700">
          <div className="p-6">
            {/* Admin Profile Section */}
            <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <FaUserShield className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Admin Portal</h3>
                <p className="text-gray-400 text-sm">User Management</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2 mb-4">
                Administration
              </h4>
              
              <Link 
                to="/admin" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                <MdDashboard className="text-xl" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/userManagement" 
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 text-white shadow-md"
              >
                <FaUsers className="text-xl" />
                <span className="font-medium">User Management</span>
              </Link>
              
              <Link 
                to="/rolePermissions" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                <FaShieldAlt className="text-xl" />
                <span>Role & Permissions</span>
              </Link>
              
              <Link 
                to="/systemSecurity" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                <MdSecurity className="text-xl" />
                <span>System Security</span>
              </Link>
              
              <Link 
                to="/backupRecovery" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                <FaDatabase className="text-xl" />
                <span>Backup and Recovery</span>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2 mb-4">
                Quick Actions
              </h4>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowCreateUser(true)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
                >
                  <FaPlus className="text-lg" />
                  <span className="font-medium">Create User</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg">
                  <FaDownload className="text-lg" />
                  <span className="font-medium">Export Users</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg">
                  <FaUpload className="text-lg" />
                  <span className="font-medium">Bulk Import</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className="mt-8 space-y-4">
              <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2">
                User Stats
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Users</p>
                      <p className="text-white text-2xl font-bold">{dashboardData.totalUsers}</p>
                    </div>
                    <FaUsers className="text-blue-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Active Users</p>
                      <p className="text-white text-2xl font-bold">{dashboardData.activeUsers}</p>
                    </div>
                    <FaUserCircle className="text-green-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Pending</p>
                      <p className="text-white text-2xl font-bold">{dashboardData.pendingApprovals}</p>
                    </div>
                    <FaExclamationTriangle className="text-orange-200 text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
              <p className="text-gray-600">Manage system users, roles, and permissions</p>
            </div>
            
            <button
              onClick={() => setShowCreateUser(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <FaPlus />
              <span>Add User</span>
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('table')}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'table' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Table View
                </button>
                <button
                  onClick={() => setActiveTab('cards')}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'cards' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Card View
                </button>
              </div>
            </div>
          </div>

          {/* Content based on active view */}
          {activeTab === 'table' ? (
            <UserTable />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}

          {/* No results message */}
          {filteredAndSortedUsers.length === 0 && (
            <div className="text-center py-12">
              <FaUsers className="mx-auto text-gray-400 text-6xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit User Modal */}
      {(showCreateUser || showEditUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {showEditUser ? 'Edit User' : 'Create New User'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateUser(false);
                    setShowEditUser(false);
                    setSelectedUser(null);
                    setNewUser({
                      name: '',
                      email: '',
                      phone: '',
                      role: 'Viewer',
                      department: '',
                      location: '',
                      status: 'Active'
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="+94 71 234 5678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    placeholder="Enter department"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.location}
                    onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </div>
                
                {showEditUser && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newUser.status}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCreateUser(false);
                    setShowEditUser(false);
                    setSelectedUser(null);
                    setNewUser({
                      name: '',
                      email: '',
                      phone: '',
                      role: 'Viewer',
                      department: '',
                      location: '',
                      status: 'Active'
                    });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={showEditUser ? handleUpdateUser : handleCreateUser}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <FaSave />
                  <span>{showEditUser ? 'Update User' : 'Create User'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserManagement;

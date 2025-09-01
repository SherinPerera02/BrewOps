import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/navigationBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaShieldAlt, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaUserShield, 
  FaKey, 
  FaDatabase, 
  FaEye, 
  FaCheck, 
  FaTimes, 
  FaCog, 
  FaSave, 
  FaUndo,
  FaExclamationTriangle,
  FaClipboardList,
  FaUserCircle,
  FaLock,
  FaUnlock,
  FaUserEdit,
  FaUserTimes
} from 'react-icons/fa';
import { MdDashboard, MdSecurity, MdAdminPanelSettings } from 'react-icons/md';

const RolePermissions = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);

  // Sample roles data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      userCount: 2,
      permissions: ['read', 'write', 'delete', 'admin', 'manage_users', 'manage_roles', 'system_config'],
      color: 'red',
      isSystem: true,
      createdAt: '2024-01-15',
      lastModified: '2024-08-20'
    },
    {
      id: 2,
      name: 'Production Manager',
      description: 'Manages production operations and inventory',
      userCount: 5,
      permissions: ['read', 'write', 'manage_inventory', 'view_reports', 'manage_production'],
      color: 'blue',
      isSystem: false,
      createdAt: '2024-02-10',
      lastModified: '2024-08-15'
    },
    {
      id: 3,
      name: 'Supplier',
      description: 'Access to supplier portal and transactions',
      userCount: 18,
      permissions: ['read', 'submit_supplies', 'view_payments', 'update_profile'],
      color: 'green',
      isSystem: false,
      createdAt: '2024-02-20',
      lastModified: '2024-08-10'
    },
    {
      id: 4,
      name: 'Quality Control',
      description: 'Quality assurance and testing permissions',
      userCount: 3,
      permissions: ['read', 'write', 'quality_testing', 'view_reports', 'approve_quality'],
      color: 'yellow',
      isSystem: false,
      createdAt: '2024-03-01',
      lastModified: '2024-08-05'
    },
    {
      id: 5,
      name: 'Viewer',
      description: 'Read-only access to system data',
      userCount: 8,
      permissions: ['read', 'view_reports'],
      color: 'gray',
      isSystem: false,
      createdAt: '2024-03-15',
      lastModified: '2024-07-30'
    }
  ]);

  // Available permissions
  const availablePermissions = [
    { id: 'read', name: 'Read Access', description: 'View system data and reports', category: 'Basic' },
    { id: 'write', name: 'Write Access', description: 'Create and modify records', category: 'Basic' },
    { id: 'delete', name: 'Delete Access', description: 'Remove records from system', category: 'Basic' },
    { id: 'admin', name: 'Admin Access', description: 'Administrative functions', category: 'Admin' },
    { id: 'manage_users', name: 'User Management', description: 'Create, edit, and manage users', category: 'Admin' },
    { id: 'manage_roles', name: 'Role Management', description: 'Create and modify roles', category: 'Admin' },
    { id: 'system_config', name: 'System Configuration', description: 'Configure system settings', category: 'Admin' },
    { id: 'manage_inventory', name: 'Inventory Management', description: 'Manage inventory and stock', category: 'Operations' },
    { id: 'manage_production', name: 'Production Management', description: 'Oversee production processes', category: 'Operations' },
    { id: 'submit_supplies', name: 'Submit Supplies', description: 'Submit supply deliveries', category: 'Supplier' },
    { id: 'view_payments', name: 'View Payments', description: 'Access payment information', category: 'Financial' },
    { id: 'quality_testing', name: 'Quality Testing', description: 'Perform quality assessments', category: 'Quality' },
    { id: 'approve_quality', name: 'Quality Approval', description: 'Approve quality test results', category: 'Quality' },
    { id: 'view_reports', name: 'View Reports', description: 'Access system reports', category: 'Reports' },
    { id: 'update_profile', name: 'Update Profile', description: 'Modify own profile information', category: 'Personal' }
  ];

  // Permission categories
  const permissionCategories = ['Basic', 'Admin', 'Operations', 'Supplier', 'Financial', 'Quality', 'Reports', 'Personal'];

  // Sample users with roles
  const [usersWithRoles, setUsersWithRoles] = useState([
    { id: 1, name: 'John Doe', email: 'john@brewops.com', role: 'Super Admin', status: 'Active', lastLogin: '2024-08-31 09:30' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@brewops.com', role: 'Production Manager', status: 'Active', lastLogin: '2024-08-31 08:15' },
    { id: 3, name: 'Mike Johnson', email: 'mike@brewops.com', role: 'Quality Control', status: 'Active', lastLogin: '2024-08-30 16:45' },
    { id: 4, name: 'Lisa Chen', email: 'lisa@brewops.com', role: 'Supplier', status: 'Inactive', lastLogin: '2024-08-29 14:20' },
    { id: 5, name: 'David Kumar', email: 'david@brewops.com', role: 'Viewer', status: 'Active', lastLogin: '2024-08-31 07:00' }
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    color: 'blue',
    permissions: []
  });

  // Role creation/editing functions
  const handleCreateRole = () => {
    if (newRole.name && newRole.description) {
      const role = {
        id: Date.now(),
        ...newRole,
        userCount: 0,
        isSystem: false,
        createdAt: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', color: 'blue', permissions: [] });
      setShowCreateRole(false);
    }
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      color: role.color,
      permissions: [...role.permissions]
    });
    setShowEditRole(true);
  };

  const handleUpdateRole = () => {
    if (selectedRole && newRole.name && newRole.description) {
      const updatedRoles = roles.map(role => 
        role.id === selectedRole.id 
          ? { ...role, ...newRole, lastModified: new Date().toISOString().split('T')[0] }
          : role
      );
      setRoles(updatedRoles);
      setShowEditRole(false);
      setSelectedRole(null);
      setNewRole({ name: '', description: '', color: 'blue', permissions: [] });
    }
  };

  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (role && !role.isSystem && window.confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
      setRoles(roles.filter(r => r.id !== roleId));
    }
  };

  const togglePermission = (permissionId) => {
    const updatedPermissions = newRole.permissions.includes(permissionId)
      ? newRole.permissions.filter(p => p !== permissionId)
      : [...newRole.permissions, permissionId];
    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  const getRoleColor = (color) => {
    const colors = {
      red: 'bg-red-100 text-red-800 border-red-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[color] || colors.blue;
  };

  const RoleCard = ({ role }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${role.color === 'red' ? 'border-red-500' : role.color === 'blue' ? 'border-blue-500' : role.color === 'green' ? 'border-green-500' : role.color === 'yellow' ? 'border-yellow-500' : 'border-gray-500'} hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getRoleColor(role.color)}`}>
            <FaShieldAlt className="text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{role.name}</h3>
            {role.isSystem && (
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                System Role
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditRole(role)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Role"
          >
            <FaEdit />
          </button>
          {!role.isSystem && (
            <button
              onClick={() => handleDeleteRole(role.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Role"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{role.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>{role.userCount} users assigned</span>
        <span>Modified: {role.lastModified}</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {role.permissions.slice(0, 3).map(permission => (
          <span key={permission} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {availablePermissions.find(p => p.id === permission)?.name || permission}
          </span>
        ))}
        {role.permissions.length > 3 && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            +{role.permissions.length - 3} more
          </span>
        )}
      </div>
    </div>
  );

  const PermissionMatrix = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Permission Matrix</h3>
        <button
          onClick={() => setShowPermissionMatrix(!showPermissionMatrix)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          {showPermissionMatrix ? 'Hide Matrix' : 'Show Matrix'}
        </button>
      </div>
      
      {showPermissionMatrix && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Permission</th>
                {roles.map(role => (
                  <th key={role.id} className="text-center py-3 px-2 font-semibold text-gray-700 min-w-[120px]">
                    <div className={`p-2 rounded-lg ${getRoleColor(role.color)} text-xs`}>
                      {role.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionCategories.map(category => (
                <React.Fragment key={category}>
                  <tr className="bg-gray-50">
                    <td colSpan={roles.length + 1} className="py-2 px-4 font-semibold text-gray-600 text-sm">
                      {category}
                    </td>
                  </tr>
                  {availablePermissions
                    .filter(permission => permission.category === category)
                    .map(permission => (
                      <tr key={permission.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{permission.name}</p>
                            <p className="text-sm text-gray-500">{permission.description}</p>
                          </div>
                        </td>
                        {roles.map(role => (
                          <td key={role.id} className="text-center py-3 px-2">
                            {role.permissions.includes(permission.id) ? (
                              <FaCheck className="text-green-600 mx-auto" />
                            ) : (
                              <FaTimes className="text-red-400 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const UserRoleTable = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">User Role Assignments</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersWithRoles
              .filter(user => 
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(user => (
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(roles.find(r => r.name === user.role)?.color || 'gray')}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'Active' ? <FaUnlock className="mr-1" /> : <FaLock className="mr-1" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700" title="Edit User">
                        <FaUserEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-700" title="Remove User">
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
                <p className="text-gray-400 text-sm">Role & Permissions</p>
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
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                <FaUsers className="text-xl" />
                <span>User Management</span>
              </Link>
              
              <Link 
                to="/admin/role-permissions" 
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 text-white shadow-md"
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

            {/* Quick Stats */}
            <div className="mt-8 space-y-4">
              <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2">
                Role Stats
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Roles</p>
                      <p className="text-white text-2xl font-bold">{roles.length}</p>
                    </div>
                    <FaShieldAlt className="text-blue-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Active Users</p>
                      <p className="text-white text-2xl font-bold">{usersWithRoles.filter(u => u.status === 'Active').length}</p>
                    </div>
                    <FaUsers className="text-green-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Permissions</p>
                      <p className="text-white text-2xl font-bold">{availablePermissions.length}</p>
                    </div>
                    <FaKey className="text-purple-200 text-2xl" />
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Role & Permissions Management</h1>
              <p className="text-gray-600">Manage user roles and access permissions</p>
            </div>
            
            <button
              onClick={() => setShowCreateRole(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <FaPlus />
              <span>Create Role</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('roles')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'roles' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Roles Overview
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'permissions' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Permission Matrix
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'users' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              User Assignments
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'roles' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {roles.map(role => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          )}

          {activeTab === 'permissions' && <PermissionMatrix />}

          {activeTab === 'users' && <UserRoleTable />}
        </div>
      </div>

      {/* Create/Edit Role Modal */}
      {(showCreateRole || showEditRole) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {showEditRole ? 'Edit Role' : 'Create New Role'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateRole(false);
                    setShowEditRole(false);
                    setSelectedRole(null);
                    setNewRole({ name: '', description: '', color: 'blue', permissions: [] });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Role Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Role Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={newRole.name}
                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                        placeholder="Enter role name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        value={newRole.description}
                        onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                        placeholder="Describe the role responsibilities"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                      <div className="flex space-x-2">
                        {['blue', 'green', 'yellow', 'purple', 'red', 'gray'].map(color => (
                          <button
                            key={color}
                            onClick={() => setNewRole({ ...newRole, color })}
                            className={`w-8 h-8 rounded-full border-2 ${
                              newRole.color === color ? 'border-gray-800' : 'border-gray-300'
                            } ${
                              color === 'blue' ? 'bg-blue-500' :
                              color === 'green' ? 'bg-green-500' :
                              color === 'yellow' ? 'bg-yellow-500' :
                              color === 'purple' ? 'bg-purple-500' :
                              color === 'red' ? 'bg-red-500' : 'bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Permissions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Permissions</h3>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {permissionCategories.map(category => (
                      <div key={category}>
                        <h4 className="font-medium text-gray-700 mb-2 bg-gray-50 px-3 py-2 rounded-lg">
                          {category}
                        </h4>
                        <div className="space-y-2 ml-4">
                          {availablePermissions
                            .filter(permission => permission.category === category)
                            .map(permission => (
                              <label key={permission.id} className="flex items-start space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                <input
                                  type="checkbox"
                                  checked={newRole.permissions.includes(permission.id)}
                                  onChange={() => togglePermission(permission.id)}
                                  className="mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div>
                                  <p className="font-medium text-gray-800">{permission.name}</p>
                                  <p className="text-sm text-gray-500">{permission.description}</p>
                                </div>
                              </label>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCreateRole(false);
                    setShowEditRole(false);
                    setSelectedRole(null);
                    setNewRole({ name: '', description: '', color: 'blue', permissions: [] });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={showEditRole ? handleUpdateRole : handleCreateRole}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <FaSave />
                  <span>{showEditRole ? 'Update Role' : 'Create Role'}</span>
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

export default RolePermissions;

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
  FaDownload,
  FaUpload,
  FaSync,
  FaCloud,
  FaServer,
  FaHdd,
  FaCloudDownloadAlt,
  FaCloudUploadAlt,
  FaCheck,
  FaTimes,
  FaClock,
  FaPlay,
  FaPause,
  FaStop,
  FaHistory,
  FaCalendarAlt,
  FaArchive,
  FaTrash,
  FaEdit,
  FaSave,
  FaUndo,
  FaRedo,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaWifi,
  FaMobile,
  FaDesktop,
  FaLaptop,
  FaTablet,
  FaGlobe
} from 'react-icons/fa';
import { MdDashboard, MdTrendingUp, MdTrendingDown, MdSecurity, MdAdminPanelSettings, MdBackup, MdRestore } from 'react-icons/md';
import { LineChart, BarChart, PieChart, AreaChart, Line, Bar, Pie, Area, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BackupAndRecovery = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);

  // Backup statistics
  const [backupStats, setBackupStats] = useState({
    totalBackups: 156,
    successfulBackups: 152,
    failedBackups: 4,
    lastBackup: '2025-08-31 03:00:00',
    totalStorageUsed: '2.4 TB',
    availableStorage: '5.6 TB',
    backupSuccess: 97.4,
    averageBackupTime: '45 minutes'
  });

  // Backup history data
  const [backupHistory, setBackupHistory] = useState([
    {
      id: 1,
      name: 'Daily_Backup_2025-08-31',
      type: 'Full',
      status: 'Completed',
      size: '156 GB',
      duration: '42 min',
      timestamp: '2025-08-31 03:00:00',
      location: 'Cloud Storage',
      retention: '30 days',
      components: ['Database', 'Files', 'Configuration'],
      progress: 100
    },
    {
      id: 2,
      name: 'Incremental_Backup_2025-08-30',
      type: 'Incremental',
      status: 'Completed',
      size: '12 GB',
      duration: '8 min',
      timestamp: '2025-08-30 15:30:00',
      location: 'Local Storage',
      retention: '7 days',
      components: ['Database', 'User Files'],
      progress: 100
    },
    {
      id: 3,
      name: 'Weekly_Archive_2025-08-25',
      type: 'Archive',
      status: 'Completed',
      size: '1.2 TB',
      duration: '3h 15min',
      timestamp: '2025-08-25 01:00:00',
      location: 'Offsite Storage',
      retention: '365 days',
      components: ['Full System', 'Historical Data'],
      progress: 100
    },
    {
      id: 4,
      name: 'Emergency_Backup_2025-08-29',
      type: 'Manual',
      status: 'Failed',
      size: '0 GB',
      duration: '5 min',
      timestamp: '2025-08-29 14:45:00',
      location: 'Cloud Storage',
      retention: '30 days',
      components: ['Database'],
      progress: 0,
      error: 'Network connection timeout'
    },
    {
      id: 5,
      name: 'System_Backup_2025-08-28',
      type: 'Differential',
      status: 'In Progress',
      size: '45 GB',
      duration: '25 min',
      timestamp: '2025-08-28 20:00:00',
      location: 'Cloud Storage',
      retention: '14 days',
      components: ['Database', 'Configuration'],
      progress: 75
    }
  ]);

  // Backup schedule data
  const [backupSchedules, setBackupSchedules] = useState([
    {
      id: 1,
      name: 'Daily Production Backup',
      type: 'Full',
      frequency: 'Daily',
      time: '03:00',
      enabled: true,
      nextRun: '2025-09-01 03:00:00',
      retention: '30 days',
      storage: 'Cloud Storage',
      components: ['Database', 'Files', 'Configuration']
    },
    {
      id: 2,
      name: 'Hourly Incremental',
      type: 'Incremental',
      frequency: 'Hourly',
      time: 'Every hour',
      enabled: true,
      nextRun: '2025-08-31 14:00:00',
      retention: '7 days',
      storage: 'Local Storage',
      components: ['Database']
    },
    {
      id: 3,
      name: 'Weekly Archive',
      type: 'Archive',
      frequency: 'Weekly',
      time: 'Sunday 01:00',
      enabled: true,
      nextRun: '2025-09-01 01:00:00',
      retention: '365 days',
      storage: 'Offsite Storage',
      components: ['Full System', 'Historical Data']
    },
    {
      id: 4,
      name: 'Monthly Compliance Backup',
      type: 'Full',
      frequency: 'Monthly',
      time: '1st day 02:00',
      enabled: false,
      nextRun: '2025-09-01 02:00:00',
      retention: '2 years',
      storage: 'Compliance Storage',
      components: ['Full System', 'Audit Logs']
    }
  ]);

  // Storage locations
  const storageLocations = [
    {
      id: 1,
      name: 'Primary Cloud Storage',
      type: 'Cloud',
      provider: 'AWS S3',
      capacity: '10 TB',
      used: '2.4 TB',
      available: '7.6 TB',
      status: 'Online',
      lastSync: '2025-08-31 03:00:00'
    },
    {
      id: 2,
      name: 'Local NAS Server',
      type: 'Local',
      provider: 'Synology DS920+',
      capacity: '8 TB',
      used: '1.8 TB',
      available: '6.2 TB',
      status: 'Online',
      lastSync: '2025-08-31 02:30:00'
    },
    {
      id: 3,
      name: 'Offsite Data Center',
      type: 'Offsite',
      provider: 'SLT Data Center',
      capacity: '20 TB',
      used: '5.2 TB',
      available: '14.8 TB',
      status: 'Online',
      lastSync: '2025-08-30 23:45:00'
    },
    {
      id: 4,
      name: 'Compliance Archive',
      type: 'Archive',
      provider: 'Glacier Deep Archive',
      capacity: '50 TB',
      used: '12.5 TB',
      available: '37.5 TB',
      status: 'Online',
      lastSync: '2025-08-25 01:00:00'
    }
  ];

  // Backup trends data
  const backupTrends = [
    { date: '2025-08-24', successful: 24, failed: 0, size: 180 },
    { date: '2025-08-25', successful: 23, failed: 1, size: 1200 },
    { date: '2025-08-26', successful: 24, failed: 0, size: 190 },
    { date: '2025-08-27', successful: 24, failed: 0, size: 185 },
    { date: '2025-08-28', successful: 23, failed: 1, size: 175 },
    { date: '2025-08-29', successful: 22, failed: 2, size: 170 },
    { date: '2025-08-30', successful: 24, failed: 0, size: 195 },
  ];

  // Recovery testing data
  const [recoveryTests, setRecoveryTests] = useState([
    {
      id: 1,
      name: 'Database Recovery Test',
      lastTest: '2025-08-28 10:00:00',
      status: 'Passed',
      duration: '15 minutes',
      dataIntegrity: 100,
      nextTest: '2025-09-04 10:00:00'
    },
    {
      id: 2,
      name: 'File System Recovery Test',
      lastTest: '2025-08-25 14:30:00',
      status: 'Passed',
      duration: '32 minutes',
      dataIntegrity: 99.8,
      nextTest: '2025-09-01 14:30:00'
    },
    {
      id: 3,
      name: 'Full System Recovery Test',
      lastTest: '2025-08-20 02:00:00',
      status: 'Warning',
      duration: '2h 45min',
      dataIntegrity: 97.5,
      nextTest: '2025-09-03 02:00:00',
      issues: 'Minor configuration drift detected'
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({
    name: '',
    type: 'Full',
    frequency: 'Daily',
    time: '03:00',
    retention: '30',
    storage: 'Cloud Storage',
    components: []
  });

  // Utility functions
  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      const newBackup = {
        id: Date.now(),
        name: `Manual_Backup_${new Date().toISOString().split('T')[0]}`,
        type: 'Manual',
        status: 'In Progress',
        size: '0 GB',
        duration: '0 min',
        timestamp: new Date().toISOString(),
        location: 'Cloud Storage',
        retention: '30 days',
        components: ['Database', 'Files'],
        progress: 0
      };
      setBackupHistory([newBackup, ...backupHistory]);
      setIsCreatingBackup(false);
    }, 3000);
  };

  const handleRestoreBackup = (backup) => {
    setSelectedBackup(backup);
    setShowRestoreModal(true);
  };

  const handleScheduleBackup = () => {
    if (newSchedule.name && newSchedule.components.length > 0) {
      const schedule = {
        id: Date.now(),
        ...newSchedule,
        enabled: true,
        nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        retention: `${newSchedule.retention} days`
      };
      setBackupSchedules([...backupSchedules, schedule]);
      setNewSchedule({
        name: '',
        type: 'Full',
        frequency: 'Daily',
        time: '03:00',
        retention: '30',
        storage: 'Cloud Storage',
        components: []
      });
      setShowScheduleModal(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <FaCheckCircle className="text-green-500" />;
      case 'Failed': return <FaTimesCircle className="text-red-500" />;
      case 'In Progress': return <FaSpinner className="text-blue-500 animate-spin" />;
      case 'Pending': return <FaClock className="text-yellow-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const BackupCard = ({ title, value, icon: Icon, color, subtitle, trend, trendValue }) => (
    <div className={`${color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 rounded-lg">
            <Icon className="text-2xl text-white" />
          </div>
          <div>
            <h3 className="text-white/80 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
            {trend === 'up' ? <MdTrendingUp /> : <MdTrendingDown />}
            <span className="text-sm font-medium">{trendValue}%</span>
          </div>
        )}
      </div>
      {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
    </div>
  );

  const StorageCard = ({ storage }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${
            storage.type === 'Cloud' ? 'bg-blue-100 text-blue-600' :
            storage.type === 'Local' ? 'bg-green-100 text-green-600' :
            storage.type === 'Offsite' ? 'bg-purple-100 text-purple-600' :
            'bg-orange-100 text-orange-600'
          }`}>
            {storage.type === 'Cloud' ? <FaCloud /> :
             storage.type === 'Local' ? <FaServer /> :
             storage.type === 'Offsite' ? <FaGlobe /> :
             <FaArchive />}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{storage.name}</h4>
            <p className="text-sm text-gray-500">{storage.provider}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          storage.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {storage.status}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Storage Usage</span>
            <span className="font-medium">{storage.used} / {storage.capacity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(parseFloat(storage.used) / parseFloat(storage.capacity)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Available:</span>
          <span className="font-medium text-green-600">{storage.available}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Last Sync:</span>
          <span className="text-gray-800">{new Date(storage.lastSync).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  const BackupHistoryTable = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Backup History</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search backups..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button
              onClick={handleCreateBackup}
              disabled={isCreatingBackup}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              {isCreatingBackup ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              <span>{isCreatingBackup ? 'Creating...' : 'Create Backup'}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size & Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {backupHistory.map(backup => (
              <tr key={backup.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                    <div className="text-sm text-gray-500">{backup.type} Backup</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(backup.status)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(backup.status)}`}>
                      {backup.status}
                    </span>
                  </div>
                  {backup.status === 'In Progress' && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${backup.progress}%` }}
                      ></div>
                    </div>
                  )}
                  {backup.error && (
                    <div className="mt-1 text-xs text-red-600">{backup.error}</div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>{backup.size}</div>
                  <div className="text-gray-500">{backup.duration}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{backup.location}</div>
                  <div className="text-xs text-gray-500">Retain: {backup.retention}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(backup.timestamp).toLocaleDateString()}
                  <div className="text-xs">
                    {new Date(backup.timestamp).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    {backup.status === 'Completed' && (
                      <>
                        <button 
                          onClick={() => handleRestoreBackup(backup)}
                          className="text-green-600 hover:text-green-700" 
                          title="Restore"
                        >
                          <MdRestore />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700" title="Download">
                          <FaDownload />
                        </button>
                      </>
                    )}
                    <button className="text-gray-600 hover:text-gray-700" title="View Details">
                      <FaEye />
                    </button>
                    <button className="text-red-600 hover:text-red-700" title="Delete">
                      <FaTrash />
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
                <p className="text-gray-400 text-sm">Backup & Recovery</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2 mb-4">
                Administration
              </h4>
              
              <Link 
                to="/admin-dashboard" 
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
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 text-white shadow-md"
              >
                <FaDatabase className="text-xl" />
                <span className="font-medium">Backup & Recovery</span>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2 mb-4">
                Backup Actions
              </h4>
              
              <div className="space-y-3">
                <button 
                  onClick={handleCreateBackup}
                  disabled={isCreatingBackup}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg disabled:opacity-50"
                >
                  {isCreatingBackup ? <FaSpinner className="animate-spin text-lg" /> : <MdBackup className="text-lg" />}
                  <span className="font-medium">{isCreatingBackup ? 'Creating...' : 'Create Backup'}</span>
                </button>
                
                <button 
                  onClick={() => setShowScheduleModal(true)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                >
                  <FaCalendarAlt className="text-lg" />
                  <span className="font-medium">Schedule Backup</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg">
                  <MdRestore className="text-lg" />
                  <span className="font-medium">Restore Data</span>
                </button>
              </div>
            </div>

            {/* Backup Stats Section */}
            <div className="mt-8 space-y-4">
              <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2">
                Backup Stats
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Success Rate</p>
                      <p className="text-white text-2xl font-bold">{backupStats.backupSuccess}%</p>
                    </div>
                    <FaCheckCircle className="text-green-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Backups</p>
                      <p className="text-white text-2xl font-bold">{backupStats.totalBackups}</p>
                    </div>
                    <FaDatabase className="text-blue-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Storage Used</p>
                      <p className="text-white text-2xl font-bold">{backupStats.totalStorageUsed}</p>
                    </div>
                    <FaHdd className="text-purple-200 text-2xl" />
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Backup & Recovery</h1>
              <p className="text-gray-600">Comprehensive data protection and disaster recovery management</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <button
                onClick={handleCreateBackup}
                disabled={isCreatingBackup}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 disabled:opacity-50"
              >
                {isCreatingBackup ? <FaSpinner className="animate-spin" /> : <FaPlus />}
                <span>{isCreatingBackup ? 'Creating Backup...' : 'Create Backup'}</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                activeTab === 'overview'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                activeTab === 'history'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Backup History
            </button>
            <button
              onClick={() => setActiveTab('schedules')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                activeTab === 'schedules'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Schedules
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                activeTab === 'storage'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Storage
            </button>
            <button
              onClick={() => setActiveTab('recovery')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                activeTab === 'recovery'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Recovery Testing
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Backup Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <BackupCard
                  title="Total Backups"
                  value={backupStats.totalBackups}
                  icon={FaDatabase}
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                  subtitle={`${backupStats.successfulBackups} successful`}
                  trend="up"
                  trendValue="8"
                />
                <BackupCard
                  title="Success Rate"
                  value={`${backupStats.backupSuccess}%`}
                  icon={FaCheckCircle}
                  color="bg-gradient-to-br from-green-500 to-green-600"
                  subtitle="Excellent reliability"
                  trend="up"
                  trendValue="2"
                />
                <BackupCard
                  title="Storage Used"
                  value={backupStats.totalStorageUsed}
                  icon={FaHdd}
                  color="bg-gradient-to-br from-purple-500 to-purple-600"
                  subtitle={`${backupStats.availableStorage} available`}
                />
                <BackupCard
                  title="Avg Backup Time"
                  value={backupStats.averageBackupTime}
                  icon={FaClock}
                  color="bg-gradient-to-br from-orange-500 to-orange-600"
                  subtitle="Within SLA"
                />
              </div>

              {/* Backup Trends Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Backup Trends</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaExpand className="text-gray-400" />
                    </button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={backupTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="successful" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Successful Backups" />
                    <Area type="monotone" dataKey="failed" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Failed Backups" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Backups */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Backups</h3>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {backupHistory.slice(0, 5).map(backup => (
                    <div key={backup.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(backup.status)}
                          <div>
                            <div className="font-medium text-gray-800">{backup.name}</div>
                            <div className="text-sm text-gray-500">{backup.type} • {backup.size} • {backup.duration}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{new Date(backup.timestamp).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">{backup.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <BackupHistoryTable />
          )}

          {/* Schedules Tab */}
          {activeTab === 'schedules' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Backup Schedules</h3>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>Add Schedule</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {backupSchedules.map(schedule => (
                  <div key={schedule.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          schedule.enabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <FaCalendarAlt />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{schedule.name}</h4>
                          <p className="text-sm text-gray-500">{schedule.type} Backup</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            const updatedSchedules = backupSchedules.map(s => 
                              s.id === schedule.id ? { ...s, enabled: !s.enabled } : s
                            );
                            setBackupSchedules(updatedSchedules);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            schedule.enabled ? 'text-green-600 hover:bg-green-50' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {schedule.enabled ? <FaPause /> : <FaPlay />}
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <FaEdit />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium">{schedule.frequency} at {schedule.time}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Storage:</span>
                        <span className="font-medium">{schedule.storage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Retention:</span>
                        <span className="font-medium">{schedule.retention}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Next Run:</span>
                        <span className="font-medium text-blue-600">{new Date(schedule.nextRun).toLocaleString()}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex flex-wrap gap-1">
                          {schedule.components.map(component => (
                            <span key={component} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {component}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Storage Tab */}
          {activeTab === 'storage' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Storage Locations</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <FaPlus />
                  <span>Add Storage</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {storageLocations.map(storage => (
                  <StorageCard key={storage.id} storage={storage} />
                ))}
              </div>
            </div>
          )}

          {/* Recovery Testing Tab */}
          {activeTab === 'recovery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Recovery Testing</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <FaPlay />
                  <span>Run Test</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {recoveryTests.map(test => (
                  <div key={test.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${
                          test.status === 'Passed' ? 'bg-green-100 text-green-600' :
                          test.status === 'Warning' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          <MdRestore className="text-xl" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{test.name}</h4>
                          <p className="text-sm text-gray-500">Last tested: {new Date(test.lastTest).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        test.status === 'Passed' ? 'bg-green-100 text-green-800' :
                        test.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {test.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-medium">{test.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Data Integrity</div>
                        <div className="font-medium">{test.dataIntegrity}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Next Test</div>
                        <div className="font-medium">{new Date(test.nextTest).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    {test.issues && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FaExclamationTriangle className="text-yellow-600" />
                          <span className="text-sm text-yellow-800">{test.issues}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Backup Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Schedule New Backup</h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newSchedule.name}
                    onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                    placeholder="Enter schedule name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Type</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newSchedule.type}
                    onChange={(e) => setNewSchedule({ ...newSchedule, type: e.target.value })}
                  >
                    <option value="Full">Full Backup</option>
                    <option value="Incremental">Incremental</option>
                    <option value="Differential">Differential</option>
                    <option value="Archive">Archive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newSchedule.frequency}
                    onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value })}
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Retention (days)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newSchedule.retention}
                    onChange={(e) => setNewSchedule({ ...newSchedule, retention: e.target.value })}
                    min="1"
                    max="3650"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newSchedule.storage}
                    onChange={(e) => setNewSchedule({ ...newSchedule, storage: e.target.value })}
                  >
                    <option value="Cloud Storage">Cloud Storage</option>
                    <option value="Local Storage">Local Storage</option>
                    <option value="Offsite Storage">Offsite Storage</option>
                    <option value="Compliance Storage">Compliance Storage</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Components to Backup</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Database', 'Files', 'Configuration', 'User Files', 'Historical Data', 'Audit Logs', 'Full System'].map(component => (
                    <label key={component} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={newSchedule.components.includes(component)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewSchedule({ ...newSchedule, components: [...newSchedule.components, component] });
                          } else {
                            setNewSchedule({ ...newSchedule, components: newSchedule.components.filter(c => c !== component) });
                          }
                        }}
                      />
                      <span className="text-sm text-gray-700">{component}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleBackup}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <FaSave />
                  <span>Create Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restore Modal */}
      {showRestoreModal && selectedBackup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Restore Backup</h2>
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">{selectedBackup.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Type: {selectedBackup.type}</div>
                  <div>Size: {selectedBackup.size}</div>
                  <div>Date: {new Date(selectedBackup.timestamp).toLocaleString()}</div>
                  <div>Location: {selectedBackup.location}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Restore Options</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="restoreOption" value="full" className="text-blue-600" defaultChecked />
                    <span className="text-sm">Full System Restore</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="restoreOption" value="selective" className="text-blue-600" />
                    <span className="text-sm">Selective Restore</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <FaExclamationTriangle className="text-yellow-600" />
                  <span className="text-sm text-yellow-800 font-medium">Warning</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  This operation will overwrite current data. Please ensure you have a recent backup before proceeding.
                </p>
              </div>
              
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle restore logic here
                    setShowRestoreModal(false);
                    setSelectedBackup(null);
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <MdRestore />
                  <span>Restore</span>
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

export default BackupAndRecovery;

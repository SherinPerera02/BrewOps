import React, { useState } from 'react';
import NavigationBar from '../components/navigationBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Key, 
  Lock, 
  Eye, 
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  History,
  Download,
  RotateCcw,
  Settings,
  Home,
  Server,
  Wifi,
  UserCheck,
  Database,
  Search,
  Filter,
  Bell,
  Calendar,
  Activity,
  Monitor,
  Zap,
  Globe,
  ShieldCheck
} from 'lucide-react';
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
  FaIndustry
} from 'react-icons/fa';
import { MdDashboard, MdTrendingUp, MdTrendingDown, MdSecurity, MdAdminPanelSettings } from 'react-icons/md';
import { LineChart, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, Area, AreaChart } from 'recharts';

const SystemSecurity = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // Security metrics and data
  const [securityMetrics, setSecurityMetrics] = useState({
    threatLevel: 'Low',
    activeThreats: 0,
    blockedAttempts: 23,
    lastScan: '2025-08-31 06:00',
    systemUptime: 99.8,
    secureConnections: 98.5,
    failedLogins: 5,
    suspiciousActivity: 2
  });

  // Security alerts data
  const [securityAlerts, setSecurityAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      severity: 'medium',
      title: 'Multiple failed login attempts',
      description: 'User account: production.user@maleesha.lk attempted 5 failed logins',
      timestamp: '2025-08-31 08:30:00',
      status: 'active',
      source: 'Authentication System'
    },
    {
      id: 2,
      type: 'info',
      severity: 'low',
      title: 'Scheduled security scan completed',
      description: 'Daily automated security scan completed successfully with no threats detected',
      timestamp: '2025-08-31 06:00:00',
      status: 'resolved',
      source: 'Security Scanner'
    },
    {
      id: 3,
      type: 'success',
      severity: 'low',
      title: 'SSL certificate renewed',
      description: 'SSL certificate for maleesha.lk renewed successfully, valid until 2026',
      timestamp: '2025-08-30 14:15:00',
      status: 'resolved',
      source: 'Certificate Manager'
    },
    {
      id: 4,
      type: 'warning',
      severity: 'high',
      title: 'Unusual data access pattern detected',
      description: 'User accessed tea formula database outside normal hours from new location',
      timestamp: '2025-08-30 23:45:00',
      status: 'investigating',
      source: 'Data Access Monitor'
    }
  ]);

  // Security trends data
  const securityTrends = [
    { time: '00:00', threats: 0, blocked: 2, scans: 1 },
    { time: '04:00', threats: 1, blocked: 3, scans: 1 },
    { time: '08:00', threats: 0, blocked: 8, scans: 2 },
    { time: '12:00', threats: 2, blocked: 12, scans: 1 },
    { time: '16:00', threats: 1, blocked: 6, scans: 2 },
    { time: '20:00', threats: 0, blocked: 4, scans: 1 }
  ];

  // Authentication logs
  const [authLogs, setAuthLogs] = useState([
    {
      id: 1,
      user: 'saman.perera@maleesha.lk',
      action: 'Login Success',
      ip: '192.168.1.45',
      location: 'Factory Office',
      timestamp: '2025-08-31 09:30:00',
      device: 'Desktop - Chrome'
    },
    {
      id: 2,
      user: 'kamala.w@maleesha.lk',
      action: 'Login Success',
      ip: '192.168.1.52',
      location: 'Quality Lab',
      timestamp: '2025-08-31 08:15:00',
      device: 'Tablet - Safari'
    },
    {
      id: 3,
      user: 'unknown.user@external.com',
      action: 'Login Failed',
      ip: '203.143.52.89',
      location: 'External',
      timestamp: '2025-08-31 07:45:00',
      device: 'Unknown'
    }
  ]);

  // System security settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expirationDays: 90
    },
    sessionSettings: {
      sessionTimeout: 30,
      maxSessions: 3,
      rememberMe: true
    },
    accessControl: {
      ipWhitelist: true,
      geoBlocking: false,
      twoFactorAuth: true,
      deviceTracking: true
    }
  });

  const SecurityCard = ({ title, value, icon: Icon, color, status, subtitle }) => (
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
        {status && (
          <div className={`p-2 rounded-full ${
            status === 'good' ? 'bg-green-500/20' : 
            status === 'warning' ? 'bg-yellow-500/20' : 'bg-red-500/20'
          }`}>
            {status === 'good' && <CheckCircle className="text-green-200" />}
            {status === 'warning' && <AlertTriangle className="text-yellow-200" />}
            {status === 'danger' && <XCircle className="text-red-200" />}
          </div>
        )}
      </div>
      {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
    </div>
  );

  const AlertCard = ({ alert }) => {
    const getAlertColor = (type, severity) => {
      if (type === 'success') return 'border-l-green-500 bg-green-50';
      if (severity === 'high') return 'border-l-red-500 bg-red-50';
      if (severity === 'medium') return 'border-l-orange-500 bg-orange-50';
      return 'border-l-blue-500 bg-blue-50';
    };

    const getAlertIcon = (type, severity) => {
      if (type === 'success') return <CheckCircle className="text-green-500" size={20} />;
      if (severity === 'high') return <AlertTriangle className="text-red-500" size={20} />;
      if (severity === 'medium') return <AlertTriangle className="text-orange-500" size={20} />;
      return <Activity className="text-blue-500" size={20} />;
    };

    return (
      <div className={`border-l-4 ${getAlertColor(alert.type, alert.severity)} p-4 rounded-r-lg`}>
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            {getAlertIcon(alert.type, alert.severity)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">{alert.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                alert.status === 'active' ? 'bg-red-100 text-red-800' :
                alert.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {alert.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{alert.source}</span>
              <span className="text-xs text-gray-500">{alert.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SecuritySettingsCard = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <Settings className="text-gray-600" size={20} />
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
        enabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
      }`} />
    </button>
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
                <p className="text-gray-400 text-sm">System Security</p>
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
                to="/rolePermissions" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                <FaShieldAlt className="text-xl" />
                <span>Role & Permissions</span>
              </Link>
              
              <Link 
                to="/systemSecurity" 
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 text-white shadow-md"
              >
                <MdSecurity className="text-xl" />
                <span className="font-medium">System Security</span>
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
                Security Actions
              </h4>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg">
                  <FaShieldAlt className="text-lg" />
                  <span className="font-medium">Security Scan</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg">
                  <FaExclamationTriangle className="text-lg" />
                  <span className="font-medium">View Alerts</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg">
                  <FaDatabase className="text-lg" />
                  <span className="font-medium">Backup System</span>
                </button>
              </div>
            </div>

            {/* Security Stats Section */}
            <div className="mt-8 space-y-4">
              <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2">
                Security Stats
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Threat Level</p>
                      <p className="text-white text-2xl font-bold">{securityMetrics.threatLevel}</p>
                    </div>
                    <Shield className="text-green-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Blocked Attempts</p>
                      <p className="text-white text-2xl font-bold">{securityMetrics.blockedAttempts}</p>
                    </div>
                    <Lock className="text-blue-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Failed Logins</p>
                      <p className="text-white text-2xl font-bold">{securityMetrics.failedLogins}</p>
                    </div>
                    <Key className="text-orange-200 text-2xl" />
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">System Security</h1>
              <p className="text-gray-600">Monitor and manage security for Maleesha Tea Factory systems</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg">
                <RotateCcw size={18} />
                <span>Run Security Scan</span>
              </button>
            </div>
          </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'overview'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Security Overview
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'alerts'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Security Alerts
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'logs'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Access Logs
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'settings'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Security Settings
          </button>
        </div>

        {/* Security Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Security Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SecurityCard
                title="Threat Level"
                value={securityMetrics.threatLevel}
                icon={Shield}
                color="bg-gradient-to-br from-green-500 to-green-600"
                status="good"
                subtitle="All systems secure"
              />
              <SecurityCard
                title="Blocked Attempts"
                value={securityMetrics.blockedAttempts}
                icon={Lock}
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                status="good"
                subtitle="Last 24 hours"
              />
              <SecurityCard
                title="Failed Logins"
                value={securityMetrics.failedLogins}
                icon={Key}
                color="bg-gradient-to-br from-orange-500 to-orange-600"
                status="warning"
                subtitle="Needs attention"
              />
              <SecurityCard
                title="System Uptime"
                value={`${securityMetrics.systemUptime}%`}
                icon={Server}
                color="bg-gradient-to-br from-purple-500 to-purple-600"
                status="good"
                subtitle="Excellent reliability"
              />
            </div>

            {/* Security Trends Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Security Activity Trends</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="text-gray-400" size={16} />
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={securityTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="threats" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Threats Detected" />
                  <Area type="monotone" dataKey="blocked" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Attacks Blocked" />
                  <Area type="monotone" dataKey="scans" stackId="3" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Security Scans" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Security Components Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Shield className="text-green-600" size={20} />
                    <span>Firewall Status</span>
                  </h4>
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Active Rules</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Blocked IPs</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Update</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <ShieldCheck className="text-green-600" size={20} />
                    <span>SSL Certificates</span>
                  </h4>
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Valid Certificates</span>
                    <span className="font-medium">3/3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expires</span>
                    <span className="font-medium">11 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Encryption</span>
                    <span className="font-medium">TLS 1.3</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Database className="text-green-600" size={20} />
                    <span>Database Security</span>
                  </h4>
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Encrypted</span>
                    <span className="font-medium">AES-256</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Backup Status</span>
                    <span className="font-medium">Current</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Access Control</span>
                    <span className="font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Monitoring */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                <Monitor className="text-green-600" />
                <span>Real-time Security Monitoring</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Wifi className="text-blue-500 text-2xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">156</div>
                  <div className="text-sm text-gray-600">Active Connections</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Globe className="text-green-500 text-2xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">12</div>
                  <div className="text-sm text-gray-600">Countries Blocked</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Zap className="text-orange-500 text-2xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">0.8s</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <UserCheck className="text-purple-500 text-2xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">38</div>
                  <div className="text-sm text-gray-600">Authenticated Users</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Security Alerts</h3>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="all">All Severities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {securityAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {/* Access Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Authentication Logs</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search logs..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download size={16} />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Device</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {authLogs.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {log.user.split('@')[0].charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          log.action.includes('Success') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {log.action.includes('Success') ? (
                            <CheckCircle className="mr-1" size={12} />
                          ) : (
                            <XCircle className="mr-1" size={12} />
                          )}
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{log.ip}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.device}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Security Settings Tab */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SecuritySettingsCard title="Password Policy">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Minimum Length</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={securitySettings.passwordPolicy.minLength}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        passwordPolicy: {
                          ...securitySettings.passwordPolicy,
                          minLength: parseInt(e.target.value)
                        }
                      })}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      min="6"
                      max="20"
                    />
                    <span className="text-sm text-gray-500">characters</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Require Uppercase</span>
                  <ToggleSwitch
                    enabled={securitySettings.passwordPolicy.requireUppercase}
                    onChange={() => setSecuritySettings({
                      ...securitySettings,
                      passwordPolicy: {
                        ...securitySettings.passwordPolicy,
                        requireUppercase: !securitySettings.passwordPolicy.requireUppercase
                      }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Require Numbers</span>
                  <ToggleSwitch
                    enabled={securitySettings.passwordPolicy.requireNumbers}
                    onChange={() => setSecuritySettings({
                      ...securitySettings,
                      passwordPolicy: {
                        ...securitySettings.passwordPolicy,
                        requireNumbers: !securitySettings.passwordPolicy.requireNumbers
                      }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Require Special Characters</span>
                  <ToggleSwitch
                    enabled={securitySettings.passwordPolicy.requireSpecialChars}
                    onChange={() => setSecuritySettings({
                      ...securitySettings,
                      passwordPolicy: {
                        ...securitySettings.passwordPolicy,
                        requireSpecialChars: !securitySettings.passwordPolicy.requireSpecialChars
                      }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Password Expiration</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={securitySettings.passwordPolicy.expirationDays}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        passwordPolicy: {
                          ...securitySettings.passwordPolicy,
                          expirationDays: parseInt(e.target.value)
                        }
                      })}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      min="30"
                      max="365"
                    />
                    <span className="text-sm text-gray-500">days</span>
                  </div>
                </div>
              </div>
            </SecuritySettingsCard>

            <SecuritySettingsCard title="Access Control">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">IP Whitelist</span>
                    <p className="text-sm text-gray-500">Restrict access to approved IP addresses</p>
                  </div>
                  <ToggleSwitch
                    enabled={securitySettings.accessControl.ipWhitelist}
                    onChange={() => setSecuritySettings({
                      ...securitySettings,
                      accessControl: {
                        ...securitySettings.accessControl,
                        ipWhitelist: !securitySettings.accessControl.ipWhitelist
                      }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Two-Factor Authentication</span>
                    <p className="text-sm text-gray-500">Require 2FA for all user accounts</p>
                  </div>
                  <ToggleSwitch
                    enabled={securitySettings.accessControl.twoFactorAuth}
                    onChange={() => setSecuritySettings({
                      ...securitySettings,
                      accessControl: {
                        ...securitySettings.accessControl,
                        twoFactorAuth: !securitySettings.accessControl.twoFactorAuth
                      }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Device Tracking</span>
                    <p className="text-sm text-gray-500">Monitor and track user devices</p>
                  </div>
                  <ToggleSwitch
                    enabled={securitySettings.accessControl.deviceTracking}
                    onChange={() => setSecuritySettings({
                      ...securitySettings,
                      accessControl: {
                        ...securitySettings.accessControl,
                        deviceTracking: !securitySettings.accessControl.deviceTracking
                      }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Geographic Blocking</span>
                    <p className="text-sm text-gray-500">Block access from specific countries</p>
                  </div>
                  <ToggleSwitch
                    enabled={securitySettings.accessControl.geoBlocking}
                    onChange={() => setSecuritySettings({
                      ...securitySettings,
                      accessControl: {
                        ...securitySettings.accessControl,
                        geoBlocking: !securitySettings.accessControl.geoBlocking
                      }
                    })}
                  />
                </div>
              </div>
            </SecuritySettingsCard>

            <SecuritySettingsCard title="Session Management">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Session Timeout</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={securitySettings.sessionSettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        sessionSettings: {
                          ...securitySettings.sessionSettings,
                          sessionTimeout: parseInt(e.target.value)
                        }
                      })}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      min="5"
                      max="120"
                    />
                    <span className="text-sm text-gray-500">minutes</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Maximum Sessions</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={securitySettings.sessionSettings.maxSessions}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        sessionSettings: {
                          ...securitySettings.sessionSettings,
                          maxSessions: parseInt(e.target.value)
                        }
                      })}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      min="1"
                      max="10"
                    />
                    <span className="text-sm text-gray-500">per user</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Remember Me Option</span>
                    <p className="text-sm text-gray-500">Allow users to stay logged in</p>
                  </div>
                  <ToggleSwitch
                    enabled={securitySettings.sessionSettings.rememberMe}
                    onChange={() => setSecuritySettings({
                      ...securitySettings,
                      sessionSettings: {
                        ...securitySettings.sessionSettings,
                        rememberMe: !securitySettings.sessionSettings.rememberMe
                      }
                    })}
                  />
                </div>
              </div>
            </SecuritySettingsCard>

            <SecuritySettingsCard title="Audit & Compliance">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-gray-700 font-medium">Audit Logging</span>
                    <p className="text-sm text-gray-500">Log all user actions and system events</p>
                  </div>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-gray-700 font-medium">Data Retention</span>
                    <p className="text-sm text-gray-500">Logs retained for 1 year</p>
                  </div>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-gray-700 font-medium">Compliance Monitoring</span>
                    <p className="text-sm text-gray-500">ISO 27001 & Sri Lankan data protection</p>
                  </div>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
              </div>
            </SecuritySettingsCard>
          </div>
        )}

        {/* Security Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-3">
            <Shield className="text-blue-600 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Security Recommendations</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Consider enabling geographic blocking for enhanced security</li>
                <li>• Schedule regular security awareness training for tea factory staff</li>
                <li>• Implement network segmentation between production and office systems</li>
                <li>• Regular penetration testing recommended every 6 months</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SystemSecurity;
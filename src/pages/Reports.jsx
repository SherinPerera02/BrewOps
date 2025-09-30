import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/navigationBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  generateInventoryReport, 
  generateSupplierReport, 
  generateProductionReport, 
  generateFinancialReport 
} from '../components/ReportGenerator';
import { 
  FaFileAlt, 
  FaDownload, 
  FaFilter,
  FaCalendarAlt,
  FaChartBar,
  FaMoneyBillWave,
  FaLeaf,
  FaUsers,
  FaWarehouse,
  FaIndustry,
  FaTruck,
  FaEye,
  FaPrint,
  FaFilePdf,
  FaFileExcel,
  FaSearch,
  FaChevronDown,
  FaSpinner
} from 'react-icons/fa';
import { MdDashboard, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { LineChart, BarChart, PieChart, AreaChart, Line, Bar, Pie, Area, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedReport, setSelectedReport] = useState('all');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Report data states
  const [reportsData, setReportsData] = useState({
    inventory: [],
    suppliers: [],
    production: [],
    financial: [],
    users: []
  });

  // Sample data for demonstration
  const [dashboardData, setDashboardData] = useState({
    totalReports: 156,
    recentReports: 23,
    pendingReports: 8,
    scheduledReports: 12
  });

  // Chart data
  const reportGenerationData = [
    { month: 'Jan', generated: 45, scheduled: 12 },
    { month: 'Feb', generated: 52, scheduled: 15 },
    { month: 'Mar', generated: 48, scheduled: 18 },
    { month: 'Apr', generated: 61, scheduled: 20 },
    { month: 'May', generated: 58, scheduled: 22 },
    { month: 'Jun', generated: 67, scheduled: 25 }
  ];

  const reportTypeData = [
    { name: 'Inventory', value: 35, color: '#10B981' },
    { name: 'Financial', value: 25, color: '#3B82F6' },
    { name: 'Production', value: 20, color: '#F59E0B' },
    { name: 'Supplier', value: 12, color: '#EF4444' },
    { name: 'User Activity', value: 8, color: '#8B5CF6' }
  ];

  const availableReports = [
    {
      id: 1,
      name: 'Inventory Summary Report',
      category: 'inventory',
      description: 'Complete overview of current inventory levels, stock movements, and low stock alerts',
      lastGenerated: '2 hours ago',
      frequency: 'Daily',
      status: 'active',
      icon: FaWarehouse
    },
    {
      id: 2,
      name: 'Supplier Performance Report',
      category: 'supplier',
      description: 'Analysis of supplier delivery times, quality scores, and payment histories',
      lastGenerated: '1 day ago',
      frequency: 'Weekly',
      status: 'active',
      icon: FaTruck
    },
    {
      id: 3,
      name: 'Production Analytics Report',
      category: 'production',
      description: 'Tea production volumes, quality metrics, and efficiency analysis',
      lastGenerated: '3 hours ago',
      frequency: 'Daily',
      status: 'active',
      icon: FaIndustry
    },
    {
      id: 4,
      name: 'Financial Summary Report',
      category: 'financial',
      description: 'Revenue, expenses, payments, and profit margin analysis',
      lastGenerated: '6 hours ago',
      frequency: 'Weekly',
      status: 'active',
      icon: FaMoneyBillWave
    },
    {
      id: 5,
      name: 'User Activity Report',
      category: 'user',
      description: 'System usage statistics, login patterns, and user role analysis',
      lastGenerated: '1 day ago',
      frequency: 'Monthly',
      status: 'active',
      icon: FaUsers
    },
    {
      id: 6,
      name: 'Tea Leaves Quality Report',
      category: 'quality',
      description: 'Quality assessments, grading results, and quality trends over time',
      lastGenerated: '4 hours ago',
      frequency: 'Daily',
      status: 'active',
      icon: FaLeaf
    },
    {
      id: 7,
      name: 'Monthly Performance Report',
      category: 'performance',
      description: 'Overall system performance, KPIs, and business metrics summary',
      lastGenerated: '2 days ago',
      frequency: 'Monthly',
      status: 'scheduled',
      icon: FaChartBar
    },
    {
      id: 8,
      name: 'Audit Trail Report',
      category: 'audit',
      description: 'Complete audit trail of system activities, changes, and user actions',
      lastGenerated: '12 hours ago',
      frequency: 'Weekly',
      status: 'active',
      icon: FaFileAlt
    }
  ];

  const filteredReports = availableReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedReport === 'all' || report.category === selectedReport;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetchReportsData();
  }, [dateRange]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      // In a real application, you would fetch actual data from your API
      // For now, we'll simulate the API call
      setTimeout(() => {
        setLoading(false);
        toast.success('Reports data updated successfully');
      }, 1000);
    } catch (error) {
      console.error('Error fetching reports data:', error);
      toast.error('Failed to fetch reports data');
      setLoading(false);
    }
  };

  const generateReport = async (reportId) => {
    try {
      setLoading(true);
      const report = availableReports.find(r => r.id === reportId);
      
      // Simulate report generation
      setTimeout(() => {
        toast.success(`${report.name} generated successfully`);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
      setLoading(false);
    }
  };

  const downloadReport = async (reportId, format = 'pdf') => {
    const report = availableReports.find(r => r.id === reportId);
    
    if (format === 'pdf') {
      let doc;
      
      try {
        // Generate different reports based on category
        switch (report.category) {
          case 'inventory':
          case 'quality':
            // Sample inventory data - in real app, fetch from API
            const inventoryData = [
              { name: 'Ceylon Black Tea', category: 'Black Tea', quantity: 250, unit: 'kg', unitPrice: 800, supplier: 'Hill Country Suppliers', status: 'Active' },
              { name: 'Green Tea Leaves', category: 'Green Tea', quantity: 150, unit: 'kg', unitPrice: 1200, supplier: 'Organic Tea Ltd', status: 'Active' },
              { name: 'White Tea Premium', category: 'White Tea', quantity: 45, unit: 'kg', unitPrice: 2500, supplier: 'Premium Tea Co', status: 'Low Stock' },
              { name: 'Oolong Tea', category: 'Oolong', quantity: 120, unit: 'kg', unitPrice: 1500, supplier: 'Mountain Tea Estates', status: 'Active' }
            ];
            doc = generateInventoryReport(inventoryData);
            break;
            
          case 'supplier':
            // Sample supplier data - in real app, fetch from API
            const supplierData = [
              { name: 'Hill Country Suppliers', contactPerson: 'John Silva', phone: '+94 11 234 5678', location: 'Nuwara Eliya', rating: 4.5, totalDeliveries: 156, status: 'active' },
              { name: 'Organic Tea Ltd', contactPerson: 'Mary Fernando', phone: '+94 11 345 6789', location: 'Kandy', rating: 4.8, totalDeliveries: 203, status: 'active' },
              { name: 'Premium Tea Co', contactPerson: 'David Perera', phone: '+94 11 456 7890', location: 'Ella', rating: 4.2, totalDeliveries: 89, status: 'active' },
              { name: 'Mountain Tea Estates', contactPerson: 'Sarah Jayawardena', phone: '+94 11 567 8901', location: 'Haputale', rating: 4.6, totalDeliveries: 134, status: 'active' }
            ];
            doc = generateSupplierReport(supplierData);
            break;
            
          case 'production':
          case 'performance':
            // Sample production data - in real app, fetch from API
            const productionData = [
              { date: '2024-01-15', batchNumber: 'BT001', teaType: 'Ceylon Black', quantity: 125, qualityScore: 94, supervisor: 'Kamal Wickremasinghe', status: 'Completed' },
              { date: '2024-01-16', batchNumber: 'GT002', teaType: 'Green Tea', quantity: 98, qualityScore: 92, supervisor: 'Nimal Gunawardena', status: 'Completed' },
              { date: '2024-01-17', batchNumber: 'WT003', teaType: 'White Tea', quantity: 45, qualityScore: 96, supervisor: 'Sunil Rajapakse', status: 'Completed' },
              { date: '2024-01-18', batchNumber: 'OT004', teaType: 'Oolong', quantity: 87, qualityScore: 90, supervisor: 'Ravi Mendis', status: 'Completed' }
            ];
            doc = generateProductionReport(productionData);
            break;
            
          case 'financial':
            // Sample financial data - in real app, fetch from API
            const financialData = {
              totalRevenue: 2500000,
              totalExpenses: 1800000,
              teaSales: 2200000,
              exportRevenue: 250000,
              otherIncome: 50000,
              rawMaterials: 800000,
              laborCosts: 600000,
              utilities: 150000,
              transportation: 120000,
              otherExpenses: 130000
            };
            doc = generateFinancialReport(financialData);
            break;
            
          default:
            // Default generic report
            doc = new jsPDF();
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.text('BrewOps - Tea Factory Management', 20, 20);
            doc.setFontSize(16);
            doc.text(report.name, 20, 35);
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
            doc.text(`Report Category: ${report.category.toUpperCase()}`, 20, 55);
            doc.setTextColor(40);
            doc.text('Report Description:', 20, 70);
            doc.setFontSize(10);
            doc.text(report.description, 20, 80, { maxWidth: 170 });
        }
        
        doc.save(`${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
        toast.success('PDF report downloaded successfully');
        
      } catch (error) {
        console.error('Error generating report:', error);
        toast.error('Failed to generate report');
      }
    } else {
      toast.info('Excel export feature will be implemented soon');
    }
  };

  const scheduleReport = (reportId) => {
    const report = availableReports.find(r => r.id === reportId);
    toast.success(`${report.name} scheduled for automatic generation`);
  };

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <MdTrendingUp /> : <MdTrendingDown />}
              <span className="ml-1">+{trendValue}% from last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  const ReportCard = ({ report }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-full bg-blue-100">
            <report.icon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{report.description}</p>
            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
              <span>Last generated: {report.lastGenerated}</span>
              <span>•</span>
              <span>Frequency: {report.frequency}</span>
              <span>•</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {report.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => generateReport(report.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Generate Report"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaEye />}
          </button>
          <button
            onClick={() => downloadReport(report.id, 'pdf')}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Download PDF"
          >
            <FaFilePdf />
          </button>
          <button
            onClick={() => downloadReport(report.id, 'excel')}
            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            title="Download Excel"
          >
            <FaFileExcel />
          </button>
          <button
            onClick={() => scheduleReport(report.id)}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Schedule Report"
          >
            <FaCalendarAlt />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="mt-2 text-gray-600">Generate, view, and manage comprehensive business reports</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.print()}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FaPrint className="mr-2" />
                  Print View
                </button>
                <button
                  onClick={() => fetchReportsData()}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaDownload className="mr-2" />}
                  {loading ? 'Updating...' : 'Refresh Data'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: MdDashboard },
              { key: 'inventory', label: 'Inventory Reports', icon: FaWarehouse },
              { key: 'financial', label: 'Financial Reports', icon: FaMoneyBillWave },
              { key: 'production', label: 'Production Reports', icon: FaIndustry },
              { key: 'analytics', label: 'Analytics', icon: FaChartBar }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Total Reports" 
                value={dashboardData.totalReports} 
                icon={FaFileAlt} 
                trend="up" 
                trendValue="12" 
                color="blue"
              />
              <StatCard 
                title="Recent Reports" 
                value={dashboardData.recentReports} 
                icon={FaEye} 
                trend="up" 
                trendValue="8" 
                color="green"
              />
              <StatCard 
                title="Pending Reports" 
                value={dashboardData.pendingReports} 
                icon={FaSpinner} 
                color="yellow"
              />
              <StatCard 
                title="Scheduled Reports" 
                value={dashboardData.scheduledReports} 
                icon={FaCalendarAlt} 
                color="purple"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard title="Report Generation Trends">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={reportGenerationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="generated" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="scheduled" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Report Types Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={reportTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({name, value}) => `${name}: ${value}%`}
                    >
                      {reportTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Filters and Controls */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="inventory">Inventory</option>
                    <option value="financial">Financial</option>
                    <option value="production">Production</option>
                    <option value="supplier">Supplier</option>
                    <option value="user">User Activity</option>
                    <option value="quality">Quality</option>
                    <option value="performance">Performance</option>
                    <option value="audit">Audit</option>
                  </select>

                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Available Reports */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Reports</h2>
              <div className="grid grid-cols-1 gap-6">
                {filteredReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Inventory Reports</h2>
            <div className="grid grid-cols-1 gap-6">
              {filteredReports.filter(r => r.category === 'inventory' || r.category === 'quality').map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial Reports</h2>
            <div className="grid grid-cols-1 gap-6">
              {filteredReports.filter(r => r.category === 'financial').map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'production' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Production Reports</h2>
            <div className="grid grid-cols-1 gap-6">
              {filteredReports.filter(r => r.category === 'production' || r.category === 'performance').map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard title="Monthly Report Generation">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportGenerationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="generated" fill="#3B82F6" />
                    <Bar dataKey="scheduled" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Report Usage Trends">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reportGenerationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="generated" stroke="#3B82F6" strokeWidth={3} />
                    <Line type="monotone" dataKey="scheduled" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Reports;
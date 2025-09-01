import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/navigationBar';
import Footer from '../components/Footer';
import { Users, DollarSign, Calendar, Download, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { 
  FaHome, 
  FaUsers, 
  FaWarehouse, 
  FaChartBar, 
  FaLeaf, 
  FaUserCircle, 
  FaPlus, 
  FaSearch, 
  FaMoneyBillWave, 
  FaTruck 
} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';

const TeaFactoryPayment = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSpotCashModal, setShowSpotCashModal] = useState(false);
  const [selectedSupplierForPayment, setSelectedSupplierForPayment] = useState(null);
  const [selectedSupplierForSpotCash, setSelectedSupplierForSpotCash] = useState(null);
  const [spotCashAmount, setSpotCashAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  // Dashboard data for quick stats
  const dashboardData = {
    monthlyLeaves: 2450,
    qualityScore: 94,
    monthlyRevenue: 185000,
    deliveryRate: 96
  };

  // Sample data initialization
  useEffect(() => {
    const sampleSuppliers = [
      { id: 1, name: 'Rajesh Kumar', phone: '077-1234567', bankAccount: '1234567890', bankName: 'Commercial Bank', rate: 150, monthlyQuantity: 120.5 },
      { id: 2, name: 'Priya Silva', phone: '071-2345678', bankAccount: '2345678901', bankName: 'People\'s Bank', rate: 160, monthlyQuantity: 95.8 },
      { id: 3, name: 'Chaminda Perera', phone: '076-3456789', bankAccount: '3456789012', bankName: 'Bank of Ceylon', rate: 155, monthlyQuantity: 78.3 }
    ];
    
    const samplePayments = [
      { id: 1, supplierId: 1, month: '2025-07', amount: 15000, date: '2025-08-01', status: 'paid' },
      { id: 2, supplierId: 2, month: '2025-07', amount: 18500, date: '2025-08-01', status: 'paid' },
      // Mock spot cash payments for today's dashboard table
      { id: 3, supplierId: 1, month: 'spot-cash-2025-08-31', amount: 2250, date: '2025-08-31', status: 'paid', type: 'spot-cash', paymentMethod: 'Cash' },
      { id: 4, supplierId: 2, month: 'spot-cash-2025-08-31', amount: 1600, date: '2025-08-31', status: 'paid', type: 'spot-cash', paymentMethod: 'Cash' },
      { id: 5, supplierId: 3, month: 'spot-cash-2025-08-31', amount: 1850, date: '2025-08-31', status: 'paid', type: 'spot-cash', paymentMethod: 'Cash' }
    ];

    if (suppliers.length === 0) setSuppliers(sampleSuppliers);
    if (payments.length === 0) setPayments(samplePayments);
  }, []);

  const [supplierForm, setSupplierForm] = useState({
    name: '', phone: '', bankAccount: '', bankName: '', rate: '', monthlyQuantity: ''
  });

  const addSupplier = () => {
    if (supplierForm.name && supplierForm.phone && supplierForm.bankAccount && supplierForm.rate) {
      const newSupplier = {
        id: Date.now(),
        ...supplierForm,
        rate: parseFloat(supplierForm.rate),
        monthlyQuantity: parseFloat(supplierForm.monthlyQuantity) || 0
      };
      setSuppliers([...suppliers, newSupplier]);
      setSupplierForm({ name: '', phone: '', bankAccount: '', bankName: '', rate: '', monthlyQuantity: '' });
      setShowAddSupplier(false);
    }
  };

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : 'Unknown';
  };

  const getSupplierQuantity = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.monthlyQuantity || 0 : 0;
  };

  const getMonthlyReport = () => {
    // Since deliveries are removed, return empty report
    return [];
  };

  const getPaymentStatus = (supplierId, month) => {
    const payment = payments.find(p => p.supplierId === supplierId && p.month === month);
    return payment ? payment.status : 'pending';
  };

  const processPayment = (supplierId, amount) => {
    const newPayment = {
      id: Date.now(),
      supplierId: supplierId,
      month: selectedMonth,
      amount: amount,
      date: new Date().toISOString().slice(0, 10),
      status: 'paid'
    };
    setPayments([...payments, newPayment]);
    setShowPaymentModal(false);
    setSelectedSupplierForPayment(null);
  };

  const openPaymentModal = (supplier, amount) => {
    setSelectedSupplierForPayment({ ...supplier, amount });
    setShowPaymentModal(true);
  };

  const openSpotCashModal = (supplier) => {
    setSelectedSupplierForSpotCash(supplier);
    setSpotCashAmount('');
    setShowSpotCashModal(true);
  };

  const processSpotCashPayment = () => {
    if (selectedSupplierForSpotCash && spotCashAmount && parseFloat(spotCashAmount) > 0 && paymentMethod) {
      const newPayment = {
        id: Date.now(),
        supplierId: selectedSupplierForSpotCash.id,
        month: 'spot-cash-' + new Date().toISOString().slice(0, 10),
        amount: parseFloat(spotCashAmount),
        date: new Date().toISOString().slice(0, 10),
        status: 'paid',
        type: 'spot-cash',
        paymentMethod: paymentMethod
      };
      setPayments([...payments, newPayment]);
      setShowSpotCashModal(false);
      setSelectedSupplierForSpotCash(null);
      setSpotCashAmount('');
      setPaymentMethod('');
      alert(`Spot cash payment of LKR ${parseFloat(spotCashAmount).toFixed(2)} processed successfully for ${selectedSupplierForSpotCash.name} via ${paymentMethod}`);
    }
  };

  const getTodaysSpotCashPayments = () => {
    const today = new Date().toISOString().slice(0, 10);
    return payments.filter(payment => 
      payment.type === 'spot-cash' && 
      payment.date === today
    );
  };

  const getTodaysSpotCashTotal = () => {
    return getTodaysSpotCashPayments().reduce((sum, payment) => sum + payment.amount, 0);
  };

  const exportMonthlyReport = () => {
    const report = getMonthlyReport();
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Supplier Name,Phone,Bank Account,Bank Name,Payment Status\n" +
      report.map(r => {
        const paymentStatus = getPaymentStatus(r.supplier.id, selectedMonth);
        return `${r.supplier.name},${r.supplier.phone},${r.supplier.bankAccount},${r.supplier.bankName || ''},${paymentStatus}`;
      }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tea_payments_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalSuppliers = suppliers.length;
  const monthlyTotal = getMonthlyReport().reduce((sum, r) => sum + r.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global NavigationBar */}
      <NavigationBar />
      
      <div className="flex">
        {/* Enhanced Modern Sidebar */}
        <div className="w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-r border-gray-700">
          <div className="p-6">
            {/* User Profile Section */}
            <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Payment Portal</h3>
                <p className="text-gray-400 text-sm">Tea Factory Payment</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'dashboard' 
                    ? 'bg-gray-700 text-white shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Calendar className="text-xl" />
                <span className="font-medium">Dashboard</span>
              </button>
              
              <button
                onClick={() => setActiveTab('suppliers')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'suppliers' 
                    ? 'bg-gray-700 text-white shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Users className="text-xl" />
                <span className="font-medium">Spot Payments</span>
              </button>
              
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'payments' 
                    ? 'bg-gray-700 text-white shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <DollarSign className="text-xl" />
                <span className="font-medium">Monthly Payments</span>
              </button>
            </div>

            

            {/* Quick Stats Section - Moved to Bottom */}
            <div className="mt-8 space-y-4">
              <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2">
                Quick Stats
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Monthly Delivery</p>
                      <p className="text-white text-2xl font-bold">{dashboardData.monthlyLeaves} kg</p>
                    </div>
                    <FaLeaf className="text-green-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Quality Score</p>
                      <p className="text-white text-2xl font-bold">{dashboardData.qualityScore}%</p>
                    </div>
                    <FaChartBar className="text-blue-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Monthly Revenue</p>
                      <p className="text-white text-xl font-bold">Rs. {dashboardData.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <FaMoneyBillWave className="text-purple-200 text-2xl" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Delivery Rate</p>
                      <p className="text-white text-2xl font-bold">{dashboardData.deliveryRate}%</p>
                    </div>
                    <FaTruck className="text-orange-200 text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
                      <p className="text-2xl font-bold text-gray-900">{totalSuppliers}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Download className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Total</p>
                    <p className="text-2xl font-bold text-gray-900">LKR {monthlyTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today's Spot Cash</p>
                    <p className="text-2xl font-bold text-gray-900">LKR {getTodaysSpotCashTotal().toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Rate/kg</p>
                    <p className="text-2xl font-bold text-gray-900">LKR {suppliers.length > 0 ? (suppliers.reduce((sum, s) => sum + s.rate, 0) / suppliers.length).toFixed(0) : '0'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Spot Cash Payments */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Today's Spot Cash Payments</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (LKR)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getTodaysSpotCashPayments().map(payment => {
                      const supplier = suppliers.find(s => s.id === payment.supplierId);
                      return (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(payment.date + 'T' + new Date().toISOString().slice(11)).toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {supplier ? supplier.name : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {payment.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              <CheckCircle size={12} className="mr-1" />
                              Paid
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {getTodaysSpotCashPayments().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No spot cash payments made today
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Suppliers Tab */}
        {activeTab === 'suppliers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Suppliers</h2>
            </div>

            {/* Month Selector for Supplier View */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">View Monthly Totals for:</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>

            
            {/* Suppliers List with Monthly Totals */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (LKR/kg)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {suppliers.map(supplier => {
                    const monthlyData = getMonthlyReport().find(r => r.supplier.id === supplier.id);
                    const monthlyAmount = monthlyData ? monthlyData.totalAmount : 0;
                    const supplierQuantity = getSupplierQuantity(supplier.id);
                    const paymentStatus = getPaymentStatus(supplier.id, selectedMonth);
                    
                    return (
                      <tr key={supplier.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{supplier.bankAccount}</div>
                            <div className="text-gray-500 text-xs">{supplier.bankName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.rate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {getSupplierQuantity(supplier.id).toFixed(1)} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                            paymentStatus === 'paid' 
                              ? 'bg-green-100 text-green-800' 
                              : supplierQuantity > 0 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {paymentStatus === 'paid' ? (
                              <>
                                <CheckCircle size={12} className="mr-1" />
                                Paid
                              </>
                            ) : supplierQuantity > 0 ? (
                              <>
                                <XCircle size={12} className="mr-1" />
                                Pending
                              </>
                            ) : (
                              'No Quantity'
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => openSpotCashModal(supplier)}
                              className="bg-green-600 text-white px-5 py-1 rounded text-xs hover:bg-green-700"
                            >
                              <span>Pay Now</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedSupplierForPayment && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-lg font-medium mb-4">Process Payment</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supplier:</span>
                    <span className="font-medium">{selectedSupplierForPayment.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Month:</span>
                    <span className="font-medium">{selectedMonth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-green-600">LKR {selectedSupplierForPayment.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Bank Transfer Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Holder:</span>
                    <span className="font-medium">{selectedSupplierForPayment.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">{selectedSupplierForPayment.bankAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">{selectedSupplierForPayment.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{selectedSupplierForPayment.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => processPayment(selectedSupplierForPayment.id, selectedSupplierForPayment.amount)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <CheckCircle size={16} />
                  <span>Confirm Payment</span>
                </button>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedSupplierForPayment(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Spot Cash Payment Modal */}
        {showSpotCashModal && selectedSupplierForSpotCash && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-lg font-medium mb-4">Spot Cash Payment</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supplier:</span>
                    <span className="font-medium">{selectedSupplierForSpotCash.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{selectedSupplierForSpotCash.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{getSupplierQuantity(selectedSupplierForSpotCash.id).toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate:</span>
                    <span className="font-medium">LKR {selectedSupplierForSpotCash.rate}/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium text-green-600">LKR {(getSupplierQuantity(selectedSupplierForSpotCash.id) * selectedSupplierForSpotCash.rate).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium text-green-600">Cash</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    const calculatedAmount = getSupplierQuantity(selectedSupplierForSpotCash.id) * selectedSupplierForSpotCash.rate;
                    if (selectedSupplierForSpotCash && calculatedAmount > 0) {
                      const newPayment = {
                        id: Date.now(),
                        supplierId: selectedSupplierForSpotCash.id,
                        month: 'spot-cash-' + new Date().toISOString().slice(0, 10),
                        amount: calculatedAmount,
                        date: new Date().toISOString().slice(0, 10),
                        status: 'paid',
                        type: 'spot-cash',
                        paymentMethod: 'Cash'
                      };
                      setPayments([...payments, newPayment]);
                      setShowSpotCashModal(false);
                      setSelectedSupplierForSpotCash(null);
                      alert(`Spot cash payment of LKR ${calculatedAmount.toFixed(2)} completed successfully for ${selectedSupplierForSpotCash.name}`);
                    }
                  }}
                  disabled={getSupplierQuantity(selectedSupplierForSpotCash.id) <= 0}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <span>Done</span>
                </button>
                <button
                  onClick={() => {
                    setShowSpotCashModal(false);
                    setSelectedSupplierForSpotCash(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Monthly Payments</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={exportMonthlyReport}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                >
                  <Download size={20} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Account</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {suppliers.map(supplier => {
                    const paymentStatus = getPaymentStatus(supplier.id, selectedMonth);
                    return (
                      <tr key={supplier.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{supplier.bankAccount}</div>
                            <div className="text-gray-500 text-xs">{supplier.bankName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                            paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {paymentStatus === 'paid' ? (
                              <>
                                <CheckCircle size={12} className="mr-1" />
                                Paid
                              </>
                            ) : (
                              <>
                                <XCircle size={12} className="mr-1" />
                                Pending
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {paymentStatus !== 'paid' && (
                            <button 
                              onClick={() => openPaymentModal(supplier, 0)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center space-x-1 hover:bg-green-700"
                            >
                              <CreditCard size={12} />
                              <span>Pay Now</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {suppliers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No suppliers found
                </div>
              )}
            </div>
          </div>
        )}
        </main>
      </div>
      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default TeaFactoryPayment;
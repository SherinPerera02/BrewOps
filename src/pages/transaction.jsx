import React, { useState } from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import NavigationBar from "../components/navigationBar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUser as FaUserIcon, FaFileAlt, FaMoneyBillWave, FaCog, FaPlus, FaSearch, FaLeaf, FaChartBar, FaTruck } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';


const Transaction = () => {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const transactions = [
    { date: "2024-08-01", supplierName: "Green Valley Tea Estate", quotaBrought: 1200, paymentReceived: 480000, status: "Completed", teaGrade: "BOPF" },
    { date: "2024-08-05", supplierName: "Highland Tea Gardens", quotaBrought: 800, paymentReceived: 320000, status: "Pending", teaGrade: "Pekoe" },
    { date: "2024-08-10", supplierName: "Sunrise Tea Plantation", quotaBrought: 1500, paymentReceived: 675000, status: "Completed", teaGrade: "Orange Pekoe" },
    { date: "2024-08-15", supplierName: "Mountain View Estate", quotaBrought: 950, paymentReceived: 0, status: "Payment Failed", teaGrade: "BOPF" },
    { date: "2024-08-18", supplierName: "Golden Leaf Suppliers", quotaBrought: 2200, paymentReceived: 1100000, status: "Completed", teaGrade: "Flowery Pekoe" },
    { date: "2024-08-20", supplierName: "Ceylon Premium Tea", quotaBrought: 750, paymentReceived: 337500, status: "Processing", teaGrade: "Orange Pekoe" }
  ];

  const filteredTransactions = transactions.filter(
    (row) =>
      row.date.includes(search) ||
      row.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      row.quotaBrought.toString().includes(search) ||
      row.paymentReceived.toString().includes(search) ||
      row.status.toLowerCase().includes(search.toLowerCase()) ||
      row.teaGrade.toLowerCase().includes(search.toLowerCase())
  );

  const totalQuota = filteredTransactions.reduce((sum, t) => sum + t.quotaBrought, 0);
  const totalPayments = filteredTransactions.reduce((sum, t) => sum + t.paymentReceived, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 transition-transform duration-300 ease-in-out`}>
          <div className="w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-r border-gray-700 h-full">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <FaUserCircle className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Supplier Portal</h3>
                  <p className="text-gray-400 text-sm">Tea Leaf Supplier</p>
                </div>
              </div>

              <div className="space-y-2">
                   <Link 
                      to="/" 
                      className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
                    >
                      <FaFileAlt className="text-xl" />
                      <span>Home</span>
                    </Link>
                <Link to="/SupplierDashboard" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
                  <MdDashboard className="text-xl" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link to="/suppliers/transactions" className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 text-white shadow-md">
                  <FaFileAlt className="text-xl" />
                  <span>Supply Records</span>
                </Link>
                <Link to="/suppliers/paymentSummary" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
                  <FaMoneyBillWave className="text-xl" />
                  <span>Payment Records</span>
                </Link>
                <Link to="/suppliers/editProfile" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
                  <FaUserIcon className="text-xl" />
                  <span>Edit Profile</span>
                </Link>
                <Link to="/supplier/settings" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
                  <FaCog className="text-xl" />
                  <span>Settings</span>
                </Link>
              </div>

              <div className="mt-8">
                <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <Link to="/supplier/create-supply-recode" className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 shadow-lg">
                    <FaPlus className="text-lg" />
                    <span className="font-medium">New Supply Record</span>
                  </Link>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg">
                    <FaSearch className="text-lg" />
                    <span className="font-medium">Search Records</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 mt-auto">
                <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2 mx-1.5 my-4">Quick Stats</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Monthly Delivery</p>
                        <p className="text-white text-2xl font-bold">-- kg</p>
                      </div>
                      <FaLeaf className="text-green-200 text-2xl" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Quality Score</p>
                        <p className="text-white text-2xl font-bold">--%</p>
                      </div>
                      <FaChartBar className="text-blue-200 text-2xl" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Monthly Revenue</p>
                        <p className="text-white text-xl font-bold">Rs. --</p>
                      </div>
                      <FaMoneyBillWave className="text-purple-200 text-2xl" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Delivery Rate</p>
                        <p className="text-white text-2xl font-bold">--%</p>
                      </div>
                      <FaTruck className="text-orange-200 text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          
          <h1 className="text-3xl my-6 text-center font-bold text-gray-800">Supplier Transactions</h1>
          <p className="text-gray-500 mb-6 text-center">Raw tea leaves quota delivery and payment records</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Total Quota Received</h3>
              <p className="text-2xl font-bold text-green-600">{totalQuota.toLocaleString()} kg</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Total Payments Made</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalPayments)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Average Rate</h3>
              <p className="text-2xl font-bold text-purple-600">{totalQuota > 0 ? formatCurrency(totalPayments / totalQuota) : 'N/A'} /kg</p>
            </div>
          </div>

          <div className="mb-6 max-w-3xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by date, supplier, quota, payment, status, or tea grade"
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full text-left border rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">Date</th>
                  <th className="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">Supplier</th>
                  <th className="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">Tea Grade</th>
                  <th className="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">Quota (kg)</th>
                  <th className="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">Payment Received</th>
                  <th className="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">Rate/kg</th>
                  <th className="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-400">No transactions found.</td>
                  </tr>
                ) : (
                  filteredTransactions.map((row, idx) => (
                    <tr key={idx} className="border-t last:border-none hover:bg-gray-50">
                      <td className="px-4 py-4 text-gray-700 whitespace-nowrap">{row.date}</td>
                      <td className="px-4 py-4 text-gray-700"><div className="font-medium">{row.supplierName}</div></td>
                      <td className="px-4 py-4 text-gray-700"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{row.teaGrade}</span></td>
                      <td className="px-4 py-4 text-gray-700 font-medium">{row.quotaBrought.toLocaleString()}</td>
                      <td className="px-4 py-4 text-gray-700 font-medium">{row.paymentReceived > 0 ? formatCurrency(row.paymentReceived) : '-'}</td>
                      <td className="px-4 py-4 text-gray-700">{row.paymentReceived > 0 ? formatCurrency(row.paymentReceived / row.quotaBrought) : '-'}</td>
                      <td className="px-4 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === "Completed" ? "bg-green-100 text-green-700" : row.status === "Pending" ? "bg-yellow-100 text-yellow-700" : row.status === "Processing" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>{row.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-600">
              <span><strong>Transactions:</strong> {filteredTransactions.length}</span>
              <span><strong>Total Quota:</strong> {totalQuota.toLocaleString()} kg</span>
              <span><strong>Total Payments:</strong> {formatCurrency(totalPayments)}</span>
            </div>
          </div>
        </main>

      </div>

      <Footer />
    </div>
  );
};

export default Transaction;
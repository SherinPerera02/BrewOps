// src/pages/SupplierDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaMoneyBillWave, FaExclamationTriangle, FaEdit, FaChartBar, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
import NavigationBar from '../components/NavigationBar';
import DashboardCard from '../components/dashboardCard';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const supplierData = [
  { month: "January", leaves: 1200, payment: 50000 },
  { month: "February", leaves: 1100, payment: 45000 },
  { month: "March", leaves: 1300, payment: 55000 },
  // Add more data as needed
];

const teaLeavesData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Tea Leaves (kg)',
      data: [120, 150, 180, 200, 170, 190],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

const paymentData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Payments (Rs)',
      data: [20000, 25000, 30000, 28000, 26000, 31000],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const teaLeavesOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: { enabled: true },
    zoom: {
      pan: { enabled: true, mode: 'x' },
      zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
    },
  },
};

const paymentOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: { enabled: true },
    zoom: {
      pan: { enabled: true, mode: 'x' },
      zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
    },
  },
};

export default function SupplierDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <NavigationBar />

      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
          
          <nav className="flex-1 p-4 space-y-2">
            <Link to="/supplier/dashboard" className="block p-2 rounded bg-green-700 text-white">Dashboard</Link>
            <Link to="/supplier/transactions" className="block p-2 rounded hover:bg-gray-700">Transactions</Link>
            <Link to="/supplier/leaves" className="block p-2 rounded hover:bg-gray-700">Leaves Quantity</Link>
            <Link to="/supplier/payments" className="block p-2 rounded hover:bg-gray-700">Payment Summary</Link>          
            <Link to="/supplier/profile" className="block p-2 rounded hover:bg-gray-700">Edit Profile</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">


          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <DashboardCard 
              title="Monthly Leaves (kg)" 
              value="1,250" 
              icon={FaLeaf} 
              color="bg-green-100" 
            />
            <DashboardCard 
              title="Total Payments (Rs)" 
              value="75,000" 
              icon={FaMoneyBillWave} 
              color="bg-green-100" 
            />
            <DashboardCard 
              title="Pending Payments" 
              value="5,000" 
              icon={FaExclamationTriangle} 
              color="bg-yellow-100" 
            />
          </div>

        

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Tea Leaves Quantity Over Time</h2>
              <div className="h-64">
                <Line data={teaLeavesData} options={teaLeavesOptions} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Payment Breakdown</h2>
              <div className="h-64">
                <Line data={paymentData} options={paymentOptions} />
              </div>
            </div>
          </div>

          {/* Supplier Details Table */}
          <div className="bg-white p-4 rounded-lg shadow mt-10">
            <h2 className="text-lg font-bold mb-4">Supplier Details</h2>
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Month</th>
                  <th className="px-4 py-2">Tea Leaves (kg)</th>
                  <th className="px-4 py-2">Payments (Rs)</th>
                </tr>
              </thead>
              <tbody>
                {supplierData.map((data, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{data.month}</td>
                    <td className="border px-4 py-2">{data.leaves}</td>
                    <td className="border px-4 py-2">{data.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

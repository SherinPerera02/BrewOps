// src/pages/SupplierDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLeaf, FaMoneyBillWave, FaExclamationTriangle, FaEdit, FaChartBar, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
import NavigationBar from '../components/NavigationBar';
import DashboardCard from '../components/DashboardCard';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import toast, { Toaster } from "react-hot-toast";

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
  { month: "April", leaves: 1400, payment: 60000 },
  { month: "May", leaves: 1700, payment: 75000 },
  { month: "June", leaves: 1900, payment: 85000 },
  { month: "July", leaves: 1600, payment: 70000 },
  { month: "August", leaves: 1800, payment: 80000 },
  { month: "September", leaves: 2000, payment: 90000 },
  { month: "October", leaves: 2100, payment: 95000 },
  { month: "November", leaves: 2300, payment: 105000 },
  { month: "December", leaves: 2500, payment: 120000 },
];



export default function SupplierDashboard() {
  const [chartType, setChartType] = useState('line');
  const location = useLocation();

  // Prepare data for the chart (quantity per supplier)
  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Tea Leaves (kg)',
        data: supplierData.map(item => item.leaves),
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // Green color
        borderColor: 'rgba(34, 197, 94, 1)', // Green color
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(34, 197, 94, 1)',
        hoverBorderColor: 'rgba(21, 128, 61, 1)',
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#fff',
        tension: 0.4,
      },
    ],
  };

  const paymentChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Payments (Rs)',
        data: supplierData.map(item => item.payment),
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // Green color
        borderColor: 'rgba(34, 197, 94, 1)', // Green color
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(34, 197, 94, 1)',
        hoverBorderColor: 'rgba(21, 128, 61, 1)',
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#fff',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Tea Leaves Supplied per Month' },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `Quantity: ${context.parsed.y} kg`;
          },
        },
      },
    },
    hover: { mode: 'nearest', intersect: true },
    scales: {
      y: { beginAtZero: true },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
  };

  useEffect(() => {
    if (location.state?.toastMessage) {
      
      // Clear the state to prevent duplicate toasts on re-render
      location.state.toastMessage = null;
    }
  }, [location.state]);

  return (
    <>
      <Toaster />
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

            {/* Chart Type Selection and Dynamic Chart Rendering */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 flex items-center gap-4">
                  <label htmlFor="chartType" className="font-medium">Chart Type:</label>
                  <select
                    id="chartType"
                    value={chartType}
                    onChange={e => setChartType(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="line">Line</option>
                    <option value="bar">Bar</option>
                  </select>
                </div>
                {chartType === 'line' ? (
                  <Line data={chartData} options={chartOptions} />
                ) : (
                  <Bar data={chartData} options={chartOptions} />
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 flex items-center gap-4">
                  <label htmlFor="paymentChartType" className="font-medium">Payment Chart Type:</label>
                  <select
                    id="paymentChartType"
                    value={chartType}
                    onChange={e => setChartType(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                  </select>
                </div>
                {chartType === 'bar' ? (
                  <Bar data={paymentChartData} options={chartOptions} />
                ) : (
                  <Line data={paymentChartData} options={chartOptions} />
                )}
              </div>
            </div>

            {/* Supplier Details Table */}
            <div className="overflow-x-auto m-6">
              <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-8'>
                <thead className="bg-gray-50">
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>No</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Month</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Tea Leaves (kg)</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Payments (Rs)</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierData.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">{data.month}</td>
                      <td className="px-6 py-3">{data.leaves}</td>
                      <td className="px-6 py-3">{data.payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

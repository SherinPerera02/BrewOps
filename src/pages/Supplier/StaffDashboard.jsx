import React from 'react'
import StaffDashboardNav from '../../components/StaffDashboardNav'
import StaffDashboardSlidebar from '../../components/StaffDashboardSlidebar'
import { FaBoxOpen, FaUsers, FaExclamationTriangle, FaPlus, FaFileAlt } from 'react-icons/fa'
import DashboardCard from '../../components/DashboardCard'
import Footer from '../../components/Footer'
import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function StaffDashboard() {

  // Line Chart Data
  const stockData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Stock (kg)",
        data: [1200, 1500, 1000, 1300, 1700, 1400, 1600],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const stockOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tea Leaves Stock Levels Over Time" },
    },
  };

  // Pie Chart Data
  const supplierData = {
    labels: ["Supplier A", "Supplier B", "Supplier C", "Supplier D"],
    datasets: [
      {
        label: "Tea Leaves Supply",
        data: [400, 300, 200, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const supplierOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Supplier-wise Tea Leaves Supply" },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <StaffDashboardNav />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64">
          <StaffDashboardSlidebar />
        </div>

        {/* Dashboard Main Content */}
        <div className="flex-1 p-6 bg-gray-100 min-h-screen flex flex-col">
          
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-5">
            <DashboardCard 
              title="Total Suppliers" 
              value="42" 
              icon={FaUsers} 
              color="bg-green-100" 
            />

            <DashboardCard 
              title="Raw Tea Inventory" 
              value="42" 
              icon={FaBoxOpen} 
              color="bg-green-100" 
            />  

            <DashboardCard 
              title="Low Stock" 
              value="42" 
              icon={FaExclamationTriangle} 
              color="bg-green-100" 
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6 mt-2">
            <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
              <FaPlus className="mr-2" /> Add Supplier
            </button>

            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
              <FaPlus className="mr-2" /> Add Inventory
            </button>

            <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition">
              <FaFileAlt className="mr-2" /> Generate Report
            </button>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 flex-1">
            <div className="bg-white p-4 rounded-lg shadow h-80">
              <Line data={stockData} options={stockOptions} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow h-80">
              <Pie data={supplierData} options={supplierOptions} />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

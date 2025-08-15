import React, { useState, useEffect } from 'react';
import StaffDashboardNav from '../../components/StaffDashboardNav';
import StaffDashboardSlidebar from '../../components/StaffDashboardSlidebar';
import { FaBoxOpen, FaUsers, FaExclamationTriangle, FaPlus, FaFileAlt, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DashboardCard from '../../components/DashboardCard';
import Footer from '../../components/Footer';
import { Line, Pie } from 'react-chartjs-2';
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
  // Dashboard state
  const [suppliers, setSuppliers] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  // Chart state
  const [stockChartData, setStockChartData] = useState({ labels: [], datasets: [] });
  const [supplierChartData, setSupplierChartData] = useState({ labels: [], datasets: [] });

  // Sidebar toggle for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch Dashboard summary
  useEffect(() => {
    axios.get("/api/dashboard/summary")
      .then(res => {
        setSuppliers(res.data.totalSuppliers);
        setInventory(res.data.totalInventory);
        setLowStock(res.data.lowStock);
      })
      .catch(err => console.log(err));
  }, []);

  // Fetch Charts data
  useEffect(() => {
    axios.get("/api/dashboard/charts")
      .then(res => {
        setStockChartData({
          labels: res.data.stock.labels,
          datasets: [{
            label: "Stock (kg)",
            data: res.data.stock.data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.3
          }]
        });

        setSupplierChartData({
          labels: res.data.suppliers.labels,
          datasets: [{
            label: "Tea Leaves Supply",
            data: res.data.suppliers.data,
            backgroundColor: [
              "rgba(255,99,132,0.7)",
              "rgba(54,162,235,0.7)",
              "rgba(255,206,86,0.7)",
              "rgba(75,192,192,0.7)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54,162,235,1)",
              "rgba(255,206,86,1)",
              "rgba(75,192,192,1)"
            ],
            borderWidth: 1
          }]
        });
      })
      .catch(err => console.log(err));
  }, []);

  const stockOptions = { responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Tea Leaves Stock Levels Over Time" } } };
  const supplierOptions = { responsive: true, plugins: { legend: { position: "right" }, title: { display: true, text: "Supplier-wise Tea Leaves Supply" } } };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navigation */}
      <StaffDashboardNav />

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center bg-gray-100 p-2">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-gray-300 rounded">
          <FaBars size={20} />
        </button>
        <p className="ml-2 font-semibold">Dashboard</p>
      </div>

      <div className="flex flex-1 relative">

        {/* Sidebar */}
        <div className={`fixed z-50 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <StaffDashboardSlidebar />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"></div>}

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 bg-gray-100 min-h-screen flex flex-col">

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 mt-2">
            <DashboardCard title="Total Suppliers" value={suppliers} icon={FaUsers} color="bg-green-100" />
            <DashboardCard title="Raw Tea Inventory (Kg)" value={inventory} icon={FaBoxOpen} color="bg-green-100" />
            <DashboardCard title="Low Stock" value={lowStock} icon={FaExclamationTriangle} color="bg-green-100" />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Link to="/suppliers/create">
              <button className="flex items-center bg-green-600 text-white px-3 py-2 rounded shadow hover:bg-green-700 transition">
                <FaPlus className="mr-2" /> Add Supplier
              </button>
            </Link>
            <Link to="/supplyRecode/create">
              <button className="flex items-center bg-blue-600 text-white px-3 py-2 rounded shadow hover:bg-blue-700 transition">
                <FaPlus className="mr-2" /> Add Inventory
              </button>
            </Link>
            <Link to="#">
              <button className="flex items-center bg-gray-600 text-white px-3 py-2 rounded shadow hover:bg-gray-700 transition">
                <FaFileAlt className="mr-2" /> Generate Report
              </button>
            </Link>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="bg-white p-3 rounded-lg shadow h-72 md:h-80">
              <Line data={stockChartData} options={stockOptions} />
            </div>
            <div className="bg-white p-3 rounded-lg shadow h-72 md:h-80">
              <Pie data={supplierChartData} options={supplierOptions} />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

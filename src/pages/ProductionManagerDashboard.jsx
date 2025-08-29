import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import { FaBell, FaUsers, FaBoxOpen, FaExclamationTriangle, FaPlus, FaFileAlt, FaHome, FaWarehouse, FaTruck, FaLeaf } from 'react-icons/fa';
import { MdDashboardCustomize } from "react-icons/md";
import Spinner from '../components/Spinner';
import NavigationBar from '../components/navigationBar';
import DashboardCard from '../components/DashboardCard';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { MdDashboard } from 'react-icons/md';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const ProductionManagerDashboard = () => {
  const [originalInventory, setOriginalInventory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRawLeaves, setTotalRawLeaves] = useState(0);
  const [previousTotal, setPreviousTotal] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [messages, setMessages] = useState([]);

  const [suppliers, setSuppliers] = useState(5); // Mock data
  const [lowStock, setLowStock] = useState(2); // Mock data
  const [stockChartData, setStockChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Stock (kg)',
      data: [5000, 7000, 6000, 8000, 7500], // Mock data
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3
    }]
  });
  const [supplierChartData, setSupplierChartData] = useState({
    labels: ['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D'],
    datasets: [{
      label: 'Tea Leaves Supply',
      data: [2000, 3000, 1500, 2500], // Mock data
      backgroundColor: [
        'rgba(255,99,132,0.7)',
        'rgba(54,162,235,0.7)',
        'rgba(255,206,86,0.7)',
        'rgba(75,192,192,0.7)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54,162,235,1)',
        'rgba(255,206,86,1)',
        'rgba(75,192,192,1)'
      ],
      borderWidth: 1
    }]
  });

  // Fetch inventory
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/inventory')
      .then((response) => {
        setOriginalInventory(response.data);
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

    axios.get('/api/dashboard/summary')
      .then(res => {
        setSuppliers(res.data.totalSuppliers);
        setLowStock(res.data.lowStock);
      })
      .catch(err => console.log(err));

    axios.get('/api/dashboard/charts')
      .then(res => {
        setStockChartData({
          labels: res.data.stock.labels,
          datasets: [{
            label: 'Stock (kg)',
            data: res.data.stock.data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.3
          }]
        });

        setSupplierChartData({
          labels: res.data.suppliers.labels,
          datasets: [{
            label: 'Tea Leaves Supply',
            data: res.data.suppliers.data,
            backgroundColor: [
              'rgba(255,99,132,0.7)',
              'rgba(54,162,235,0.7)',
              'rgba(255,206,86,0.7)',
              'rgba(75,192,192,0.7)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54,162,235,1)',
              'rgba(255,206,86,1)',
              'rgba(75,192,192,1)'
            ],
            borderWidth: 1
          }]
        });
      })
      .catch(err => console.log(err));

    // Fetch messages from the backend

  }, []);

  // Monitor total inventory
  useEffect(() => {
    const total = originalInventory.reduce((sum, item) => sum + item.quantity, 0);
    setTotalRawLeaves(total);

    if (total < 10000 && previousTotal !== null && total !== previousTotal) {
      const alertMsg = `Raw leaves inventory is below 10,000 kg! Current: ${total} kg.`;

      // Toast alert
      toast.error(alertMsg);


    }

    setPreviousTotal(total);
  }, [originalInventory]);

  // Chart options
  const stockOptions = { responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Tea Leaves Stock Levels Over Time' } } };
  const supplierOptions = { responsive: true, plugins: { legend: { position: 'right' }, title: { display: true, text: 'Supplier-wise Tea Leaves Supply' } } };

  // Chart data
  const chartData = {
    labels: inventory.map(item => item.batchid),
    datasets: [
      {
        label: 'Quantity',
        data: inventory.map(item => item.quantity),
        backgroundColor: 'rgba(34,197,94,0.7)',
        borderColor: 'rgba(34,197,94,1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Inventory Quantity per Batch' },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar notifications={notifications} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 h-screen p-6 space-y-4 sticky top-0">
          <Link to="/" className="px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium flex items-center">
            <FaHome className="mr-3" /> Home
          </Link>
          <Link to="/ProductionManagerDashboard" className="px-4 py-2 rounded bg-green-600  text-sm font-medium flex items-center">
            <MdDashboardCustomize className="mr-3" /> Dashboard
          </Link>
          <Link to="/inventories" className="px-4 py-2 rounded hover:bg-gray-700 bg-opacity-40 text-sm font-medium flex items-center">
            <FaWarehouse className="mr-3" /> Inventory
          </Link>
          <Link to="/SupplierHome" className="px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium flex items-center">
            <FaUsers className="mr-3" /> Supplier
          </Link>
          <Link to="/production" className="px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium flex items-center">
            <FaTruck className="mr-3" /> Production
          </Link>
          


        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Production Manager Dashboard</h1>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 mt-2">
            <DashboardCard title="Total Suppliers" value={suppliers} icon={FaUsers} color="bg-green-100" />
            <DashboardCard title="Raw Tea Inventory (Kg)" value={totalRawLeaves} icon={FaBoxOpen} color="bg-green-100" />
            <DashboardCard title="Low Stock" value={lowStock} icon={FaExclamationTriangle} color="bg-yellow-100" />
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

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="bg-white p-3 rounded-lg shadow h-72 md:h-80">
              <Line data={stockChartData} options={stockOptions} />
            </div>
            <div className="bg-white p-3 rounded-lg shadow h-72 md:h-80">
              <Pie data={supplierChartData} options={supplierOptions} />
            </div>
          </div>

          {/* Inventory Chart */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="mb-4 flex items-center gap-4">
              <label htmlFor="chartType" className="font-medium">Chart Type:</label>
              <select
                id="chartType"
                value={chartType}
                onChange={e => setChartType(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="bar">Bar</option>
                <option value="line">Line</option>
              </select>
            </div>
            {chartType === 'bar' ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <Line data={chartData} options={chartOptions} />
            )}
          </div>
        </main>
      </div>

      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ProductionManagerDashboard;

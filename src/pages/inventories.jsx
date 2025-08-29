import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { FaBoxOpen, FaTrashAlt, FaEdit, FaPlusCircle } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import NavigationBar from '../components/navigationBar';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [originalInventory, setOriginalInventory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [totalRawLeaves, setTotalRawLeaves] = useState(0);
  const [previousTotal, setPreviousTotal] = useState(null);
  const [chartType, setChartType] = useState('line');
  const lowInventoryToastShown = useRef(false);
  const location = useLocation();

  // Send a notification to the server (will be picked up by production manager)
  const sendLowInventoryNotification = async (total) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.post('http://localhost:5000/api/notifications', {
        title: 'Low Raw Leaves Inventory',
        body: `Raw leaves inventory is below 10,000 kg. Current total: ${total} kg.`,
        // backend may accept additional fields like recipientRole or meta; adjust if needed
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Failed to send low inventory notification:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/inventory')
      .then((response) => {
        const inventories = response.data.data || [];
        // sort newest first by createdAt
        inventories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOriginalInventory(inventories);
        setInventory(inventories);
        setVisibleCount(10);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setInventory(originalInventory);
      setVisibleCount(10);
    } else {
      const filtered = originalInventory.filter(item =>
        item.inventoryid && item.inventoryid.toLowerCase().includes(searchInput.toLowerCase())
      );
      setInventory(filtered);
      setVisibleCount(10);
    }
  };

  const handleReportGeneration = () => {
    try {
      const doc = new jsPDF();
      const headers = [['Inventory ID', 'Quantity', 'Date Created']];
      const rows = inventory.map(item => [
        item.inventoryid,
        item.quantity,
        item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''
      ]);

      doc.autoTable({
        head: headers,
        body: rows,
        startY: 20,
      });

      doc.save('Inventory_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    if (e.target.value) {
      const filtered = originalInventory.filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate.getMonth() === parseInt(e.target.value);
      });
      setInventory(filtered);
      setVisibleCount(10);
    } else {
      setInventory(originalInventory);
      setVisibleCount(10);
    }
  };

  const handleSort = () => {
    const sorted = [...inventory].sort((a, b) => a.quantity - b.quantity);
    setInventory(sorted);
    setVisibleCount(10);
  };

  useEffect(() => {
    // Calculate total raw leaves inventory
    const total = originalInventory.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setTotalRawLeaves(total);

    // Check if inventory is below threshold and avoid duplicate notifications
    if (total < 10000 && previousTotal !== null && total !== previousTotal) {
      // Send notification to production manager via backend
      sendLowInventoryNotification(total);
      // Show a local toast once for this low-inventory event
      if (!lowInventoryToastShown.current) {
        toast.error('Warning: Raw leaves inventory is below 10,000 kg! Notify the production manager.');
        lowInventoryToastShown.current = true;
      }
    }

    // Reset the local-toast flag if inventory recovers above threshold
    if (total >= 10000 && lowInventoryToastShown.current) {
      lowInventoryToastShown.current = false;
    }

    // Update previous total after all checks
    setPreviousTotal(total);
  }, [originalInventory]);

  const chartData = {
    labels: inventory.map(item => item.inventoryid),
    datasets: [
      {
        label: 'Quantity',
        data: inventory.map(item => item.quantity),
        backgroundColor: 'rgba(34,197,94,0.7)',
        borderColor: 'rgba(34,197,94,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(34,197,94,1)',
        hoverBorderColor: 'rgba(21,128,61,1)',
        pointBackgroundColor: 'rgba(34,197,94,1)',
        pointBorderColor: '#fff',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Inventory Quantity per Item' },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `Quantity: ${context.parsed.y}`;
          }
        }
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      {/* Layout with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 h-screen p-6 space-y-4 sticky top-0">
          <Link to="/inventories" className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 bg-opacity-40 text-sm font-medium">
            <FaBoxOpen /> Inventory
          </Link>
          <Link to="/waste-management" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium">
            <FaTrashAlt /> Waste Management
          </Link>
          <Link to="/Production" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium">
            <FaEdit /> Production
          </Link>
          <Link to="/rawleaves" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium">
            <FaPlusCircle /> Raw Leaves Management
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Inventory List</h1>
            <div className="flex flex-wrap items-center gap-4">
              <input
                type="text"
                placeholder="Search by Inventory Number..."
                className="border border-gray-300 px-4 py-2 rounded"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900">
                Search
              </button>
              <button onClick={handleReportGeneration} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900">
                Generate Report
              </button>
              <Link
                to="/inventory/creates"
                state={{ background: location }}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
              >
                <MdOutlineAddBox className="text-xl mr-2" />
                Add Inventory
              </Link>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="flex items-center gap-4 mb-4 w-auto">
              <label htmlFor="month" className="font-medium">Select Month:</label>
              <select
                id="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="">All</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                ))}
              </select>
            </div>

            {/* Display for current total raw leaves inventory */}
            <div className="bg-green-100 p-4 rounded-lg w-auto shadow-md mb-2">
              <h2 className="text-lg font-bold text-green-800">Current Raw Leaves Inventory</h2>
              <p className="text-green-700 text-xl">{totalRawLeaves} kg</p>
            </div>

            {/* Minimum required inventory display */}
            <div className="bg-yellow-100 p-4 rounded-lg w-auto shadow-md mb-2">
              <h2 className="text-lg font-bold text-yellow-800">Minimum Required to Reach Full Inventory</h2>
              <p className="text-yellow-700 text-xl">{Math.max(10000 - totalRawLeaves, 0)} kg</p>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="overflow-x-auto">
              <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-8'>
                <thead className="bg-gray-50">
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>No</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Inventory ID</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Quantity (kg)</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Date Created</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.slice(0, visibleCount).map((item, index) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3 font-semibold text-black">{item.inventoryid ?? '-'}</td>
                      <td className="px-6 py-3">{item.quantity ?? '-'}</td>
                      <td className="px-6 py-3">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex gap-4">
                          <Link to={`/inventory/${item.id}`} state={{ background: location }} className="text-green-700 text-xl">
                            <BsInfoCircle />
                          </Link>
                          <Link to={`/inventory/edit/${item.id}`} state={{ background: location }} className="text-yellow-600 text-xl">
                            <AiOutlineEdit />
                          </Link>
                          <Link to={`/inventory/delete/${item.id}`} state={{ background: location }} className="text-red-600 text-xl">
                            <MdOutlineDelete />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {inventory.length > visibleCount && (
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setVisibleCount((c) => Math.min(c + 10, inventory.length))}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Show more
              </button>
            </div>
          )}

          {/* Interactive Chart at the end of the page */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-2xl w-auto mx-auto">
            <div className="mb-4 flex items-center w-auto gap-4">
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

export default Home;
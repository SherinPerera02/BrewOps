import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';

import NavigationBar from '../components/NavigationBar';

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
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [totalRawLeaves, setTotalRawLeaves] = useState(0);
  const [previousTotal, setPreviousTotal] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Replace with mock data if backend not ready
    setTimeout(() => {
      const mockData = [
        { _id: '1', batchid: 'B-1001', category: 'Tea', inventorynumber: 'INV001', quantity: 100, date: '2023-01-15' },
        { _id: '2', batchid: 'B-1002', category: 'Herbal', inventorynumber: 'INV002', quantity: 60, date: '2023-02-20' },
        { _id: '3', batchid: 'B-1003', category: 'Tea', inventorynumber: 'INV003', quantity: 80, date: '2023-01-10' },
        { _id: '4', batchid: 'B-1004', category: 'Herbal', inventorynumber: 'INV004', quantity: 120, date: '2023-03-05' },
        { _id: '5', batchid: 'B-1005', category: 'Green', inventorynumber: 'INV005', quantity: 90, date: '2023-02-15' },
        { _id: '6', batchid: 'B-1006', category: 'Black', inventorynumber: 'INV006', quantity: 110, date: '2023-01-25' }
      ];
      setOriginalInventory(mockData);
      setInventory(mockData);
      setLoading(false);
    }, 500);
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   axios.get('http://localhost:5555/inventory')
  //     .then((response) => {
  //       setOriginalInventory(response.data);
  //       setInventory(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setLoading(false);
  //     });
  // }, []);

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setInventory(originalInventory);
    } else {
      const filtered = originalInventory.filter(item =>
        item.batchid.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.inventorynumber.toLowerCase().includes(searchInput.toLowerCase())
      );
      setInventory(filtered);
    }
  };

  const handleReportGeneration = () => {
    try {
      const doc = new jsPDF();
      const headers = [['Batch ID', 'Category', 'Inventory Number', 'Quantity']];
      const rows = inventory.map(item => [item.batchid, item.category, item.inventorynumber, item.quantity]);

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
        const itemDate = new Date(item.date); // Assuming `date` field exists in inventory data
        return itemDate.getMonth() === parseInt(e.target.value);
      });
      setInventory(filtered);
    } else {
      setInventory(originalInventory);
    }
  };

  const handleSort = () => {
    const sorted = [...inventory].sort((a, b) => a.quantity - b.quantity);
    setInventory(sorted);
  };

  // Chart type state
  const [chartType, setChartType] = useState('line');

  // Prepare data for the chart (quantity per batchid)
  const chartData = {
    labels: inventory.map(item => item.batchid),
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
      title: { display: true, text: 'Inventory Quantity per Batch' },
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

  useEffect(() => {
    // Calculate total raw leaves inventory
    const total = originalInventory.reduce((sum, item) => sum + item.quantity, 0);
    setTotalRawLeaves(total);

    // Check if inventory is below threshold and avoid duplicate notifications
    if (total < 10000 && previousTotal !== null && total !== previousTotal) {
      // Show toast alert to the user
      toast.error('Warning: Raw leaves inventory is below 10,000 kg! Notify the production manager.');

      // Simulate sending a message to the production manager
      const message = {
        to: 'production_manager@example.com',
        subject: 'Low Raw Leaves Inventory Alert',
        body: `The current raw leaves inventory is ${total} kg, which is below the threshold of 10,000 kg. Please take necessary action.`
      };

      console.log('Notification sent to production manager:', message);
      // Replace the above console.log with an actual API call to send the message
      // Example: axios.post('/api/notify', message);
    }

    // Update previous total after all checks
    setPreviousTotal(total);
  }, [originalInventory]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      {/* Layout with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 h-screen p-6 space-y-4 sticky top-0">
          
          <Link to="/inventories" className="block px-4 py-2 rounded bg-green-600 bg-opacity-40 text-sm font-medium">
            Inventory
          </Link>
          <Link to="/waste-management" className="block px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium">
            Waste Management
          </Link>
          <Link to="/Pendingshipmentss" className="block px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium">
            Pending Shipments
          </Link>
          <Link to="/Irawleaves" className="block px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium">
            Raw Leaves Management
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Inventory List</h1>
            <div className="flex flex-wrap items-center gap-4">
              <input
                type="text"
                placeholder="Search..."
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
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Batch ID</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Category</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Inventory Number</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Quantity</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example row, replace with your dynamic data as needed */}
                  {inventory.map((item, index) => (
                    <tr key={item._id} className="border-t">
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">{item.batchid ?? '-'}</td>
                      <td className="px-6 py-3">{item.category ?? '-'}</td>
                      <td className="px-6 py-3">{item.inventorynumber ?? '-'}</td>
                      <td className="px-6 py-3">{item.quantity ?? '-'}</td>
                      <td className="px-6 py-3">
                        <div className="flex gap-4">
                          <Link to={`/inventory/details/${item._id}`} className="text-green-700 text-xl">
                            <BsInfoCircle />
                          </Link>
                          <Link to={`/inventory/edit/${item._id}`} className="text-yellow-600 text-xl">
                            <AiOutlineEdit />
                          </Link>
                          <Link to={`/inventory/delete/${item._id}`} className="text-red-600 text-xl">
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';

import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';




import Spinner from '../components/Spinner';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
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

  useEffect(() => {
    setLoading(true);

    // Replace with mock data if backend not ready
    setTimeout(() => {
      const mockData = [
        { _id: '1', batchid: 'B-1001', category: 'Tea', inventorynumber: 'INV001', quantity: 100 },
        { _id: '2', batchid: 'B-1002', category: 'Herbal', inventorynumber: 'INV002', quantity: 60 },
        { _id: '3', batchid: 'B-1003', category: 'Tea', inventorynumber: 'INV003', quantity: 80 },
        { _id: '4', batchid: 'B-1004', category: 'Herbal', inventorynumber: 'INV004', quantity: 120 },
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


  // Chart type state
  const [chartType, setChartType] = useState('bar');

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
    </div>
  );
};

export default Home;

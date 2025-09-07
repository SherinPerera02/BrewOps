import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import NavigationBar from '../../components/navigationBar';
import SupplierSidebar from '../../components/SupplierSidebar';

import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';
import { FaSearch, FaFileAlt, FaBoxes, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ShowSupplyRecord from './ShowSupplyRecode'; // ✅ modal import

export default function ProductRecord() {
  const [products, setProducts] = useState([
    {
      _id: 'prod1',
      supplierName: 'Green Tea Supplies',
      productName: 'Premium Green Tea',
      manufactureDate: '2025-07-01',
      quantityInStock: 150,
      unitPrice: 250,
      totalValue: 37500,
      status: 'Available',
    },
    {
      _id: 'prod2',
      supplierName: 'Organic Herbs Ltd',
      productName: 'Chamomile Tea',
      manufactureDate: '2025-06-15',
      quantityInStock: 200,
      unitPrice: 180,
      totalValue: 36000,
      status: 'Available',
    },
    {
      _id: 'prod3',
      supplierName: 'Mountain Tea Co',
      productName: 'Earl Grey',
      manufactureDate: '2025-05-20',
      quantityInStock: 75,
      unitPrice: 320,
      totalValue: 24000,
      status: 'Low Stock',
    },
  ]);

  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('supplierName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');

  // ✅ For modal
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // Uncomment and replace with your API when backend ready
    /*
    setLoading(true);
    axios
      .get('http://localhost:8080/api/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
    */
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this supply record?')) {
      setProducts(products.filter((product) => product._id !== id));
    }
  };

  // Filtering + Sorting
  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch =
        product.productName?.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.supplierName?.toLowerCase().includes(searchInput.toLowerCase());
      const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

  // Summary
  const summaryStats = {
    totalRecords: products.length,
    totalValue: products.reduce((sum, item) => sum + item.totalValue, 0),
    totalQuantity: products.reduce((sum, item) => sum + item.quantityInStock, 0),
    lowStockItems: products.filter((item) => item.status === 'Low Stock').length,
    uniqueSuppliers: new Set(products.map((item) => item.supplierName)).size,
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header>
        <NavigationBar />
      </header>

      <div className="flex flex-1">
        <SupplierSidebar />

        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Supply Record Dashboard
            </h1>
            <p className="text-gray-600">Manage and track all supply records</p>
          </div>

          {/* ✅ Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex items-center">
                <FaFileAlt className="text-blue-500 text-2xl mr-3" />
                <div>
                  <h3 className="text-sm text-gray-600">Total Records</h3>
                  <p className="text-2xl font-bold">{summaryStats.totalRecords}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex items-center">
                <FaBoxes className="text-green-500 text-2xl mr-3" />
                <div>
                  <h3 className="text-sm text-gray-600">Total Quantity</h3>
                  <p className="text-2xl font-bold">{summaryStats.totalQuantity}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
              <div className="flex items-center">
                <FaDollarSign className="text-yellow-500 text-2xl mr-3" />
                <div>
                  <h3 className="text-sm text-gray-600">Total Value</h3>
                  <p className="text-2xl font-bold">Rs. {summaryStats.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
              <div className="flex items-center">
                <span className="bg-purple-500 text-white px-2 py-1 rounded-lg mr-2">S</span>
                <div>
                  <h3 className="text-sm text-gray-600">Suppliers</h3>
                  <p className="text-2xl font-bold">{summaryStats.uniqueSuppliers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
              <div className="flex items-center">
                <span className="bg-red-500 text-white px-2 py-1 rounded-lg mr-2">!</span>
                <div>
                  <h3 className="text-sm text-gray-600">Low Stock</h3>
                  <p className="text-2xl font-bold">{summaryStats.lowStockItems}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 justify-between">
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="supplierName">Sort by Supplier</option>
                <option value="productName">Sort by Product</option>
                <option value="manufactureDate">Sort by Date</option>
                <option value="quantityInStock">Sort by Quantity</option>
                <option value="totalValue">Sort by Value</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Link to="/report" className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Generate Report
              </Link>
              <Link to="/supplyRecode/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                <MdOutlineAddBox className="inline mr-1" />
                Add New
              </Link>
            </div>
          </div>

          {/* ✅ Results Info */}
          <p className="mb-4 text-gray-600">
            Showing {filteredAndSortedProducts.length} of {products.length} records
          </p>

          {/* ✅ Table */}
          {loading ? (
            <Spinner />
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Supplier</th>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Qty</th>
                    <th className="px-6 py-3 text-left">Unit Price</th>
                    <th className="px-6 py-3 text-left">Total Value</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-3">{item.supplierName}</td>
                        <td className="px-6 py-3">{item.productName}</td>
                        <td className="px-6 py-3">{item.manufactureDate}</td>
                        <td className="px-6 py-3">{item.quantityInStock}</td>
                        <td className="px-6 py-3">Rs. {item.unitPrice}</td>
                        <td className="px-6 py-3 font-semibold text-green-600">
                          Rs. {item.totalValue}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'Available'
                                ? 'bg-green-100 text-green-700'
                                : item.status === 'Low Stock'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 flex gap-3">
                          <button
                            onClick={() => setSelectedRecord(item)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <BsInfoCircle />
                          </button>
                          <Link
                            to={`/supplyRecode/edit/${item._id}`}
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            <AiOutlineEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <MdOutlineDelete />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-10 text-gray-500">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* ✅ Modal */}
      {selectedRecord && (
        <ShowSupplyRecord record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}
    </div>
  );
}

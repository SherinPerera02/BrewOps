import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../components/NavigationBar';
import Sidebar from '../../components/SupplierSidebar'; // or a relevant Sidebar component
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';

import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function ProductRecord() {
  const [products, setProducts] = useState([
    {
      _id: 'prod1',
      productName: 'Sample Product',
      manufactureDate: '2025-07-01',
      quantityInStock: 150,
      unitPrice: 250,
      totalValue: 37500,
      status: 'Available'
    }
  ]); // Sample data row
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((product) => product._id !== id));
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavigationBar />
      </header>

      <div className="flex flex-1">
        <Sidebar /> {/* Reuse supplier sidebar or create your own */}

        <main className="flex-1 p-6 bg-gray-100">
          {/* Header and search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Product Record List
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <input
                type="text"
                placeholder="Search Product Name"
                className="border border-gray-300 px-4 py-2 rounded"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900">
                Search
              </button>

              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900">
                Generate Report
              </button>

              <Link
                to="/products/create"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
              >
                <MdOutlineAddBox className="text-xl mr-2" />
                Add New
              </Link>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <Spinner />
          ) : (
            <>
              {searchInput.trim() !== '' && filteredProducts.length === 0 ? (
                <p className="text-center text-red-500 mt-6">
                  No results found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-10">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Manufacture Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Quantity in Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Unit Price (Rs.)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Total Value (Rs.)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(filteredProducts.length > 0
                        ? filteredProducts
                        : products
                      ).map((item) => (
                        <tr key={item._id} className="hover:bg-gray-100">
                          <td className="py-4 px-6">{item.productName}</td>
                          <td className="py-4 px-6">{item.manufactureDate}</td>
                          <td className="py-4 px-6">{item.quantityInStock}</td>
                          <td className="py-4 px-6">{item.unitPrice}</td>
                          <td className="py-4 px-6">{item.totalValue}</td>
                          <td className="py-4 px-6">{item.status}</td>
                          <td className="py-4 px-6">
                            <div className="flex gap-4">
                              {/* View */}
                              <Link
                                to={`/products/details/${item._id}`}
                                className="text-green-700 text-xl"
                              >
                                <BsInfoCircle />
                              </Link>

                              {/* Edit */}
                              <Link
                                to={`/products/edit/${item._id}`}
                                className="text-yellow-600 text-xl"
                              >
                                <AiOutlineEdit />
                              </Link>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600 text-xl"
                              >
                                <MdOutlineDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <div className="mb-10">
        <Footer />
      </div>
    </div>
  );
}

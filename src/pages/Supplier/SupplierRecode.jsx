import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../components/NavigationBar';
import SupplierSidebar from '../../components/SupplierSidebar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';

import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function SupplierRecode() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/suppliers')
      .then((res) => {
        setSuppliers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching suppliers:', err);
        setLoading(false);
      });
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName?.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavigationBar />
      </header>

      <div className="flex flex-1">
        <SupplierSidebar />

        <main className="flex-1 p-6 bg-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Supply Record List
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <input
                type="text"
                placeholder="Search Supplier Name"
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
                to="/supplyRecode/create"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
              >
                <MdOutlineAddBox className="text-xl mr-2" />
                Add New
              </Link>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <>
              {searchInput.trim() !== '' && filteredSuppliers.length === 0 ? (
                <p className="text-center text-red-500 mt-6">
                  No results found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-10">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Supplier
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Supply Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Quantity (Kg)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Unit Price (Rs.)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Cost (Rs.)
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
                      {/* Example static row */}
                      <tr className="hover:bg-gray-50 bg-green-50">
                        <td className="py-4 px-6">Sample Supplier</td>
                        <td className="py-4 px-6">2025-08-08</td>
                        <td className="py-4 px-6">500</td>
                        <td className="py-4 px-6">150</td>
                        <td className="py-4 px-6">75000</td>
                        <td className="py-4 px-6">Pending</td>
                        <td className="py-4 px-6">
                          <div className="flex gap-4">
                            <button className="text-green-700 text-xl">
                              <BsInfoCircle />
                            </button>
                            <button className="text-yellow-600 text-xl">
                              <AiOutlineEdit />
                            </button>
                            <button className="text-red-600 text-xl">
                              <MdOutlineDelete />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Dynamic rows from API */}
                      {(filteredSuppliers.length > 0
                        ? filteredSuppliers
                        : suppliers
                      ).map((item) => (
                        <tr key={item._id} className="hover:bg-gray-100">
                          <td className="py-4 px-6">{item.supplierName}</td>
                          <td className="py-4 px-6">{item.supplyDate}</td>
                          <td className="py-4 px-6">{item.quantity}</td>
                          <td className="py-4 px-6">{item.unitPrice}</td>
                          <td className="py-4 px-6">{item.cost}</td>
                          <td className="py-4 px-6">{item.status}</td>
                          <td className="py-4 px-6">
                            <div className="flex gap-4">
                              {/* View */}
                              <Link
                                to={`/ShowSupplyRecode/${item._id}`}
                                className="text-green-700 text-xl"
                              >
                                <BsInfoCircle />
                              </Link>

                              {/* Edit - FIXED URL */}
                              <Link
                                to={`/EditSupplyRecode/edit/${item._id}`}
                                className="text-yellow-600 text-xl"
                              >
                                <AiOutlineEdit />
                              </Link>

                              {/* Delete */}
                              <Link
                                to={`/SupplyRecode/delete/${item._id}`}
                                className="text-red-600 text-xl"
                              >
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
            </>
          )}
        </main>
      </div>
      <div className="mb-10">
        <Footer />
      </div>
    </div>
  );
}

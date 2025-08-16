import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import SupplierSidebar from '../../components/SupplierSidebar';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import Spinner from '../../components/Spinner';
import Footer from '../../components/Footer';

export default function SupplierHome1() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setLoading(true);
    const demoSupplier = [
      {
        _id: 'sample1',
        supplierId: 'S001',
        supplierName: 'Kamal Perera',
        address: 'Matara',
        contactNumber: '0771234567',
        email: 'kamal@example.com',
      },
      {
        _id: 'sample2',
        supplierId: 'S002',
        supplierName: 'Nimal Silva',
        address: 'Galle',
        contactNumber: '0777654321',
        email: 'nimal@example.com',
      },
    ];
    setSuppliers(demoSupplier);
    setLoading(false);
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName?.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavigationBar />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <SupplierSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100">
          {/* Header + Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Supplier List</h1>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search Supplier Name"
                className="border border-gray-300 px-4 py-2 rounded w-full md:w-auto"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
                onClick={() => alert('Generate report logic here')}
              >
                Generate Report
              </button>
              <Link
                to="/suppliers/create"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
              >
                <MdOutlineAddBox className="text-xl mr-2" /> Add Supplier
              </Link>
            </div>
          </div>

          {/* Table or Cards */}
          {loading ? (
            <Spinner />
          ) : (
            <>
              {filteredSuppliers.length === 0 && searchInput.trim() !== '' ? (
                <p className="text-center text-red-500 mt-6">No results found.</p>
              ) : (
                <div className="overflow-x-auto">
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Supplier ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Address</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Contact No</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(filteredSuppliers.length > 0 ? filteredSuppliers : suppliers).map((item) => (
                          <tr key={item._id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-6">{item.supplierId}</td>
                            <td className="py-4 px-6">{item.supplierName}</td>
                            <td className="py-4 px-6">{item.address}</td>
                            <td className="py-4 px-6">{item.contactNumber}</td>
                            <td className="py-4 px-6">{item.email}</td>
                            <td className="py-4 px-6 flex gap-3">
                              <Link to={`/suppliers/details/${item._id}`} className="text-green-700 text-xl">
                                <BsInfoCircle />
                              </Link>
                              <Link to={`/suppliers/edit/${item._id}`} className="text-yellow-600 text-xl">
                                <AiOutlineEdit />
                              </Link>
                              <Link to={`/suppliers/delete/${item._id}`} className="text-red-600 text-xl">
                                <MdOutlineDelete />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden flex flex-col gap-4">
                    {(filteredSuppliers.length > 0 ? filteredSuppliers : suppliers).map((item) => (
                      <div key={item._id} className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
                        <p>
                          <span className="font-semibold">ID:</span> {item.supplierId}
                        </p>
                        <p>
                          <span className="font-semibold">Name:</span> {item.supplierName}
                        </p>
                        <p>
                          <span className="font-semibold">Address:</span> {item.address}
                        </p>
                        <p>
                          <span className="font-semibold">Contact:</span> {item.contactNumber}
                        </p>
                        <p>
                          <span className="font-semibold">Email:</span> {item.email}
                        </p>
                        <div className="flex gap-3 mt-2">
                          <Link to={`/suppliers/details/${item._id}`} className="text-green-700 text-xl">
                            <BsInfoCircle />
                          </Link>
                          <Link to={`/suppliers/edit/${item._id}`} className="text-yellow-600 text-xl">
                            <AiOutlineEdit />
                          </Link>
                          <Link to={`/suppliers/delete/${item._id}`} className="text-red-600 text-xl">
                            <MdOutlineDelete />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

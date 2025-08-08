import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import SupplierSidebar from '../../components/SupplierSidebar';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import Spinner from '../../components/spinner';

export default function SupplierHome1() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  // 👉 Load one example supplier
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
    ];
    setSuppliers(demoSupplier);
    setLoading(false);
  }, []);

  // 👉 Filter suppliers by name
  useEffect(() => {
    if (searchInput.trim() === '') {
      setFilteredSuppliers([]);
    } else {
      const filtered = suppliers.filter((supplier) =>
        supplier.supplierName?.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    }
  }, [searchInput, suppliers]);

  return (
    <div className="flex flex-col min-h-screen">
    
      <header>
        <NavigationBar />
      </header>

      
      <div className="flex flex-1">
        
        <SupplierSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Supplier List</h1>
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
                to="/suppliers/create"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
              >
                <MdOutlineAddBox className="text-xl mr-2" />
                Add Supplier
              </Link>
            </div>
          </div>

          
          {loading ? (
            <Spinner />
          ) : (
            <>
              {searchInput.trim() !== '' && filteredSuppliers.length === 0 ? (
                <p className="text-center text-red-500 mt-6">No results found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-10">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Supplier ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Contact No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(filteredSuppliers.length > 0 ? filteredSuppliers : suppliers).map((item) => (
                        <tr key={item._id}>
                          <td className="py-4 px-6">{item.supplierId}</td>
                          <td className="py-4 px-6">{item.supplierName}</td>
                          <td className="py-4 px-6">{item.address}</td>
                          <td className="py-4 px-6">{item.contactNumber}</td>
                          <td className="py-4 px-6">{item.email}</td>
                          <td className="py-4 px-6">
                            <div className="flex gap-4">
                              <Link to={`/suppliers/details/${item._id}`} className="text-green-700 text-xl">
                                <BsInfoCircle />
                              </Link>
                              <Link to={`/Suppliers/edit/${item._id}`} className="text-yellow-600 text-xl">
                                <AiOutlineEdit />
                              </Link>
                              <Link to={`/Suppliers/delete/${item._id}`} className="text-red-600 text-xl">
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

    
      <Footer />
    </div>
  );
}

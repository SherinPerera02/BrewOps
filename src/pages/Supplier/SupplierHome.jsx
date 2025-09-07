import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/navigationBar";
import SupplierSidebar from "../../components/SupplierSidebar";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import CreateSupplier from "./CreateSupplier";
import ShowSupplier from "./ShowSupplier";
import EditSupplier from "./EditSupplier";
import DeleteSuppliers from "./DeleteSuppliers";

export default function SupplierHome() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [viewSupplier, setViewSupplier] = useState(null);
  const [deleteSupplierId, setDeleteSupplierId] = useState(null);

  // Demo data load
  useEffect(() => {
    setLoading(true);
    const demoSupplier = [
      {
        id: "SUP001",
        name: "Green Tea Supplies",
        contact: "+94 77 123 4567",
        email: "greentea@example.com",
        address: "123 Tea Road, Nuwara Eliya, Sri Lanka",
        createdAt: "2025-08-01T10:00:00Z",
        updatedAt: "2025-08-10T14:30:00Z",
        lastSupplyDate: "2025-08-15",
        totalSupplied: 2500,
        outstanding: 50000,
      },
      {
        id: "SUP002",
        name: "Ceylon Tea Distributors",
        contact: "+94 77 987 6543",
        email: "ceylontea@example.com",
        address: "456 Tea Avenue, Kandy, Sri Lanka",
        createdAt: "2025-07-15T09:00:00Z",
        updatedAt: "2025-08-05T12:00:00Z",
        lastSupplyDate: "2025-08-12",
        totalSupplied: 1800,
        outstanding: 30000,
      },
    ];
    setSuppliers(demoSupplier);
    setLoading(false);
  }, []);

  // Filter suppliers
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name?.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Delete supplier
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
      setDeleteSupplierId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavigationBar />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <SupplierSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Supplier List
            </h1>
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
                onClick={() => alert("Generate report logic here")}
              >
                Generate Report
              </button>
              <button
                onClick={() => {
                  setEditSupplier(null);
                  setShowModal(true);
                }}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
              >
                <MdOutlineAddBox className="text-xl mr-2" /> Add Supplier
              </button>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : suppliers.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">
              No suppliers available.
            </p>
          ) : (
            <>
              {filteredSuppliers.length === 0 && searchInput.trim() !== "" ? (
                <p className="text-center text-red-500 mt-6">
                  No results found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <div className="hidden md:block">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                            Supplier ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                            Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                            Contact No
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(filteredSuppliers.length > 0
                          ? filteredSuppliers
                          : suppliers
                        ).map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-6">{item.id}</td>
                            <td className="py-4 px-6">{item.name}</td>
                            <td className="py-4 px-6">{item.address}</td>
                            <td className="py-4 px-6">{item.contact}</td>
                            <td className="py-4 px-6">{item.email}</td>
                            <td className="py-4 px-6 flex gap-3">
                              <BsInfoCircle
                                className="text-green-700 text-xl cursor-pointer"
                                onClick={() => setViewSupplier(item)}
                              />
                              <AiOutlineEdit
                                className="text-yellow-600 text-xl cursor-pointer"
                                onClick={() => setEditSupplier(item)}
                              />
                              <MdOutlineDelete
                                className="text-red-600 text-xl cursor-pointer"
                                onClick={() => setDeleteSupplierId(item.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />

      {/* Add Supplier Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative p-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>
            <CreateSupplier
              onBack={() => setShowModal(false)}
              setSuppliers={setSuppliers}
            />
          </div>
        </div>
      )}

      {/* View Supplier Modal */}
      {viewSupplier && (
        <ShowSupplier
          supplier={viewSupplier}
          onClose={() => setViewSupplier(null)}
        />
      )}

      {/* Edit Supplier Modal */}
      {editSupplier && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <EditSupplier
            supplier={editSupplier}
            onClose={() => setEditSupplier(null)}
            onSave={(updatedSupplier) =>
              setSuppliers((prev) =>
                prev.map((s) =>
                  s.id === updatedSupplier.supplierId ? updatedSupplier : s
                )
              )
            }
          />
        </div>
      )}

      {/* Delete Supplier Modal */}
      {deleteSupplierId && (
        <DeleteSuppliers
          supplierId={deleteSupplierId}
          onClose={() => setDeleteSupplierId(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

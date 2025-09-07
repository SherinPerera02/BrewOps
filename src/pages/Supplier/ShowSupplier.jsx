import React from "react";

export default function ShowSupplier({ supplier, onClose }) {
  if (!supplier) return null; // Don't render if no supplier

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative transform transition-all duration-300 scale-95 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 text-3xl font-bold"
        >
          &times;
        </button>

        {/* Modal Header */}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 border-b pb-3">
          Supplier Details
        </h2>

        {/* Supplier Card */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-inner space-y-6">
          {/* General Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 font-semibold">Supplier ID</p>
              <p className="text-gray-800 text-lg">{supplier.id}</p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold">Name</p>
              <p className="text-gray-800 text-lg">{supplier.name}</p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold">Contact</p>
              <p className="text-gray-800 text-lg">{supplier.contact}</p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold">Email</p>
              <p className="text-gray-800 text-lg">{supplier.email}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-gray-500 font-semibold">Address</p>
              <p className="text-gray-800 text-lg">{supplier.address}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 font-semibold">Created At</p>
              <p className="text-gray-800">
                {new Date(supplier.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold">Updated At</p>
              <p className="text-gray-800">
                {new Date(supplier.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-gray-500 font-semibold">Last Supply Date</p>
              <p className="text-gray-800">{supplier.lastSupplyDate}</p>
            </div>
          </div>

          {/* Highlighted Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="bg-blue-100 rounded-lg p-5 text-center shadow">
              <p className="text-gray-500 font-semibold">Total Supplied</p>
              <p className="text-blue-700 font-bold text-2xl">
                {supplier.totalSupplied.toLocaleString()} Kg
              </p>
            </div>
            <div className="bg-red-100 rounded-lg p-5 text-center shadow">
              <p className="text-gray-500 font-semibold">Outstanding Payment</p>
              <p className="text-red-700 font-bold text-2xl">
                Rs. {supplier.outstanding.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

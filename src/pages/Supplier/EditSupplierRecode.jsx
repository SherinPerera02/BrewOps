import React from "react";

export default function EditSupplierModal({ record, onClose }) {
  if (!record) return null; // modal hide if no record

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Card */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Supplier Record
        </h1>

        <div className="space-y-4">
          {/* Supplier ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier ID
            </label>
            <input
              type="text"
              value={record.supplierId || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
            />
          </div>

          {/* Supplier Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier Name
            </label>
            <input
              type="text"
              defaultValue={record.supplierName || ""}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              defaultValue={record.date || ""}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity (kg)
            </label>
            <input
              type="number"
              defaultValue={record.quantity || ""}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition">
              Update Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

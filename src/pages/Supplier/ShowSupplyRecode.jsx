import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function ShowSupplyRecord({ onClose }) {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy/mock supply record
  const dummyRecord = {
    id: id || "REC001",
    supplierName: "Green Tea Supplies",
    date: "2025-08-15",
    quantity: 500,
    unitPrice: 10000,
    createdAt: "2025-08-01T10:00:00Z",
    updatedAt: "2025-08-10T14:30:00Z",
    transactions: [
      { date: "2025-08-15", quantity: 200, unitPrice: 10000, status: "Paid" },
      { date: "2025-08-10", quantity: 300, unitPrice: 10000, status: "Pending" },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setRecord(dummyRecord);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
        <Spinner />
      </div>
    );
  }

  if (!record)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
        <p className="text-center mt-10 text-red-600 font-semibold bg-white p-6 rounded-lg shadow-lg">
          Supply record not found.
        </p>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button (top right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-3xl font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 border-b pb-2 text-gray-800">
          Supply Record Details
        </h1>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-6 text-sm sm:text-base md:text-lg">
          <p><strong>Record ID:</strong> {record.id}</p>
          <p><strong>Supplier Name:</strong> {record.supplierName}</p>
          <p><strong>Date:</strong> {record.date}</p>
          <p><strong>Quantity (Kg):</strong> {record.quantity}</p>
          <p><strong>Unit Price (Rs.):</strong> {record.unitPrice}</p>
          <p><strong>Total Price (Rs.):</strong> {record.quantity * record.unitPrice}</p>
          <p><strong>Created At:</strong> {new Date(record.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(record.updatedAt).toLocaleString()}</p>
        </div>

        {/* Transaction History */}
        {record.transactions && record.transactions.length > 0 && (
          <div className="overflow-x-auto">
            <h2 className="text-lg md:text-xl font-semibold border-b pb-1 mb-3">
              Transaction History
            </h2>
            <table className="w-full border text-sm md:text-base min-w-[400px] sm:min-w-[600px]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Quantity</th>
                  <th className="border px-2 py-1">Unit Price</th>
                  <th className="border px-2 py-1">Total</th>
                  <th className="border px-2 py-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {record.transactions.map((t, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-2 py-1">{t.date}</td>
                    <td className="border px-2 py-1">{t.quantity} Kg</td>
                    <td className="border px-2 py-1">Rs. {t.unitPrice}</td>
                    <td className="border px-2 py-1">Rs. {t.quantity * t.unitPrice}</td>
                    <td className="border px-2 py-1">{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Close Button (bottom center) */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

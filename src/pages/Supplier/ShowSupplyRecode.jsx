
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import leftArrow from '../../assets/left-arrow.png';

export default function ShowSupplyRecord() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy/mock supply record
  const dummyRecord = {
    id: id || 'REC001',
    supplierName: 'Green Tea Supplies',
    date: '2025-08-15',
    quantity: 500,
    unitPrice: 10000,
    createdAt: '2025-08-01T10:00:00Z',
    updatedAt: '2025-08-10T14:30:00Z',
    transactions: [
      { date: '2025-08-15', quantity: 200, unitPrice: 10000, status: 'Paid' },
      { date: '2025-08-10', quantity: 300, unitPrice: 10000, status: 'Pending' },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setRecord(dummyRecord);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <Spinner />;

  if (!record)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Supply record not found.
      </p>
    );

  return (
    <div className="min-h-screen bg-green-50">
      <NavigationBar />

      {/* Back Button */}
      <div className="absolute top-20 left-4 md:left-6">
        <Link to="/SupplierRecode">
          <img
            src={leftArrow}
            alt="Go Back"
            className="w-10 h-10 hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Record Details */}
      <div className="flex justify-center px-4 py-16">
        <div className="bg-white bg-opacity-95 p-6 md:p-10 rounded-xl shadow-lg w-full max-w-4xl">
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
        </div>
      </div>

      <Footer />
    </div>
  );
}

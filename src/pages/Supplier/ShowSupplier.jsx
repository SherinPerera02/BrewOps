import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import leftArrow from '../../assets/left-arrow.png';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import bgImage from '../../assets/supplierBg2.avif';


export default function ShowSupplier() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  const dummySupplier = {
    id: id || 'SUP001',
    name: 'Green Tea Supplies',
    contact: '+94 77 123 4567',
    email: 'greentea@example.com',
    address: '123 Tea Road, Nuwara Eliya, Sri Lanka',
    createdAt: '2025-08-01T10:00:00Z',
    updatedAt: '2025-08-10T14:30:00Z',
    lastSupplyDate: '2025-08-15',
    totalSupplied: 2500,
    outstanding: 50000,
    transactions: [
      { date: '2025-08-15', quantity: 500, price: 10000, status: 'Paid' },
      { date: '2025-08-10', quantity: 300, price: 6000, status: 'Pending' },
      { date: '2025-08-05', quantity: 200, price: 4000, status: 'Paid' },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setSupplier(dummySupplier);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Spinner />;

  if (!supplier) {
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Supplier not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-green-50">
      <NavigationBar />

      {/* Back Arrow */}
      <div className="absolute top-25 left-4 md:left-6">
        <Link to="/SupplierHome">
          <img
            src={leftArrow}
            alt="Go Back"
            className="w-10 h-10 hover:scale-105 transition-transform"/>
        </Link>
      </div>

      {/* Supplier Details Card */}
      <div className="flex items-center justify-center py-12 px-2 md:px-6">
        <div className="bg-white bg-opacity-95 p-6 md:p-10 rounded-xl shadow-lg w-full max-w-5xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 border-b-2 border-green-500 pb-2 mb-6">
            Supplier Details
          </h1>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base md:text-lg text-gray-700 mb-6">
            <p><strong>Supplier ID:</strong> {supplier.id}</p>
            <p><strong>Name:</strong> {supplier.name}</p>
            <p><strong>Contact:</strong> {supplier.contact}</p>
            <p><strong>Email:</strong> {supplier.email}</p>
            <p className="sm:col-span-2"><strong>Address:</strong> {supplier.address}</p>
            <p><strong>Created At:</strong> {new Date(supplier.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(supplier.updatedAt).toLocaleString()}</p>
          </div>

          {/* Supply Info */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-semibold border-b pb-1 mb-2">
              Supply Info
            </h3>
            <p><strong>Last Supply Date:</strong> {supplier.lastSupplyDate}</p>
            <p><strong>Total Supplied:</strong> {supplier.totalSupplied.toLocaleString()} Kg</p>
            <p><strong>Outstanding Payment:</strong> Rs. {supplier.outstanding.toLocaleString()}</p>
          </div>

          
        </div>
      </div>

      <Footer />
    </div>
  );
}

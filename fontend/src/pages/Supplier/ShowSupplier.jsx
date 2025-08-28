import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import leftArrow from '../../assets/left-arrow.png';

import Spinner from '../../components/Spinner';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';

export default function ShowTeaSupplier() {
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  /*useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/suppliers/${id}`)
      .then((response) => {
        setSupplier(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching supplier:', error);
        setLoading(false);
      });
  }, [id]);*/

  return (
    <div
      className="min-h-screen bg-cover bg-center"
    >
      <NavigationBar />

      {/* Back Arrow */}
      <div className="absolute top-25 left-6">
        <Link to="/SupplierHome">
          <img 
            src={leftArrow} 
            alt="Go Back" 
            className="w-10 h-10 hover:scale-105 transition-transform" 
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center py-12">
        {loading ? (
          <Spinner />
        ) : (
          <div className="bg-white bg-opacity-95 p-10 rounded-xl shadow-lg w-[90%] max-w-2xl mb-20">
            <h1 className="text-3xl font-bold text-center text-gray-800 border-b-2 border-green-500 pb-2 mb-6">
              Tea Supplier Details
            </h1>

            <div className="text-lg text-gray-700 space-y-4">
              <div className="flex">
                <strong className="text-black w-40">Supplier ID:</strong>
                <span>{supplier.id}</span>
              </div>

              <div className="flex">
                <strong className="text-black w-40">Name:</strong>
                <span>{supplier.name}</span>
              </div>

              <div className="flex">
                <strong className="text-black w-40">Contact Number:</strong>
                <span>{supplier.contact}</span>
              </div>

              <div className="flex">
                <strong className="text-black w-40">Email:</strong>
                <span>{supplier.email}</span>
              </div>

              <div className="flex">
                <strong className="text-black w-40">Address:</strong>
                <span>{supplier.address}</span>
              </div>

              <div className="flex">
                <strong className="text-black w-40">District:</strong>
                <span>{supplier.district}</span>
              </div>

              

              <div className="flex">
                <strong className="text-black w-40">Monthly Capacity:</strong>
                <span>{supplier.monthlyCapacity} kg</span>
              </div>

              <div className="flex">
                <strong className="text-black w-40">Status:</strong>
                <span className={`px-2 py-1 rounded text-sm ${
                  supplier.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {supplier.status}
                </span>
              </div>

              <div className="flex">
                <strong className="text-black w-40">Created Date:</strong>
                <span>
                  {supplier.createdAt && new Date(supplier.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex">
                <strong className="text-black w-40">Last Updated:</strong>
                <span>
                  {supplier.updatedAt && new Date(supplier.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              
              
              <Link 
                to="/supplierHome"
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Back to List
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
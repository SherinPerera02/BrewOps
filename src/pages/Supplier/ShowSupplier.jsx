import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import leftArrow from '../../assets/left-arrow.png';

import Spinner from '../../components/Spinner';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer'

export default function ShowSupplier() {
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
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
  }, [id]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      
    >
      <NavigationBar />

      {/* Back Arrow */}
      <div className='bg-green-50'>
      <div className="absolute top-25 left-6">
              <Link to="/SupplierHome">
                <img src={leftArrow} alt="Go Back" className="w-10 h-10 hover:scale-105 transition-transform" />
              </Link>
            </div>

      {/* Content */}
      <div className="flex items-center justify-center py-12 ">
        {loading ? (
          <Spinner />
        ) : (
          <div className="bg-white bg-opacity-95 p-10 rounded-xl shadow-lg w-[90%] max-w-2xl mb-20">
            <h1 className="text-3xl font-bold text-center text-gray-800 border-b-2 border-green-500 pb-2 mb-6">
              Supplier Details
            </h1>

            <div className="text-lg text-gray-700 space-y-3 ">
              <p><strong className="text-black">Supplier ID:</strong> {supplier.id}</p>
              <p><strong className="text-black">Name:</strong> {supplier.name}</p>
              <p><strong className="text-black">Contact:</strong> {supplier.contact}</p>
              <p><strong className="text-black">Email:</strong> {supplier.email}</p>
              <p><strong className="text-black">Address:</strong> {supplier.address}</p>
              <p><strong className="text-black">Created At:</strong> {supplier.createdAt && new Date(supplier.createdAt).toLocaleString()}</p>
              <p><strong className="text-black">Updated At:</strong> {supplier.updatedAt && new Date(supplier.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
      </div>

      <Footer/>
    </div>
  );
}

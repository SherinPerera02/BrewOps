import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import bgImage from '../../assets/supplierBg2.avif';
import NavigationBar from '../../components/NavigationBar';
import leftArrow from '../../assets/left-arrow.png';
import Footer from '../../components/Footer';
import Spinner from '../../components/spinner';

export default function DeleteSuppliers() {
  const { id } = useParams(); // URL එකෙන් ID එක ගන්නවා
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  // Supplier එක fetch කරන්න
  useEffect(() => {
    axios.get(`http://localhost:8080/api/suppliers/${id}`)
      .then((res) => {
        setSupplier(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching supplier:', err);
        setLoading(false);
      });
  }, [id]);

  // Delete confirm button එක click කරොත්
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/suppliers/${id}`)
      .then(() => {
        alert('Supplier deleted successfully');
        navigate('/SupplierHome');
      })
      .catch((err) => {
        console.error('Failed to delete supplier:', err);
        alert('Failed to delete supplier');
      });
  };

  return (
    <div className="min-h-screen bg-cover bg-center" >
      <NavigationBar />

      {/* Back Button */}
      <div className="absolute top-25 left-6">
            <Link to="/SupplierHome">
            <img src={leftArrow} alt="Go Back" className="w-10 h-10 hover:scale-105 transition-transform" />
            </Link>
        </div>

        {loading ? (
            <Spinner/>
        ):(

        <div className="max-w-xl mx-auto mt-20 mb-10 bg-gray-200/90 rounded-xl shadow-lg px-10 py-12">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Delete Supplier</h1>

          <p className="text-lg text-center text-gray-700 mb-8">
            Are you sure you want to delete the supplier{' '}
            {supplier && (
            <span className="font-semibold text-red-600">{supplier.name}</span>
            )}?
          </p>


          <div className="flex justify-center space-x-6">
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition duration-200"
            >
              Confirm Delete
            </button>

            <Link to="/SupplierHome">
              <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded transition duration-200">
                Cancel
              </button>
            </Link>
          </div>

        </div>
        )}

    
        <Footer />
    </div>
    
    
    
  );
}

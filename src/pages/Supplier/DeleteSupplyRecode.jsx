import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../components/spinner';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import leftArrow from '../../assets/left-arrow.png';
import bgImage from '../../assets/supplierBg2.avif';

export default function DeleteSupplyRecode() {
  const { id } = useParams();
  const [supplyrecode, setSupplyRecode] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch the record
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/supplyrecode/${id}`)
      .then((res) => {
        setSupplyRecode(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching supply record:', err);
        setLoading(false);
      });
  }, [id]);

  // Handle delete
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8080/api/supplyrecode/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/SupplierHome');
      })
      .catch((err) => {
        console.error('Error deleting supply record:', err);
        setLoading(false);
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Navigation */}
      <NavigationBar />

      {/* Back Button */}
      <div className="absolute top-24 left-6">
        <Link to="/SupplierRecode">
          <img
            src={leftArrow}
            alt="Go Back"
            className="w-10 h-10 hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-xl px-10 py-12 w-full max-w-xl">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Delete Supply Record
              </h1>
              <p className="text-lg text-center text-gray-700 mb-8">
                Are you sure you want to delete the record for{' '}
                <span className="font-semibold text-red-600">
                  {supplyrecode.name}
                </span>
                ?
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition"
                >
                  Delete
                </button>
                <Link to="/SupplierHome">
                  <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded transition">
                    Cancel
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className='mt-20'>
      <Footer />
      </div>
      
    </div>
  );
}

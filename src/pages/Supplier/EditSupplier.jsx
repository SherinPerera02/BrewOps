import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import leftArrow from '../../assets/left-arrow.png';
import Spinner from '../../components/Spinner';

export default function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    supplierId: '',
    name: '',
    address: '',
    contact: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing supplier data
  useEffect(() => {
    axios.get(`http://localhost:8080/api/suppliers/${id}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch supplier:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put(`http://localhost:8080/api/suppliers/${id}`, formData)
      .then(() => {
        alert('Supplier updated successfully');
        navigate('/SupplierHome');
      })
      .catch((err) => {
        console.error('Failed to update supplier:', err);
        alert('Failed to update supplier');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <NavigationBar />

      {/* Back Button */}
      <Link to="/SupplierHome" className="absolute top-24 left-4 md:top-8 md:left-8 z-50">
        <img src={leftArrow} alt="Go Back" className="w-10 h-10 hover:scale-105 transition-transform" />
      </Link>

      {loading && <Spinner />}

      <div className="flex-1 flex justify-center items-start p-4 md:p-8 mt-12 md:mt-16">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Supplier</h1>

          {!loading && (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {/* Supplier ID */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Supplier ID</label>
                <input
                  type="text"
                  name="supplierId"
                  value={formData.supplierId || ''}
                  readOnly
                  className="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Supplier Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter Supplier Name"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter Address"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="Enter Contact Number"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter Email"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded w-full md:w-auto transition duration-200"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

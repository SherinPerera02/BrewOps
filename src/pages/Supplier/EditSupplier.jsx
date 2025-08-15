import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import leftArrow from '../../assets/left-arrow.png';
import bgImage from '../../assets/supplierBg2.avif';
import Spinner from '../../components/spinner'

export default function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing supplier data
  useEffect(() => {
    axios.get(`http://localhost:8080/api/suppliers/${id}`)
      .then((res) => {
        const { name, contact, email } = res.data;
        setFormData({ name, contact, email });
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
    axios.put(`http://localhost:8080/api/suppliers/${id}`, formData)
      .then(() => {
        alert('Supplier updated successfully');
        navigate('/SupplierHome');
      })
      .catch((err) => {
        console.error('Failed to update supplier:', err);
        alert('Failed to update supplier');
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <NavigationBar />

      {/* Back Button */}
      <div className="absolute top-25 left-6">
          <Link to="/SupplierHome">
          <img src={leftArrow} alt="Go Back" className="w-10 h-10 hover:scale-105 transition-transform" />
          </Link>
      </div>
    {loading ?<Spinner/>:''}
    
      {/* Form */}
      <div className="max-w-2xl mx-auto mt-16 mb-10 bg-gray-200/90 rounded-xl shadow-lg px-10 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Supplier</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading supplier data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

            <div>
            <label className="block text-gray-700 font-semibold mb-1">Supplier ID</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter Supplier Name"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"/>

            </div>
            {/* Supplier Name */}
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
            <label className="block text-gray-700 font-semibold mb-1">Address</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter Address"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"/>

            <div>

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
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition duration-200"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}

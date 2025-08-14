import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../../components/navigationBar';
import Footer from '../../components/Footer';
import leftArrow from '../../assets/left-arrow.png';


export default function EditSupplierRecode() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-green-50">
      {/* Navigation Bar */}
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

      {/* Main Form Card */}
      <div className="flex items-center justify-center px-4 py-16 ">
        <div className="bg-white backdrop-blur-sm shadow-lg rounded-xl px-10 py-12 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Update Supplier Record
          </h1>

          <div className="space-y-6">
            {/* Supplier ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier ID
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Supplier Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Name
              </label>
              <input
                type="text"
                placeholder="Enter Supplier Name"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (kg)
              </label>
              <input
                type="number"
                placeholder="Enter Quantity"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

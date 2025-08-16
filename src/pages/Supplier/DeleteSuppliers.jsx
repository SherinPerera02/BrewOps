import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import NavigationBar from "../../components/NavigationBar";
import leftArrow from "../../assets/left-arrow.png";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

export default function DeleteSuppliers() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  // Supplier fetch
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/suppliers/${id}`)
      .then((res) => {
        setSupplier(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching supplier:", err);
        setLoading(false);
      });
  }, [id]);

  // Delete confirm button
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/suppliers/${id}`)
      .then(() => {
        alert("Supplier deleted successfully");
        navigate("/SupplierHome");
      })
      .catch((err) => {
        console.error("Failed to delete supplier:", err);
        alert("Failed to delete supplier");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar />

      {/* Back Button */}
      <div className="absolute top-20 left-4 sm:top-24 sm:left-6">
        <Link to="/SupplierHome">
          <img
            src={leftArrow}
            alt="Go Back"
            className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-xl shadow-lg px-6 sm:px-10 py-8 sm:py-12 mt-16 mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
              Delete Supplier
            </h1>

            <p className="text-base sm:text-lg text-center text-gray-700 mb-8">
              Are you sure you want to delete the supplier{" "}
              {supplier && (
                <span className="font-semibold text-red-600">
                  {supplier.name}
                </span>
              )}
              ?
            </p>

            <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition duration-200 w-full sm:w-auto"
              >
                Confirm Delete
              </button>

              <Link to="/SupplierHome" className="w-full sm:w-auto">
                <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded transition duration-200 w-full sm:w-auto">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

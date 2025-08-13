import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../components/spinner';
import NavigationBar from '../../components/navigationBar';
import Footer from '../../components/footer';
import leftArrow from '../../assets/left-arrow.png';
import bgImage from '../../assets/supplierBg2.avif';

export default function ShowSupplyRecode() {
  const [supplyrecode, setSupplyRecode] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/supplyrecode/${id}`)
      .then((response) => {
        setSupplyRecode(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching supply record:', error);
        setLoading(false);
      });
  }, [id]);

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
        <div className="bg-gray-200/90 backdrop-blur-sm shadow-lg rounded-xl px-10 py-12 w-full max-w-2xl">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Supplier Record Details
              </h1>

              <div className="space-y-4">
                <p>
                  <strong>Supplier ID:</strong> {supplyrecode.id}
                </p>
                <p>
                  <strong>Name:</strong> {supplyrecode.name}
                </p>
                <p>
                  <strong>Date:</strong> {supplyrecode.date}
                </p>
                <p>
                  <strong>Quantity (Kg):</strong> {supplyrecode.quantity}
                </p>
                <p>
                  <strong>Unit Price (Rs.):</strong> {supplyrecode.unitPrice}
                </p>
                <p>
                  <strong>Created At:</strong>{' '}
                  {supplyrecode.createdAt &&
                    new Date(supplyrecode.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{' '}
                  {supplyrecode.updatedAt &&
                    new Date(supplyrecode.updatedAt).toLocaleString()}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

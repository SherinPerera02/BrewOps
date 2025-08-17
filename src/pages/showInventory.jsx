import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/backButton';
import Spinner from '../components/Spinner';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const ShowInventory = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.error('No ID provided for fetching inventory.');
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:5000/inventory/${id}`) // Ensure correct ID is passed
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching inventory:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <div className="flex-1 p-6 bg-gray-100">
        <BackButton />
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Inventory Details</h2>
            <div className="mb-2 text-md"><strong>ID:</strong> {inventory.id}</div>
            <div className="mb-2 text-md"><strong>Batch ID:</strong> {inventory.batchid}</div>
            <div className="mb-2 text-md"><strong>Inventory Number:</strong> {inventory.inventorynumber}</div>
            <div className="mb-2 text-md"><strong>Quantity:</strong> {inventory.quantity}</div>
            <div className="mb-2 text-md"><strong>Created At:</strong> {inventory.createdAt ? new Date(inventory.createdAt).toLocaleString() : 'N/A'}</div>
            <div className="mb-2 text-md"><strong>Updated At:</strong> {inventory.updatedAt ? new Date(inventory.updatedAt).toLocaleString() : 'N/A'}</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShowInventory;

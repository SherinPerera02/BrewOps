import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/backButton';
import Spinner from '../components/spinner';
import NavigationBar from '../components/navigationBar';
import Footer from '../components/Footer';

const ShowInventory = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    // Mock data fallback if backend is not ready
    setTimeout(() => {
      // You can customize this mock data as needed
      const mockData = {
        _id: id,
        batchid: 'B-1001',
        category: 'Tea',
        inventorynumber: 'INV001',
        quantity: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setInventory(mockData);
      setLoading(false);
    }, 500);
    // Uncomment below for real backend
    // axios.get(`http://localhost:5555/inventories/${id}`)
    //   .then((response) => {
    //     setInventory(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setLoading(false);
    //   });
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <div className="flex-1 p-6 bg-graay00">
        <BackButton />
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Inventory Details</h2>
            <div className="mb-2 text-md"><strong>ID:</strong> {inventory._id}</div>
            <div className="mb-2 text-md"><strong>Batch ID:</strong> {inventory.batchid}</div>
            <div className="mb-2 text-md"><strong>Category:</strong> {inventory.category}</div>
            <div className="mb-2 text-md"><strong>Inventory Number:</strong> {inventory.inventorynumber}</div>
            <div className="mb-2 text-md"><strong>Quantity:</strong> {inventory.quantity}</div>
            <div className="mb-2 text-md"><strong>Created At:</strong> {new Date(inventory.createdAt).toLocaleString()}</div>
            <div className="mb-2 text-md"><strong>Updated At:</strong> {new Date(inventory.updatedAt).toLocaleString()}</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShowInventory;

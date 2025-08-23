import React, { useState, useEffect } from 'react';
import BackButton from '../components/backButton';


import Spinner from '../components/Spinner';
import NavigationBar from '../components/navigationBar';


import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteInventory = () => {
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch inventory details
  useEffect(() => {
    setLoading(true);
    
  
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/inventory/${id}`);
        setInventory(res.data);
      } catch (error) {
        console.error('Error fetching inventory details:', error);
        alert('Failed to load inventory details.');
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [id]);

  const handleDeleteInventory = async () => {
   

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/inventory/${id}`);
      navigate('/inventories'); 
    } catch (error) {
      alert('There was an error. Please check the console.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <div className="flex-1 p-4">     <BackButton />

        {loading && <Spinner />}

        {!loading && inventory && (
          <div className="flex flex-col items-center rounded-xl w-[600px] p-8 mx-auto shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Delete Inventory</h1>

            <div className="text-left w-full mb-4 text-md">
              <p><strong>Inventory Name:</strong> {inventory.name}</p>
              <p><strong>Category:</strong> {inventory.category}</p>
              <p><strong>Batch ID:</strong> {inventory.batchid}</p>
              <p><strong>Inventory Number:</strong> {inventory.inventorynumber}</p>
            </div>

            <p className="text-center text-red-600 mb-4">
              Are you sure you want to permanently delete this inventory item?
            </p>

            <button
              onClick={handleDeleteInventory}
              disabled={loading}
              className="bg-red-500 text-white p-2 mt-2 rounded-md hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Delete
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DeleteInventory;

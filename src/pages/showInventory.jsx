import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/backButton';
import Spinner from '../components/spinner';

const ShowInventory = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/inventory/${id}`)
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Inventory Details</h2>
          <div className="mb-2 text-lg"><strong>ID:</strong> {inventory._id}</div>
          <div className="mb-2 text-lg"><strong>Batch ID:</strong> {inventory.batchid}</div>
          <div className="mb-2 text-lg"><strong>Category:</strong> {inventory.category}</div>
          <div className="mb-2 text-lg"><strong>Inventory Number:</strong> {inventory.inventorynumber}</div>
          <div className="mb-2 text-lg"><strong>Quantity:</strong> {inventory.quantity}</div>
          <div className="mb-2 text-lg"><strong>Created At:</strong> {new Date(inventory.createdAt).toLocaleString()}</div>
          <div className="mb-2 text-lg"><strong>Updated At:</strong> {new Date(inventory.updatedAt).toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

export default ShowInventory;

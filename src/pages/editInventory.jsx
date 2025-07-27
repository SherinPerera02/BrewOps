import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/backButton';
import Spinner from '../components/spinner';

const EditInventory = () => {
  const [batchId, setBatchId] = useState('');
  const [category, setCategory] = useState('');
  const [inventoryNumber, setInventoryNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/inventory/${id}`)
      .then((res) => {
        const data = res.data;
        setBatchId(data.batchid);
        setCategory(data.category);
        setInventoryNumber(data.inventorynumber);
        setQuantity(data.quantity);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Failed to fetch inventory.");
      });
  }, [id]);

  const handleUpdate = () => {
    const updatedData = {
      batchid: batchId,
      category,
      inventorynumber: inventoryNumber,
      quantity
    };
    setLoading(true);
    axios.put(`http://localhost:5173/inventories/${id}`, updatedData)
      .then(() => {
        setLoading(false);
        navigate('/inventories');
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Failed to update inventory.");
      });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <BackButton />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Inventory</h1>

        {loading && <Spinner />}

        {!loading && (
          <div className="space-y-4">
            <div>
              <label htmlFor="batchId" className="block text-gray-700">Batch ID</label>
              <input
                id="batchId"
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700">Category</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label htmlFor="inventoryNumber" className="block text-gray-700">Inventory Number</label>
              <input
                id="inventoryNumber"
                type="text"
                value={inventoryNumber}
                onChange={(e) => setInventoryNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditInventory;

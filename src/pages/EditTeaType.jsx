// File: src/pages/EditTeaType.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/backbutton';
import Spinner from '../components/spinner';

const EditTeaType = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);

  // Fetch tea type details
  useEffect(() => {
    const fetchTeaType = async () => {
      setLoading(true);
      try {
        const res = await getTeaTypeById(id);
        setFormData(res.data);
      } catch (error) {
        console.error('Error fetching tea type:', error);
        alert('Failed to fetch tea type details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeaType();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTeaType(id, {
        ...formData,
        price: parseFloat(formData.price),
      });
      navigate('/teatypes');
    } catch (error) {
      console.error('Error updating tea type:', error);
      alert('Failed to update tea type.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <BackButton />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Tea Type</h1>

        {loading && <Spinner />}

        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-700">Price (₹ per kg)</label>
              <input
                id="price"
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTeaType;

// File: src/pages/DeleteTeaType.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/backbutton';
import Spinner from '../components/spinner';

const DeleteTeaType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teaType, setTeaType] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch tea type details on mount
  useEffect(() => {
    const fetchTeaType = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5555/teatypes/${id}`);
        setTeaType(res.data);
      } catch (error) {
        console.error('Error fetching tea type:', error);
        alert('Failed to load tea type details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeaType();
  }, [id]);

  // Handle delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tea type?');
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5555/teatypes/${id}`);
      alert('Tea type deleted successfully.');
      navigate('/teatypes');
    } catch (error) {
      console.error('Error deleting tea type:', error);
      alert('An error occurred while deleting the tea type.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <BackButton />

      {loading && <Spinner />}

      {!loading && teaType && (
        <>
          <h1 className="text-4xl font-extrabold text-center mb-6 text-red-600">
            Delete Tea Type
          </h1>

          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p><strong>Name:</strong> {teaType.name}</p>
            <p><strong>Description:</strong> {teaType.description}</p>
            <p><strong>Price:</strong> ${teaType.price} / kg</p>
          </div>

          <p className="text-center text-red-600 mb-4">
            Are you sure you want to permanently delete this tea type? This action cannot be undone.
          </p>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteTeaType;

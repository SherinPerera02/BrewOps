// File: src/pages/ViewTeaType.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import BackButton from '../components/backbutton';
import Spinner from '../components/spinner';

const ViewTeaType = () => {
  const { id } = useParams();
  const [teaType, setTeaType] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeaType = async () => {
      setLoading(true);
      try {
        const res = await getTeaTypeById(id);
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Tea Type Details</h2>
          <div className="mb-2 text-lg"><strong>ID:</strong> {teaType?._id}</div>
          <div className="mb-2 text-lg"><strong>Name:</strong> {teaType?.name}</div>
          <div className="mb-2 text-lg"><strong>Description:</strong> {teaType?.description}</div>
          <div className="mb-2 text-lg"><strong>Price (₹ per kg):</strong> {teaType?.price}</div>
          <div className="mb-2 text-lg"><strong>Created At:</strong> {teaType?.createdAt ? new Date(teaType.createdAt).toLocaleString() : 'N/A'}</div>
          <div className="mb-2 text-lg"><strong>Updated At:</strong> {teaType?.updatedAt ? new Date(teaType.updatedAt).toLocaleString() : 'N/A'}</div>
        </div>
      )}
    </div>
  );
};

export default ViewTeaType;

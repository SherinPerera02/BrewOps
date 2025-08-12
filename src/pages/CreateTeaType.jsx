// File: src/pages/CreateTeaType.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/spinner';
import BackButton from '../components/backbutton';

const CreateTeaType = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [loading, setLoading] = useState(false);
  const [priceError, setPriceError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'price') {
      if (value === '' || /^[0-9]*\.?[0-9]{0,2}$/.test(value)) {
        setForm({ ...form, price: value });
        setPriceError(value && parseFloat(value) <= 0 ? 'Price must be a positive number' : '');
      }
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price } = form;

    if (!name || !description || !price || parseFloat(price) <= 0) {
      alert('Please fill all fields correctly.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5555/teatypes', {
        name,
        description,
        price: parseFloat(price),
      });
      navigate('/teatypes');
    } catch (err) {
      console.error('Error creating tea type:', err);
      alert('An error occurred while creating the tea type.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <BackButton />
      <h1 className="text-4xl font-extrabold text-center mb-8 text-green-700">Create Tea Type</h1>

      {loading && <Spinner />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {['name', 'description', 'price'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-lg font-semibold mb-2 text-gray-800">
              {field === 'price'
                ? 'Price per kg (USD)'
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field === 'description' ? (
              <textarea
                id={field}
                value={form[field]}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write a brief description..."
                required
              />
            ) : (
              <input
                id={field}
                type={field === 'price' ? 'number' : 'text'}
                value={form[field]}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${
                  field === 'price' && priceError
                    ? 'border-2 border-red-500 focus:ring-red-500'
                    : 'border-2 border-gray-300 focus:ring-green-500'
                }`}
                min={field === 'price' ? '0' : undefined}
                step={field === 'price' ? '0.01' : undefined}
                placeholder={
                  field === 'price'
                    ? 'E.g., 15.50'
                    : field === 'name'
                    ? 'E.g., Assam Black Tea'
                    : ''
                }
                required
              />
            )}
            {field === 'price' && priceError && (
              <p className="mt-1 text-red-600 text-sm">{priceError}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateTeaType;

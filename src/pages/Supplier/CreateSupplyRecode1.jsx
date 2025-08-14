import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import leftArrow from '../../assets/left-arrow.png';
import { Link } from 'react-router-dom';

export default function CreateSupplyRecord() {
  const [supplierList, setSupplierList] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5555/suppliers')
      .then((response) => {
        setSupplierList(response.data);
      })
      .catch((error) => {
        console.log('Error fetching suppliers:', error);
      });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!selectedSupplier) newErrors.selectedSupplier = 'Supplier is required';
    if (!date) newErrors.date = 'Date is required';
    if (!quantity || isNaN(quantity)) newErrors.quantity = 'Valid quantity is required';
    if (!unitPrice || isNaN(unitPrice)) newErrors.unitPrice = 'Valid unit price is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveSupplyRecord = () => {
    if (validate()) {
      const data = {
        supplierName: selectedSupplier.split('/')[1],
        supplyDate: date,
        quantity: parseFloat(quantity),
        unitPrice: parseFloat(unitPrice),
        cost: parseFloat(quantity) * parseFloat(unitPrice),
        status: 'Pending'
      };

      setLoading(true);
      axios.post('http://localhost:5555/supplyrecords', data)
        .then(() => {
          setLoading(false);
          navigate('/SupplyRecordTable');
        })
        .catch((error) => {
          setLoading(false);
          console.log('Error saving supply record:', error);
        });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      
    >
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

      {/* Form Container */}
      <div className="max-w-3xl mx-auto mt-28  bg-gray-200/90 rounded-xl shadow-lg px-10 py-12 mb-20">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Supply Record
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <div>
            {/* Supplier Select */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-800">Supplier</label>
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                <option value="">Select Supplier</option>
                {supplierList.map((supplier) => (
                  <option key={supplier._id} value={`${supplier._id}/${supplier.name}`}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors.selectedSupplier && (
                <p className="text-red-500 text-sm">{errors.selectedSupplier}</p>
              )}
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-800">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-800">Quantity (kg)</label>
              <input
                type="number"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
            </div>

            {/* Unit Price */}
            <div className="mb-6">
              <label className="block mb-1 font-semibold text-gray-800">Unit Price (Rs)</label>
              <input
                type="number"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
              {errors.unitPrice && <p className="text-red-500 text-sm">{errors.unitPrice}</p>}
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button
                onClick={handleSaveSupplyRecord}
                className="bg-green-700 text-white px-8 py-2 rounded-lg shadow hover:bg-green-800 transition duration-200"
              >
                Save Supply Record
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

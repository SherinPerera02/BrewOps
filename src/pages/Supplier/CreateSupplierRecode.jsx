import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from '../../components/Spinner';

const CreateSupplierRecode = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [qualityScore, setQualityScore] = useState("");
  const [ratePerKg, setRatePerKg] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/suppliers/active', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && res.data.success) {
          setSuppliers(res.data.data);
        }
      } catch (error) {
        setSuppliers([]);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      const supplier = suppliers.find(s => s.id.toString() === selectedSupplier);
      if (supplier && supplier.rate) {
        setRatePerKg(supplier.rate.toString());
      }
    }
  }, [selectedSupplier, suppliers]);

  const validate = () => {
    const newErrors = {};
    if (!selectedSupplier) newErrors.selectedSupplier = "Supplier is required";
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0)
      newErrors.quantity = "Quantity must be a valid number greater than 0";
    if (!qualityScore || isNaN(qualityScore) || Number(qualityScore) < 0 || Number(qualityScore) > 100)
      newErrors.qualityScore = "Quality score must be between 0 and 100";
    if (!ratePerKg || isNaN(ratePerKg) || Number(ratePerKg) <= 0)
      newErrors.ratePerKg = "Rate per kg must be a valid number greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = {
      supplier_id: parseInt(selectedSupplier),
      quantity: parseFloat(quantity),
      quality_score: parseInt(qualityScore),
      rate_per_kg: parseFloat(ratePerKg)
    };
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/deliveries', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.success) {
        alert("Delivery record saved successfully!");
        navigate("/SupplyRecordTable");
      } else {
        alert(res.data?.message || 'Failed to save delivery record');
      }
    } catch (error) {
      alert('Error saving delivery record: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = quantity && ratePerKg ? (parseFloat(quantity) * parseFloat(ratePerKg)).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen flex flex-col">
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50' onClick={() => navigate('/SupplyRecordTable')}>
        <div className='max-w-2xl w-full mx-4 bg-white p-8 rounded-lg shadow-md' onClick={e => e.stopPropagation()}>
          <h1 className='text-2xl my-2 text-center font-bold text-gray-800'>Add New Delivery Record</h1>
          {loading && <Spinner />}
          {!loading && (
            <form onSubmit={handleSave} className='space-y-4'>
              <div>
                <label className='block text-md mb-2 text-gray-700'>Supplier</label>
                <select
                  className='border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-green-300'
                  value={selectedSupplier}
                  onChange={e => setSelectedSupplier(e.target.value)}
                  disabled={loading}
                >
                  <option value=''>Select Supplier</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name} - Rate: Rs. {s.rate}/kg</option>
                  ))}
                </select>
                {errors.selectedSupplier && <div className="text-red-500 text-sm mt-1">{errors.selectedSupplier}</div>}
              </div>
              <div>
                <label className='block text-md mb-2 text-gray-700'>Quantity (kg)</label>
                <input
                  type='number'
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  min='0.01'
                  step='0.01'
                  placeholder='Enter quantity in kilograms'
                  className={`border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-green-300 ${errors.quantity && 'border-red-500'}`}
                  disabled={loading}
                />
                {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}
              </div>
              <div>
                <label className='block text-md mb-2 text-gray-700'>Quality Score (0-100)</label>
                <input
                  type='number'
                  value={qualityScore}
                  onChange={e => setQualityScore(e.target.value)}
                  min='0'
                  max='100'
                  placeholder='Enter quality score (0-100)'
                  className={`border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-green-300 ${errors.qualityScore && 'border-red-500'}`}
                  disabled={loading}
                />
                {errors.qualityScore && <div className="text-red-500 text-sm mt-1">{errors.qualityScore}</div>}
              </div>
              <div>
                <label className='block text-md mb-2 text-gray-700'>Rate Per Kg (Rs)</label>
                <input
                  type='number'
                  value={ratePerKg}
                  onChange={e => setRatePerKg(e.target.value)}
                  min='0.01'
                  step='0.01'
                  placeholder='Rate per kg'
                  className={`border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-green-300 ${errors.ratePerKg && 'border-red-500'}`}
                  disabled={loading}
                />
                {errors.ratePerKg && <div className="text-red-500 text-sm mt-1">{errors.ratePerKg}</div>}
              </div>
              {quantity && ratePerKg && (
                <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
                  <div className='flex justify-between items-center'>
                    <span className='font-medium text-gray-700'>Total Amount:</span>
                    <span className='text-lg font-bold text-green-600'>Rs. {totalAmount}</span>
                  </div>
                  <p className='text-sm text-gray-600 mt-1'>
                    {quantity} kg × Rs. {ratePerKg}/kg = Rs. {totalAmount}
                  </p>
                </div>
              )}
              <div className='flex gap-4'>
                <button
                  type='submit'
                  className='py-2 px-6 bg-green-600 text-white rounded-md hover:bg-black focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Delivery Record'}
                </button>
                <button
                  type='button'
                  className='py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none'
                  onClick={() => navigate('/SupplyRecordTable')}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateSupplierRecode;
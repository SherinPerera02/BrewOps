import React, { useState, useEffect } from 'react';
import './CreateSupplierRecode.css';
import NavigationBar from '../../../components/navigationBar';
import { Link, useNavigate } from 'react-router-dom';
import leftArrow from '../../../assets/left-arrow.png';
import Footer from '../../../components/Footer';

export default function CreateSupplierRecode() {
  const [suppliers, setSuppliers] = useState([
    { supplierid: 'S001', name: 'Kamal' },
    { supplierid: 'S002', name: 'Amal' },
  ]); // Sample data

  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setDate(getCurrentDate());
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedSupplier) newErrors.selectedSupplier = 'Supplier is required';
    if (!date) newErrors.date = 'Date is required';
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0)
      newErrors.quantity = 'Quantity must be a valid number greater than 0';
    if (!unitPrice || isNaN(unitPrice) || Number(unitPrice) <= 0)
      newErrors.unitPrice = 'Unit Price must be a valid number greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        supplier: selectedSupplier,
        date,
        quantity,
        unitPrice,
      };
      console.log('Saving data:', data);
      alert('Supplier record saved successfully!');
      navigate('/SupplyRecordTable');
    }
  };

  return (
    <div>
      <div className="background">
        <NavigationBar />

        <div className="arrow_btn">
          <Link to="/SupplierHome">
            <img src={leftArrow} alt="Go Back" className="left-arrow-icon" />
          </Link>
        </div>

        <div className="add_details">
          <h1>Add New Record</h1>
          <form className="details" onSubmit={handleSave}>
            <label className="label">Supplier</label>
            <select
              className="input"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s.supplierid} value={s.supplierid}>
                  {s.supplierid} - {s.name}
                </option>
              ))}
            </select>
            {errors.selectedSupplier && <span className="error">{errors.selectedSupplier}</span>}

            <label className="label">Date</label>
            <input
              type="date"
              className="input"
              value={date}
              max={getCurrentDate()}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <span className="error">{errors.date}</span>}

            <label className="label">Quantity (Kg)</label>
            <input
              type="number"
              className="input"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.quantity && <span className="error">{errors.quantity}</span>}

            <label className="label">Unit Price</label>
            <input
              type="number"
              className="input"
              placeholder="Enter Unit Price"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
            {errors.unitPrice && <span className="error">{errors.unitPrice}</span>}

            <button type="submit" className="submit-btn">
              Save
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

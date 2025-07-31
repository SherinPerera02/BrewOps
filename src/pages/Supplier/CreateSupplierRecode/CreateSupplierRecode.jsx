import React, { useState } from 'react';
import './CreateSupplierRecode.css';
import NavigationBar from '../../../components/NavigationBar';
import { Link } from 'react-router-dom';
import leftArrow from '../../../assets/left-arrow.png';
import Footer from '../../../components/Footer';

export default function CreateSupplierRecode() {
  const [formData, setFormData] = useState({
    supplier: '',
    date: '',
    quantity: '',
    unitPrice: '',
  });

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved Data:', formData);
    alert('Supplier record saved (Frontend only)');
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
          <form className="details" onSubmit={handleSubmit}>
            <label className="label">Supplier</label>
            <select
              className="input"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
            >
              <option value="">Select Supplier</option>
              <option value="Kamal">Kamal</option>
              <option value="Amal">Amal</option>
              <option value="Nimal">Nimal</option>
            </select>

            <label className="label">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              max={getCurrentDate()}
              onChange={handleChange}
              className="input"
              required
            />

            <label className="label">Quantity (Kg)</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="input"
              placeholder="Enter Quantity"
              required
            />

            <label className="label">Unit Price</label>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              className="input"
              placeholder="Enter Unit Price"
              required
            />

            <button type="submit" className="submit-btn">Save</button>
          </form>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

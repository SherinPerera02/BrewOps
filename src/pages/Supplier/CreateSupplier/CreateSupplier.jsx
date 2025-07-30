import React, { useState } from 'react';
import './CreateSupplier.css';
import NavigationBar from '../../../components/NavigationBar';
import { Link } from 'react-router-dom';
import leftArrow from '../../../assets/left-arrow.png';
import Spinner from '../../../components/Spinner'; 
import Footer from '../../../components/Footer';

export default function CreateSupplier() {
  const [loading, setLoading] = useState(false); // ✅ Loading state

  return (
    <div>
      <div className="background">
        <NavigationBar />

        <div className="arrow_btn">
          <Link to="/SupplierHome">
            <img src={leftArrow} alt="Go Back" className="left-arrow-icon" />
          </Link>
        </div>

        {loading ? <Spinner /> : ''}

        <div className="add_form">
          <h1 className="add_supplier_heading">Create Supplier</h1>

          <div className="details">
            <label className="label">Supplier ID</label>
            <input type="text" className="input" placeholder="Enter Supplier ID" />

            <label className="label">Supplier Name</label>
            <input type="text" className="input" placeholder="Enter Supplier Name" />

            <label className="label">Supplier Address</label>
            <input type="text" className="input" placeholder="Enter Supplier Address" />

            <label className="label">Contact Number</label>
            <input type="text" className="input" placeholder="Enter Contact Number" />

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Enter Email" />

            <button className="submit_btn">Submit</button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

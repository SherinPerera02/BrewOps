import React, { useState, useEffect } from 'react';
import './ShowSupplyRecode.css';
import { Link, useParams } from 'react-router-dom';
import leftArrow from '../../../assets/left-arrow.png'
import axios from 'axios';
import Spinner from '../../../components/Spinner'; 

export default function ShowSupplyRecode() {
  const [supplyrecode, setSupplyRecode] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/supplyrecode/${id}`) // Replace with your correct API route
      .then((response) => {
        setSupplyRecode(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching supply record:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='show-supplier-container'>
      <div className="background">
        <div className="arrow_btn">
          <Link to="/SupplierHome">
            <img src={leftArrow} alt="Go Back" className="left-arrow-icon" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="supplier-details">
            <h1>Supplier Record</h1>
            <div className="supplier-info">
              <p><strong>Supplier ID:</strong> {supplyrecode.id}</p>
              <p><strong>Name:</strong> {supplyrecode.name}</p>
              <p><strong>Date:</strong> {supplyrecode.date}</p>
              <p><strong>Quantity (Kg):</strong> {supplyrecode.quantity}</p>
              <p><strong>Unit Price (Rs.):</strong> {supplyrecode.unitPrice}</p>
              <p><strong>Created At:</strong> {supplyrecode.createdAt && new Date(supplyrecode.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {supplyrecode.updatedAt && new Date(supplyrecode.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

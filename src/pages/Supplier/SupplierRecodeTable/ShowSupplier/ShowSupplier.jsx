import React, { useState, useEffect } from 'react';
import './ShowSupplier.css';
import { Link, useParams } from 'react-router-dom';
import leftArrow from '../../../../assets/left-arrow.png';
import axios from 'axios';
import Spinner from '../../../../components/Spinner'; 

export default function ShowSupplier() {
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/suppliers/${id}`) // Use your actual API endpoint here
      .then((response) => {
        setSupplier(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching supplier:', error);
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
            <h1>Supplier Details</h1>
            <div className="supplier-info">
              <p><strong>Supplier ID:</strong> {supplier.id}</p>
              <p><strong>Name:</strong> {supplier.name}</p>
              <p><strong>Contact:</strong> {supplier.contact}</p>
              <p><strong>Email:</strong> {supplier.email}</p>
              <p><strong>Address:</strong> {supplier.address}</p>
              <p><strong>Created At:</strong> {supplier.createdAt && new Date(supplier.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {supplier.updatedAt && new Date(supplier.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

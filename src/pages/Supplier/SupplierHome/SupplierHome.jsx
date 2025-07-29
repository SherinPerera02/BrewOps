import React from 'react';
import NavigationBar from '../../../components/NavigationBar';
import profile from '../../../assets/profile.png';
import './SupplierHomeStyle.css';

import { Link } from 'react-router-dom';
import SupplierSearch from '../../../components/SupplierSearch/SupplierSearch';
import Footer from '../../../components/Footer';

export default function SupplierHome() {
  return (
    <div className="supplier-home-wrapper">
      
      <div className="nav">
        <NavigationBar />
        <nav>
          <div className="container">
            <div className="subnav">
              <Link to="">Home</Link>
              <Link to="">Supplier</Link>
              <Link to="">Supplier Record</Link>
              <Link to="">
                <img src={profile} alt="Profile" />
              </Link>
            </div>
          </div>
        </nav>
      </div>

  
      <div className="body">
        <div className="body_container">
          <h1>Supplier List</h1>
          <div className="body_function">
            <button>Generate Report</button>
            <Link to="">Add New</Link>
          </div>
        </div>

        <div className="searchbar-wrapper">
          <SupplierSearch />
        </div>

        <div className="supplier_table">
          <table>
            <thead>
              <tr>
                <th>Supplier ID</th>
                <th>Supplier Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder row */}
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No suppliers found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      
      <Footer />
    </div>
  );
}

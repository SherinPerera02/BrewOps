import React from 'react'
import './SupplierRecodeTable.css';
import SupplierNavigation from '../../../components/SupplierNavigation/SupplierNavigation';
import { Link } from 'react-router-dom';

export default function SupplierRecodeTable() {
  return (
    <div className='supplier-recode-table'>
        <div className="nav">
            <SupplierNavigation/>
        </div>

        <div className="body">
            <div className="body_container">
                <h1>Supplier Record List</h1>
                <div className="body_function">
                    <button>Generate Report</button>
                    <Link to =''>Add Recode</Link>
                </div>
                
            </div>
        </div>

        <div className="searchbar">
            <input type="text" placeholder='Search Supplier Record' />
            
        </div>
      
      
    </div>
  )
}

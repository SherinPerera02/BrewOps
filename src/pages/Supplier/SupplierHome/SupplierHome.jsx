import React from 'react'
import NavigationBar from '../../../components/NavigationBar'
import profile from '../../.../../../assets/profile.png'
import './SupplierHomeStyle.css'

import { Link } from 'react-router-dom'
import SupplierSearch from '../../../components/SupplierSearch'
import Spinner from '../../../components/Spinner'

export default function SupplierHome() {
  return (
    <div>
      <NavigationBar/>
      <nav>
        <div className="container">
          <div className='subnav'>
            <Link to = "">Home</Link>
            <Link to = "">Supplier</Link>
            <Link to = "">Supplier Record</Link>
            <Link to =""> <img src={profile}/> </Link>
            
          </div>
        </div>
      </nav>

      <div className="body">
        <div className="body_container">
          <h1>Supplier List</h1>
          <div className="body_function">
            <button>Generate Report</button>
            <Link to =''>Add New</Link>
          </div>
          
        </div>
      </div>

    <SupplierSearch />
    <Spinner/>
      
    </div>
  )
}

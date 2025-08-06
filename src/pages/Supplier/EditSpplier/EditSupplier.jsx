import React from 'react'
import './EditSupplier.css'
import NavigationBar from '../../../components/NavigationBar'
import leftArrow from '../../../assets/left-arrow.png'
import { Link } from 'react-router-dom'
import Footer from '../../../components/footer'



export default function EditSupplier() {
  return (
    <div className='editdetails'>
        <NavigationBar/>

        <div className="arrow_btn">
          <Link to="/SupplierHome">
            <img src={leftArrow} alt="Go Back" className="left-arrow-icon" />
          </Link>
        </div>

        
        <div className="editSupplier_heading">
            <h1>Update Supplier</h1>

            <div className="Edit_details">
                <label className="label">Supplier ID</label>
                <input type="text" className="input"  />

                <label className="label">Supplier Name</label>
                <input
                type="text"
                className="input"
                name="name"
                placeholder="Enter Supplier Name"
                 />

                <label className="label">Contact Number</label>
                <input
                type="text"
                className="input"
                name="contact"
                placeholder="Enter Contact Number"
                />

                <label className="label">Email</label>
                <input
                type="email"
                className="input"
                name="email"
                placeholder="Enter Email"
                />

                <button className="submit_btn">
                Submit
                </button>  

            </div>

        </div>

        <Footer/>
      
    </div>
  )
}

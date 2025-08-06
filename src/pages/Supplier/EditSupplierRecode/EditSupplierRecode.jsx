import React from 'react'
import './EditSupplierRecode.css'
import leftArrow from '../../../assets/left-arrow.png'
import NavigationBar from '../../../components/NavigationBar'
import Footer from '../../../components/footer'
import { Link } from 'react-router-dom'



export default function EditSupplierRecode() {
  return (
   <div className='editrecode'>
    <NavigationBar/>

        <div className="arrow_btn">
          <Link to="/SupplierHome">
            <img src={leftArrow} alt="Go Back" className="left-arrow-icon" />
          </Link>
        </div>

        <div className="editRecode_heading">
               <h1>Update Recode</h1>
   
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
   
                   <label className="label">Date</label>
                   <input
                   type="date"
                   className="input"
                   name="date"
                   placeholder="Enter Contact Number"
                   />
   
                   <label className="label">Quantity</label>
                   <input
                   type="text"
                   className="input"
                   name="quantity"
                   placeholder="Enter Quantity"
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

import React, { useState, useEffect } from 'react';
import './CreateSupplier.css';
import NavigationBar from '../../../components/NavigationBar';
import { Link } from 'react-router-dom';
import leftArrow from '../../../assets/left-arrow.png';
import Spinner from '../../../components/Spinner';
import Footer from '../../../components/Footer';

export default function CreateSupplier() {
  const [supplierId, setSupplierId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Generate random supplier ID
  const generateUniqueSupplierID = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const newID = `SID${randomNumber.toString().padStart(4, '0')}`;
    setSupplierId(newID);
  };

  useEffect(() => {
    generateUniqueSupplierID();
  }, []);

  // Validation functions
  const validateName = (value) => {
    const minLength = 5;
    const maxLength = 20;
    if (!value.trim()) return 'Name is required';
    if (value.length < minLength || value.length > maxLength)
      return `Name must be between ${minLength} and ${maxLength} characters`;
    return '';
  };

  const validateAddress = (value) => {
    const minLength = 15;
    const maxLength = 50;
    if (!value.trim()) return 'Address is required';
    if (value.length < minLength || value.length > maxLength)
      return `Address must be between ${minLength} and ${maxLength} characters`;
    return '';
  };

  const validateContact = (value) => {
    if (!value.trim()) return 'Contact number is required';
    if (!/^\d{10}$/.test(value)) return 'Contact number must be 10 digits';
    return '';
  };

  const validateEmail = (value) => {
    const emailCheck = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!value.trim()) return 'Email is required';
    if (!emailCheck.test(value)) return 'Invalid email format';
    return '';
  };

  const handleInputChange = (e, validator) => {
    const { name, value } = e.target;
    const error = validator(value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSaveSupplier = () => {
    const nameError = validateName(name);
    const addressError = validateAddress(address);
    const contactError = validateContact(contact);
    const emailError = validateEmail(email);

    const newErrors = {
      name: nameError,
      address: addressError,
      contact: contactError,
      email: emailError,
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some((err) => err !== '');
    if (!isValid) return;

    const data = {
      supplierid: supplierId,
      name,
      address,
      contact,
      email,
    };

    setLoading(true);
    setTimeout(() => {
      console.log('Simulated saved data:', data);
      alert('Supplier saved successfully (frontend only)');
      setLoading(false);
    }, 1000);
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

        {loading && <Spinner />}

        <div className="add_form">
          <h1 className="add_supplier_heading">Create Supplier</h1>

          <div className="details">
            <label className="label">Supplier ID</label>
            <input type="text" className="input" value={supplierId} readOnly />

            <label className="label">Supplier Name</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Enter Supplier Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleInputChange(e, validateName);
              }}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label className="label">Supplier Address</label>
            <input
              type="text"
              className="input"
              name="address"
              placeholder="Enter Supplier Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                handleInputChange(e, validateAddress);
              }}
            />
            {errors.address && <p className="error">{errors.address}</p>}

            <label className="label">Contact Number</label>
            <input
              type="text"
              className="input"
              name="contact"
              placeholder="Enter Contact Number"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                handleInputChange(e, validateContact);
              }}
            />
            {errors.contact && <p className="error">{errors.contact}</p>}

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange(e, validateEmail);
              }}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <button className="submit_btn" onClick={handleSaveSupplier}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

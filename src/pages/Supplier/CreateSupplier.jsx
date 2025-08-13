import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/navigationBar';
import { Link } from 'react-router-dom';
import leftArrow from '../../assets/left-arrow.png';
import Spinner from '../../components/spinner';
import Footer from '../../components/Footer';
import bgimage from '../../assets/supplierBg2.avif'

export default function CreateSupplier() {
  const [supplierId, setSupplierId] = useState('');
  const [name, setName] = useState('');
  const [NIC, setNIC] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Generate unique Supplier ID
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
    if (!value.trim()) return 'Name is required';
    if (value.length < 5 || value.length > 20) return 'Name must be 5–20 characters';
    return '';
  };

  const validateNIC = (value) => {
    if (!value.trim()) return 'NIC is required';
    if (!/^([0-9]{9}[vV]|[0-9]{12})$/.test(value)) return 'Invalid NIC format';
    return '';
  };

  const validateAddress = (value) => {
    if (!value.trim()) return 'Address is required';
    if (value.length < 15 || value.length > 50) return 'Address must be 15–50 characters';
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
    const nicError = validateNIC(NIC);
    const addressError = validateAddress(address);
    const contactError = validateContact(contact);
    const emailError = validateEmail(email);

    const newErrors = {
      name: nameError,
      NIC: nicError,
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
      nic: NIC,
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
    <div className="min-h-screen bg-cover bg-center"
      style={{backgroundImage:"URL(${bgimage})"}}>
      <NavigationBar />

      {/* Back arrow */}
      <div className="absolute top-25 left-6">
        <Link to="/SupplierHome">
          <img src={leftArrow} alt="Go Back" className="w-10 h-10 hover:scale-105 transition-transform" />
        </Link>
      </div>

      <div
      className="max-w-8xl mx-auto mt-5 p-10 rounded-lg shadow-lg bg-cover ng-opacity-80 "
      style={{ backgroundImage: `url(${bgimage})` }}
>


      {loading && <Spinner />}

      {/* Supplier Form */}
      <div className="max-w-2xl mx-auto mt-5  p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add New Supplier</h1>

        <div className="space-y-4">
          {/* Supplier ID */}
          <div>
            <label className="block font-medium mb-1">Supplier ID</label>
            <input type="text" className="w-full border border-gray-300 px-4 py-2 rounded" value={supplierId} readOnly />
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Supplier Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Enter Supplier Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleInputChange(e, validateName);
              }}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* NIC */}
          <div>
            <label className="block font-medium mb-1">NIC</label>
            <input
              type="text"
              name="NIC"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Enter NIC (e.g., 123456789V)"
              value={NIC}
              onChange={(e) => {
                setNIC(e.target.value);
                handleInputChange(e, validateNIC);
              }}
            />
            {errors.NIC && <p className="text-red-500 text-sm">{errors.NIC}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                handleInputChange(e, validateAddress);
              }}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="block font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="contact"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Enter Contact Number"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                handleInputChange(e, validateContact);
              }}
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange(e, validateEmail);
              }}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Submit */}
          <div className="text-center mt-8">
            <button
              onClick={handleSaveSupplier}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

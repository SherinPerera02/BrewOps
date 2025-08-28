import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';
import { Link } from 'react-router-dom';
import leftArrow from '../../assets/left-arrow.png';
import Spinner from '../../components/Spinner';
import Footer from '../../components/Footer';
import axios from 'axios';

export default function CreateTeaSupplier() {
  const [supplierId, setSupplierId] = useState('');
  const [name, setName] = useState('');
  const [NIC, setNIC] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');
  const [teaGrade, setTeaGrade] = useState('');
  const [monthlyCapacity, setMonthlyCapacity] = useState('');
  const [supplierType, setSupplierType] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

 

  
  
  // Generate unique Supplier ID
  const generateUniqueSupplierID = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const newID = `TSL${randomNumber.toString().padStart(4, '0')}`; // TSL = Tea Supplier Lanka
    setSupplierId(newID);
  };

  useEffect(() => {
    generateUniqueSupplierID();
  }, []);

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) return 'Supplier name is required';
    if (value.length < 3 || value.length > 50) return 'Name must be 3–50 characters';
    return '';
  };

  const validateNIC = (value) => {
    if (!value.trim()) return 'NIC is required';
    if (!/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(value)) return 'Invalid NIC format (9 digits + V/X or 12 digits)';
    return '';
  };

  const validateAddress = (value) => {
    if (!value.trim()) return 'Address is required';
    if (value.length < 10 || value.length > 100) return 'Address must be 10–100 characters';
    return '';
  };

  const validateContact = (value) => {
    if (!value.trim()) return 'Contact number is required';
    if (!/^0[0-9]{9}$/.test(value)) return 'Contact number must be 10 digits starting with 0';
    return '';
  };

  const validateEmail = (value) => {
    const emailCheck = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!value.trim()) return 'Email is required';
    if (!emailCheck.test(value)) return 'Invalid email format';
    return '';
  };

  const validateDistrict = (value) => {
    if (!value.trim()) return 'District is required';
    return '';
  };

  const validateTeaGrade = (value) => {
    if (supplierType === 'Tea Leaf Supplier' && !value.trim()) {
      return 'Tea grade is required for tea leaf suppliers';
    }
    return '';
  };

  const validateMonthlyCapacity = (value) => {
    if (supplierType === 'Tea Leaf Supplier') {
      if (!value.trim()) return 'Monthly capacity is required for tea leaf suppliers';
      if (isNaN(value) || value <= 0) return 'Monthly capacity must be a positive number';
    }
    return '';
  };

  const validateSupplierType = (value) => {
    if (!value.trim()) return 'Supplier type is required';
    return '';
  };

  const handleInputChange = (e, validator) => {
    const { name, value } = e.target;
    const error = validator(value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSaveSupplier = async () => {
    const newErrors = {
      name: validateName(name),
      NIC: validateNIC(NIC),
      address: validateAddress(address),
      contact: validateContact(contact),
      email: validateEmail(email),
      district: validateDistrict(district),
      supplierType: validateSupplierType(supplierType),
      teaGrade: validateTeaGrade(teaGrade),
      monthlyCapacity: validateMonthlyCapacity(monthlyCapacity),
    };

    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some((err) => err !== '');
    
    if (!isValid) {
      alert('Please fix all validation errors before submitting');
      return;
    }

    const supplierData = {
      supplierId,
      name,
      nic: NIC,
      address,
      contact,
      email,
      district,
      supplierType,
      teaGrade: teaGrade || null,
      monthlyCapacity: monthlyCapacity || null,
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    setLoading(true);

    try {
      // Replace with actual API endpoint
      const response = await axios.post('http://localhost:8080/api/tea-suppliers', supplierData);
      
      alert('Tea supplier added successfully!');
      console.log('Supplier saved:', response.data);
      
      // Reset form
      generateUniqueSupplierID();
      setName('');
      setNIC('');
      setAddress('');
      setContact('');
      setEmail('');
      setDistrict('');
      setTeaGrade('');
      setMonthlyCapacity('');
      setSupplierType('');
      setErrors({});
      
    } catch (error) {
      console.error('Error saving supplier:', error);
      alert('Error adding supplier. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50"
    >
      <NavigationBar />

      <div className="flex-1 flex flex-col items-center relative p-4 md:p-8">
        {/* Back Arrow */}
        <Link to="/supplierHome" className="absolute top-4 left-4 md:top-8 md:left-8">
          <img src={leftArrow} alt="Go Back" className="w-10 h-10 hover:scale-105 transition-transform filter drop-shadow-md" />
        </Link>

        {/* Form Container */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 md:p-10 mt-12 md:mt-16">
          {loading && <Spinner />}

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2"> Add New Tea Supplier</h1>
            <p className="text-gray-600">Register a new supplier for the tea factory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplier ID */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Supplier ID</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg bg-gray-50"
                value={supplierId}
                readOnly
              />
            </div>

            {/* Supplier Name */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Supplier Name *</label>
              <input
                type="text"
                name="name"
                className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-green-500 focus:outline-none"
                placeholder="Enter supplier name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleInputChange(e, validateName);
                }}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* NIC */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">NIC Number *</label>
              <input
                type="text"
                name="NIC"
                className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-green-500 focus:outline-none"
                placeholder="Enter NIC (e.g., 123456789V or 123456789012)"
                value={NIC}
                onChange={(e) => {
                  setNIC(e.target.value.toUpperCase());
                  handleInputChange(e, validateNIC);
                }}
              />
              {errors.NIC && <p className="text-red-500 text-sm mt-1">{errors.NIC}</p>}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Contact Number *</label>
              <input
                type="text"
                name="contact"
                className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-green-500 focus:outline-none"
                placeholder="Enter contact number (e.g., 0771234567)"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  handleInputChange(e, validateContact);
                }}
              />
              {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Email Address *</label>
              <input
                type="email"
                name="email"
                className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-green-500 focus:outline-none"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleInputChange(e, validateEmail);
                }}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            

           

           
          </div>

          {/* Address (full width) */}
          <div className="mt-6">
            <label className="block font-semibold mb-2 text-gray-700">Full Address *</label>
            <textarea
              name="address"
              className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-green-500 focus:outline-none"
              placeholder="Enter complete address"
              rows="3"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                handleInputChange(e, validateAddress);
              }}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleSaveSupplier}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold px-8 py-3 rounded-lg text-lg transition-colors duration-200 min-w-48"
            >
              {loading ? 'Adding Supplier...' : 'Add Tea Supplier'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import NavigationBar from '../../../components/NavigationBar';
import { Link } from 'react-router-dom';
import leftArrow from '../../../assets/left-arrow.png';
import Spinner from '../../../components/Spinner';
import Footer from '../../../components/Footer';

export default function CreateSupplier() {
  const [supplierId, setSupplierId] = useState('');
  const [name, setName] = useState('');
  const [NIC, setNIC] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Generate random Supplier ID like SID0001
  const generateUniqueSupplierID = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const newID = `SID${randomNumber.toString().padStart(4, '0')}`;
    setSupplierId(newID);
  };

  useEffect(() => {
    generateUniqueSupplierID();
  }, []);

  // Validation Functions
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
    <div>
      <NavigationBar />

      <div className='background'>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/SupplierHome">
          <img src={leftArrow} alt="Go Back" className="w-6 h-6 mb-4" />
        </Link>

        {loading && <Spinner />}

        <div className="bg-white p-8 shadow-lg rounded-md">
          <h1 className="text-2xl font-bold mb-6">Create Supplier</h1>

          <div className="grid grid-cols-1 gap-5">
            {/* Supplier ID */}
            <div>
              <label className="block mb-1 font-medium">Supplier ID</label>
              <input type="text" className="w-full border px-4 py-2 rounded" value={supplierId} readOnly />
            </div>

            {/* Supplier Name */}
            <div>
              <label className="block mb-1 font-medium">Supplier Name</label>
              <input
                type="text"
                name="name"
                className="w-full border px-4 py-2 rounded"
                placeholder="Enter Supplier Name"
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
              <label className="block mb-1 font-medium">NIC</label>
              <input
                type="text"
                name="NIC"
                className="w-full border px-4 py-2 rounded"
                placeholder="Enter NIC (e.g., 123456789V)"
                value={NIC}
                onChange={(e) => {
                  setNIC(e.target.value);
                  handleInputChange(e, validateNIC);
                }}
              />
              {errors.NIC && <p className="text-red-500 text-sm mt-1">{errors.NIC}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                name="address"
                className="w-full border px-4 py-2 rounded"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  handleInputChange(e, validateAddress);
                }}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Contact */}
            <div>
              <label className="block mb-1 font-medium">Contact Number</label>
              <input
                type="text"
                name="contact"
                className="w-full border px-4 py-2 rounded"
                placeholder="Enter 10-digit contact number"
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
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border px-4 py-2 rounded"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleInputChange(e, validateEmail);
                }}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                onClick={handleSaveSupplier}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

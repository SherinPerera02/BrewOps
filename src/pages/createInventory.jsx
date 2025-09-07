import React, { useState, useEffect } from "react";

export default function CreateSupplier({ onBack }) {
  const [supplierId, setSupplierId] = useState("");
  const [name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Generate unique Supplier ID
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const newID = `SID${randomNumber.toString().padStart(4, "0")}`;
    setSupplierId(newID);
  }, []);

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    if (value.length < 5 || value.length > 20) return "Name must be 5–20 characters";
    return "";
  };
  const validateNIC = (value) => {
    if (!value.trim()) return "NIC is required";
    if (!/^([0-9]{9}[vV]|[0-9]{12})$/.test(value)) return "Invalid NIC format";
    return "";
  };
  const validateAddress = (value) => {
    if (!value.trim()) return "Address is required";
    if (value.length < 15 || value.length > 50) return "Address must be 15–50 characters";
    return "";
  };
  const validateContact = (value) => {
    if (!value.trim()) return "Contact number is required";
    if (!/^\d{10}$/.test(value)) return "Contact number must be 10 digits";
    return "";
  };
  const validateEmail = (value) => {
    const emailCheck = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!value.trim()) return "Email is required";
    if (!emailCheck.test(value)) return "Invalid email format";
    return "";
  };

  const handleInputChange = (e, validator) => {
    const { name, value } = e.target;
    const error = validator(value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSaveSupplier = () => {
    const newErrors = {
      name: validateName(name),
      NIC: validateNIC(NIC),
      address: validateAddress(address),
      contact: validateContact(contact),
      email: validateEmail(email),
    };
    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some((err) => err !== "");
    if (!isValid) return;

    const data = { supplierid: supplierId, name, nic: NIC, address, contact, email };
    setLoading(true);
    setTimeout(() => {
      console.log("Saved data:", data);
      alert("Supplier saved successfully!");
      setLoading(false);
      onBack(); // Call the onBack function to return to the dashboard
    }, 1000);
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-xl shadow-lg px-6 sm:px-10 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Add New Supplier
      </h1>

      {loading && <div className="text-center">Saving...</div>}

      {!loading && (
        <div className="space-y-4">
          {/* Supplier ID */}
          <div>
            <label className="block font-medium mb-1">Supplier ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              value={supplierId}
              readOnly
            />
          </div>

          {/* Supplier Name */}
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
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
            {errors.NIC && <p className="text-red-500 text-sm mt-1">{errors.NIC}</p>}
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
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Contact Number */}
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
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
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
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSaveSupplier}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
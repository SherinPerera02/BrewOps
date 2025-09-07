import React, { useState, useEffect } from "react";

// Simple Spinner component
const Spinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
);

export default function CreateSupplier({ onBack, onSuccess }) {
  const [supplierId, setSupplierId] = useState("");
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Generate unique Supplier ID
  useEffect(() => {
    const generateId = () => {
      const timestamp = Date.now().toString().slice(-4);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
      return `SUP${timestamp}${random}`;
    };
    setSupplierId(generateId());
  }, []);

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    if (value.length < 5 || value.length > 20) return "Name must be 5–20 characters";
    if (!/^[a-zA-Z\s]+$/.test(value)) return "Name can only contain letters and spaces";
    return "";
  };

  const validateNIC = (value) => {
    if (!value.trim()) return "NIC is required";
    const cleanValue = value.trim().toUpperCase();
    if (!/^([0-9]{9}[VX]|[0-9]{12})$/.test(cleanValue)) {
      return "Enter valid NIC (9 digits + V/X or 12 digits)";
    }
    return "";
  };

  const validateAddress = (value) => {
    if (!value.trim()) return "Address is required";
    if (value.length < 15 || value.length > 100) return "Address must be 15–100 characters";
    return "";
  };

  const validateContact = (value) => {
    if (!value.trim()) return "Contact number is required";
    const cleanValue = value.replace(/\D/g, '');
    if (!/^0[0-9]{9}$/.test(cleanValue)) return "Enter valid 10-digit phone number starting with 0";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value.trim())) return "Enter a valid email address";
    return "";
  };

  // Input change handlers
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({ ...prev, name: validateName(value) }));
  };

  const handleNicChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 12) {
      setNic(value);
      setErrors(prev => ({ ...prev, nic: validateNIC(value) }));
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setAddress(value);
      setErrors(prev => ({ ...prev, address: validateAddress(value) }));
    }
  };

  const handleContactChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setContact(value);
      setErrors(prev => ({ ...prev, contact: validateContact(value) }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  // Form submission
  const handleSaveSupplier = async () => {
    const newErrors = {
      name: validateName(name),
      nic: validateNIC(nic),
      address: validateAddress(address),
      contact: validateContact(contact),
      email: validateEmail(email),
    };

    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some((err) => err !== "");

    if (!isValid) return;

    const supplierData = {
      supplierId,
      name: name.trim(),
      nic: nic.trim().toUpperCase(),
      address: address.trim(),
      contact: contact.replace(/\D/g, ''),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    };

    setLoading(true);

    try {
      // Replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Supplier saved:", supplierData);
      
      // Show success message
      alert("✅ Supplier saved successfully!");
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(supplierData);
      }
      
      // Close form/modal
      if (onBack) {
        onBack();
      }
    } catch (error) {
      console.error("Error saving supplier:", error);
      alert("❌ Failed to save supplier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all fields?")) {
      setName("");
      setNic("");
      setAddress("");
      setContact("");
      setEmail("");
      setErrors({});
      setSupplierId(() => {
        const timestamp = Date.now().toString().slice(-4);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
        return `SUP${timestamp}${random}`;
      });
    }
  };

  const isFormValid = name && nic && address && contact && email &&
    Object.values(errors).every(error => !error);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Add New Supplier</h1>
      <p className="text-gray-500 mb-6 text-sm">Fill in the supplier information below</p>

      {/* Supplier ID */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supplier ID
        </label>
        <input
          type="text"
          value={supplierId}
          className="w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed text-sm"
          readOnly
        />
      </div>

      {/* Name and NIC */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supplier Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className={`w-full border px-3 py-2 rounded-md text-sm ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter supplier name"
            maxLength={20}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          {name && <p className="text-gray-400 text-xs mt-1">{name.length}/20</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            NIC Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={nic}
            onChange={handleNicChange}
            className={`w-full border px-3 py-2 rounded-md text-sm ${errors.nic ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="123456789V or 200012345678"
            maxLength={12}
          />
          {errors.nic && <p className="text-red-500 text-xs mt-1">{errors.nic}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          className={`w-full border px-3 py-2 rounded-md text-sm ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter complete address"
          maxLength={100}
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        {address && <p className="text-gray-400 text-xs mt-1">{address.length}/100</p>}
      </div>

      {/* Contact and Email */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={contact}
            onChange={handleContactChange}
            className={`w-full border px-3 py-2 rounded-md text-sm ${errors.contact ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="0771234567"
            maxLength={10}
          />
          {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`w-full border px-3 py-2 rounded-md text-sm ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="supplier@company.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Error Summary */}
      {Object.values(errors).some(error => error) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
          <h4 className="text-red-800 font-medium text-sm">Please fix the following errors:</h4>
          <ul className="text-red-700 text-xs mt-1 list-disc list-inside">
            {Object.entries(errors)
              .filter(([_, error]) => error)
              .map(([field, error]) => (
                <li key={field}><strong>{field.toUpperCase()}:</strong> {error}</li>
              ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 mt-4">
        <button
          type="button"
          onClick={() => onBack && onBack()}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors text-sm"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSaveSupplier}
          disabled={loading || !isFormValid}
          className={`px-6 py-2 rounded-md transition-colors flex items-center justify-center min-w-[120px] text-sm ${
            loading || !isFormValid
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-teal-500 hover:bg-teal-600 text-white'
          }`}
        >
          {loading ? (
            <>
              <Spinner />
              <span className="ml-2">Saving...</span>
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}
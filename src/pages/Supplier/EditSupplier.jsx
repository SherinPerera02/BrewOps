import React, { useState, useEffect } from "react";

export default function EditSupplier({ supplier, onClose, onSave }) {
  const [formData, setFormData] = useState({
    supplierId: "",
    name: "",
    address: "",
    contact: "",
    email: "",
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        supplierId: supplier.supplierId || supplier.id,
        name: supplier.name,
        address: supplier.address,
        contact: supplier.contact,
        email: supplier.email,
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!supplier) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center">Edit Supplier</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Supplier ID
          </label>
          <input
            type="text"
            name="supplierId"
            value={formData.supplierId}
            readOnly
            className="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

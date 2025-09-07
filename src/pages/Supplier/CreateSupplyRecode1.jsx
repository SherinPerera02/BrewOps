import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Simple inline spinner
const Spinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
);

export default function CreateSupplyRecord({ onClose, onSuccess }) {
  const [supplierList, setSupplierList] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingSuppliers, setFetchingSuppliers] = useState(true);

  const navigate = useNavigate();
  const overlayRef = useRef(null);

  useEffect(() => {
    setFetchingSuppliers(true);
    axios
      .get("http://localhost:5555/suppliers")
      .then((res) => {
        setSupplierList(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching suppliers:", err);
        alert("Failed to load suppliers. Please try again.");
      })
      .finally(() => setFetchingSuppliers(false));
  }, []);

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  // Validation helpers
  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "selectedSupplier":
        if (!value) error = "Supplier is required";
        break;
      case "date":
        if (!value) error = "Date is required";
        else if (new Date(value) > new Date()) error = "Date cannot be in the future";
        break;
      case "quantity":
        if (!value) error = "Quantity is required";
        else if (isNaN(value) || parseFloat(value) <= 0) error = "Quantity must be a positive number";
        break;
      case "unitPrice":
        if (!value) error = "Unit price is required";
        else if (isNaN(value) || parseFloat(value) <= 0) error = "Unit price must be a positive number";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (field, value) => {
    if (field === "quantity" || field === "unitPrice") {
      // allow only numbers + dot
      value = value.replace(/[^0-9.]/g, "");
    }
    if (field === "selectedSupplier") setSelectedSupplier(value);
    if (field === "date") setDate(value);
    if (field === "quantity") setQuantity(value);
    if (field === "unitPrice") setUnitPrice(value);

    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const validateForm = () => {
    const newErrors = {
      selectedSupplier: validateField("selectedSupplier", selectedSupplier),
      date: validateField("date", date),
      quantity: validateField("quantity", quantity),
      unitPrice: validateField("unitPrice", unitPrice),
    };
    setErrors(newErrors);
    return Object.keys(newErrors).every((key) => !newErrors[key]);
  };

  const totalCost = quantity && unitPrice ? (parseFloat(quantity) * parseFloat(unitPrice)).toFixed(2) : "0.00";

  const handleClose = () => {
    if (loading) return; // prevent close while saving
    if (selectedSupplier || quantity || unitPrice) {
      if (window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        if (onClose) onClose();
      }
    } else {
      if (onClose) onClose();
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const [supplierId, supplierName] = selectedSupplier.split("/");
    const payload = {
      supplierId,
      supplierName,
      supplyDate: date,
      quantity: parseFloat(quantity),
      unitPrice: parseFloat(unitPrice),
      cost: parseFloat(totalCost),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5555/supplyrecords", payload);
      alert("Supply record created successfully!");
      if (onSuccess) onSuccess(res.data);
      if (onClose) onClose();
      navigate("/SupplyRecordTable");
    } catch (err) {
      console.error("Error saving supply record:", err);
      alert("Failed to save supply record. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = selectedSupplier && date && quantity && unitPrice && Object.keys(errors).length === 0;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
        onMouseDown={(e) => e.stopPropagation()} // prevent overlay handler for clicks inside modal content
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Create Supply Record</h1>
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              disabled={loading}
            >
              &times;
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Add a new supply record to the system</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {fetchingSuppliers ? (
            <div className="text-center py-8">
              <Spinner />
              <p className="text-gray-600 mt-4">Loading suppliers...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Supplier Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full border px-3 py-2 rounded-md text-sm ${
                    errors.selectedSupplier ? "border-red-500 bg-red-50" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  value={selectedSupplier}
                  onChange={(e) => handleChange("selectedSupplier", e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Supplier</option>
                  {supplierList.map((s) => (
                    <option key={s._id} value={`${s._id}/${s.name}`}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {errors.selectedSupplier && (
                  <p className="text-red-500 text-xs mt-1">{errors.selectedSupplier}</p>
                )}
              </div>

              {/* Date and Quantity */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supply Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className={`w-full border px-3 py-2 rounded-md text-sm ${
                      errors.date ? "border-red-500 bg-red-50" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                    max={new Date().toISOString().split("T")[0]}
                    disabled={loading}
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    className={`w-full border px-3 py-2 rounded-md text-sm ${
                      errors.quantity ? "border-red-500 bg-red-50" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Enter quantity"
                    disabled={loading}
                  />
                  {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                </div>
              </div>

              {/* Unit Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price (Rs) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={unitPrice}
                  onChange={(e) => handleChange("unitPrice", e.target.value)}
                  className={`w-full border px-3 py-2 rounded-md text-sm ${
                    errors.unitPrice ? "border-red-500 bg-red-50" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Enter unit price"
                  disabled={loading}
                />
                {errors.unitPrice && <p className="text-red-500 text-xs mt-1">{errors.unitPrice}</p>}
              </div>

              {/* Total Cost */}
              {quantity && unitPrice && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Cost:</span>
                    <span className="text-lg font-bold text-green-600">Rs. {totalCost}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {quantity} kg × Rs. {unitPrice} = Rs. {totalCost}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
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
              onClick={handleSave}
              disabled={loading || !isFormValid || fetchingSuppliers}
              className={`px-6 py-2 rounded-md transition-colors flex items-center justify-center min-w-[140px] text-sm ${
                loading || !isFormValid || fetchingSuppliers
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span className="ml-2">Saving...</span>
                </>
              ) : (
                "Save Supply Record"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
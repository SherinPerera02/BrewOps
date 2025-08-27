import React, { useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar";
import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../../assets/left-arrow.png";
import Footer from "../../components/Footer";

export default function CreateSupplierRecode() {
  const [suppliers, setSuppliers] = useState([
    { supplierid: "S001", name: "Kamal", unitPrice: 120 },
    { supplierid: "S002", name: "Amal", unitPrice: 150 },
    { supplierid: "S003", name: "Sunil", unitPrice: 100 },
  ]);

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setDate(getCurrentDate());
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedSupplier) newErrors.selectedSupplier = "Supplier is required";
    if (!date) newErrors.date = "Date is required";
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0)
      newErrors.quantity = "Quantity must be a valid number greater than 0";
    if (!unitPrice || isNaN(unitPrice) || Number(unitPrice) <= 0)
      newErrors.unitPrice = "Unit Price must be a valid number greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Supplier auto-fill (ID type or select)
  const handleSupplierChange = (supplierId) => {
    setSelectedSupplier(supplierId);
    const supplier = suppliers.find((s) => s.supplierid === supplierId);
    if (supplier) {
      setSupplierName(supplier.name);
      setUnitPrice(supplier.unitPrice);
    } else {
      setSupplierName("");
      setUnitPrice("");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        supplier: selectedSupplier,
        supplierName,
        date,
        quantity,
        unitPrice,
        totalPayment: Number(quantity) * Number(unitPrice),
      };
      console.log("Saving data:", data);
      alert("Supplier record saved successfully!");
      navigate("/SupplyRecordTable");
    }
  };

  // Calculate total payment dynamically
  const totalPayment =
    quantity && unitPrice ? Number(quantity) * Number(unitPrice) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-red">
      <NavigationBar />

      {/* Back button */}
      <div className="bg-green-50">
        <div className="absolute top-20 left-4 sm:top-24 sm:left-6">
          <Link to="/SupplierHome">
            <img
              src={leftArrow}
              alt="Go Back"
              className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Form Section */}
        <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-xl shadow-lg px-6 sm:px-10 py-8 sm:py-12 mt-16 mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
              Add New Record
            </h1>

            <form onSubmit={handleSave} className="space-y-6 bg-white bg-green-50">
              {/* Supplier ID (select or type) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supplier ID
                </label>
                <input
                  list="supplier-list"
                  value={selectedSupplier}
                  onChange={(e) => handleSupplierChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Type or select Supplier ID"
                />
                <datalist id="supplier-list">
                  {suppliers.map((s) => (
                    <option key={s.supplierid} value={s.supplierid}>
                      {s.name}
                    </option>
                  ))}
                </datalist>
                {errors.selectedSupplier && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.selectedSupplier}
                  </p>
                )}
              </div>

              {/* Supplier Name (Auto-Fill) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supplier Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 bg-gray-100"
                  value={supplierName}
                  readOnly
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={date}
                  max={getCurrentDate()}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity (Kg)
                </label>
                <input
                  type="number"
                  placeholder="Enter Quantity"
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                )}
              </div>

              {/* Unit Price (Auto-Fill) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Unit Price
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 bg-gray-100"
                  value={unitPrice}
                  readOnly
                />
                {errors.unitPrice && (
                  <p className="mt-1 text-sm text-red-600">{errors.unitPrice}</p>
                )}
              </div>

              {/* Total Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Payment
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 bg-gray-100"
                  value={totalPayment}
                  readOnly
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

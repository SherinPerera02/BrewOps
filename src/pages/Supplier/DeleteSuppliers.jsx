import React, { useState, useEffect } from "react";

export default function DeleteSuppliers({ supplierId, onClose, onDelete }) {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch supplier details
  useEffect(() => {
    if (supplierId) {
      setLoading(true);
      fetch(`http://localhost:8080/api/suppliers/${supplierId}`)
        .then((res) => res.json())
        .then((data) => {
          setSupplier(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching supplier:", err);
          setLoading(false);
        });
    }
  }, [supplierId]);

  const handleDelete = () => {
    fetch(`http://localhost:8080/api/suppliers/${supplierId}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Supplier deleted successfully");
        onDelete(supplierId); // Notify parent to update the list
        onClose(); // Close the modal
      })
      .catch((err) => {
        console.error("Failed to delete supplier:", err);
        alert("Failed to delete supplier");
      });
  };

  if (!supplierId) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Supplier</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <>
            <p className="text-center text-gray-700 mb-6">
              Are you sure you want to delete the supplier{" "}
              <span className="font-semibold text-red-600">{supplier?.name}</span>?
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
              >
                Confirm Delete
              </button>
              <button
                onClick={onClose}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
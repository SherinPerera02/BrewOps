import React, { useState } from "react";
import BackButton from "../components/backButton";

const LeavesQuantity = () => {
  const [search, setSearch] = useState("");

  // Sample hardcoded data
  const leavesData = [
    { date: "2024-08-01", quantity: 50, status: "Accepted" },
    { date: "2024-08-05", quantity: 40, status: "Pending" },
    { date: "2024-08-10", quantity: 60, status: "Accepted" },
    { date: "2024-08-15", quantity: 30, status: "Rejected" },
  ];

  // Filter by search
  const filteredLeaves = leavesData.filter(
    (row) =>
      row.date.includes(search) ||
      row.quantity.toString().includes(search) ||
      row.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 container mx-auto px-4">
        <BackButton />
        <h1 className="text-3xl my-6 text-center font-bold text-gray-800">
          Quota Management
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Track your raw tea leaves quota and manage your contributions to the
          factory.
        </p>

        {/* Search Bar */}
        <div className="mb-6 max-w-3xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by date, quantity, or status"
            className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left border rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">
                  Quantity (kg)
                </th>
                <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t last:border-none hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-700">{row.date}</td>
                    <td className="px-6 py-4 text-gray-700">{row.quantity}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-2 rounded-lg font-medium ${
                          row.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : row.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeavesQuantity;

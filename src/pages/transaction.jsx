import React, { useState } from "react";
import BackButton from "../components/backButton";

const Transaction = () => {
  const [search, setSearch] = useState("");

  // Sample hardcoded data
  const transactions = [
    { date: "2024-08-01", amount: 1200, type: "Credit", status: "Completed" },
    { date: "2024-08-05", amount: 800, type: "Debit", status: "Pending" },
    { date: "2024-08-10", amount: 1500, type: "Credit", status: "Completed" },
    { date: "2024-08-15", amount: 950, type: "Debit", status: "Failed" },
  ];

  // Filter by search
  const filteredTransactions = transactions.filter(
    (row) =>
      row.date.includes(search) ||
      row.amount.toString().includes(search) ||
      row.type.toLowerCase().includes(search.toLowerCase()) ||
      row.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 container mx-auto px-4">
        <BackButton />
        <h1 className="text-3xl my-6 text-center font-bold text-gray-800">
          Transactions
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          View and manage all your transactions
        </p>

        {/* Search Bar */}
        <div className="mb-6 max-w-3xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by date, amount, type, or status"
            className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Table styled same as Inventory page */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left border rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-black">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t last:border-none hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-700">{row.date}</td>
                    <td className="px-6 py-4 text-gray-700">{row.amount}</td>
                    <td className="px-6 py-4 text-gray-700">{row.type}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-2 rounded-lg font-medium ${
                          row.status === "Completed"
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

export default Transaction;

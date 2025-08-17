import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import ReportSlide from "../../pages/Report/ReportslideBar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { FaFilePdf, FaFileExcel } from "react-icons/fa"; 


export default function Report() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="flex">
        <ReportSlide />
        <ReportContent />
      </div>
    </div>
  );
}

function ReportContent() {
  const [reportType, setReportType] = useState("quantity"); // Quantity or Payment
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Example data (replace with backend fetch)
  const allData = [
    { ID: "S001", Supplier: "A", Quantity: 100, UnitPrice: 200, Date: "2025-08-16" },
    { ID: "S002", Supplier: "B", Quantity: 200, UnitPrice: 150, Date: "2025-08-15" },
    { ID: "S001", Supplier: "A", Quantity: 150, UnitPrice: 100, Date: "2025-08-10" },
  ];

  // Filter data based on search & date range
  const filteredData = allData.filter((row) => {
    const matchesSearch =
      row.Supplier.toLowerCase().includes(search.toLowerCase()) ||
      row.ID.toLowerCase().includes(search.toLowerCase());

    const matchesStart = startDate ? row.Date >= startDate : true;
    const matchesEnd = endDate ? row.Date <= endDate : true;
    return matchesSearch && matchesStart && matchesEnd;
  });

  // PDF export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Supplier Report", 14, 10);

    let tableColumn = [];
    let tableRows = [];

    if (reportType === "quantity") {
      tableColumn = ["ID", "Supplier", "Quantity", "Date"];
      tableRows = filteredData.map((row) => [
        row.ID,
        row.Supplier,
        row.Quantity,
        row.Date,
      ]);
    } else {
      tableColumn = ["ID", "Supplier", "Quantity", "Unit Price", "Total Payment", "Date"];
      tableRows = filteredData.map((row) => [
        row.ID,
        row.Supplier,
        row.Quantity,
        row.UnitPrice,
        row.Quantity * row.UnitPrice,
        row.Date,
      ]);
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${reportType}_report.pdf`);
  };

  // Excel export
  const handleExportExcel = () => {
    let worksheetData = [];

    if (reportType === "quantity") {
      worksheetData = filteredData.map((row) => ({
        ID: row.ID,
        Supplier: row.Supplier,
        Quantity: row.Quantity,
        Date: row.Date,
      }));
    } else {
      worksheetData = filteredData.map((row) => ({
        ID: row.ID,
        Supplier: row.Supplier,
        Quantity: row.Quantity,
        "Unit Price": row.UnitPrice,
        "Total Payment": row.Quantity * row.UnitPrice,
        Date: row.Date,
      }));
    }

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${reportType}_report.xlsx`);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Supplier Report</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center mb-3">
        <input
          type="text"
          placeholder="Search by ID or Supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="quantity">Quantity Report</option>
          <option value="payment">Payment Report</option>
        </select>
      </div>

      {/* ✅ PDF + Excel Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 
                     text-white px-5 py-2 rounded-lg shadow-md 
                     hover:from-red-600 hover:to-red-700 
                     transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaFilePdf className="text-lg" />
          Export PDF
        </button>

        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 
                     text-white px-5 py-2 rounded-lg shadow-md 
                     hover:from-green-600 hover:to-green-700 
                     transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaFileExcel className="text-lg" />
          Export Excel
        </button>
      </div>

      {/* Report Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              {reportType === "quantity"
                ? ["ID", "Supplier", "Quantity", "Date"].map((col) => (
                    <th key={col} className="border px-4 py-2">
                      {col}
                    </th>
                  ))
                : [
                    "ID",
                    "Supplier",
                    "Quantity",
                    "Unit Price",
                    "Total Payment",
                    "Date",
                  ].map((col) => (
                    <th key={col} className="border px-4 py-2">
                      {col}
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index} className="text-center border-b">
                  {reportType === "quantity" ? (
                    <>
                      <td className="px-4 py-2">{row.ID}</td>
                      <td className="px-4 py-2">{row.Supplier}</td>
                      <td className="px-4 py-2">{row.Quantity}</td>
                      <td className="px-4 py-2">{row.Date}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2">{row.ID}</td>
                      <td className="px-4 py-2">{row.Supplier}</td>
                      <td className="px-4 py-2">{row.Quantity}</td>
                      <td className="px-4 py-2">{row.UnitPrice}</td>
                      <td className="px-4 py-2">{row.Quantity * row.UnitPrice}</td>
                      <td className="px-4 py-2">{row.Date}</td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={reportType === "quantity" ? 4 : 6}
                  className="text-center p-4"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Report Page
export default function Report() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="flex">
        <ReportSlide />
        <ReportContent />
      </div>
    </div>
  );
}

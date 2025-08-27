import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import ReportSlide from "../../pages/Report/ReportslideBar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function SupplierReportPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="flex flex-col md:flex-row">
        <ReportSlide />
        <SupplierReport />
      </div>
    </div>
  );
}

function SupplierReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  // Example supplier data
  const allSuppliers = [
    { ID: "S001", Supplier: "A", Quantity: 100, UnitPrice: 200, Date: "2025-08-16" },
    { ID: "S002", Supplier: "B", Quantity: 200, UnitPrice: 150, Date: "2025-08-15" },
    { ID: "S003", Supplier: "A", Quantity: 50, UnitPrice: 200, Date: "2025-08-14" },
    { ID: "S004", Supplier: "C", Quantity: 150, UnitPrice: 100, Date: "2025-08-10" },
  ];

  // Filter data by date range
  const filteredData = allSuppliers.filter((row) => {
    const afterStart = startDate ? row.Date >= startDate : true;
    const beforeEnd = endDate ? row.Date <= endDate : true;
    return afterStart && beforeEnd;
  });

  // Aggregate total quantity & total payment per supplier
  const summary = filteredData.reduce((acc, row) => {
    if (!acc[row.Supplier]) {
      acc[row.Supplier] = { Quantity: 0, TotalPayment: 0 };
    }
    acc[row.Supplier].Quantity += row.Quantity;
    acc[row.Supplier].TotalPayment += row.Quantity * row.UnitPrice;
    return acc;
  }, {});

  let summaryArray = Object.keys(summary).map((supplier, index) => ({
    ID: index + 1,
    Supplier: supplier,
    TotalQuantity: summary[supplier].Quantity,
    TotalPayment: summary[supplier].TotalPayment,
  }));

  // 🔹 Search filter (by ID or Supplier name)
  summaryArray = summaryArray.filter(
    (row) =>
      row.Supplier.toLowerCase().includes(search.toLowerCase()) ||
      String(row.ID).includes(search)
  );

  // PDF Export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Supplier Summary Report", 14, 10);

    const tableColumn = ["ID", "Supplier", "Total Quantity", "Total Payment"];
    const tableRows = summaryArray.map((row) => [
      row.ID,
      row.Supplier,
      row.TotalQuantity,
      row.TotalPayment,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("supplier_summary_report.pdf");
  };

  // Excel Export
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(summaryArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "supplier_summary_report.xlsx");
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Supplier Summary Report</h1>

      {/* 🔹 Date range + Search + Buttons */}
      <div className="mb-5">
      <input
          type="text"
          placeholder="Search by Supplier or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
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
        
        <button
          onClick={handleExportPDF}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
        <button
          onClick={handleExportExcel}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
      </div>

      {/* 🔹 Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Supplier</th>
              <th className="border px-4 py-2">Total Quantity</th>
              <th className="border px-4 py-2">Total Payment</th>
            </tr>
          </thead>
          <tbody>
            {summaryArray.length > 0 ? (
              summaryArray.map((row, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="px-4 py-2">{row.ID}</td>
                  <td className="px-4 py-2">{row.Supplier}</td>
                  <td className="px-4 py-2">{row.TotalQuantity}</td>
                  <td className="px-4 py-2">{row.TotalPayment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No data in this date range / search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

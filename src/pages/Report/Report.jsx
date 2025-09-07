import React, { useState, useMemo } from "react";
import NavigationBar from "../../components/navigationBar";
import ReportSlide from "../../pages/Report/ReportslideBar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { FaFilePdf, FaFileExcel, FaSearch, FaCalendarAlt, FaFilter } from "react-icons/fa";

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
  const [reportType, setReportType] = useState("quantity");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);

  // Sample data
  const allData = [
    { ID: "S001", Supplier: "Alpha Corp", Quantity: 100, UnitPrice: 200, Date: "2025-08-16" },
    { ID: "S002", Supplier: "Beta Industries", Quantity: 200, UnitPrice: 150, Date: "2025-08-15" },
    { ID: "S003", Supplier: "Alpha Corp", Quantity: 150, UnitPrice: 100, Date: "2025-08-10" },
    { ID: "S004", Supplier: "Gamma Solutions", Quantity: 300, UnitPrice: 75, Date: "2025-08-12" },
    { ID: "S005", Supplier: "Delta Systems", Quantity: 50, UnitPrice: 400, Date: "2025-08-14" },
  ];

  // Filtering and sorting logic
  const filteredAndSortedData = useMemo(() => {
    let filtered = allData.filter((row) => {
      const matchesSearch =
        row.Supplier.toLowerCase().includes(search.toLowerCase()) ||
        row.ID.toLowerCase().includes(search.toLowerCase());

      const matchesStart = startDate ? row.Date >= startDate : true;
      const matchesEnd = endDate ? row.Date <= endDate : true;
      return matchesSearch && matchesStart && matchesEnd;
    });

    // Sort data
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [search, startDate, endDate, sortField, sortDirection]);

  // Summary statistics
  const summaryStats = useMemo(() => {
    const totalQuantity = filteredAndSortedData.reduce((sum, row) => sum + row.Quantity, 0);
    const totalValue = filteredAndSortedData.reduce((sum, row) => sum + row.Quantity * row.UnitPrice, 0);
    const uniqueSuppliers = new Set(filteredAndSortedData.map((row) => row.Supplier)).size;

    return {
      totalQuantity,
      totalValue,
      uniqueSuppliers,
      recordCount: filteredAndSortedData.length,
    };
  }, [filteredAndSortedData]);

  // Export PDF
  const handleExportPDF = async () => {
    setIsLoading(true);
    try {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.text("Supplier Report", 14, 20);

      doc.setFontSize(12);
      doc.text(`Report Type: ${reportType === "quantity" ? "Quantity" : "Payment"} Report`, 14, 30);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 40);
      doc.text(`Records: ${filteredAndSortedData.length}`, 14, 50);

      // Summary statistics
      if (reportType === "payment") {
        doc.text(`Total Value: $${summaryStats.totalValue.toLocaleString()}`, 120, 30);
        doc.text(`Total Quantity: ${summaryStats.totalQuantity.toLocaleString()}`, 120, 40);
        doc.text(`Unique Suppliers: ${summaryStats.uniqueSuppliers}`, 120, 50);
      }

      let tableColumn = [];
      let tableRows = [];

      if (reportType === "quantity") {
        tableColumn = ["ID", "Supplier", "Quantity", "Date"];
        tableRows = filteredAndSortedData.map((row) => [
          row.ID,
          row.Supplier,
          row.Quantity.toLocaleString(),
          row.Date,
        ]);
      } else {
        tableColumn = ["ID", "Supplier", "Qty", "Unit Price", "Total", "Date"];
        tableRows = filteredAndSortedData.map((row) => [
          row.ID,
          row.Supplier,
          row.Quantity.toLocaleString(),
          `$${row.UnitPrice.toLocaleString()}`,
          `$${(row.Quantity * row.UnitPrice).toLocaleString()}`,
          row.Date,
        ]);
      }

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [71, 85, 105],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
      });

      doc.save(`${reportType}_report_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Export Excel
  const handleExportExcel = async () => {
    setIsLoading(true);
    try {
      let worksheetData = [];

      if (reportType === "quantity") {
        worksheetData = filteredAndSortedData.map((row) => ({
          ID: row.ID,
          Supplier: row.Supplier,
          Quantity: row.Quantity,
          Date: row.Date,
        }));
      } else {
        worksheetData = filteredAndSortedData.map((row) => ({
          ID: row.ID,
          Supplier: row.Supplier,
          Quantity: row.Quantity,
          "Unit Price": row.UnitPrice,
          "Total Payment": row.Quantity * row.UnitPrice,
          Date: row.Date,
        }));
      }

      // Add summary row
      if (reportType === "payment") {
        worksheetData.push({});
        worksheetData.push({
          ID: "SUMMARY",
          Supplier: `${summaryStats.uniqueSuppliers} Unique Suppliers`,
          Quantity: summaryStats.totalQuantity,
          "Unit Price": "",
          "Total Payment": summaryStats.totalValue,
          Date: new Date().toLocaleDateString(),
        });
      }

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
      XLSX.writeFile(workbook, `${reportType}_report_${new Date().toISOString().split("T")[0]}.xlsx`);
    } catch (error) {
      console.error("Error generating Excel:", error);
      alert("Error generating Excel file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setSortField("");
    setSortDirection("asc");
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Header with Summary Stats */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Supplier Report</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600">Total Records</h3>
            <p className="text-2xl font-bold text-gray-800">{summaryStats.recordCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600">Total Quantity</h3>
            <p className="text-2xl font-bold text-gray-800">{summaryStats.totalQuantity.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-600">Unique Suppliers</h3>
            <p className="text-2xl font-bold text-gray-800">{summaryStats.uniqueSuppliers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
            <p className="text-2xl font-bold text-gray-800">${summaryStats.totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-64">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or Supplier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="quantity">Quantity Report</option>
              <option value="payment">Payment Report</option>
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleExportPDF}
          disabled={isLoading}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 
                     text-white px-6 py-3 rounded-lg shadow-md 
                     hover:from-red-600 hover:to-red-700 
                     transition-all duration-300 ease-in-out transform hover:scale-105
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <FaFilePdf className="text-lg" />
          {isLoading ? "Generating..." : "Export PDF"}
        </button>

        <button
          onClick={handleExportExcel}
          disabled={isLoading}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 
                     text-white px-6 py-3 rounded-lg shadow-md 
                     hover:from-green-600 hover:to-green-700 
                     transition-all duration-300 ease-in-out transform hover:scale-105
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <FaFileExcel className="text-lg" />
          {isLoading ? "Generating..." : "Export Excel"}
        </button>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {reportType === "quantity"
                  ? ["ID", "Supplier", "Quantity", "Date"].map((col) => (
                      <th
                        key={col}
                        onClick={() => handleSort(col)}
                        className="border-b px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-1">
                          {col}
                          {sortField === col && (
                            <span className="text-blue-500">
                              {sortDirection === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                    ))
                  : ["ID", "Supplier", "Quantity", "Unit Price", "Total Payment", "Date"].map((col) => (
                      <th
                        key={col}
                        onClick={() => handleSort(col)}
                        className="border-b px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-1">
                          {col}
                          {sortField === col && (
                            <span className="text-blue-500">
                              {sortDirection === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    {reportType === "quantity" ? (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.ID}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.Supplier}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.Quantity.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.Date}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.ID}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.Supplier}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.Quantity.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">${row.UnitPrice.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">
                          ${(row.Quantity * row.UnitPrice).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.Date}</td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={reportType === "quantity" ? 4 : 6}
                    className="text-center p-8 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FaSearch className="text-4xl text-gray-300" />
                      <p>No results found</p>
                      <p className="text-sm">Try adjusting your search criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
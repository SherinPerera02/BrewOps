import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generateInventoryReport = (inventoryData = []) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text('BrewOps - Inventory Report', 20, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
  doc.text('Report Type: Inventory Summary', 20, 45);
  
  // Add summary statistics
  const totalItems = inventoryData.length;
  const lowStockItems = inventoryData.filter(item => item.quantity < 50).length;
  const totalValue = inventoryData.reduce((sum, item) => sum + (item.quantity * item.unitPrice || 0), 0);
  
  doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text('Summary:', 20, 65);
  
  doc.setFontSize(10);
  doc.text(`Total Items: ${totalItems}`, 20, 75);
  doc.text(`Low Stock Items: ${lowStockItems}`, 20, 85);
  doc.text(`Total Inventory Value: Rs. ${totalValue.toLocaleString()}`, 20, 95);
  
  // Prepare table data
  const tableData = inventoryData.map(item => [
    item.name || 'N/A',
    item.category || 'N/A',
    item.quantity || 0,
    item.unit || 'kg',
    `Rs. ${(item.unitPrice || 0).toLocaleString()}`,
    item.supplier || 'N/A',
    item.status || 'Active'
  ]);
  
  // Add table
  autoTable(doc, {
    head: [['Item Name', 'Category', 'Quantity', 'Unit', 'Unit Price', 'Supplier', 'Status']],
    body: tableData,
    startY: 110,
    theme: 'striped',
    headStyles: { fillColor: [34, 197, 94] },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 20 },
      2: { cellWidth: 15 },
      3: { cellWidth: 15 },
      4: { cellWidth: 20 },
      5: { cellWidth: 25 },
      6: { cellWidth: 15 }
    }
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
    doc.text('BrewOps Tea Factory Management System', 20, 285);
  }
  
  return doc;
};

const generateSupplierReport = (supplierData = []) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text('BrewOps - Supplier Report', 20, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
  doc.text('Report Type: Supplier Performance Summary', 20, 45);
  
  // Add summary statistics
  const totalSuppliers = supplierData.length;
  const activeSuppliers = supplierData.filter(supplier => supplier.status === 'active').length;
  const averageRating = supplierData.reduce((sum, supplier) => sum + (supplier.rating || 0), 0) / totalSuppliers || 0;
  
  doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text('Summary:', 20, 65);
  
  doc.setFontSize(10);
  doc.text(`Total Suppliers: ${totalSuppliers}`, 20, 75);
  doc.text(`Active Suppliers: ${activeSuppliers}`, 20, 85);
  doc.text(`Average Rating: ${averageRating.toFixed(1)}/5.0`, 20, 95);
  
  // Prepare table data
  const tableData = supplierData.map(supplier => [
    supplier.name || 'N/A',
    supplier.contactPerson || 'N/A',
    supplier.phone || 'N/A',
    supplier.location || 'N/A',
    supplier.rating ? `${supplier.rating}/5` : 'N/A',
    supplier.totalDeliveries || 0,
    supplier.status || 'Active'
  ]);
  
  // Add table
  autoTable(doc, {
    head: [['Supplier Name', 'Contact Person', 'Phone', 'Location', 'Rating', 'Deliveries', 'Status']],
    body: tableData,
    startY: 110,
    theme: 'striped',
    headStyles: { fillColor: [34, 197, 94] },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 25 },
      2: { cellWidth: 20 },
      3: { cellWidth: 25 },
      4: { cellWidth: 15 },
      5: { cellWidth: 15 },
      6: { cellWidth: 15 }
    }
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
    doc.text('BrewOps Tea Factory Management System', 20, 285);
  }
  
  return doc;
};

const generateProductionReport = (productionData = []) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text('BrewOps - Production Report', 20, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
  doc.text('Report Type: Production Analysis', 20, 45);
  
  // Add summary statistics
  const totalProduction = productionData.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const averageQuality = productionData.reduce((sum, item) => sum + (item.qualityScore || 0), 0) / productionData.length || 0;
  const productionDays = productionData.length;
  
  doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text('Summary:', 20, 65);
  
  doc.setFontSize(10);
  doc.text(`Total Production: ${totalProduction} kg`, 20, 75);
  doc.text(`Average Quality Score: ${averageQuality.toFixed(1)}%`, 20, 85);
  doc.text(`Production Days: ${productionDays}`, 20, 95);
  doc.text(`Average Daily Production: ${(totalProduction / productionDays || 0).toFixed(1)} kg`, 20, 105);
  
  // Prepare table data
  const tableData = productionData.map(item => [
    item.date || 'N/A',
    item.batchNumber || 'N/A',
    item.teaType || 'N/A',
    `${item.quantity || 0} kg`,
    `${item.qualityScore || 0}%`,
    item.supervisor || 'N/A',
    item.status || 'Completed'
  ]);
  
  // Add table
  autoTable(doc, {
    head: [['Date', 'Batch #', 'Tea Type', 'Quantity', 'Quality', 'Supervisor', 'Status']],
    body: tableData,
    startY: 120,
    theme: 'striped',
    headStyles: { fillColor: [34, 197, 94] },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 20 },
      2: { cellWidth: 25 },
      3: { cellWidth: 20 },
      4: { cellWidth: 15 },
      5: { cellWidth: 25 },
      6: { cellWidth: 20 }
    }
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
    doc.text('BrewOps Tea Factory Management System', 20, 285);
  }
  
  return doc;
};

const generateFinancialReport = (financialData = {}) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text('BrewOps - Financial Report', 20, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
  doc.text('Report Type: Financial Summary', 20, 45);
  
  // Add financial summary
  doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text('Financial Summary:', 20, 65);
  
  doc.setFontSize(12);
  doc.text(`Total Revenue: Rs. ${(financialData.totalRevenue || 0).toLocaleString()}`, 20, 80);
  doc.text(`Total Expenses: Rs. ${(financialData.totalExpenses || 0).toLocaleString()}`, 20, 95);
  doc.text(`Net Profit: Rs. ${((financialData.totalRevenue || 0) - (financialData.totalExpenses || 0)).toLocaleString()}`, 20, 110);
  doc.text(`Profit Margin: ${(((financialData.totalRevenue || 0) - (financialData.totalExpenses || 0)) / (financialData.totalRevenue || 1) * 100).toFixed(2)}%`, 20, 125);
  
  // Add breakdown tables
  const revenueData = [
    ['Tea Sales', `Rs. ${(financialData.teaSales || 0).toLocaleString()}`],
    ['Export Revenue', `Rs. ${(financialData.exportRevenue || 0).toLocaleString()}`],
    ['Other Income', `Rs. ${(financialData.otherIncome || 0).toLocaleString()}`]
  ];
  
  const expenseData = [
    ['Raw Materials', `Rs. ${(financialData.rawMaterials || 0).toLocaleString()}`],
    ['Labor Costs', `Rs. ${(financialData.laborCosts || 0).toLocaleString()}`],
    ['Utilities', `Rs. ${(financialData.utilities || 0).toLocaleString()}`],
    ['Transportation', `Rs. ${(financialData.transportation || 0).toLocaleString()}`],
    ['Other Expenses', `Rs. ${(financialData.otherExpenses || 0).toLocaleString()}`]
  ];
  
  // Revenue breakdown table
  autoTable(doc, {
    head: [['Revenue Source', 'Amount']],
    body: revenueData,
    startY: 140,
    theme: 'striped',
    headStyles: { fillColor: [34, 197, 94] },
    margin: { left: 20, right: 110 }
  });
  
  // Expense breakdown table
  autoTable(doc, {
    head: [['Expense Category', 'Amount']],
    body: expenseData,
    startY: 140,
    theme: 'striped',
    headStyles: { fillColor: [239, 68, 68] },
    margin: { left: 110, right: 20 }
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
    doc.text('BrewOps Tea Factory Management System', 20, 285);
  }
  
  return doc;
};

export {
  generateInventoryReport,
  generateSupplierReport,
  generateProductionReport,
  generateFinancialReport
};
import React, { useState } from 'react';
import './SupplierRecodeTable.css';
import SupplierNavigation from '../../../components/SupplierNavigation/SupplierNavigation';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';

import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function SupplierRecodeTable() {
  // Sample data
  const sampleRecords = [
    {
      _id: '1',
      supplier: 'Kamal',
      date: '2025-07-30',
      quantity: 500,
      unitprice: 120,
      status: 'Pending',
    },
    {
      _id: '2',
      supplier: 'Amal',
      date: '2025-07-28',
      quantity: 750,
      unitprice: 100,
      status: 'Completed',
    },
    {
      _id: '3',
      supplier: 'Nimal',
      date: '2025-07-27',
      quantity: 300,
      unitprice: 110,
      status: 'Pending',
    },
  ];

  const [searchInput, setSearchInput] = useState('');

  const filteredRecords = sampleRecords.filter((record) =>
    record.supplier.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Generate PDF Report
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(18);
    doc.text('EVER GREEN TEA - Supply Records Report', pageWidth / 2, 20, { align: 'center' });

    const tableData = filteredRecords.map((rec) => [
      rec.supplier,
      rec.date,
      rec.quantity,
      rec.unitprice,
      (rec.quantity * rec.unitprice).toFixed(2),
      rec.status,
    ]);

    doc.autoTable({
      head: [['Supplier', 'Date', 'Quantity', 'Unit Price', 'Cost', 'Status']],
      body: tableData,
      startY: 30,
    });

    const finalY = doc.lastAutoTable.finalY;
    doc.text('Authorized Signature: ____________________', 15, finalY + 30);
    doc.text('Date: ____________________', pageWidth - 80, finalY + 30);

    doc.save('SupplyReport.pdf');
  };

  return (
    <div className="supplier-recode-table">
      <div className="nav">
        <SupplierNavigation />
      </div>

      <div className="body">
        <div className="body_container">
          <h1>Supplier Record List</h1>
          <div className="body_function">
            <button onClick={downloadPDF}>Generate Report</button>
            <Link to="/SupplierRecodeCreate">Add Record</Link>
          </div>
        </div>

        <div className="searchBar">
          <input
            type="text"
            placeholder="Search by supplier name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="SupplierRecodeTable">
          <table>
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Supplier Date</th>
                <th>Raw Quantity (Kg)</th>
                <th>Unit Price</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((item) => (
                  <tr key={item._id}>
                    <td>{item.supplier}</td>
                    <td>{item.date}</td>
                    <td>{item.quantity}</td>
                    <td>Rs. {item.unitprice.toFixed(2)}</td>
                    <td>Rs. {(item.quantity * item.unitprice).toFixed(2)}</td>
                    <td>
                      {item.status === 'Pending' ? (
                        <span className="pending">{item.status}</span>
                      ) : (
                        <span className="completed">{item.status}</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to={`/supplyrecords/details/${item._id}`}>
                          <BsInfoCircle className="text-2xl text-green-800" />
                        </Link>
                        {item.status === 'Pending' ? (
                          <Link to='/EditSupplierRecode'>
                            <AiOutlineEdit className="text-2xl text-yellow-600" />
                          </Link>
                        ) : (
                          <span className="text-2xl text-gray-400 cursor-not-allowed">
                            <AiOutlineEdit />
                          </span>
                        )}
                        {item.status === 'Pending' ? (
                          <Link to={`/supplyrecords/delete/${item._id}`}>
                            <MdOutlineDelete className="text-2xl text-red-600" />
                          </Link>
                        ) : (
                          <span className="text-2xl text-gray-400 cursor-not-allowed">
                            <MdOutlineDelete />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

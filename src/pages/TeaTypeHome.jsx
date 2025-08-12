import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

import NavigationBar from '../components/navigationbar.jsx';
import Footer from '../components/footer.jsx';
import Spinner from '../components/spinner.jsx';

const TeaTypeHome = () => {
  const [teaTypes, setTeaTypes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Load mock data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTeaTypes([
        { id: 1, name: 'Green Tea', description: 'Fresh and healthy', price: 1200 },
        { id: 2, name: 'Black Tea', description: 'Strong and bold', price: 1000 },
        { id: 3, name: 'Herbal Tea', description: 'Soothing and caffeine-free', price: 1400 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Search handler
  const handleSearch = () => {
    setTeaTypes((prev) =>
      searchInput.trim()
        ? prev.filter((t) => t.name.toLowerCase().includes(searchInput.toLowerCase()))
        : prev
    );
  };

  // PDF report generation
  const handleReportGeneration = () => {
    if (!teaTypes.length) return alert('No tea types available to generate report.');

    const doc = new jsPDF();
    doc.setFontSize(18).text('BrewOps Tea Types Report', 40, 40);
    doc.setFontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, 40, 60);

    autoTable(doc, {
      startY: 80,
      head: [['No', 'Name', 'Description', 'Price (Rs/Kg)']],
      body: teaTypes.map((t, i) => [i + 1, t.name, t.description, t.price]),
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontSize: 12 },
      styles: { fontSize: 10, cellPadding: 6 },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 120 }, 2: { cellWidth: 260 }, 3: { cellWidth: 80, halign: 'right' } },
    });

    doc.save('Tea_Types_Report.pdf');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 h-screen p-6 space-y-4 sticky top-0">
          {[
            { to: '/HomePage', label: 'Home' },
            { to: '/teatypes', label: 'View Tea Types', active: true },
            { to: '/teatypes/create', label: 'Create Tea Type' },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className={`block px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 ${item.active ? 'bg-green-600 bg-opacity-40' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <button onClick={handleReportGeneration} className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 text-sm font-medium">
            Generate report
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Tea Types</h1>
            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                placeholder="Search tea..."
                className="border border-gray-300 px-4 py-2 rounded"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900">Search</button>
              <Link to="/teatypes/create" className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900">
                <MdOutlineAddBox className="text-xl mr-2" /> Add Tea Type
              </Link>
            </div>
          </div>

          {loading ? <Spinner /> : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
                <thead className="bg-black text-white text-xs font-medium uppercase tracking-wider">
                  <tr>{['No', 'Name', 'Description', 'Price (Rs/kg)', 'Actions'].map((h) => <th key={h} className="px-6 py-3 text-left">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {teaTypes.length ? teaTypes.map((t, i) => (
                    <tr key={t.id} className="border-t">
                      <td className="px-6 py-3">{i + 1}</td>
                      <td className="px-6 py-3">{t.name}</td>
                      <td className="px-6 py-3">{t.description}</td>
                      <td className="px-6 py-3">{t.price}</td>
                      <td className="px-6 py-3 flex gap-4">
                        <Link to={`/teatypes/details/${t.id}`} className="text-green-700 text-xl"><BsInfoCircle /></Link>
                        <Link to={`/teatypes/edit/${t.id}`} className="text-yellow-600 text-xl"><AiOutlineEdit /></Link>
                        <Link to={`/teatypes/delete/${t.id}`} className="text-red-600 text-xl"><MdOutlineDelete /></Link>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="5" className="text-center py-4">No tea types available.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default TeaTypeHome;

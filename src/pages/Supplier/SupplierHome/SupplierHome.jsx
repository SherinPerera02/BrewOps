import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import NavigationBar from '../../../components/NavigationBar';
import SupplierSearch from '../../../components/SupplierSearch/SupplierSearch';
import Footer from '../../../components/Footer';
import Spinner from '../../../components/Spinner';

import profile from '../../../assets/profile.png';


import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

import './SupplierHomeStyle.css';

export default function SupplierHome() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const tableRef = useRef(null);

  // Load suppliers
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/suppliers')
      .then((response) => {
        setSuppliers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error);
        setLoading(false);
      });
  }, []);

  // Search logic
  useEffect(() => {
    handleSearch();
  }, [searchInput, searchType, suppliers]);

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setFilteredSuppliers([]);
    } else {
      const filtered = suppliers.filter((supplier) => {
        if (searchType === 'id') {
          return supplier.supplierId
            ?.toLowerCase()
            .includes(searchInput.toLowerCase());
        } else if (searchType === 'name') {
          return supplier.supplierName
            ?.toLowerCase()
            .includes(searchInput.toLowerCase());
        }
        return false;
      });
      setFilteredSuppliers(filtered);
    }

  };

    //report generate function
    const downloadPDF = () => {
      try {
          const doc = new jsPDF();
          const pageWidth = doc.internal.pageSize.getWidth();
  
          const logoWidth = 20;
          const logoHeight = 20;
          const logoX = 15;
          const logoY = 10;
  
          doc.addImage(companyLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);

          doc.setFontSize(12);
          const mainTopic = 'EVER GREEN TEA';
          
          // Position text to right to logo
          const textPadding = 5; 
          const mainTopicX = logoX + logoWidth + textPadding;
          const mainTopicY = logoY + (logoHeight / 2); 
          
          doc.text(mainTopic, mainTopicX, mainTopicY);
  
          doc.setFontSize(16);
          const secondaryTopic = 'Suppliers Report';
          const secondaryTopicWidth = doc.getTextWidth(secondaryTopic);
          
          // Center second topic on page
          const secondaryTopicX = (pageWidth - secondaryTopicWidth) / 2;
          const secondaryTopicY = mainTopicY + logoHeight;
  
          doc.text(secondaryTopic, secondaryTopicX, secondaryTopicY);
  
          const tableData = suppliers.map(supplier => [
              supplier.supplierid,
              supplier.name,
              supplier.address,
              supplier.contact,
              supplier.email,
          ]);
  
          doc.autoTable({
              head: [['Supplier ID', 'Name', 'Address', 'Contact No', 'Email']],
              body: tableData,
              margin: { top: secondaryTopicY  + 10 },
              columnStyles: {
                  0: { cellWidth: 30 },
              },
          });
  
          const finalY = doc.autoTable.previous.finalY;
          const signatureX = 15;
          const signatureY = finalY + 30;
  
          const dateX = pageWidth - 40;
          const dateY = signatureY;
  
          doc.setFontSize(12);
          doc.text('....................', signatureX, signatureY);
          doc.text('Authorized Signature', signatureX, signatureY + 5);

          doc.text('....................', dateX, dateY);
          doc.text('Date', dateX, signatureY + 5);
          doc.text('Authorized Signature', signatureX, signatureY + 5);

  
          doc.save('Suppliers Report.pdf');
      } catch (error) {
          console.error('Error generating PDF:', error);
      }

    
  };

  return (
    <div className="supplier-home-wrapper">
      
      <div className="nav">
        <NavigationBar />
        <nav>
          <div className="container">
            <div className="subnav">
              <Link to="">Home</Link>
              <Link to="/SupplierHome">Suppliers</Link>
              <Link to="">Supplier Record</Link>
              <Link to="">
                <img src={profile} alt="Profile" />
              </Link>
            </div>
          </div>
        </nav>
      </div>

    
      <div className="body">
        <div className="body_container">
          <h1>Supplier List</h1>
          <div className="body_function">
            <button>Generate Report</button>
            <Link to="/CreateSupplier">Add New</Link>
          </div>
        </div>

        <div className="searchbar-wrapper">
          <SupplierSearch
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchType={searchType}
            setSearchType={setSearchType}
            showSearchType={true}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {searchInput.trim() !== '' && filteredSuppliers.length === 0 ? (
              <p style={{ padding: '20px', textAlign: 'center' }}>No Results Found.</p>
            ) : (
              <div id="pdf_content" ref={tableRef}>
                <div className="supplier_table">
                  <table>
                    <thead>
                      <tr>
                        <th>Supplier ID</th>
                        <th>Supplier Name</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(filteredSuppliers.length > 0 ? filteredSuppliers : suppliers).map(
                        (item, index) => (
                          <tr key={item._id || index}>
                            <td>{item.supplierId}</td>
                            <td>{item.supplierName}</td>
                            <td>{item.contactNumber}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <Link to={`/suppliers/details/${item._id}`}>
                                  <BsInfoCircle className="text-2xl text-green-800" />
                                </Link>
                                <Link to={`/suppliers/edit/${item._id}`}>
                                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                                </Link>
                                <Link to={`/suppliers/delete/${item._id}`}>
                                  <MdOutlineDelete className="text-2xl text-red-600" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

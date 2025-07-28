import React, { useState } from 'react';

export default function SupplierSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('name');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <div className="supplier-search flex items-center gap-4 p-4">
      <input
        type="text"
        placeholder={`Search ${searchType === 'id' ? 'Supplier ID' : 'Supplier Name'}`}
        value={searchInput}
        onChange={handleInputChange}
        className="mx-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <select
        value={searchType}
        onChange={handleTypeChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="name">Supplier Name</option>
        <option value="id">Supplier ID</option>
      </select>
    </div>
  );
}

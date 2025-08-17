import React, { useState, useEffect } from 'react';
import BackButton from '../components/backButton';
import Spinner from '../components/Spinner';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateInventory = () => {
  const [batchid, setBatchId] = useState('');
  const [inventorynumber, setInventoryNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [batchIdError, setBatchIdError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [inventoryNumberError, setInventoryNumberError] = useState('');
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    
    axios
      .get('http://localhost:5000/inventory')
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching inventory:', error);
        setLoading(false);
      });
  }, []);

  const handleSaveInventory = () => {
    const batchIdPattern = /^B-\d+$/; // Batch ID should start with B- followed by numbers
    const inventoryNumberPattern = /^INV\d+$/; // Inventory Number should start with INV followed by numbers

    if (!batchIdPattern.test(batchid)) {
      alert('Batch ID must start with B- followed by numbers (e.g., B-1001)');
      return;
    }

    if (!inventoryNumberPattern.test(inventorynumber)) {
      alert('Inventory Number must start with INV followed by numbers (e.g., INV001)');
      return;
    }

    if (batchIdError || quantityError || inventoryNumberError || batchid.length < 5 || !batchid || !inventorynumber || !quantity) {
      alert('Please fill all fields correctly');
      return;
    }

    const data = {
      batchid,
      inventorynumber,
      quantity,
    };
    setLoading(true);
    axios.post('http://localhost:5000/inventory', data)
      .then(() => {
        setLoading(false);
        navigate('/Inventories');
      })
      .catch((error) => {
        console.error('Error saving inventory:', error);
        alert('An error occurred');
        setLoading(false);
      });
  };

  useEffect(() => {
    // Real-time validation for batchid
    const pattern = /^B-\d+$/; // Batch ID should start with B- followed by numbers
    if (!pattern.test(batchid)) {
      setBatchIdError('Batch ID must start with B- followed by numbers (e.g., B-1001)');
    } else {
      setBatchIdError('');
    }
  }, [batchid]);

  useEffect(() => {
    // Real-time validation for quantity
    if (quantity.length > 6) {
      setQuantityError('Quantity must not exceed 6 digits');
    } else {
      setQuantityError('');
    }
  }, [quantity]);

  useEffect(() => {
    // Real-time validation for inventory number
    const pattern = /^INV\d+$/; // Inventory Number should start with INV followed by numbers
    if (!pattern.test(inventorynumber)) {
      setInventoryNumberError('Inventory Number must start with INV followed by numbers (e.g., INV001)');
    } else {
      setInventoryNumberError('');
    }
  }, [inventorynumber]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setQuantity(value);
    }
  };

  const updateStatus = (id) => {
    axios.put(`http://localhost:5000/inventory/${id}`, { status: 'add to the inventory' })
      .then((response) => {
        // Update the status in the state
        setInventory(prevState => {
          return prevState.map(item => {
            if (item._id === id) {
              return { ...item, status: 'add to the inventory' };
            }
            return item;
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <div className='flex-1 container mx-auaypx-4'>
        <BackButton />
        <h1 className='text-2xl my-4 text-center font-bold'>Create Inventory</h1>

        {loading ? <Spinner /> : ''}
        <div className='max-w-3xl mx-auto px-4 bg-white shadow-md rounded-lg py-6 mb-8'>
          <div className='mb-4'>
            <label className='block text-md mb-2 text-gray-700'>Batch ID</label>
            <input
              type="text"
              value={batchid}
              onChange={(e) => setBatchId(e.target.value)}
              onBlur={() => {
                const pattern = /^B-\d+$/; // Batch ID should start with B- followed by numbers
                if (!pattern.test(batchid)) {
                  setBatchIdError('Batch ID must start with B- followed by numbers (e.g., B-1001)');
                } else {
                  setBatchIdError('');
                }
              }}
              className={`border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${batchIdError && 'border-red-500'}`}
            />
            {batchIdError && <div className="text-red-500">{batchIdError}</div>}
          </div>

          <div className='mb-4'>
            <label className='block text-md mb-2 text-gray-700'>Inventory Number</label>
            <input
              type="text"
              value={inventorynumber}
              onChange={(e) => setInventoryNumber(e.target.value)}
              className={`border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${inventoryNumberError && 'border-red-500'}`}
            />
            {inventoryNumberError && <div className="text-red-500">{inventoryNumberError}</div>}
          </div>

          <div className='mb-4'>
            <label className='block text-md mb-2 text-gray-700'>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className={`border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${quantityError && 'border-red-500'}`}
            />
            {quantityError && <div className="text-red-500">{quantityError}</div>}
          </div>

          <button className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600' onClick={handleSaveInventory}>
            Save
          </button>
        </div>


      </div>
      <Footer />
    </div>
  );
};

export default CreateInventory;

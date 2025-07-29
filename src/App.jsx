import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Inventories from './pages/inventories';
import CreateInventory from './pages/createInventory';
import ShowInventory from './pages/showInventory';
import EditInventory from './pages/editInventory';
import DeleteInventory from './pages/deleteInventory';


import SupplierHome from './pages/Supplier/SupplierHome/SupplierHome'
import CreateSupplier from './pages/Supplier/CreateSupplier/CreateSupplier'
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/inventories" element={<Inventories />} />
        <Route path="/inventory/creates" element={<CreateInventory />} />
        <Route path="/inventory/details/:id" element={<ShowInventory />} />
        <Route path="/inventory/edit/:id" element={<EditInventory />} />
        <Route path="/inventory/delete/:id" element={<DeleteInventory />} />









  
        <Route path="/SupplierHome" element={<SupplierHome />} />
        <Route path ="/CreateSupplier" element={<CreateSupplier />} />
       


        

      </Routes>
    </BrowserRouter>
  );
}

export default App;

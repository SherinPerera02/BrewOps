import HomePage from './pages/homePage';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Inventories from './pages/inventories';
import CreateInventory from './pages/createInventory';
import ShowInventory from './pages/showInventory';
import EditInventory from './pages/editInventory';
import DeleteInventory from './pages/deleteInventory';

import SupplyRecordTable from './pages/Rawleaves';
import RetrieveTeaLeavesEntries from './pages/Rawtealeaves';
import CreateTeaLeavesEntry from './pages/Rawtealeavescreate';
import DeleteTeaLeavesEntry from './pages/Rawtealeavesdelete';
import UpdateTeaLeavesEntry from './pages/Rawtealeavesupdate';

import WhoWeAre from './pages/WhoWeAre';
import LoginPage from './pages/login';
import AdminDashboard from './pages/adminDashboard';
import RegisterPage from './pages/register';

import CreateSupplierRecode from './pages/Supplier/CreateSupplierRecode/CreateSupplierRecode';
import SupplierHome from './pages/Supplier/SupplierHome'
import CreateSupplier from './pages/Supplier/CreateSupplier'
import SupplierRecode from './pages/Supplier/SupplierRecode';
import ShowSupplier from './pages/Supplier/ShowSupplier'
import EditSupplier from './pages/Supplier/EditSupplier';
import DeleteSuppliers from './pages/Supplier/DeleteSuppliers'

import ShowSupplyRecode from './pages/Supplier/ShowSupplyRecode';
import EditSupplierRecode from './pages/Supplier/EditSupplierRecode';
import CreateSupplyRecode1 from './pages/Supplier/CreateSupplyRecode1'
import DeleteSupplyRecode from './pages/Supplier/DeleteSupplyRecode';

import SupplierDashboard from './pages/supplierDashboard';

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AboutUs" element={<WhoWeAre />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
       
        <Route path="/inventories" element={<Inventories />} />
        <Route path="/inventory/creates" element={<CreateInventory />} />
        <Route path="/inventory/details/:id" element={<ShowInventory />} />
        <Route path="/inventory/edit/:id" element={<EditInventory />} />
        <Route path="/inventory/delete/:id" element={<DeleteInventory />} />
  
        <Route path="/SupplierHome" element={<SupplierHome />} />

        // Supplier Create
        <Route path ="/suppliers/create" element={<CreateSupplier />} />
        <Route path ="/suppliers/details/:id"  element={<ShowSupplier />} />
        <Route path ='/SupplierRecodeCreate' element={<CreateSupplierRecode />} />
        <Route path ="/Suppliers/edit/:id" element={<EditSupplier/>}/>
        <Route path="/Suppliers/delete/:id" element={<DeleteSuppliers/>}/>


        // Supplier Recode Table
        <Route path ='/SupplierRecode' element={<SupplierRecode />} />
        <Route path = '/supplyRecode/details/:id' element ={<ShowSupplyRecode/>} />
        <Route path ='/supplyRecode/edit/:id' element={<EditSupplierRecode/>}/>
        <Route path='/supplyRecode/create' element={<CreateSupplyRecode1/>}/>
        <Route path ='/SupplyRecode/delete/:id' element = {< DeleteSupplyRecode/>}/>  

        <Route path="/Rawleaves" element={<SupplyRecordTable />} />
        <Route path="/Rawtealeaves" element={<RetrieveTeaLeavesEntries />} />
        <Route path="/Rawtealeavescreate" element={<CreateTeaLeavesEntry />} />
        <Route path="/Rawtealeavesdelete/:id" element={<DeleteTeaLeavesEntry />} />
        <Route path="/Rawtealeavesupdate/:id" element={<UpdateTeaLeavesEntry />} />

        <Route path="/SupplierDashboard" element={<SupplierDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

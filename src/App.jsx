import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Inventories from './pages/inventories';
import CreateInventory from './pages/createInventory';
import ShowInventory from './pages/showInventory';
import EditInventory from './pages/editInventory';
import DeleteInventory from './pages/deleteInventory';
import CreateSupplierRecode from './pages/Supplier/CreateSupplierRecode/CreateSupplierRecode';


import SupplierHome from './pages/Supplier/SupplierHome'
import CreateSupplier from './pages/Supplier/CreateSupplier/CreateSupplier'
import SupplierRecodeTable from './pages/Supplier/SupplierRecodeTable/SupplierRecodeTable'
import ShowSupplier from './pages/Supplier/SupplierRecodeTable/ShowSupplier/ShowSupplier'
import ShowSupplyRecode from './pages/Supplier/ShowSupplyRecode/ShowSupplyRecode';
import EditSupplier from './pages/Supplier/EditSpplier/EditSupplier';
import EditSupplierRecode from './pages/Supplier/EditSupplierRecode/EditSupplierRecode';



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

        // Supplier Create
        <Route path ="/CreateSupplier" element={<CreateSupplier />} />
        <Route path ="/SupplierShow"  element={<ShowSupplier />} />
        <Route path ='/SupplierRecodeCreate' element={<CreateSupplierRecode />} />
        <Route path ="/EditSupplier" element={<EditSupplier/>}/>


      // Supplier Recode Table
       <Route path ='/SupplierRecodeTable' element={<SupplierRecodeTable />} />
       <Route path = '/ShowSupplyRecode' element ={<ShowSupplyRecode/>} />
       <Route path ='/EditSupplierRecode' element={<EditSupplierRecode/>}/>

       
       


        

      </Routes>
    </BrowserRouter>
  );
}

export default App;

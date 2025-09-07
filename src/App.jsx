import HomePage from './pages/homePage';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Inventories from './pages/inventories';
import CreateInventory from './pages/createInventory';
import ShowInventory from './pages/showInventory';
import EditInventory from './pages/editInventory';
import DeleteInventory from './pages/deleteInventory';
import WhoWeAre from './pages/WhoWeAre';
import LoginPage from './pages/login';
import AdminDashboard from './pages/adminDashboard';
import RegisterPage from './pages/register';
import SupplierDashboard from './pages/supplierDashboard';
import ProductionManagerDashboard from './pages/ProductionManagerDashboard';
import StaffDashboard from './pages/StaffDashboard';

import SupplierHome from './pages/Supplier/SupplierHome'
import CreateSupplier from './pages/Supplier/CreateSupplier'
import SupplierRecode from './pages/Supplier/SupplierRecode';
import ShowSupplier from './pages/Supplier/ShowSupplier'
import EditSupplier from './pages/Supplier/EditSupplier';
import DeleteSuppliers from './pages/Supplier/DeleteSuppliers'

import ShowSupplyRecode from './pages/Supplier/ShowSupplyRecode';
import EditSupplierRecode from './pages/Supplier/EditSupplierRecode';
import CreateSupplierRecode from './pages/Supplier/CreateSupplierRecode';
import DeleteSupplyRecode from './pages/Supplier/DeleteSupplyRecode';

import StaffProfile from './pages/Supplier/StaffProfile';
import Setting from './pages/Supplier/Setting'
import EditProfile from './pages/editProfile';
import PaymentSummary from './pages/paymentSummary';
import LeavesQuantity from './pages/leavesQuantity';
import Transaction from './pages/transaction';
import Production from './pages/Production';
import TeaFactoryPayment from './pages/SupplierPayment';
import UserManagement from './pages/UserManagement';
import SystemSecurity from './pages/SystemSecurity';
import RolePermissions from './pages/RolePermissions';
import BackupAndRecovery from './pages/BackupAndRecovery';


function AppRoutes() {
  const location = useLocation();
  // This lets us render a background page while a modal route is active
  const background = location.state && location.state.background;

  return (
    <>
        <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/AboutUs" element={<WhoWeAre />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/inventories" element={<Inventories />} />
        <Route path="/inventory/creates" element={<CreateInventory />} />
        <Route path="/inventory/:id" element={<ShowInventory />} />
        <Route path="/inventory/edit/:id" element={<EditInventory />} />
        <Route path="/inventory/delete/:id" element={<DeleteInventory />} />
        <Route path="/ProductionManagerDashboard" element={<ProductionManagerDashboard />} />
        <Route path="/Production" element={<Production />} />
        <Route path ="/StaffDashboard" element={<StaffDashboard/>}/>
        <Route path = '/Staff/profile' element = {<StaffProfile/>}/>
        <Route path='/Staff/profile/setting' element={<Setting/>}/>
        <Route path="/SupplierHome" element={<SupplierHome />} />
        <Route path ="/suppliers/create" element={<CreateSupplier />} />
        <Route path ="/suppliers/details/:id"  element={<ShowSupplier />} />
        <Route path ='/SupplierRecodeCreate' element={<CreateSupplierRecode />} />
        <Route path ="/suppliers/edit/:id" element={<EditSupplier/>}/>
        <Route path="/suppliers/delete/:id" element={<DeleteSuppliers/>}/>
        <Route path ='/SupplierRecode' element={<SupplierRecode />} />
        <Route path = '/supplyRecode/details/:id' element ={<ShowSupplyRecode/>} />
        <Route path ='/supplyRecode/edit/:id' element={<EditSupplierRecode/>}/>
        <Route path='/supplyRecode/create' element={<CreateSupplierRecode/>}/>
        <Route path ='/SupplyRecode/delete/:id' element = {< DeleteSupplyRecode/>}/>  
        <Route path="/SupplierDashboard" element={<SupplierDashboard />} />
        <Route path="/suppliers/editProfile" element={<EditProfile />} />
        <Route path="/suppliers/paymentSummary" element={<PaymentSummary />} />
        <Route path="/suppliers/leavesQuantity" element={<LeavesQuantity />} />
        <Route path="/suppliers/transactions" element={<Transaction />} />
        <Route path="/suppliers/payments" element={<TeaFactoryPayment />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/systemSecurity" element={<SystemSecurity />} />
        <Route path="/rolePermissions" element={<RolePermissions />} />
        <Route path="/backupRecovery" element={<BackupAndRecovery />} />

      </Routes>

      {/* If a background location exists, render modal routes over the background */}
      {background && (
        <>
          <Routes>
            <Route path="/inventory/creates" element={<CreateInventory />} />
            <Route path="/inventory/:id" element={<ShowInventory />} />
            <Route path="/inventory/edit/:id" element={<EditInventory />} />
            <Route path="/inventory/delete/:id" element={<DeleteInventory />} />
          </Routes>
          <Routes>
            <Route path="/suppliers/create" element={<CreateSupplier />} />
            <Route path="/suppliers/details/:id" element={<ShowSupplier />} />
            <Route path="/suppliers/edit/:id" element={<EditSupplier />} />
            <Route path="/suppliers/delete/:id" element={<DeleteSuppliers />} />
          </Routes>
          <Routes>
            <Route path="/supplyRecode/create" element={<CreateSupplierRecode />} />
            <Route path="/supplyRecode/details/:id" element={<ShowSupplyRecode />} />
            <Route path="/supplyRecode/edit/:id" element={<EditSupplierRecode />} />
            <Route path="/SupplyRecode/delete/:id" element={<DeleteSupplyRecode />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

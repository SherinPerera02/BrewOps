import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import Inventories from './pages/inventories';
import CreateInventory from './pages/createInventory';
import ShowInventory from './pages/showInventory';
import EditInventory from './pages/editInventory';
import DeleteInventory from './pages/deleteInventory';
import WhoWeAre from './pages/WhoWeAre';
import LoginPage from './pages/login';
import AdminDashboard from './pages/adminDashboard';
import RegisterPage from './pages/register';
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;

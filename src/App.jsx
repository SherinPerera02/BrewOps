import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/navigationBar';
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




function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/inventories" element={<Inventories />} />
        <Route path="/inventory/creates" element={<CreateInventory />} />
        <Route path="/inventory/details/:id" element={<ShowInventory />} />
        <Route path="/inventory/edit/:id" element={<EditInventory />} />
        <Route path="/inventory/delete/:id" element={<DeleteInventory />} />

        <Route path="/Rawleaves" element={<SupplyRecordTable />} />
        <Route path="/Rawtealeaves" element={<RetrieveTeaLeavesEntries />} />
        <Route path="/Rawtealeavescreate" element={<CreateTeaLeavesEntry />} />
        <Route path="/Rawtealeavesdelete/:id" element={<DeleteTeaLeavesEntry />} />
        <Route path="/Rawtealeavesupdate/:id" element={<UpdateTeaLeavesEntry />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;

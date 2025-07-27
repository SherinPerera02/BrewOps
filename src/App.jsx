import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/navigationBar';
import Inventories from './pages/inventories';
import CreateInventory from './pages/createInventory';
function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/inventories" element={<Inventories />} />
        <Route path="/inventory/creates" element={<CreateInventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// File: src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Tea Type Pages
import NavigationBar from './components/navigationbar.jsx'; 
import TeaTypeList from './pages/TeaTypeHome.jsx';
import CreateTeaType from './pages/CreateTeaType';
import EditTeaType from './pages/EditTeaType';
import DeleteTeaType from './pages/DeleteTeaType';
import ViewTeaType from './pages/ViewTeaType';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* Redirect root to tea types page */}
        <Route path="/" element={<Navigate to="/teatypes" replace />} />

        {/* Tea Type Routes */}
        <Route path="/teatypes" element={<TeaTypeList />} />
        <Route path="/teatypes/create" element={<CreateTeaType />} />
        <Route path="/teatypes/edit/:id" element={<EditTeaType />} />
        <Route path="/teatypes/delete/:id" element={<DeleteTeaType />} />
        <Route path="/teatypes/view/:id" element={<ViewTeaType />} />

        

        {/* Catch-all Route */}
        <Route path="*" element={<div className="text-center mt-10 text-red-600 text-xl">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import NavigationBar from '../components/navigationBar';
import Footer from '../components/Footer';
import DashboardCard from '../components/DashboardCard';
import { FaBoxOpen, FaLeaf, FaBox, FaIndustry } from 'react-icons/fa';
import ProductionChart from '../components/ProductionChart';
import InventoryTable from '../components/InventoryTable';

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <NavigationBar />

      <main className="flex-grow px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard 
            title="Inventory Batches" 
            value="42" 
            icon={FaBoxOpen} 
            color="bg-green-100" 
          />
          <DashboardCard 
            title="Raw Tea Inventory" 
            value="1,200 kg" 
            icon={FaLeaf} 
            color="bg-green-100" 
          />
          <DashboardCard 
            title="Finished Tea Inventory" 
            value="980 kg" 
            icon={FaBox} 
            color="bg-green-100" 
          />
          <DashboardCard 
            title="Total Production" 
            value="2,500 kg" 
            icon={FaIndustry} 
            color="bg-green-100" 
          />
        </div>

        {/* Charts & Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductionChart />
          <InventoryTable />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

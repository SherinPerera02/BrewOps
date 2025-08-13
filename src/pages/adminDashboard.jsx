import React from 'react';
import NavigationBar from '../components/navigationBar';
import NavigationPanel from '../components/navigationPanel';
import Footer from '../components/footer';
import DashboardCard from '../components/dashboardCard';
import { FaBoxOpen, FaLeaf, FaBox, FaIndustry, FaTruckLoading } from 'react-icons/fa';
import ProductionChart from '../components/productionChart';
import InventoryTable from '../components/inventoryTable';
import SupplierChart from '../components/supplierChart';
import SupplierTable from '../components/supplierTable';

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <NavigationBar />
      <NavigationPanel />

      <main className="flex-grow px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
          <DashboardCard 
            title="Total Leaves Received" 
            value="3,200 kg" 
            icon={FaTruckLoading} 
            color="bg-green-100" 
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductionChart />
          <InventoryTable />
        </div>

        {/* Supplier Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SupplierChart />
          <SupplierTable />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

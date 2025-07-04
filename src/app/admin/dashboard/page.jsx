"use client"
import StatCard from '@/components/dashboard/StatCard';
import InventoryChart from '@/components/dashboard/InventoryChart';
import RecentActivity from '@/components/dashboard/RecentActivity';

export default function AdminDashboard() {
  return (
    <div className="space-y-6 ml-62">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Inventory" 
          value="1,248" 
          change="+12%" 
          trend="up"
          icon="Package"
        />
        <StatCard 
          title="Active Users" 
          value="84" 
          change="+5" 
          trend="up"
          icon="Users"
        />
        <StatCard 
          title="Pending Orders" 
          value="12" 
          change="-3" 
          trend="down"
          icon="ShoppingCart"
        />
        <StatCard 
          title="Revenue" 
          value="₹1,24,580" 
          change="+18%" 
          trend="up"
          icon="IndianRupee"
        />
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Inventory Overview</h2>
          <div className="h-[350px]">
            <InventoryChart />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="max-h-[350px] overflow-y-auto">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
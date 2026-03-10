import React from 'react';
import StatCard from './StatCart';
import {  DollarSign, Eye, Plus, RotateCcw, Search, ShoppingBag, Truck, Users } from 'lucide-react';
import { OrdersStatistics } from './OrderStatistic';
import { RevenueOverview } from './RevenueOverview';
import DashboardContent from './Usergowth';
import { NavLink } from 'react-router-dom';



const ProgressBar = ({ label, percent }: { label: string; percent: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-300">
      <span>{label}</span>
      <span>{percent}%</span>
    </div>
    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full bg-[#580C1F] rounded-full transition-all duration-500" 
        style={{ width: `${percent}%` }} 
      />
    </div>
  </div>
);

    const Dashboard: React.FC = () => {
      return (
        <div className="flex min-h-screen bg-[#F4F7FE] font-sans antialiased text-[#1B1E2B]">
          

          <div className="flex-1 px-8 pb-10">
            {/* HEADER SECTION - Fixed Pill Style */}
            <header className="py-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-[#1B1E2B] tracking-tight">Main Dashboard</h1>
        <p className="text-sm font-medium text-[#707EAE]">Welcome back! Here's what's happening with your store today.</p>
      </div>

     <div className="flex items-center gap-3">
            {/* View Products */}
            <NavLink to={'/admin/inventories'}>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100 shadow-sm text-[#1B1E2B] text-xs font-semibold hover:shadow-md hover:border-gray-200 transition-all duration-200">
              <Eye size={14} className="text-[#6366F1]" />
              View Products
            </button>
            </NavLink>
    <NavLink to={'/admin/orders'}>
    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111C44] text-white text-xs font-semibold hover:bg-[#1a2b63] shadow-sm hover:shadow-md transition-all duration-200">
      <Plus size={14} />
      Add Order
    </button>
            </NavLink>
            
    {/* Refresh */}
    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-[#6366F1] hover:border-[#6366F1]/20 hover:shadow-md transition-all duration-200">
      <RotateCcw size={15} />
    </button>

  </div>
</header>

        {/* KPI SECTION - Slim Horizontal Cards */}
        {/* KPI ROW - 4 METRICS ONLY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard label="Total Customers" value="2,841" color="#6366F1" icon={Users} />
          <StatCard label="Total Orders"    value="1,120" color="#22C55E" icon={ShoppingBag} />
          <StatCard label="Pending Shipping" value="45" trend="High" isNegative color="#F59E0B" icon={Truck} />
          <StatCard label="Revenue" value="$84,200" trend="+12.5%" color="#EF4444" icon={DollarSign} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueOverview />
          <OrdersStatistics />
        </div>
        <div className='pt-10'>
          <DashboardContent/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from "react";
import { ShoppingBag,RotateCcw } from "lucide-react";
import OrderStatCards from "./OrderStatCard";
import OrderTable from "./OrderTable";

const ManageOrders: React.FC = () => {
  const [key, setKey] = useState(0); // refresh trick

  return (
    <div className="min-h-screen bg-[#F4F7FE] font-sans antialiased ">
      <div className="max-w-7xl mx-auto  px-8 py-10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#111C44] rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingBag size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1B1E2B] tracking-tight">Manage Orders</h1>
              <p className="text-sm text-gray-400">Track and manage all your orders</p>
            </div>
          </div>

          <button
            onClick={() => setKey(k => k + 1)}
            className="flex items-center gap-2 px-5 py-3 bg-[#111C44] text-white text-xs font-semibold rounded-xl hover:bg-[#1a2b63] shadow-md hover:shadow-lg transition-all"
          >
            <RotateCcw size={14} /> Refresh
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <OrderStatCards />

        {/* ── Orders Table ── */}
        <OrderTable key={key} />

      </div>
    </div>
  );
};

export default ManageOrders;
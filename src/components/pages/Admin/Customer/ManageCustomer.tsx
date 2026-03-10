import React, { useState } from "react";
import { Users, Search } from "lucide-react";
import CustomerStatCards from "./CustomerStatCart";
import CustomerTable from "./CustomerTable";

const ManageCustomers = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#F4F7FE] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#111C44] rounded-2xl flex items-center justify-center shadow-lg">
              <Users size={26} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1B1E2B] tracking-tight">Manage Customers</h1>
              <p className="text-sm text-gray-400">View and manage customer accounts</p>
            </div>
          </div>

          {/* Search pill */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm w-72">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name, email or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs text-gray-700 placeholder:text-gray-400 outline-none w-full"
            />
          </div>
        </div>

        {/* Stat Cards */}
        <CustomerStatCards />

        {/* Customer Table */}
        <CustomerTable />

      </div>
    </div>
  );
};

export default ManageCustomers;
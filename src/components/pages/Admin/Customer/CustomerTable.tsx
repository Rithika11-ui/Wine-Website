import React, { useState } from "react";
import {
  ArrowUpDown, Filter, Eye, Ban,
  MoreHorizontal, Mail, Phone, Clock,
  Circle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { avatarColors, Customer } from "./CustomerData";

type FilterType = "All" | "Active" | "Inactive";

interface CustomerTableProps {
  customers: Customer[];
  search: string;
}

const PAGE_SIZE = 10;

const CustomerTable = ({ customers, search }: CustomerTableProps) => {
  const [filter, setFilter] = useState<FilterType>("All");
  const [page, setPage] = useState(1);

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // reset to page 1 when filter/search changes
  const handleFilter = (f: FilterType) => { setFilter(f); setPage(1); };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {(["All", "Active", "Inactive"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                filter === f ? "bg-[#111C44] text-white shadow" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-2 text-[11px] text-gray-400">{filtered.length} customers</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all">
          <Filter size={13} /> Filter
        </button>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {["Name", "Phone Number", "Email Address", "Member Since", "Total Orders", "Revenue", "Status", ""].map((h) => (
              <th key={h} className="px-6 py-3 text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 flex items-center gap-1">
                  {h}{h !== "" && <ArrowUpDown size={10} className="opacity-40" />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((customer, i) => (
            <tr key={customer.id} className="border-b border-gray-50 hover:bg-[#F8F9FF] transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                    {customer.avatar}
                  </div>
                  <span className="text-sm font-semibold text-[#1B1E2B]">{customer.name}</span>
                </div>
              </td>
              <td className="px-6 py-4"><span className="text-sm text-gray-500 flex items-center gap-1.5"><Phone size={12} className="text-gray-300" />{customer.phone}</span></td>
              <td className="px-6 py-4"><span className="text-sm text-gray-500 flex items-center gap-1.5"><Mail size={12} className="text-gray-300" />{customer.email}</span></td>
              <td className="px-6 py-4"><span className="text-sm text-gray-500 flex items-center gap-1.5"><Clock size={12} className="text-gray-300" />{customer.since}</span></td>
              <td className="px-6 py-4">
                {customer.orders > 0
                  ? <button className="px-3 py-1 bg-blue-500 text-white text-[11px] font-semibold rounded-md hover:bg-blue-600 transition-colors">{customer.orders} Orders</button>
                  : <button className="px-3 py-1 bg-gray-100 text-gray-400 text-[11px] font-semibold rounded-md">0 Orders</button>}
              </td>
              <td className="px-6 py-4"><span className={`text-sm font-bold ${customer.revenue === "$0.00" ? "text-gray-400" : "text-emerald-500"}`}>{customer.revenue}</span></td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${customer.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                  <Circle size={6} className={customer.status === "Active" ? "fill-emerald-500 text-emerald-500" : "fill-gray-400 text-gray-400"} />
                  {customer.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 transition-colors"><Eye size={13} /></button>
                  <button className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-100 transition-colors"><Ban size={13} /></button>
                  <button className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"><MoreHorizontal size={13} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">
          Showing <span className="font-semibold text-gray-600">{Math.min(page * PAGE_SIZE, filtered.length)}</span> of{" "}
          <span className="font-semibold text-gray-600">{filtered.length}</span> customers
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 disabled:opacity-30">
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${p === page ? "bg-[#111C44] text-white" : "border border-gray-200 text-gray-400 hover:border-gray-300"}`}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 disabled:opacity-30">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
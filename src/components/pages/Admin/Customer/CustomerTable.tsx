import React, { useState } from "react";
import {
  ArrowUpDown, Filter, Eye, Ban,
  MoreHorizontal, Mail, Phone, Clock,
  Circle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { customers, avatarColors, Customer } from "./CustomerData";

type FilterType = "All" | "Active" | "Inactive";

const CustomerTable = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered: Customer[] = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {(["All", "Active", "Inactive"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                filter === f
                  ? "bg-[#111C44] text-white shadow"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
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
                  {h}
                  {h !== "" && <ArrowUpDown size={10} className="opacity-40" />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((customer, i) => (
            <tr key={customer.id} className="border-b border-gray-50 hover:bg-[#F8F9FF] transition-colors group">

              {/* Name */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                    {customer.avatar}
                  </div>
                  <span className="text-sm font-semibold text-[#1B1E2B]">{customer.name}</span>
                </div>
              </td>

              {/* Phone */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-500 flex items-center gap-1.5">
                  <Phone size={12} className="text-gray-300" />
                  {customer.phone}
                </span>
              </td>

              {/* Email */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-500 flex items-center gap-1.5">
                  <Mail size={12} className="text-gray-300" />
                  {customer.email}
                </span>
              </td>

              {/* Since */}
              <td className="px-6 py-4">
                <span className="text-sm text-gray-500 flex items-center gap-1.5">
                  <Clock size={12} className="text-gray-300" />
                  {customer.since}
                </span>
              </td>

              {/* Orders */}
              <td className="px-6 py-4">
                {customer.orders > 0 ? (
                  <button className="px-3 py-1 bg-blue-500 text-white text-[11px] font-semibold rounded-md hover:bg-blue-600 transition-colors">
                    {customer.orders} Orders
                  </button>
                ) : (
                  <button className="px-3 py-1 bg-gray-100 text-gray-400 text-[11px] font-semibold rounded-md">
                    0 Orders
                  </button>
                )}
              </td>

              {/* Revenue */}
              <td className="px-6 py-4">
                <span className={`text-sm font-bold ${customer.revenue === "$0.00" ? "text-gray-400" : "text-emerald-500"}`}>
                  {customer.revenue}
                </span>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${
                  customer.status === "Active"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-gray-100 text-gray-400"
                }`}>
                  <Circle size={6} className={customer.status === "Active" ? "fill-emerald-500 text-emerald-500" : "fill-gray-400 text-gray-400"} />
                  {customer.status}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 transition-colors">
                    <Eye size={13} />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-100 transition-colors">
                    <Ban size={13} />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                    <MoreHorizontal size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">
          Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of{" "}
          <span className="font-semibold text-gray-600">{customers.length}</span> customers
        </p>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all">
            <ChevronLeft size={14} />
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                p === 1 ? "bg-[#111C44] text-white" : "border border-gray-200 text-gray-400 hover:border-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
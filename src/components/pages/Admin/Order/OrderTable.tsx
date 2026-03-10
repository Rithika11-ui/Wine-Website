import React, { useState, useMemo } from "react";
import {
  Search, Eye, Trash2, Circle,
  ChevronLeft, ChevronRight, ShoppingBag,
  ArrowUpDown, RotateCcw
} from "lucide-react";
import { orders as initialOrders, OrderStatus, STATUS_CONFIG, AVATAR_COLORS, Order } from "./OrderData";
import OrderDetail from "./OrderDetail";

type FilterStatus = "All Orders" | OrderStatus;

const OrderTable = () => {
  const [orderList, setOrderList]   = useState<Order[]>(initialOrders);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState<FilterStatus>("All Orders");
  const [selected, setSelected]     = useState<Order | null>(null);
  const [page, setPage]             = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => {
    return orderList.filter(o => {
      const q = search.toLowerCase();
      const matchSearch = o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.email.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All Orders" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orderList, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    setSelected(prev => prev?.id === id ? { ...prev, status } : prev);
  };

  const handleDelete = (id: string) => {
    setOrderList(prev => prev.filter(o => o.id !== id));
    setSelected(null);
  };

  const filters: FilterStatus[] = ["All Orders", "Pending", "In Progress", "Completed", "Cancelled"];

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-100">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#F4F7FE] rounded-xl px-3 py-2.5 flex-1 min-w-52">
            <Search size={13} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by order ID, customer or email..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="bg-transparent text-xs text-gray-700 placeholder:text-gray-400 outline-none w-full"
            />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {filters.map(f => {
              const cfg = f !== "All Orders" ? STATUS_CONFIG[f as OrderStatus] : null;
              return (
                <button key={f} onClick={() => { setStatus(f); setPage(1); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                    statusFilter === f
                      ? f === "All Orders" ? "bg-[#111C44] text-white" : `${cfg!.bg} text-white`
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {cfg && <Circle size={5} className={statusFilter === f ? "fill-white text-white" : cfg.dot} />}
                  {f}
                </button>
              );
            })}
          </div>

          <span className="text-[11px] text-gray-400 ml-auto">
            {filtered.length} order{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {["Order ID", "Customer", "Items", "Total", "Date", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      {h} {!["Actions", "Items"].includes(h) && <ArrowUpDown size={9} className="opacity-30" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-300">
                      <ShoppingBag size={36} />
                      <p className="text-sm font-medium text-gray-400">No orders found</p>
                      <p className="text-xs text-gray-300">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((order, i) => {
                  const cfg = STATUS_CONFIG[order.status];
                  const absIdx = (page - 1) * perPage + i;
                  return (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-[#F8F9FF] transition-colors group">

                      {/* Order ID */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold text-[#111C44] font-mono">{order.id}</span>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${AVATAR_COLORS[absIdx % AVATAR_COLORS.length]}`}>
                            {order.avatar}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#1B1E2B]">{order.customer}</p>
                            <p className="text-[10px] text-gray-400">{order.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="px-5 py-4">
                        <span className="text-xs text-gray-500">
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold text-[#1B1E2B]">${order.total.toLocaleString()}</span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-xs text-gray-500">
                          {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.light} ${cfg.text}`}>
                          <Circle size={5} className={cfg.dot} />
                          {order.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setSelected(order)}
                            className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 transition-colors" title="View">
                            <Eye size={13} />
                          </button>
                          <button onClick={() => handleDelete(order.id)}
                            className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-100 transition-colors" title="Delete">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            Showing <span className="font-semibold text-gray-600">{Math.min((page-1)*perPage+1, filtered.length)}–{Math.min(page*perPage, filtered.length)}</span> of{" "}
            <span className="font-semibold text-gray-600">{filtered.length}</span> orders
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 disabled:opacity-30 transition-all">
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i+1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${p===page ? "bg-[#111C44] text-white" : "border border-gray-200 text-gray-400 hover:border-gray-300"}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 disabled:opacity-30 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Order detail modal */}
      {selected && (
        <OrderDetail
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
};

export default OrderTable;
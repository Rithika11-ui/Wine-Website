import React from "react";
import {
  X, ShoppingBag, User, Mail, MapPin,
  CreditCard, Calendar, Circle, Package
} from "lucide-react";
import { Order, OrderStatus, STATUS_CONFIG } from "./OrderData";

interface OrderDetailProps {
  order: Order;
  onClose: () => void;
  onStatusChange: (id: string, status: OrderStatus) => void;
}

const STATUSES: OrderStatus[] = ["Pending", "In Progress", "Completed", "Cancelled"];

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose, onStatusChange }) => {
  const cfg = STATUS_CONFIG[order.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#0a0f1e]/55 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl shadow-2xl flex flex-col animate-modal-in overflow-hidden"
        style={{ width: "min(580px, 92vw)", maxHeight: "88vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#111C44] rounded-xl flex items-center justify-center">
              <ShoppingBag size={15} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1B1E2B]">Order {order.id}</h2>
              <p className="text-[10px] text-gray-400">
                {new Date(order.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${cfg.light} ${cfg.text}`}>
              <Circle size={6} className={cfg.dot} /> {order.status}
            </span>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-all">
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Customer info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Customer Info</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <User size={12} className="text-gray-400 flex-shrink-0" />
              <span className="font-semibold text-[#1B1E2B]">{order.customer}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Mail size={12} className="text-gray-400 flex-shrink-0" />
              {order.email}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin size={12} className="text-gray-400 flex-shrink-0" />
              {order.address}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CreditCard size={12} className="text-gray-400 flex-shrink-0" />
              {order.paymentMethod}
            </div>
          </div>

          {/* Items */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Order Items</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package size={13} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1B1E2B]">{item.name}</p>
                      <p className="text-[10px] text-gray-400">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#1B1E2B]">${(item.qty * item.price).toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400">${item.price} ea.</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-3 px-4 py-3 bg-[#111C44] rounded-xl">
              <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Total</span>
              <span className="text-base font-bold text-white">${order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Status update */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map(s => {
                const c = STATUS_CONFIG[s];
                return (
                  <button key={s} onClick={() => onStatusChange(order.id, s)}
                    className={`py-2.5 rounded-xl text-[11px] font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      order.status === s
                        ? `${c.bg} text-white border-transparent shadow-sm`
                        : `bg-white ${c.text} border-gray-200 hover:${c.light}`
                    }`}>
                    <Circle size={6} className={order.status === s ? "fill-white text-white" : c.dot} />
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all">
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { transform: scale(0.96) translateY(10px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-modal-in { animation: modal-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default OrderDetail;
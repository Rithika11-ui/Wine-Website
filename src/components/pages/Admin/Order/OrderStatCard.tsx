import React from "react";
import { Clock, Truck, CheckCircle, XCircle, TrendingUp, LucideIcon } from "lucide-react";
import { orders, OrderStatus } from "./OrderData";

const StatCard = ({
  icon: Icon, label, value, sub, iconBg, iconColor, accent,
}: {
  icon: LucideIcon; label: string; value: number; sub: string;
  iconBg: string; iconColor: string; accent: string;
}) => (
  <div className="flex-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-[#1B1E2B] leading-none">{value}</p>
        <p className={`text-[11px] mt-1.5 flex items-center gap-1 font-medium ${accent}`}>
          <TrendingUp size={10} /> {sub}
        </p>
      </div>
    </div>
  </div>
);

const OrderStatCards = () => {
  const count = (s: OrderStatus) => orders.filter(o => o.status === s).length;

  return (
    <div className="flex gap-5 mb-8">
      <StatCard icon={Clock}       label="Pending Orders" value={count("Pending")}     sub="Awaiting action"    iconBg="bg-amber-50"   iconColor="text-amber-500"  accent="text-amber-500"  />
      <StatCard icon={Truck}       label="In Progress"    value={count("In Progress")} sub="Being fulfilled"    iconBg="bg-blue-50"    iconColor="text-blue-500"   accent="text-blue-500"   />
      <StatCard icon={CheckCircle} label="Completed"      value={count("Completed")}   sub="Successfully done"  iconBg="bg-emerald-50" iconColor="text-emerald-500" accent="text-emerald-500"/>
      <StatCard icon={XCircle}     label="Cancelled"      value={count("Cancelled")}   sub="Voided orders"      iconBg="bg-rose-50"    iconColor="text-rose-400"   accent="text-rose-400"   />
    </div>
  );
};

export default OrderStatCards;
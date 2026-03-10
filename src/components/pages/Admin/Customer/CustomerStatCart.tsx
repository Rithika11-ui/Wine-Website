import React from "react";
import { Users, UserCheck, ShoppingBag, DollarSign, TrendingUp, LucideIcon } from "lucide-react";
import { customers } from "./CustomerData";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  color: string;
  bg: string;
}

const StatCard = ({ icon: Icon, label, value, sub, color, bg }: StatCardProps) => (
  <div className="flex-1 bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100">
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className={color} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#1B1E2B] leading-tight">{value}</p>
        <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
          <TrendingUp size={10} className="text-emerald-400" />
          {sub}
        </p>
      </div>
    </div>
  </div>
);

const CustomerStatCards = () => {
  const totalRevenue = customers.reduce((sum, c) => {
    const num = parseFloat(c.revenue.replace(/[$,]/g, ""));
    return sum + num;
  }, 0);

  const totalOrders = customers.reduce((s, c) => s + c.orders, 0);
  const activeCount = customers.filter((c) => c.status === "Active").length;

  return (
    <div className="flex gap-5 mb-8">
      <StatCard
        icon={Users}
        label="Total Customers"
        value={String(customers.length)}
        sub="All Users"
        color="text-indigo-500"
        bg="bg-indigo-50"
      />
      <StatCard
        icon={UserCheck}
        label="Active Members"
        value={String(activeCount)}
        sub="Last 30 Days"
        color="text-emerald-500"
        bg="bg-emerald-50"
      />
      <StatCard
        icon={ShoppingBag}
        label="Total Orders"
        value={String(totalOrders)}
        sub="All Time"
        color="text-amber-500"
        bg="bg-amber-50"
      />
      <StatCard
        icon={DollarSign}
        label="Total Revenue"
        value={`$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
        sub="Earned"
        color="text-violet-500"
        bg="bg-violet-50"
      />
    </div>
  );
};

export default CustomerStatCards;
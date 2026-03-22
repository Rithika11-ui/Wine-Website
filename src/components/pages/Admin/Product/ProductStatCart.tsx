import React from "react";
import { Package, CheckCircle, AlertTriangle, FileText, TrendingUp, LucideIcon } from "lucide-react";
import { Product } from "../../Admin/Product/ProductData";
import { useAdminInventories } from "../../../../Hook/AdminInventories";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  sub: string;
  iconColor: string;
  iconBg: string;
  accent: string;
  highlight?: boolean;
}

const StatCard = ({ icon: Icon, label, value, sub, iconColor, iconBg, accent, highlight }: StatCardProps) => (
  <div className={`relative flex-1 bg-white rounded-2xl p-5 border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
    highlight ? "border-emerald-200 shadow-md shadow-emerald-50" : "border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
  }`}>
    {highlight && (
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-t-2xl" />
    )}
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-[#1B1E2B] leading-none mb-2">{value}</p>
        <p className={`text-[11px] font-medium flex items-center gap-1 ${accent}`}>
          <TrendingUp size={10} />
          {sub}
        </p>
      </div>
    </div>
  </div>
);

const ProductStatCards = () => {
  const { filtered } = useAdminInventories();

  const total    = filtered.length;
  const active   = filtered.filter((p: Product) => p.status === "Active").length;
  const lowStock = filtered.filter((p: Product) => p.stock > 0 && p.stock < 10).length;
  const draft    = filtered.filter((p: Product) => p.status === "Draft").length;

  return (
    <div className="flex gap-5 mb-8">
      <StatCard icon={Package}       label="Total Products"  value={total}    sub="All Items"      iconColor="text-indigo-500"  iconBg="bg-indigo-50"  accent="text-indigo-400"  />
      <StatCard icon={CheckCircle}   label="Active Products" value={active}   sub="Available"      iconColor="text-emerald-500" iconBg="bg-emerald-50" accent="text-emerald-500" highlight />
      <StatCard icon={AlertTriangle} label="Low Stock"       value={lowStock} sub="< 10 units"     iconColor="text-amber-500"   iconBg="bg-amber-50"   accent="text-amber-500"   />
      <StatCard icon={FileText}      label="Draft Products"  value={draft}    sub="Pending review" iconColor="text-gray-400"    iconBg="bg-gray-50"    accent="text-gray-400"    />
    </div>
  );
};

export default ProductStatCards;
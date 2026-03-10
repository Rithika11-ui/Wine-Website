import React from "react";
import { Users, ShoppingBag, Truck, DollarSign, LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  isNegative?: boolean;
  color?: string;
  icon?: LucideIcon;
}

const StatCard = ({
  label,
  value,
  trend,
  isNegative,
  color = "#6366F1",
  icon: Icon,
}: StatCardProps) => {
  return (
    <div className="relative w-full bg-white rounded-2xl p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
      {/* Top Colored Line */}
      <div
        className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
        style={{ backgroundColor: color }}
      />

      {/* Icon + Value Row */}
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-4xl font-bold text-[#111827]">{value}</h2>
        {Icon && (
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}18` }}
          >
            <Icon size={20} style={{ color }} />
          </div>
        )}
      </div>

      {/* Label */}
      <p className="text-gray-500 text-sm mb-3">{label}</p>

      {/* Trend */}
      {trend && (
        <p className={`text-sm font-medium ${isNegative ? "text-red-500" : "text-emerald-500"}`}>
          {trend}
        </p>
      )}
    </div>
  );
};

export default StatCard;
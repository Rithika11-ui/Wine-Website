import React from 'react';
import { LayoutDashboard, Users, Package, ShoppingBag, Tag, Megaphone, Gift, Wine } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard',  to: '/admin' },
  { icon: <Users size={18} />,          label: 'Customers',   to: '/admin/customers' },
  { icon: <Package size={18} />,        label: 'Inventory',   to: '/admin/inventories' },
  { icon: <ShoppingBag size={18} />,    label: 'Orders',       to: '/admin/orders' },
  { icon: <Tag size={18} />,            label: 'Categories',    to: '/admin/categories' },
  { icon: <Megaphone size={18} />,      label: 'Advertisement',   to: '/admin/advertisement' },
  { icon: <Gift size={18} />,           label: 'Rewards',     to: '/admin/rewards' },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-[72px] w-64 bg-[#111111] text-gray-400 flex flex-col h-screen border-r border-gray-800 z-50">

      {/* Logo */}
      <div className="p-8 border-b border-gray-800 flex-shrink-0 bg-[#111111]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#580C1F] flex items-center justify-center rounded-sm">
            <Wine size={20} className="text-white" />
          </div>
          <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">
            VinoAdmin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map(({ icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#580C1F] text-white'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* System Status */}
      <div className="p-8 border-t border-white/5 flex-shrink-0 bg-[#111111]">
        <div className="bg-[#1A1A1A] rounded p-4 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">System Status</p>
          <p className="text-[11px] text-[#D4AF37] font-medium mt-1 uppercase">Cellar Online</p>
        </div>
      </div>
    </aside>
  );
};
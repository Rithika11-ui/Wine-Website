import { useState, useEffect, useRef, useContext } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Package,
  AlertTriangle,
  UserPlus,
  Wine,
  LayoutDashboard,
  Sun,
} from "lucide-react";
import { logout } from "../../../../service/AuthApi";
import { StoreContext } from "../../../../Context/StoreContext";

/* ───────────────── Types ───────────────── */

interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  icon: React.ReactNode;
  color: string;
}

/* ───────────────── Mock Data ───────────────── */

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: "New order received",
    desc: "Order #1042 · Château Margaux 2019 × 2",
    time: "Just now",
    unread: true,
    icon: <Package size={13} />,
    color: "text-violet-600 bg-violet-50 border-violet-200",
  },
  {
    id: 2,
    title: "Low stock alert",
    desc: "Barolo Riserva 2017 — 4 bottles left",
    time: "14m ago",
    unread: true,
    icon: <AlertTriangle size={13} />,
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    id: 3,
    title: "New member joined",
    desc: "Jane Cooper registered",
    time: "1h ago",
    unread: false,
    icon: <UserPlus size={13} />,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
];

/* ───────────────── Notification Dropdown ───────────────── */

const NotifDropdown = ({ notifications, onMarkAll, onMarkOne }: any) => (
  <div className="absolute right-0 top-[calc(100%+14px)] w-[380px] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-xl">

    <div className="flex items-center justify-between px-5 py-4 border-b">
      <p className="text-sm font-semibold text-gray-800">
        Notifications
      </p>
      <button
        onClick={onMarkAll}
        className="text-xs text-gray-500 hover:text-red-600 transition"
      >
        Clear all
      </button>
    </div>

    {notifications.map((n: Notification) => (
      <div
        key={n.id}
        onClick={() => onMarkOne(n.id)}
        className="flex gap-4 px-5 py-4 hover:bg-gray-50 transition cursor-pointer"
      >
        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${n.color}`}>
          {n.icon}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className={`text-sm ${n.unread ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              {n.title}
            </p>
            {n.unread && (
              <span className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">{n.desc}</p>
          <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
        </div>
      </div>
    ))}
  </div>
);

/* ───────────────── User Dropdown ───────────────── */

const UserDropdown = () => {
  const { error, loading, handleLogout } = useContext(StoreContext);
  return (
    
    <div className="absolute right-0 top-[calc(100%+14px)] w-[240px] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-xl">

      <div className="px-5 py-4 border-b">
        <p className="text-gray-900 font-semibold text-sm">Admin User</p>
        <p className="text-xs text-gray-500 mt-1">admin@wineshop.com</p>
      </div>

      {[
        { icon: <LayoutDashboard size={14} />, label: "Dashboard" },
        { icon: <User size={14} />, label: "Profile" },
        { icon: <Settings size={14} />, label: "Settings" },
      ].map((item) => (
        <button
          key={item.label}
          className="flex items-center gap-3 w-full px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
        >
          {item.icon}
          {item.label}
        </button>
      ))}

      <div className="border-t" />

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition">
        <LogOut size={14} />
        Sign Out
      </button>
    </div>
  )
};


const AdminHeader = () => {
  const [search, setSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node))
        setUserOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unread = notifications.filter((n) => n.unread).length;
  const markAll = () =>
    setNotifications((p) => p.map((n) => ({ ...n, unread: false })));
  const markOne = (id: number) =>
    setNotifications((p) =>
      p.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );

  return (
    <header className="relative z-30 w-full bg-white border-b border-gray-200 shadow-sm sticky top-0">

      {/* subtle wine accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r " />

      <div className="flex items-center justify-between h-[72px] px-8 max-w-[1600px] mx-auto">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-700 to-red-500 flex items-center justify-center shadow-md">
            <Wine size={18} className="text-white" />
          </div>

          <div>
            <p className="text-xl font-bold text-gray-900 tracking-tight">
              WineShop<span className="text-red-600">.</span>
            </p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-10 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, orders..."
            className="w-full h-11 pl-12 pr-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center">
            <Sun size={17} className="text-gray-500" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center"
            >
              <Bell size={18} className="text-gray-600" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full">
                  {unread}
                </span>
              )}
            </button>

            {notifOpen && (
              <NotifDropdown
                notifications={notifications}
                onMarkAll={markAll}
                onMarkOne={markOne}
              />
            )}
          </div>

          {/* User */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-3 bg-gray-50 px-4 h-11 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-700 to-red-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="text-sm text-gray-800 hidden sm:block">
                Admin
              </span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {userOpen && <UserDropdown />}
          </div>

        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
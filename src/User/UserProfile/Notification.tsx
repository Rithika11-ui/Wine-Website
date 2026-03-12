import { ArrowLeft, Bell, Package, Tag, Wine, Trash2, CheckCheck, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type NotificationType = "Order" | "Promotion" | "NewArrival";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  detail: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "Order",
    title: "Order Shipped",
    message: "Your order #WN-20240312 has been shipped and is on its way.",
    detail: "Your order #WN-20240312 has been picked up by our courier and is currently en route to your delivery address. Estimated arrival is within 2–3 business days. You will receive a final notification once your package has been delivered. Thank you for your patience.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    type: "Promotion",
    title: "Flash Sale — 20% Off",
    message: "Use code ESTATE20 at checkout. Valid until midnight tonight.",
    detail: "Tonight only — Gold Reserve members enjoy an exclusive 20% discount on all red wines. Simply enter the code ESTATE20 at checkout to redeem. This offer is valid until midnight and cannot be combined with any other ongoing promotions or discounts.",
    time: "5 hours ago",
    isRead: false,
  },
  {
    id: "3",
    type: "NewArrival",
    title: "New Collection Available",
    message: "The 2022 Château Margaux Reserve has just arrived in our cellar.",
    detail: "We are delighted to announce the arrival of the 2022 Château Margaux Reserve — a beautifully structured Bordeaux with deep notes of dark cherry, cedar, violet, and a long, silky finish. Only 48 bottles have been allocated exclusively for our estate members.",
    time: "Yesterday",
    isRead: true,
  },
  {
    id: "4",
    type: "Order",
    title: "Order Delivered",
    message: "Your order #WN-20240305 has been delivered. Enjoy your collection!",
    detail: "Your order #WN-20240305 was successfully delivered to your address. We hope your selection brings you great pleasure. If you have any concerns regarding your delivery, please reach out to our support team within 48 hours and we will be happy to assist.",
    time: "3 days ago",
    isRead: true,
  },
  {
    id: "5",
    type: "Promotion",
    title: "Members-Only Weekend",
    message: "Gold Reserve members get early access to our Spring selection.",
    detail: "This weekend, Gold Reserve and Platinum tier members receive 72-hour early access to our highly anticipated Spring 2024 wine selection — before it opens to the general public. Browse the full collection now and secure your favourites before they sell out.",
    time: "4 days ago",
    isRead: true,
  },
  {
    id: "6",
    type: "NewArrival",
    title: "Rare Find: Limited Bottles",
    message: "Only 12 bottles of the 2018 Penfolds Grange remain.",
    detail: "The 2018 Penfolds Grange is widely regarded as one of Australia's greatest wines, and we have just 12 bottles remaining in our private cellar. Rich with dark fruit, mocha, and subtle spice, this is a collector's wine of the highest order. Once gone, it will not return.",
    time: "1 week ago",
    isRead: true,
  },
];

const typeConfig: Record<NotificationType, { icon: any; color: string; bg: string; label: string; bar: string }> = {
  Order: { icon: Package, color: "text-blue-600", bg: "bg-blue-50", label: "Order Update", bar: "bg-blue-500" },
  Promotion: { icon: Tag, color: "text-amber-600", bg: "bg-amber-50", label: "Promotion", bar: "bg-amber-500" },
  NewArrival: { icon: Wine, color: "text-red-900", bg: "bg-red-50", label: "New Arrival", bar: "bg-red-900" },
};

const filters: ("All" | NotificationType)[] = ["All", "Order", "Promotion", "NewArrival"];
const filterLabels: Record<string, string> = {
  All: "All", Order: "Orders", Promotion: "Promotions", NewArrival: "New Arrivals",
};

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"All" | NotificationType>("All");
  const [selected, setSelected] = useState<Notification | null>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filtered = filter === "All" ? notifications : notifications.filter(n => n.type === filter);

  const handleClick = (notification: Notification) => {
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    );
    setSelected({ ...notification, isRead: true });
  };

  const deleteNotification = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-stone-900">
      <div className="container mx-auto px-6 py-6">

        {/* Back arrow */}
        <button
          onClick={() => navigate('/user-profile')}
          className="text-stone-400 hover:text-red-900 transition-colors mb-6 block"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-5xl font-serif italic text-stone-900">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="bg-red-900 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mt-1">Your latest updates</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-red-900 transition-colors border border-stone-200 px-4 py-3 hover:border-red-900/30"
              >
                <CheckCheck size={14} />
                Mark all read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 mb-6 border-b border-stone-100">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-all border-b-2 -mb-px ${
                  filter === f ? "border-red-900 text-red-900" : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="bg-white border border-stone-100 p-16 text-center">
                <Bell size={32} className="text-stone-200 mx-auto mb-4" />
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">No notifications</p>
              </div>
            )}

            {filtered.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;

              return (
                <div
                  key={notification.id}
                  onClick={() => handleClick(notification)}
                  className={`bg-white border shadow-sm p-6 transition-all cursor-pointer hover:shadow-md group ${
                    !notification.isRead ? "border-red-900/20" : "border-stone-100"
                  }`}
                >
                  <div className="flex items-start gap-4">

                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                      <Icon size={16} className={config.color} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">

                          {/* Title + dot */}
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-bold ${!notification.isRead ? "text-stone-900" : "text-stone-500"}`}>
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <span className="w-2 h-2 rounded-full bg-red-900 flex-shrink-0" />
                            )}
                          </div>

                          <p className="text-xs text-stone-400 mt-1 leading-relaxed truncate">{notification.message}</p>
                          <p className="text-[10px] uppercase tracking-widest text-stone-300 font-bold mt-2">{notification.time}</p>
                        </div>

                        {/* Delete — shows on hover */}
                        <button
                          onClick={(e) => deleteNotification(notification.id, e)}
                          className="p-1 text-stone-400 hover:text-red-900 transition-colors  flex-shrink-0 mt-1"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- DETAIL MODAL --- */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* colored top bar */}
            <div className={`h-1 w-full ${typeConfig[selected.type].bar}`} />

            <div className="p-10 space-y-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${typeConfig[selected.type].bg}`}>
                    {(() => { const Icon = typeConfig[selected.type].icon; return <Icon size={20} className={typeConfig[selected.type].color} />; })()}
                  </div>
                  <div>
                    <p className={`text-[9px] uppercase tracking-widest font-bold mb-1 ${typeConfig[selected.type].color}`}>
                      {typeConfig[selected.type].label}
                    </p>
                    <h2 className="text-xl font-serif italic text-stone-900">{selected.title}</h2>
                    <p className="text-[10px] uppercase tracking-widest text-stone-300 font-bold mt-0.5">{selected.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-stone-300 hover:text-stone-900 transition-colors flex-shrink-0 mt-1"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="border-t border-stone-50" />

              {/* Detail */}
              <p className="text-sm text-stone-500 leading-7">{selected.detail}</p>

              {/* Footer */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 bg-stone-900 text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => deleteNotification(selected.id)}
                  className="flex items-center justify-center gap-2 px-6 py-4 text-[12px] uppercase tracking-widest font-bold text-red-900 border border-red-900/20 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Notifications;
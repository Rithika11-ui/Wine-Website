import React from "react";
import { Layers, CheckCircle, XCircle, TrendingUp, MousePointerClick, Eye } from "lucide-react";
import { banners, PAGES, PAGE_COLORS } from "./BannerData";

const StatCard = ({
  icon: Icon, label, value, sub, iconBg, iconColor,
}: {
  icon: React.ElementType; label: string; value: string | number;
  sub: string; iconBg: string; iconColor: string;
}) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-md transition-all">
    <div className="flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={18} className={iconColor} />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#1B1E2B] leading-none">{value}</p>
        <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
          <TrendingUp size={10} className="text-emerald-400" />{sub}
        </p>
      </div>
    </div>
  </div>
);

const BannerStatCards = () => {
  const total       = banners.length;
  const active      = banners.filter(b => b.status === "Active").length;
  const inactive    = banners.filter(b => b.status === "Inactive").length;
  const totalClicks = banners.reduce((s, b) => s + b.clicks, 0).toLocaleString();
  const totalImpr   = banners.reduce((s, b) => s + b.impressions, 0).toLocaleString();

  return (
    <div className="space-y-6 mb-8">
      {/* Top stat row */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard icon={Layers}           label="Total Banners"  value={total}        sub="All campaigns"   iconBg="bg-indigo-50"  iconColor="text-indigo-500" />
        <StatCard icon={CheckCircle}      label="Active"         value={active}       sub="Running now"     iconBg="bg-emerald-50" iconColor="text-emerald-500" />
        <StatCard icon={XCircle}          label="Inactive"       value={inactive}     sub="Paused"          iconBg="bg-gray-100"   iconColor="text-gray-400" />
        <StatCard icon={MousePointerClick} label="Total Clicks"  value={totalClicks}  sub="All time"        iconBg="bg-blue-50"    iconColor="text-blue-500" />
        <StatCard icon={Eye}              label="Impressions"    value={totalImpr}    sub="All time"        iconBg="bg-violet-50"  iconColor="text-violet-500" />
      </div>

      {/* Per-page quick summary */}
      <div className="grid grid-cols-5 gap-3">
        {PAGES.map(page => {
          const pageBanners = banners.filter(b => b.page === page);
          const activeCount = pageBanners.filter(b => b.status === "Active").length;
          const c = PAGE_COLORS[page];
          return (
            <div key={page} className={`${c.light} rounded-xl p-4 border border-white`}>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${c.text} mb-2`}>{page}</p>
              <p className="text-xl font-bold text-[#1B1E2B]">{pageBanners.length}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{activeCount} active</p>
              <div className="mt-2 h-1 bg-white/60 rounded-full overflow-hidden">
                <div
                  className={`h-full ${c.bg} rounded-full transition-all`}
                  style={{ width: `${pageBanners.length ? (activeCount / pageBanners.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerStatCards;
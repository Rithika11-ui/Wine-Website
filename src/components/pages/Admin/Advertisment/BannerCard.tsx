import React from "react";
import {
  Calendar, Monitor, Clock, MousePointerClick,
  Eye, Pencil, Trash2, Video, Image, Circle
} from "lucide-react";
import { Banner, PAGE_GRADIENTS, PAGE_COLORS } from "./BannerData";

interface BannerCardProps {
  banner: Banner;
  onEdit: (banner: Banner) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const getDaysLeft = (end: string) => {
  const diff = Math.ceil((new Date(end).getTime() - Date.now()) / 86400000);
  return diff;
};

const BannerCard: React.FC<BannerCardProps> = ({ banner, onEdit, onDelete, onToggleStatus }) => {
  const c = PAGE_COLORS[banner.page];
  const daysLeft = getDaysLeft(banner.endDate);
  const ctr = banner.impressions > 0
    ? ((banner.clicks / banner.impressions) * 100).toFixed(1)
    : "0.0";

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group ${
      banner.status === "Inactive" ? "opacity-80" : ""
    }`}>
      <div className="flex">
        {/* ── Media Thumbnail ── */}
        <div className={`relative w-64 flex-shrink-0 bg-gradient-to-br ${PAGE_GRADIENTS[banner.page]} flex items-center justify-center overflow-hidden`}>
          {/* Status badge */}
          <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm ${
            banner.status === "Active"
              ? "bg-emerald-500 text-white"
              : "bg-gray-800/70 text-white"
          }`}>
            <Circle size={5} className={banner.status === "Active" ? "fill-white text-white" : "fill-gray-300 text-gray-300"} />
            {banner.status.toUpperCase()}
          </div>

          {/* Media type badge */}
          <div className="absolute top-3 right-3 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            {banner.mediaType === "video"
              ? <Video size={13} className="text-white" />
              : <Image size={13} className="text-white" />
            }
          </div>

          {/* Placeholder icon */}
          <div className="text-white/30 flex flex-col items-center gap-2">
            {banner.mediaType === "video"
              ? <Video size={36} />
              : <Image size={36} />
            }
            <p className="text-[10px] font-semibold uppercase tracking-widest opacity-60">{banner.page}</p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            {/* Title + page tag */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-[#1B1E2B] leading-tight mb-1.5">{banner.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${c.light} ${c.text}`}>
                    {banner.page}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-gray-100 text-gray-500 flex items-center gap-1">
                    <Monitor size={9} />
                    {banner.position}
                  </span>
                </div>
              </div>

              {/* Toggle status */}
              <button
                onClick={() => onToggleStatus(banner.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                  banner.status === "Active"
                    ? "border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                    : "border-gray-200 text-gray-400 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {banner.status === "Active" ? "● Live" : "○ Paused"}
              </button>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={11} className="text-gray-300" />
                <span className="font-medium">Start:</span> {formatDate(banner.startDate)}
              </span>
              <span className="text-gray-200">→</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={11} className="text-gray-300" />
                <span className="font-medium">End:</span> {formatDate(banner.endDate)}
              </span>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                daysLeft < 0         ? "bg-gray-100 text-gray-400"
                : daysLeft <= 3      ? "bg-rose-50 text-rose-500"
                : daysLeft <= 7      ? "bg-amber-50 text-amber-500"
                : "bg-indigo-50 text-indigo-500"
              }`}>
                <Clock size={9} />
                {daysLeft < 0 ? "Expired" : `${daysLeft}d left`}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <MousePointerClick size={12} className="text-blue-400" />
                <span className="font-bold text-[#1B1E2B]">{banner.clicks.toLocaleString()}</span>
                <span className="text-gray-400">clicks</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Eye size={12} className="text-violet-400" />
                <span className="font-bold text-[#1B1E2B]">{banner.impressions.toLocaleString()}</span>
                <span className="text-gray-400">impressions</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-gray-400">CTR</span>
                <span className={`font-bold ${parseFloat(ctr) >= 5 ? "text-emerald-500" : parseFloat(ctr) >= 2 ? "text-amber-500" : "text-gray-400"}`}>
                  {ctr}%
                </span>
              </div>

              {/* CTR bar */}
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${c.bg}`}
                  style={{ width: `${Math.min(parseFloat(ctr) * 10, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 mt-2 border-t border-gray-50">
            <button
              onClick={() => onEdit(banner)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition-all"
            >
              <Pencil size={12} /> Edit
            </button>
            <button
              onClick={() => onDelete(banner.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-100 bg-rose-50 text-rose-500 text-xs font-semibold hover:bg-rose-100 transition-all"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
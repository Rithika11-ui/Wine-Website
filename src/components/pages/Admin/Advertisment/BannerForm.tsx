import React, { useState, useRef, useEffect } from "react";
import {
  X, Megaphone, Upload, ImagePlus, Calendar,
  Monitor, CheckCircle, Plus, ChevronDown, AlertCircle, Video
} from "lucide-react";
import { PAGES, POSITIONS, BannerPage, BannerPosition, BannerStatus, BannerMediaType, Banner } from "./BannerData";

interface BannerFormProps {
  onClose: () => void;
  onSubmit: (data: BannerFormData) => void;
  initial?: Banner | null;
}

export interface BannerFormData {
  title: string;
  page: BannerPage;
  position: BannerPosition;
  status: BannerStatus;
  mediaType: BannerMediaType;
  mediaUrl: string;
  startDate: string;
  endDate: string;
}

const inputClass = (err?: boolean) =>
  `w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1B1E2B] bg-white outline-none transition-all placeholder:text-gray-300 ${
    err ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
        : "border-gray-200 focus:border-[#111C44] focus:ring-2 focus:ring-indigo-50"
  }`;

const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5">
    {children}{required && <span className="text-rose-400 ml-0.5">*</span>}
  </label>
);

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-1"><AlertCircle size={10}/>{msg}</p> : null;

const BannerForm: React.FC<BannerFormProps> = ({ onClose, onSubmit, initial }) => {
  const isEdit = !!initial;
  const [form, setForm] = useState<BannerFormData>({
    title:     initial?.title     || "",
    page:      initial?.page      || "Home",
    position:  initial?.position  || "Hero Section",
    status:    initial?.status    || "Active",
    mediaType: initial?.mediaType || "image",
    mediaUrl:  initial?.mediaUrl  || "",
    startDate: initial?.startDate || "",
    endDate:   initial?.endDate   || "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BannerFormData, string>>>({});
  const [preview, setPreview] = useState<string | null>(initial?.mediaUrl || null);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof BannerFormData, v: any) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.startDate)    e.startDate = "Start date required";
    if (!form.endDate)      e.endDate = "End date required";
    if (form.startDate && form.endDate && form.startDate > form.endDate)
      e.endDate = "End must be after start";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => { onSubmit(form); onClose(); }, 900);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) return;
    const type: BannerMediaType = file.type.startsWith("video/") ? "video" : "image";
    set("mediaType", type);
    const reader = new FileReader();
    reader.onload = ev => {
      const url = ev.target?.result as string;
      setPreview(url);
      set("mediaUrl", url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#0a0f1e]/55 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl shadow-2xl flex flex-col animate-modal-in overflow-hidden"
        style={{ width: "min(640px, 92vw)", maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#111C44] rounded-xl flex items-center justify-center">
              <Megaphone size={15} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1B1E2B]">{isEdit ? "Edit Banner" : "Add New Banner"}</h2>
              <p className="text-[10px] text-gray-400">Configure banner placement and media</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-all">
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* Media upload */}
          <div>
            <Label>Banner Media</Label>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              onClick={() => fileRef.current?.click()}
              className={`relative w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-2 overflow-hidden ${
                dragOver    ? "border-indigo-400 bg-indigo-50"
                : preview   ? "border-transparent"
                : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/20"
              }`}
            >
              {preview ? (
                <>
                  {form.mediaType === "image"
                    ? <img src={preview} className="absolute inset-0 w-full h-full object-cover" alt="preview" />
                    : <div className="absolute inset-0 bg-gray-900 flex items-center justify-center"><Video size={32} className="text-gray-400" /></div>
                  }
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-semibold">Click to replace</p>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/50 text-white text-[10px] rounded-lg font-semibold uppercase">
                    {form.mediaType}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <ImagePlus size={18} className="text-gray-400" />
                  </div>
                  <p className="text-xs font-semibold text-gray-500">
                    Drop image/video or <span className="text-indigo-500">browse</span>
                  </p>
                  <p className="text-[10px] text-gray-400">PNG, JPG, MP4 · max 10MB · 16:9 recommended</p>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>
          </div>

          {/* Title */}
          <div>
            <Label required>Banner Title</Label>
            <input
              type="text" placeholder="e.g. Summer Wine Collection Hero"
              value={form.title} onChange={e => set("title", e.target.value)}
              className={inputClass(!!errors.title)}
            />
            <ErrorMsg msg={errors.title} />
          </div>

          {/* Page + Position */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label required>Target Page</Label>
              <div className="relative">
                <select value={form.page} onChange={e => set("page", e.target.value as BannerPage)}
                  className={`${inputClass()} appearance-none pr-8 cursor-pointer`}>
                  {PAGES.map(p => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <Label required>Position</Label>
              <div className="relative">
                <select value={form.position} onChange={e => set("position", e.target.value as BannerPosition)}
                  className={`${inputClass()} appearance-none pr-8 cursor-pointer`}>
                  {POSITIONS.map(p => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label required>Start Date</Label>
              <input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)}
                className={inputClass(!!errors.startDate)} />
              <ErrorMsg msg={errors.startDate} />
            </div>
            <div>
              <Label required>End Date</Label>
              <input type="date" value={form.endDate} onChange={e => set("endDate", e.target.value)}
                className={inputClass(!!errors.endDate)} />
              <ErrorMsg msg={errors.endDate} />
            </div>
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <div className="flex gap-2">
              {(["Active", "Inactive"] as BannerStatus[]).map(s => (
                <button key={s} type="button" onClick={() => set("status", s)}
                  className={`flex-1 py-2.5 rounded-xl text-[11px] font-semibold border transition-all ${
                    form.status === s
                      ? s === "Active" ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                                       : "bg-gray-700 text-white border-gray-700 shadow-sm"
                      : "bg-white text-gray-400 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {s === "Active" ? "● Active" : "○ Inactive"}
                </button>
              ))}
            </div>
          </div>

          {/* Info tip */}
          <div className="rounded-xl bg-indigo-50/60 border border-indigo-100 px-4 py-3">
            <p className="text-[11px] text-indigo-500/80 leading-relaxed">
              <span className="font-bold text-indigo-500">Tip:</span> Each page supports multiple banners at different positions. The Hero Section banner displays prominently at the top. Use 16:9 ratio images for best results.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={submitted}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              submitted ? "bg-emerald-500 text-white cursor-default"
                        : "bg-[#111C44] text-white hover:bg-[#1a2b63] shadow-md hover:shadow-lg"
            }`}>
            {submitted
              ? <><CheckCircle size={15} className="animate-bounce" /> {isEdit ? "Saved!" : "Banner Added!"}</>
              : <><Plus size={15} /> {isEdit ? "Save Changes" : "Add Banner"}</>
            }
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

export default BannerForm;
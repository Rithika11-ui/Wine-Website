import React, { useState, useRef } from "react";
import {
  X, Package, Upload, ImagePlus, Tag, DollarSign,
  Hash, Layers, AlertCircle, CheckCircle, ChevronDown,
  Plus, Minus
} from "lucide-react";
import { CATEGORIES, ProductStatus } from "./ProductData";

interface AddProductFormProps {
  onClose: () => void;
  onSubmit?: (data: ProductFormData) => void;
}

export interface ProductFormData {
  name: string;
  sku: string;
  price: string;
  stock: string;
  category: string;
  status: ProductStatus;
  description: string;
  tags: string[];
  image: string | null;
}

const STATUSES: ProductStatus[] = ["Active", "Draft", "Out of Stock"];

const initialForm: ProductFormData = {
  name: "",
  sku: "",
  price: "",
  stock: "",
  category: CATEGORIES[1],
  status: "Active",
  description: "",
  tags: [],
  image: null,
};

const InputField = ({
  label, icon: Icon, required, error, children,
}: {
  label: string;
  icon?: React.ElementType;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
      {Icon && <Icon size={10} className="text-gray-400" />}
      {label}
      {required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
    {children}
    {error && (
      <p className="flex items-center gap-1 text-[11px] text-rose-500">
        <AlertCircle size={10} /> {error}
      </p>
    )}
  </div>
);

const inputClass = (hasError?: boolean) =>
  `w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1B1E2B] bg-white outline-none transition-all placeholder:text-gray-300 ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
      : "border-gray-200 focus:border-[#111C44] focus:ring-2 focus:ring-indigo-50"
  }`;

export const AddProductForm: React.FC<AddProductFormProps> = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState<ProductFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  const [tagInput, setTagInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof ProductFormData, value: any) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.sku.trim())  e.sku  = "SKU is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Enter a valid price";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)  e.stock = "Enter valid stock";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => { onSubmit?.(form); onClose(); }, 1200);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) set("tags", [...form.tags, t]);
    setTagInput("");
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = ev => set("image", ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => set("image", ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const adjustStock = (delta: number) => {
    const current = parseInt(form.stock) || 0;
    set("stock", String(Math.max(0, current + delta)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a0f1e]/55 backdrop-blur-sm" onClick={onClose} />

      {/* Modal — compact centered card */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl flex flex-col animate-modal-in overflow-hidden"
        style={{ width: "min(680px, 92vw)", maxHeight: "90vh" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#111C44] rounded-xl flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1B1E2B] tracking-tight">Add New Product</h2>
              <p className="text-[10px] text-gray-400">Fill in all required fields</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* Image upload — compact inline row */}
          <div className="flex items-start gap-4">
            {/* Thumbnail */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleImageDrop}
              onClick={() => fileRef.current?.click()}
              className={`relative w-24 h-24 rounded-xl border-2 border-dashed cursor-pointer flex-shrink-0 flex flex-col items-center justify-center gap-1 overflow-hidden transition-all ${
                dragOver          ? "border-indigo-400 bg-indigo-50"
                : form.image     ? "border-transparent"
                : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/30"
              }`}
            >
              {form.image ? (
                <>
                  <img src={form.image} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-[10px] font-semibold text-center px-1">Change</p>
                  </div>
                </>
              ) : (
                <>
                  <ImagePlus size={18} className="text-gray-300" />
                  <p className="text-[9px] text-gray-400 font-medium text-center leading-tight px-1">Upload<br/>Image</p>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
            </div>

            {/* Upload instructions */}
            <div className="flex-1 bg-gray-50 rounded-xl p-3.5 border border-gray-100 flex items-center gap-3 h-24">
              <Upload size={18} className="text-gray-300 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-0.5">
                  Drag & drop or{" "}
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="text-indigo-500 hover:text-indigo-700 transition-colors">
                    browse file
                  </button>
                </p>
                <p className="text-[10px] text-gray-400">PNG, JPG, WEBP — max 5MB. Recommended: 800×800px square.</p>
              </div>
            </div>
          </div>

          {/* Name & SKU */}
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Product Name" icon={Tag} required error={errors.name}>
              <input
                type="text"
                placeholder="e.g. Château Margaux 2018"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                className={inputClass(!!errors.name)}
              />
            </InputField>
            <InputField label="SKU" icon={Hash} required error={errors.sku}>
              <input
                type="text"
                placeholder="e.g. CW-001"
                value={form.sku}
                onChange={e => set("sku", e.target.value.toUpperCase())}
                className={`${inputClass(!!errors.sku)} font-mono`}
              />
            </InputField>
          </div>

          {/* Price, Stock, Category */}
          <div className="grid grid-cols-3 gap-3">
            <InputField label="Price (USD)" icon={DollarSign} required error={errors.price}>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">$</span>
                <input
                  type="number" min="0" step="0.01" placeholder="0.00"
                  value={form.price}
                  onChange={e => set("price", e.target.value)}
                  className={`${inputClass(!!errors.price)} pl-7`}
                />
              </div>
            </InputField>

            <InputField label="Stock" icon={Layers} required error={errors.stock}>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => adjustStock(-1)}
                  className="w-9 h-[42px] flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all flex-shrink-0">
                  <Minus size={13} />
                </button>
                <input
                  type="number" min="0" placeholder="0"
                  value={form.stock}
                  onChange={e => set("stock", e.target.value)}
                  className={`${inputClass(!!errors.stock)} text-center`}
                />
                <button type="button" onClick={() => adjustStock(1)}
                  className="w-9 h-[42px] flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all flex-shrink-0">
                  <Plus size={13} />
                </button>
              </div>
            </InputField>

            <InputField label="Category" required>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={e => set("category", e.target.value)}
                  className={`${inputClass()} appearance-none pr-8 cursor-pointer`}
                >
                  {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </InputField>
          </div>

          {/* Status */}
          <InputField label="Status" required>
            <div className="flex gap-2">
              {STATUSES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("status", s)}
                  className={`flex-1 py-2 rounded-xl text-[11px] font-semibold border transition-all ${
                    form.status === s
                      ? s === "Active"        ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                      : s === "Draft"         ? "bg-[#111C44] text-white border-[#111C44] shadow-sm"
                                              : "bg-rose-500 text-white border-rose-500 shadow-sm"
                      : "bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </InputField>

          {/* Description */}
          <InputField label="Description">
            <textarea
              rows={3}
              placeholder="Vintage notes, origin, tasting profile, awards..."
              value={form.description}
              onChange={e => set("description", e.target.value)}
              className={`${inputClass()} resize-none`}
            />
          </InputField>

          {/* Tags */}
          <InputField label="Tags">
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a tag and press Enter"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  className={`${inputClass()} flex-1`}
                />
                <button type="button" onClick={addTag}
                  className="px-4 py-2.5 rounded-xl bg-[#111C44] text-white text-xs font-semibold hover:bg-[#1a2b63] transition-all whitespace-nowrap">
                  + Add
                </button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[11px] font-semibold rounded-lg">
                      {tag}
                      <button type="button" onClick={() => set("tags", form.tags.filter(t => t !== tag))}>
                        <X size={9} className="hover:text-rose-500 transition-colors" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </InputField>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} disabled={submitted}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              submitted
                ? "bg-emerald-500 text-white cursor-default"
                : "bg-[#111C44] text-white hover:bg-[#1a2b63] shadow-md hover:shadow-lg"
            }`}>
            {submitted
              ? <><CheckCircle size={15} className="animate-bounce" /> Product Added!</>
              : <><Plus size={15} /> Add Product</>
            }
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { transform: scale(0.96) translateY(10px); opacity: 0; }
          to   { transform: scale(1)    translateY(0);    opacity: 1; }
        }
        .animate-modal-in {
          animation: modal-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AddProductForm;
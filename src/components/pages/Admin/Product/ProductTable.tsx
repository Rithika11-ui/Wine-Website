import React, { useState, useMemo } from "react";
import {
  Search, ArrowUpDown, ArrowUp, ArrowDown,
  Eye, Pencil, Trash2, Star, ChevronLeft,
  ChevronRight, Package, Circle,
} from "lucide-react";
import { products, CATEGORIES, STATUSES, SORT_OPTIONS, Product, ProductStatus } from "./ProductData";

type SortKey = "date" | "name" | "price" | "stock" | "rating" | "category";
type SortDir = "asc" | "desc";

const statusStyles: Record<ProductStatus, string> = {
  "Active":       "bg-emerald-50 text-emerald-600",
  "Draft":        "bg-gray-100 text-gray-500",
  "Out of Stock": "bg-rose-50 text-rose-500",
};

const statusDot: Record<ProductStatus, string> = {
  "Active":       "fill-emerald-500 text-emerald-500",
  "Draft":        "fill-gray-400 text-gray-400",
  "Out of Stock": "fill-rose-400 text-rose-400",
};

const StockBadge = ({ stock }: { stock: number }) => {
  if (stock === 0)  return <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-500 text-[11px] font-bold">Out</span>;
  if (stock < 10)   return <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 text-[11px] font-bold">{stock} left</span>;
  return <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 text-[11px] font-semibold">{stock}</span>;
};

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    <Star size={12} className="fill-amber-400 text-amber-400" />
    <span className="text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
  </div>
);

const ProductTable = () => {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All Categories");
  const [status, setStatus]       = useState("All Status");
  const [sortKey, setSortKey]     = useState<SortKey>("date");
  const [sortDir, setSortDir]     = useState<SortDir>("desc");
  const [page, setPage]           = useState(1);
  const perPage = 6;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown size={12} className="opacity-30" />;
    return sortDir === "asc"
      ? <ArrowUp size={12} className="text-[#111C44]" />
      : <ArrowDown size={12} className="text-[#111C44]" />;
  };

  const filtered = useMemo(() => {
    return products
      .filter(p => {
        const q = search.toLowerCase();
        const matchSearch = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
        const matchCat    = category === "All Categories" || p.category === category;
        const matchStatus = status === "All Status" || p.status === status;
        return matchSearch && matchCat && matchStatus;
      })
      .sort((a, b) => {
        let cmp = 0;
        switch (sortKey) {
          case "name":     cmp = a.name.localeCompare(b.name); break;
          case "price":    cmp = a.price - b.price; break;
          case "stock":    cmp = a.stock - b.stock; break;
          case "rating":   cmp = a.rating - b.rating; break;
          case "category": cmp = a.category.localeCompare(b.category); break;
          case "date":     cmp = new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime(); break;
        }
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [search, category, status, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const ColHeader = ({ label, col }: { label: string; col?: SortKey }) => (
    <th className="px-5 py-3 text-left">
      <button
        onClick={() => col && handleSort(col)}
        className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-gray-700 transition-colors ${!col ? "cursor-default" : "cursor-pointer"}`}
      >
        {label}
        {col && <SortIcon col={col} />}
      </button>
    </th>
  );

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-100">
        {/* Search */}
        <div className="flex items-center gap-2 bg-[#F4F7FE] rounded-xl px-3 py-2.5 flex-1 min-w-48">
          <Search size={14} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name, SKU or description"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="bg-transparent text-xs text-gray-700 placeholder:text-gray-400 outline-none w-full"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setPage(1); }}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-600 bg-white outline-none focus:border-[#111C44] transition-all cursor-pointer"
        >
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1); }}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-600 bg-white outline-none focus:border-[#111C44] transition-all cursor-pointer"
        >
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>

        {/* Sort */}
        <select
          value={sortKey}
          onChange={e => { setSortKey(e.target.value as SortKey); setPage(1); }}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-600 bg-white outline-none focus:border-[#111C44] transition-all cursor-pointer"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {/* Sort direction toggle */}
        <button
          onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-[#111C44] hover:text-[#111C44] transition-all"
          title={`Direction: ${sortDir === "asc" ? "Ascending" : "Descending"}`}
        >
          {sortDir === "asc" ? <ArrowUp size={15} /> : <ArrowDown size={15} />}
        </button>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <ColHeader label="Product Name" col="name"     />
              <ColHeader label="Price"        col="price"    />
              <ColHeader label="Category"     col="category" />
              <ColHeader label="Added Date"   col="date"     />
              <ColHeader label="Stock"        col="stock"    />
              <ColHeader label="Status"                      />
              <ColHeader label="Rating"       col="rating"   />
              <ColHeader label="Actions"                     />
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-300">
                    <Package size={36} />
                    <p className="text-sm font-medium text-gray-400">No products found</p>
                    <p className="text-xs text-gray-300">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-[#F8F9FF] transition-colors group">

                  {/* Product Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-lg flex-shrink-0 group-hover:border-indigo-100 transition-colors">
                        {product.image}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1B1E2B] leading-tight">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">{product.sku}</p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-[#1B1E2B]">${product.price.toLocaleString()}</span>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[11px] font-semibold rounded-lg">
                      {product.category}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <span className="text-xs text-gray-500">
                      {new Date(product.addedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-4">
                    <StockBadge stock={product.stock} />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${statusStyles[product.status]}`}>
                      <Circle size={6} className={statusDot[product.status]} />
                      {product.status}
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="px-5 py-4">
                    <RatingStars rating={product.rating} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 transition-colors" title="View">
                        <Eye size={13} />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 hover:bg-amber-100 transition-colors" title="Edit">
                        <Pencil size={13} />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-100 transition-colors" title="Delete">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">
          Showing <span className="font-semibold text-gray-600">{Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)}</span> of{" "}
          <span className="font-semibold text-gray-600">{filtered.length}</span> products
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                p === page ? "bg-[#111C44] text-white" : "border border-gray-200 text-gray-400 hover:border-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 disabled:opacity-30 transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
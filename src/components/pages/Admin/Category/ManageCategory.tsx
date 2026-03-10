import React, { useState } from 'react'
import { Tag, Plus, Pencil, Trash2, Search, X, CheckCircle, XCircle, Wine, Layers } from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string
  productCount: number
  status: 'Active' | 'Inactive'
  createdAt: string
}

const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: 'Red Wine',       description: 'Full-bodied reds from around the world', productCount: 42, status: 'Active',   createdAt: '2024-01-10' },
  { id: 2, name: 'White Wine',     description: 'Crisp and refreshing white varieties',   productCount: 35, status: 'Active',   createdAt: '2024-01-12' },
  { id: 3, name: 'Rosé',           description: 'Light and fruity rosé selections',       productCount: 18, status: 'Active',   createdAt: '2024-02-01' },
  { id: 4, name: 'Sparkling',      description: 'Champagnes, Prosecco & Cava',           productCount: 22, status: 'Active',   createdAt: '2024-02-14' },
  { id: 5, name: 'Dessert Wine',   description: 'Sweet and fortified wine options',       productCount: 9,  status: 'Inactive', createdAt: '2024-03-05' },
  { id: 6, name: 'Natural Wine',   description: 'Organic and biodynamic selections',      productCount: 14, status: 'Active',   createdAt: '2024-03-20' },
]

const EMPTY_FORM = { name: '', description: '', status: 'Active' as 'Active' | 'Inactive' }

const StatCard = ({ label, value, icon, color }: { label: string; value: number | string; icon: React.ReactNode; color: string }) => (
  <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-gray-100">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
)

export default function ManageCategory() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Category | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true) }
  const openEdit = (cat: Category) => { setEditTarget(cat); setForm({ name: cat.name, description: cat.description, status: cat.status }); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditTarget(null) }

  const handleSave = () => {
    if (!form.name.trim()) return
    if (editTarget) {
      setCategories(prev => prev.map(c => c.id === editTarget.id ? { ...c, ...form } : c))
    } else {
      const next: Category = {
        id: Date.now(),
        ...form,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setCategories(prev => [...prev, next])
    }
    closeModal()
  }

  const handleDelete = (id: number) => { setCategories(prev => prev.filter(c => c.id !== id)); setDeleteId(null) }

  const toggleStatus = (id: number) =>
    setCategories(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c))

  const totalProducts = categories.reduce((s, c) => s + c.productCount, 0)
  const activeCount = categories.filter(c => c.status === 'Active').length

  return (
    <div className=" min-h-screen bg-[#F4F7FE]">
      <div className="max-w-7xl mx-auto px-8 py-10">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Categories</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your wine product categories</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#580C1F] hover:bg-[#6e1027] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg transition-colors shadow-md"
        >
          <Plus size={15} /> Add Category
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Categories" value={categories.length}  icon={<Layers size={20} className="text-white" />} color="bg-[#580C1F]" />
        <StatCard label="Active"           value={activeCount}         icon={<CheckCircle size={20} className="text-white" />} color="bg-emerald-500" />
        <StatCard label="Total Products"   value={totalProducts}       icon={<Wine size={20} className="text-white" />} color="bg-indigo-500" />
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Search bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]"
            />
          </div>
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400">
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-center">Products</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-400 text-sm">
                    No categories found.
                  </td>
                </tr>
              ) : filtered.map((cat, i) => (
                <tr key={cat.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-4 text-gray-400 text-xs">{String(i + 1).padStart(2, '0')}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-[#580C1F]/10 flex items-center justify-center flex-shrink-0">
                        <Tag size={14} className="text-[#580C1F]" />
                      </div>
                      <span className="font-semibold text-gray-800">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 max-w-[220px] truncate">{cat.description}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
                      {cat.productCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStatus(cat.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                        cat.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-400 hover:bg-red-100'
                      }`}
                    >
                      {cat.status === 'Active'
                        ? <><CheckCircle size={12} /> Active</>
                        : <><XCircle size={12} /> Inactive</>}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{cat.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEdit(cat)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(cat.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-base">
                {editTarget ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                  Category Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sparkling Wine"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of this category..."
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F] resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value as 'Active' | 'Inactive' }))}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F] bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 text-sm font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name.trim()}
                className="flex-1 py-2.5 text-sm font-bold text-white bg-[#580C1F] hover:bg-[#6e1027] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editTarget ? 'Save Changes' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-400" />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">Delete Category?</h3>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone. All products in this category may be affected.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 text-sm font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      </div>
  )
}
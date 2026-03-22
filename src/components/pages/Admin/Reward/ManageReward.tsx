import React, { useState } from 'react'
import {
  Gift, Plus, Pencil, Trash2, Search, X,
  CheckCircle, XCircle, Clock, Copy, Check,
  Percent, Tag, Users,
} from 'lucide-react'
import { useAdminReward } from '../../../../Hook/AdminReward'  // ✅ adjust path if needed

type Status = 'Active' | 'Inactive' | 'Expired'
type DiscountType = 'Percentage' | 'Fixed'

const STATUS_STYLES: Record<Status, string> = {
  Active:   'bg-emerald-50 text-emerald-600',
  Inactive: 'bg-gray-100 text-gray-400',
  Expired:  'bg-red-50 text-red-400',
}
const STATUS_ICONS: Record<Status, React.ReactNode> = {
  Active:   <CheckCircle size={12} />,
  Inactive: <XCircle size={12} />,
  Expired:  <Clock size={12} />,
}

const StatCard = ({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) => (
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={handleCopy}
      className="ml-1.5 text-gray-300 hover:text-[#580C1F] transition-colors"
      title="Copy code">
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
    </button>
  )
}

function UsageBar({ used, limit }: { used: number; limit: number }) {
  const pct = Math.min((used / limit) * 100, 100)
  const color = pct >= 100 ? 'bg-red-400' : pct >= 75 ? 'bg-amber-400' : 'bg-emerald-400'
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
        <span>{used} / {limit}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function ManageReward() {
  // ✅ All state and logic come from the hook
  const {
    rewards,
    search,        setSearch,
    loading,
    error,
    filterStatus,  setFilterStatus,
    modalOpen,
    editTarget,
    form,          setForm,
    deleteId,      setDeleteId,
    filter,
    openAdd,
    openEdit,
    closeModal,
    handleSave,
    handleDelete,
    totalUsed,
    activeCount,
  } = useAdminReward()

  const filtered = filter() // ✅ call filter() to get the filtered list

  // ✅ Loading / error states
  if (loading) return (
    <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading rewards...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F4F7FE]">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Reward Coupons</h1>
            <p className="text-sm text-gray-400 mt-1">Create and manage discount codes for your customers</p>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-[#580C1F] hover:bg-[#6e1027] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg transition-colors shadow-md">
            <Plus size={15} /> New Coupon
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Coupons"      value={rewards.length}                              icon={<Gift size={20} className="text-white" />}        color="bg-[#580C1F]" />
          <StatCard label="Active"             value={activeCount}                                 icon={<CheckCircle size={20} className="text-white" />}  color="bg-emerald-500" />
          <StatCard label="Total Redemptions"  value={totalUsed}                                   icon={<Users size={20} className="text-white" />}        color="bg-indigo-500" />
          <StatCard label="Expired"            value={rewards.filter(r => r.status === 'Expired').length} icon={<Clock size={20} className="text-white" />} color="bg-red-400" />
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search coupons..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
            </div>
            <div className="flex gap-2 ml-auto">
              {(['All', 'Active', 'Inactive', 'Expired'] as const).map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                    filterStatus === s
                      ? 'bg-[#580C1F] text-white border-[#580C1F]'
                      : 'text-gray-400 border-gray-200 hover:border-[#580C1F] hover:text-[#580C1F]'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Code</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3 text-center">Discount</th>
                  <th className="px-6 py-3 text-center">Min. Order</th>
                  <th className="px-6 py-3">Usage</th>
                  <th className="px-6 py-3">Expiry</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="px-6 py-16 text-center text-gray-400 text-sm">No coupons found.</td></tr>
                ) : filtered.map((r, i) => (
                  <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4 text-gray-400 text-xs">{String(i + 1).padStart(2, '0')}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-[#580C1F] bg-[#580C1F]/8 border border-[#580C1F]/20 px-3 py-1 rounded-md text-xs tracking-widest">
                          {r.code}
                        </span>
                        <CopyButton text={r.code} />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-400 text-xs max-w-[180px] truncate">{r.description}</td>

                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                        r.discountType === 'Percentage' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {r.discountType === 'Percentage' ? <Percent size={11} /> : <Tag size={11} />}
                        {r.discountType === 'Percentage' ? `${r.discount}%` : `$${r.discount}`}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center text-xs text-gray-500 font-medium">
                      {r.minOrder === '0' ? <span className="text-gray-300">—</span> : `$${r.minOrder}`}
                    </td>

                    <td className="px-6 py-4 min-w-[130px]">
                      <UsageBar used={r.usedCount} limit={r.usageLimit} />
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-400">{r.expiryDate}</td>

                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLES[r.status]}`}>
                        {STATUS_ICONS[r.status]} {r.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEdit(r)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-colors">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => setDeleteId(r.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors">
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

        {/* Add / Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h2 className="font-bold text-gray-800 text-base">{editTarget ? 'Edit Coupon' : 'New Coupon'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                    Coupon Code <span className="text-red-400">*</span>
                  </label>
                  <input type="text" placeholder="e.g. WINE20"
                    value={form.code}
                    onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                    className="w-full px-4 py-2.5 text-sm font-mono font-bold tracking-widest border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
                  <input type="text" placeholder="Brief description of this coupon"
                    value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Discount Type</label>
                    <select value={form.discountType} onChange={e => setForm(f => ({ ...f, discountType: e.target.value as DiscountType }))}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F] bg-white">
                      <option>Percentage</option>
                      <option>Fixed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                      Discount Value <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">
                        {form.discountType === 'Percentage' ? '%' : '$'}
                      </span>
                      <input type="number" min="0" placeholder="0"
                        value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))}
                        className="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Min. Order ($)</label>
                    <input type="number" min="0" placeholder="0"
                      value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Usage Limit</label>
                    <input type="number" min="1" placeholder="100"
                      value={form.usageLimit} onChange={e => setForm(f => ({ ...f, usageLimit: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Status</label>
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F] bg-white">
                      <option>Active</option><option>Inactive</option><option>Expired</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Expiry Date</label>
                    <input type="date" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 px-6 pb-6">
                <button onClick={closeModal}
                  className="flex-1 py-2.5 text-sm font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={!form.code.trim() || !form.discount.trim()}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-[#580C1F] hover:bg-[#6e1027] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  {editTarget ? 'Save Changes' : 'Create Coupon'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        {deleteId !== null && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-400" />
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1">Delete Coupon?</h3>
              <p className="text-sm text-gray-400 mb-6">This action cannot be undone. Active users may still try to redeem this code.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 text-sm font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteId!)}  
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
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
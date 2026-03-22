import React from 'react'
import {
  Megaphone, Plus, Pencil, Trash2, Search, X,
  CheckCircle, Eye, Calendar, Image, Link as LinkIcon, TrendingUp,
  XCircle
} from 'lucide-react'
import { Advertisement, Placement, Status, useAdminAdvertisment } from '../../../../Hook/Advertisment/AdminAdvertisment'


export const STATUS_ICONS: Record<Status, React.ReactNode> = {
  Active:    <CheckCircle size={11} />,
  Inactive:  <XCircle size={11} />,
  Scheduled: <Calendar size={11} />,
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

export default function ManageAdvertisement() {
  
  const { ad, ads, openAdd, openEdit, setDeleteId, activeCount, scheduledCount,
    totalImpressions, search, setSearch, setFilterStatus, filterStatus, filtered,
    STATUS_ICONS, setPreviewAd, modalOpen, editTarget, closeModal, fileRef, form, setForm,
    PLACEMENTS, handleSave, previewAd, deleteId, handleDelete, STATUS_STYLES, handleImageUpload
  } = useAdminAdvertisment();

 

  return (
    <div className="min-h-screen bg-[#F4F7FE]  ">
      <div className="max-w-7xl mx-auto px-8 py-10">

      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Advertisements</h1>
          <p className="text-sm text-gray-400 mt-1">Manage banners, popups and promotional campaigns</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#580C1F] hover:bg-[#6e1027] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg transition-colors shadow-md">
          <Plus size={15} /> New Ad
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Ads"    value={ads.length}                              icon={<Megaphone size={20} className="text-white" />}   color="bg-[#580C1F]" />
        <StatCard label="Active"       value={activeCount}                             icon={<CheckCircle size={20} className="text-white" />} color="bg-emerald-500" />
        <StatCard label="Scheduled"    value={scheduledCount}                          icon={<Calendar size={20} className="text-white" />}    color="bg-amber-400" />
        <StatCard label="Impressions"  value={totalImpressions.toLocaleString()}       icon={<TrendingUp size={20} className="text-white" />}  color="bg-indigo-500" />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search ads..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
          </div>
          <div className="flex gap-2 ml-auto">
            {(['All', 'Active', 'Scheduled', 'Inactive'] as const).map(s => (
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
                <th className="px-6 py-3">Ad</th>
                <th className="px-6 py-3">Placement</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3 text-center">Impressions</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-16 text-center text-gray-400 text-sm">No advertisements found.</td></tr>
              ) : filtered.map((ad: Advertisement, i: number) => (
                <tr key={ad.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-4 text-gray-400 text-xs">{String(i + 1).padStart(2, '0')}</td>

                  {/* Ad thumb + title */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                        {ad.image
                          ? <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                          : <div className="w-full h-full flex items-center justify-center"><Image size={14} className="text-gray-300" /></div>}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 leading-tight">{ad.title}</p>
                        <a href={ad.link} className="text-xs text-indigo-400 flex items-center gap-1 mt-0.5 hover:underline" target="_blank" rel="noreferrer">
                          <LinkIcon size={10} /> {ad.link}
                        </a>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{ad.placement}</span>
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {ad.startDate}</span>
                    <span className="text-gray-300 pl-4">→ {ad.endDate}</span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
                      {ad.impressions.toLocaleString()}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLES[ad.status]}`}>
                      {STATUS_ICONS[ad.status]} {ad.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => setPreviewAd(ad)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => openEdit(ad)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-colors">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteId(ad.id)}
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

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-800 text-base">{editTarget ? 'Edit Advertisement' : 'New Advertisement'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Ad Image</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-36 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#580C1F] transition-colors overflow-hidden bg-gray-50 relative"
                >
                  {form.image
                    ? <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                    : <><Image size={28} className="text-gray-300 mb-2" /><p className="text-xs text-gray-400">Click to upload image</p></>}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Title <span className="text-red-400">*</span></label>
                <input type="text" placeholder="e.g. Summer Red Wine Sale"
                  value={form.title} onChange={e => setForm((f:any) => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
              </div>

              {/* Link */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Destination URL</label>
                <div className="relative">
                  <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="/promo/summer-sale"
                    value={form.link} onChange={e => setForm((f:any) => ({ ...f, link: e.target.value }))}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
                </div>
              </div>

              {/* Placement + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Placement</label>
                  <select value={form.placement} onChange={e => setForm((f:any) => ({ ...f, placement: e.target.value as Placement }))}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F] bg-white">
                    {PLACEMENTS.map((p:any) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm((f:any) => ({ ...f, status: e.target.value as Status }))}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F] bg-white">
                    <option>Active</option><option>Inactive</option><option>Scheduled</option>
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Start Date</label>
                  <input type="date" value={form.startDate} onChange={e => setForm((f:any) => ({ ...f, startDate: e.target.value }))}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">End Date</label>
                  <input type="date" value={form.endDate} onChange={e => setForm((f:any) => ({ ...f, endDate: e.target.value }))}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580C1F]/30 focus:border-[#580C1F]" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={closeModal}
                className="flex-1 py-2.5 text-sm font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={!form.title.trim()}
                className="flex-1 py-2.5 text-sm font-bold text-white bg-[#580C1F] hover:bg-[#6e1027] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {editTarget ? 'Save Changes' : 'Create Ad'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Preview Modal ── */}
      {previewAd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-base">Ad Preview</h2>
              <button onClick={() => setPreviewAd(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="w-full h-52 bg-gray-100 overflow-hidden">
              {previewAd.image
                ? <img src={previewAd.image} alt={previewAd.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><Image size={40} className="text-gray-300" /></div>}
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-lg font-bold text-gray-800">{previewAd.title}</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-semibold">{previewAd.placement}</span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold ${STATUS_STYLES[previewAd.status]}`}>
                  {STATUS_ICONS[previewAd.status]} {previewAd.status}
                </span>
              </div>
              <div className="text-xs text-gray-400 space-y-1 pt-1">
                <p className="flex items-center gap-2"><Calendar size={12} /> {previewAd.startDate} → {previewAd.endDate}</p>
                <p className="flex items-center gap-2"><LinkIcon size={12} /> <span className="text-indigo-400">{previewAd.link}</span></p>
                <p className="flex items-center gap-2"><TrendingUp size={12} /> {previewAd.impressions.toLocaleString()} impressions</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-400" />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">Delete Advertisement?</h3>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 text-sm font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
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
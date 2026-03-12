import { ArrowLeft, MapPin, Plus, Pencil, Trash2, Check, X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  country: string;
  isDefault: boolean;
}

const emptyForm = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  country: "",
  isDefault: false,
};

const ManageAddresses = () => {
  const navigate = useNavigate();

  // Mock data — replace with API call later
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      fullName: "Alexander Vane",
      phone: "+1 (555) 000-1212",
      street: "123 Vineyard Lane",
      city: "Napa, CA 94558",
      country: "United States",
      isDefault: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (address: Address) => {
    setEditingId(address.id);
    setForm({
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      city: address.city,
      country: address.country,
      isDefault: address.isDefault,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // replace with API call
    if (editingId) {
      setAddresses(prev => prev.map(a =>
        a.id === editingId ? { ...a, ...form } : a
      ));
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        ...form,
        isDefault: addresses.length === 0 ? true : form.isDefault,
      };
      if (form.isDefault) {
        setAddresses(prev => [...prev.map(a => ({ ...a, isDefault: false })), newAddress]);
      } else {
        setAddresses(prev => [...prev, newAddress]);
      }
    }
    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await new Promise(r => setTimeout(r, 800)); // replace with API call
    setAddresses(prev => prev.filter(a => a.id !== id));
    setDeletingId(null);
    setShowDeleteConfirm(null);
  };

  const handleSetDefault = async (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    // replace with API call
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
              <h1 className="text-5xl font-serif italic text-stone-900">Addresses</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mt-1">Manage your delivery locations</p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900 transition-all"
            >
              <Plus size={14} />
              Add New
            </button>
          </div>

          {/* Address List */}
          <div className="space-y-4">
            {addresses.length === 0 && (
              <div className="bg-white border border-stone-100 p-16 text-center">
                <MapPin size={32} className="text-stone-200 mx-auto mb-4" />
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">No addresses saved yet</p>
              </div>
            )}

            {addresses.map((address) => (
              <div
                key={address.id}
                className={`bg-white border shadow-sm p-8 transition-all ${address.isDefault ? 'border-red-900/30' : 'border-stone-100'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${address.isDefault ? 'bg-red-50' : 'bg-stone-50'}`}>
                      <MapPin size={16} className={address.isDefault ? 'text-red-900' : 'text-stone-400'} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-bold">{address.fullName}</p>
                        {address.isDefault && (
                          <span className="text-[9px] uppercase tracking-widest font-bold text-red-900 border border-red-900/30 px-2 py-0.5">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-stone-500">{address.street}</p>
                      <p className="text-sm text-stone-500">{address.city}, {address.country}</p>
                      <p className="text-sm text-stone-400">{address.phone}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="text-[9px] uppercase tracking-widest font-bold text-stone-400 hover:text-red-900 transition-colors border border-stone-200 px-3 py-2 hover:border-red-900/30"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => openEdit(address)}
                      className="p-2 text-stone-300 hover:text-stone-900 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(address.id)}
                      className="p-2 text-stone-300 hover:text-red-900 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Delete Confirm */}
                {showDeleteConfirm === address.id && (
                  <div className="mt-6 pt-6 border-t border-stone-50 flex items-center justify-between">
                    <p className="text-xs text-stone-500 uppercase tracking-widest">Remove this address?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="p-2 text-stone-400 hover:text-stone-900 transition-colors border border-stone-200"
                      >
                        <X size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        disabled={deletingId === address.id}
                        className="p-2 bg-red-900 text-white hover:bg-stone-900 transition-colors disabled:opacity-50"
                      >
                        {deletingId === address.id
                          ? <Loader2 size={14} className="animate-spin" />
                          : <Check size={14} />
                        }
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* --- ADD / EDIT FORM MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white shadow-2xl p-10 max-w-lg w-full mx-4 space-y-6">

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif italic">{editingId ? "Edit Address" : "New Address"}</h2>
              <button onClick={() => setShowForm(false)} className="text-stone-300 hover:text-stone-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm"
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Street Address</label>
                <input
                  type="text"
                  value={form.street}
                  onChange={e => setForm({ ...form, street: e.target.value })}
                  className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Country</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={e => setForm({ ...form, country: e.target.value })}
                  className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm"
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={form.isDefault}
                  onChange={e => setForm({ ...form, isDefault: e.target.checked })}
                  className="accent-red-900"
                />
                <label htmlFor="isDefault" className="text-[10px] uppercase tracking-widest text-stone-500 font-bold cursor-pointer">
                  Set as default address
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-stone-200 text-stone-600 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-red-900 text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-900 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : (editingId ? "Save Changes" : "Add Address")}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageAddresses;
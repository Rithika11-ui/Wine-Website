import React, { useEffect, useState, useMemo, useRef } from "react";
import { STATUS_ICONS } from "../../components/pages/Admin/Advertisment/Advertisment";

export type Placement    = "Hero Banner" | "Sidebar" | "Popup" | "Footer" | "In-Feed";
export type Status       = "Active" | "Inactive" | "Scheduled";
export type FilterStatus = "All" | Status;

export interface Advertisement {
  id:          number;
  title:       string;
  image:       string;
  link:        string;
  placement:   Placement;
  status:      Status;
  startDate:   string;
  endDate:     string;
  impressions: number;
}

type AdForm = {
  title:     string;
  image:     string;
  link:      string;
  placement: Placement;
  status:    Status;
  startDate: string;
  endDate:   string;
};

const EMPTY_FORM: AdForm = {
  title:     "",
  image:     "",
  link:      "",
  placement: "Hero Banner",
  status:    "Active",
  startDate: "",
  endDate:   "",
};

export const PLACEMENTS: Placement[] = [
  "Hero Banner", "Sidebar", "Popup", "Footer", "In-Feed",
];

export const STATUS_STYLES: Record<Status, string> = {
  Active:    "bg-emerald-50 text-emerald-600",
  Inactive:  "bg-red-50 text-red-400",
  Scheduled: "bg-amber-50 text-amber-500",
};


const getHeaders = () => ({
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
  "Content-Type":  "application/json",
});

export function useAdminAdvertisment() {
  const [ads,     setAds]     = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All");

  const [modalOpen,  setModalOpen]  = useState(false);
  const [editTarget, setEditTarget] = useState<Advertisement | null>(null);
  const [form,       setForm]       = useState<AdForm>(EMPTY_FORM);
  const [deleteId,   setDeleteId]   = useState<number | null>(null);
  const [previewAd,  setPreviewAd]  = useState<Advertisement | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/advertisements`, {
      headers: getHeaders(),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch advertisements.");
        return res.json();
      })
      .then(data => {
        const mapped: Advertisement[] = data.data.map((a: any) => ({
          id:          a.id,
          title:       a.title,
          image:       a.image       ?? "",
          link:        a.link        ?? "",
          placement:   a.placement   ?? "Hero Banner",
          status:      a.status      ?? "Active",
          startDate:   a.startDate   ?? "",
          endDate:     a.endDate     ?? "",
          impressions: a.impressions ?? 0,
        }));
        setAds(mapped);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return ads.filter(a => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "All" || a.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [ads, search, filterStatus]);

  const activeCount      = ads.filter(a => a.status === "Active").length;
  const scheduledCount   = ads.filter(a => a.status === "Scheduled").length;
  const totalImpressions = ads.reduce((s, a) => s + a.impressions, 0);

  const openAdd = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (ad: Advertisement) => {
    setEditTarget(ad);
    setForm({
      title:     ad.title,
      image:     ad.image,
      link:      ad.link,
      placement: ad.placement,
      status:    ad.status,
      startDate: ad.startDate,
      endDate:   ad.endDate,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(null);
    setForm(EMPTY_FORM);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    try {
      if (editTarget) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/advertisements/${editTarget.id}`, {
          method:  "PATCH",
          headers: getHeaders(),
          body:    JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to update advertisement.");
        setAds(prev =>
          prev.map(a => a.id === editTarget.id ? { ...a, ...form } : a)
        );
      } else {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/advertisements`, {
          method:  "POST",
          headers: getHeaders(),
          body:    JSON.stringify({ ...form, impressions: 0 }),
        });
        if (!res.ok) throw new Error("Failed to create advertisement.");
        const data = await res.json();
        setAds(prev => [...prev, {
          id:          data.data?.id          ?? Date.now(),
          impressions: data.data?.impressions ?? 0,
          ...form,
        }]);
      }
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save advertisement.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/advertisements/${id}`, {
        method:  "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete advertisement.");
      setAds(prev => prev.filter(a => a.id !== id));
      setDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete advertisement.");
    }
  };

  const ad = previewAd ?? editTarget ?? null;

  return {
    ad, ads, filtered,
    loading, error,
    activeCount, scheduledCount, totalImpressions,
    search,       setSearch,
    filterStatus, setFilterStatus,
    modalOpen,  editTarget,
    openAdd,    openEdit,    closeModal,
    form,       setForm,
    deleteId,   setDeleteId,
    previewAd,  setPreviewAd,
    fileRef,    handleImageUpload,
    PLACEMENTS, STATUS_STYLES, STATUS_ICONS,
    handleSave,
    handleDelete,
  };
}
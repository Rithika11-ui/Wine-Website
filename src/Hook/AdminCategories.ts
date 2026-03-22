import { useEffect, useState, useMemo } from "react";
import { Categories } from "../components/pages/Admin/Category/CategoriesData";

type SortKey = "name" | "productCount" | "createdAt";
type SortDir = "asc" | "desc";

export type CategoryForm = {
  name:        string;
  description: string;
  status:      "Active" | "Inactive";
};

export function useAdminCategories() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const [search,  setSearch]  = useState("");
  const [status,  setStatus]  = useState("All Status");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page,    setPage]    = useState(1);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            headers: { Authorization: `Bearer  ${token}` }
        })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch categories.");
        return res.json();
      })
      .then(data => {
        const mapped: Categories[] = data.data.map((c: any) => ({
          id:           c.id,
          name:         c.name,
          description:  c.description  ?? "",
          productCount: c.productCount ?? 0,
          status:       c.status       ?? "Active",
          createdAt:    c.createdAt,
        }));
        setCategories(mapped);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return categories
      .filter(c => {
        const q           = search.toLowerCase();
        const matchSearch = c.name.toLowerCase().includes(q) ||
                            c.description.toLowerCase().includes(q);
        const matchStatus = status === "All Status" || c.status === status;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        let cmp = 0;
        switch (sortKey) {
          case "name":         cmp = a.name.localeCompare(b.name); break;
          case "productCount": cmp = a.productCount - b.productCount; break;
          case "createdAt":    cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); break;
        }
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [categories, search, status, sortKey, sortDir]);

  const totalProducts     = categories.reduce((s, c) => s + c.productCount, 0);
  const activeCount       = categories.filter(c => c.status === "Active").length;
  const totalCategories   = categories.length;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const handleSave = async (form: CategoryForm, editTarget: Categories | null) => {
    try {
      if (editTarget) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/categories/${editTarget.id}`, {
          method:  "PATCH",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to update category.");
        setCategories(prev =>
          prev.map(c => c.id === editTarget.id ? { ...c, ...form } : c)
        );
      } else {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ ...form, productCount: 0 }),
        });
        if (!res.ok) throw new Error("Failed to create category.");
        const data = await res.json();
        setCategories(prev => [...prev, {
          id:           data.data?.id          ?? Date.now(),
          createdAt:    data.data?.createdAt   ?? new Date().toISOString().split("T")[0],
          productCount: data.data?.productCount ?? 0,
          ...form,
        }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category.");
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete category.");
    }
  };

  const handleToggleStatus = async (id: number) => {
    const cat = categories.find(c => c.id === id);
    if (!cat) return;
    const newStatus = cat.status === "Active" ? "Inactive" : "Active";
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to toggle status.");
      setCategories(prev =>
        prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle status.");
    }
  };

  return {
    loading, error,
    search,  setSearch,
    status,  setStatus,
    sortKey, sortDir, handleSort,
    page,    setPage,
    filtered,
    totalProducts,
    activeCount,
    totalCategories,
    handleSave,
    handleDelete,
    handleToggleStatus,
  };
}
import { useEffect, useState, useMemo } from "react";
import { Product, ProductStatus } from "../components/pages/Admin/Product/ProductData";

type SortKey = "date" | "name" | "price" | "rating" | "category";
type SortDir = "asc" | "desc";

export function useAdminInventories() {
  const [inventories, setInventories] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [status, setStatus] = useState("All Status")
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [page, setPage] = useState(1)

  useEffect(() => {
     const token = localStorage.getItem("token")
    fetch(`${process.env.REACT_APP_API_URL}/products`, { headers: { Authorization: `Bearer ${ token }`}})
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products.")
        return res.json()
      })
      .then((data) => {
        const mapped: Product[] = data.data.map((p: any) => ({
          id:          p.id,
          name:        p.name,
          sku:         p.id.slice(0, 8).toUpperCase(),
          price:       p.price,
          category:    p.categoryId,
          addedDate:   p.createdAt,
          stock:       0,
          status:      "Active" as ProductStatus,
          rating:      p.rating ?? 0,
          image:       p.image ?? "🍷",
          description: p.description,
          volume:      p.volume,
          alcohol:     p.alcohol,
          createdAt:   p.createdAt,
        }))
        setInventories(mapped)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortKey(key); setSortDir("asc") }
    setPage(1)
  }

  const filtered = useMemo(() => {
    return inventories
      .filter((p) => {
        const q           = search.toLowerCase()
        const matchSearch = p.name.toLowerCase().includes(q)
        const matchCat    = category === "All Categories" || p.categoryId === category
        const matchStatus = status === "All Status" || p.status === status
        return matchSearch && matchCat && matchStatus
      })
      .sort((a, b) => {
        let cmp = 0
        switch (sortKey) {
          case "name":     cmp = a.name.localeCompare(b.name); break
          case "price":    cmp = a.price - b.price; break
          case "rating":   cmp = a.rating - b.rating; break
          case "category": cmp = a.categoryId.localeCompare(b.categoryId); break
          case "date":     cmp = new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime(); break
        }
        return sortDir === "asc" ? cmp : -cmp
      })
  }, [inventories, search, category, status, sortKey, sortDir])

  return {
    loading, error,
    search, setSearch,
    category, setCategory,
    status, setStatus,
    sortKey, sortDir, setSortDir, handleSort,
    page, setPage,
    filtered,
  }
}
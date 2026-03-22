import { useState, useMemo, useEffect } from "react";
import { Order, OrderStatus } from "../../src/components/pages/Admin/Order/OrderData";

export type FilterStatus = OrderStatus | "All Orders";

export function useAdminOrder() {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState<FilterStatus>("All Orders");
  const [selected, setSelected]   = useState<Order | null>(null);
  const [page, setPage]           = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        console.log("first order raw:", data.data[0]); // 👈 paste what you see here
        const mapped: Order[] = data.data.map((o: any) => ({
          id:            o.id,
          customer:      o.user?.userName      ?? "",
          email:         o.user?.email         ?? "",
          avatar:        o.user?.userName?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?",
          items:         o.items               ?? [],
          total:         o.total               ?? 0,
          status:        o.status              as OrderStatus,
          date:          o.createdAt           ?? "",
          address:       o.shippingAddress
            ? `${o.shippingAddress.street}, ${o.shippingAddress.city}` : "",
          paymentMethod: o.paymentMethod       ?? "",
        }));
        setOrderList(mapped);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return orderList.filter((o) => {
      const q           = search.toLowerCase();
      const matchSearch = o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.email.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All Orders" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orderList, search, statusFilter]);

  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrderList((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const handleDelete = (id: string) => {
    setOrderList((prev) => prev.filter((o) => o.id !== id));
    setSelected(null);
  };

  return {
    loading, error,
    search, setSearch,
    statusFilter, setStatus,
    selected, setSelected,
    page, setPage,
    filtered,
    handleStatusChange,
    handleDelete,
  };
}
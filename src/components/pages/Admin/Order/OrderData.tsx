export type OrderStatus = "Pending" | "In Progress" | "Completed" | "Cancelled";

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  avatar: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string;
  address: string;
  paymentMethod: string;
}
export type FilterStatus = OrderStatus | "All Orders";

export const STATUS_CONFIG: Record<OrderStatus, { bg: string; text: string; light: string; dot: string }> = {
  "Pending":     { bg: "bg-amber-500",  text: "text-amber-600",  light: "bg-amber-50",  dot: "fill-amber-500 text-amber-500"  },
  "In Progress": { bg: "bg-blue-500",   text: "text-blue-600",   light: "bg-blue-50",   dot: "fill-blue-500 text-blue-500"    },
  "Completed":   { bg: "bg-emerald-500",text: "text-emerald-600",light: "bg-emerald-50",dot: "fill-emerald-500 text-emerald-500"},
  "Cancelled":   { bg: "bg-rose-500",   text: "text-rose-600",   light: "bg-rose-50",   dot: "fill-rose-500 text-rose-500"    },
};

export const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-sky-100 text-sky-600",
  "bg-violet-100 text-violet-600",
];

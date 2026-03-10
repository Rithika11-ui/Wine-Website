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

export const orders: Order[] = [
  {
    id: "ORD-0041", customer: "Eleanor Shellstrop", email: "e.shell@napa.com", avatar: "ES",
    items: [{ name: "Château Margaux 2018", qty: 2, price: 320 }, { name: "Provence Rosé Reserve", qty: 1, price: 68 }],
    total: 708, status: "Completed", date: "2026-02-18", address: "14 Vine St, Napa, CA", paymentMethod: "Visa ···4242",
  },
  {
    id: "ORD-0042", customer: "Chidi Anagonye", email: "c.ana@ethics.edu", avatar: "CA",
    items: [{ name: "Dom Pérignon 2015", qty: 1, price: 580 }],
    total: 580, status: "In Progress", date: "2026-02-20", address: "22 Oak Ave, Chicago, IL", paymentMethod: "Mastercard ···8871",
  },
  {
    id: "ORD-0043", customer: "Tahani Al-Jamil", email: "tahani@luxury.uk", avatar: "TA",
    items: [{ name: "Macallan 18yr Single Malt", qty: 3, price: 420 }, { name: "Veuve Clicquot Brut NV", qty: 2, price: 72 }],
    total: 1404, status: "Pending", date: "2026-02-22", address: "1 Palace Rd, London, UK", paymentMethod: "Amex ···3009",
  },
  {
    id: "ORD-0044", customer: "Jason Mendoza", email: "j.mendo@jax.com", avatar: "JM",
    items: [{ name: "Barolo Riserva 2017", qty: 1, price: 145 }],
    total: 145, status: "Cancelled", date: "2026-02-15", address: "88 Beach Blvd, Jacksonville, FL", paymentMethod: "PayPal",
  },
  {
    id: "ORD-0045", customer: "Lina Chann", email: "lina.chann@mail.com", avatar: "LC",
    items: [{ name: "Puligny-Montrachet 2020", qty: 2, price: 185 }, { name: "Chablis Grand Cru 2021", qty: 1, price: 95 }],
    total: 465, status: "Completed", date: "2026-02-17", address: "5 Orchid Lane, Phnom Penh, KH", paymentMethod: "Visa ···7731",
  },
  {
    id: "ORD-0046", customer: "Dara Meas", email: "dara.meas@kh.com", avatar: "DM",
    items: [{ name: "Provence Rosé Reserve", qty: 4, price: 68 }],
    total: 272, status: "In Progress", date: "2026-02-23", address: "12 Riverside Dr, Siem Reap, KH", paymentMethod: "Visa ···2210",
  },
  {
    id: "ORD-0047", customer: "Phe Rithika", email: "user1@gmail.com", avatar: "PR",
    items: [{ name: "Château Margaux 2018", qty: 1, price: 320 }],
    total: 320, status: "Pending", date: "2026-02-24", address: "9 Lotus St, Battambang, KH", paymentMethod: "Cash on Delivery",
  },
];
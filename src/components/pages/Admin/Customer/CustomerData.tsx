export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  since: string;
  orders: number;
  revenue: string;
  status: "Active" | "Inactive";
  avatar: string;
}

export const customers: Customer[] = [
  { id: 1, name: "Phe Rithika",  phone: "0323556156", email: "user1@gmail.com",      since: "Jan 2026", orders: 3,  revenue: "$120.00",   status: "Active",   avatar: "PR" },
  { id: 2, name: "Gang Sovann",  phone: "0912345678", email: "gang@gmail.com",        since: "Jan 2026", orders: 0,  revenue: "$0.00",     status: "Inactive", avatar: "GS" },
  { id: 3, name: "Xeng Bopha",   phone: "0815510977", email: "xeng@gmail.com",        since: "Jan 2026", orders: 7,  revenue: "$840.00",   status: "Active",   avatar: "XB" },
  { id: 4, name: "Admin User",   phone: "N/A",        email: "admin@gmail.com",       since: "Jan 2026", orders: 0,  revenue: "$0.00",     status: "Inactive", avatar: "AU" },
  { id: 5, name: "Lina Chann",   phone: "0765432198", email: "lina.chann@mail.com",   since: "Feb 2026", orders: 12, revenue: "$2,340.00", status: "Active",   avatar: "LC" },
  { id: 6, name: "Dara Meas",    phone: "0987654321", email: "dara.meas@kh.com",      since: "Feb 2026", orders: 5,  revenue: "$450.00",   status: "Active",   avatar: "DM" },
];

export const avatarColors: string[] = [
  "bg-indigo-100 text-indigo-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-sky-100 text-sky-600",
  "bg-violet-100 text-violet-600",
];
export interface Customer {
  id: string;        
  name: string;
  phone: string;
  email: string;
  since: string;
  orders: number;
  revenue: string;
  status: "Active" | "Inactive";
  avatar: string;
  role: number;
  image: string;
}



export const avatarColors: string[] = [
  "bg-indigo-100 text-indigo-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-sky-100 text-sky-600",
  "bg-violet-100 text-violet-600",
];
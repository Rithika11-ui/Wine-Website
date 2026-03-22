export type ProductStatus = "Active" | "Draft" | "Out of Stock";

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  categoryId: string;
  addedDate: string;
  stock: number;
  volume: number;
  alcohol: number;
  status: ProductStatus;
  rating: number;
  image: string;
  createdAt: string;
}

export const CATEGORIES = ["All Categories", "Red Wine", "White Wine", "Rosé", "Sparkling", "Spirits"];
export const STATUSES = ["All Status", "Active", "Draft", "Out of Stock"];
export const SORT_OPTIONS = [
  { value: "date",     label: "Sort By: Date" },
  { value: "name",     label: "Sort By: Name" },
  { value: "price",    label: "Sort By: Price" },
  { value: "stock",    label: "Sort By: Stock" },
  { value: "rating",   label: "Sort By: Rating" },
  { value: "category", label: "Sort By: Category" },
];


// export const products: Product[] = [
//   { id: 1, name: "Château Margaux 2018",      sku: "CW-001", price: 320,  category: "Red Wine",   addedDate: "2026-01-15", stock: 24,  status: "Active",       rating: 4.9, image: "🍷" },
//   { id: 2, name: "Puligny-Montrachet 2020",   sku: "WW-012", price: 185,  category: "White Wine", addedDate: "2026-01-20", stock: 8,   status: "Active",       rating: 4.7, image: "🥂" },
//   { id: 3, name: "Provence Rosé Reserve",     sku: "RW-007", price: 68,   category: "Rosé",       addedDate: "2026-02-01", stock: 3,   status: "Active",       rating: 4.5, image: "🌸" },
//   { id: 4, name: "Dom Pérignon 2015",         sku: "SP-003", price: 580,  category: "Sparkling",  addedDate: "2026-01-05", stock: 0,   status: "Out of Stock", rating: 5.0, image: "✨" },
//   { id: 5, name: "Macallan 18yr Single Malt", sku: "ST-021", price: 420,  category: "Spirits",    addedDate: "2026-02-10", stock: 15,  status: "Active",       rating: 4.8, image: "🥃" },
//   { id: 6, name: "Barolo Riserva 2017",       sku: "CW-034", price: 145,  category: "Red Wine",   addedDate: "2026-01-28", stock: 6,   status: "Active",       rating: 4.6, image: "🍷" },
//   { id: 7, name: "Chablis Grand Cru 2021",    sku: "WW-018", price: 95,   category: "White Wine", addedDate: "2026-02-14", stock: 42,  status: "Draft",        rating: 4.3, image: "🥂" },
//   { id: 8, name: "Veuve Clicquot Brut NV",    sku: "SP-009", price: 72,   category: "Sparkling",  addedDate: "2026-02-18", stock: 30,  status: "Active",       rating: 4.6, image: "✨" },
// ];
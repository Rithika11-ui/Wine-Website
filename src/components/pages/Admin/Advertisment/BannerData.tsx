export type BannerStatus = "Active" | "Inactive";
export type BannerPage = "Home" | "Shop" | "Blog" | "About Us" | "Contact Us";
export type BannerPosition = "Hero Section" | "Top Bar" | "Sidebar" | "Footer" | "Popup" | "Mid Page";
export type BannerMediaType = "image" | "video";

export interface Banner {
  id: number;
  title: string;
  page: BannerPage;
  position: BannerPosition;
  status: BannerStatus;
  mediaType: BannerMediaType;
  mediaUrl: string;      
  startDate: string;     
  endDate: string;
  clicks: number;
  impressions: number;
}



export const PAGES: BannerPage[] = ["Home", "Shop", "Blog", "About Us", "Contact Us"];
export const POSITIONS: BannerPosition[] = ["Hero Section", "Top Bar", "Sidebar", "Footer", "Popup", "Mid Page"];

// Gradient colors used as placeholder visuals per page
export const PAGE_GRADIENTS: Record<BannerPage, string> = {
  "Home":       "from-indigo-500 via-blue-500 to-cyan-400",
  "Shop":       "from-emerald-500 via-teal-500 to-green-400",
  "Blog":       "from-amber-500 via-orange-500 to-yellow-400",
  "About Us":   "from-violet-500 via-purple-500 to-pink-400",
  "Contact Us": "from-rose-500 via-red-500 to-orange-400",
};

export const PAGE_COLORS: Record<BannerPage, { bg: string; text: string; light: string }> = {
  "Home":       { bg: "bg-indigo-500", text: "text-indigo-600", light: "bg-indigo-50" },
  "Shop":       { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50" },
  "Blog":       { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50" },
  "About Us":   { bg: "bg-violet-500", text: "text-violet-600", light: "bg-violet-50" },
  "Contact Us": { bg: "bg-rose-500", text: "text-rose-600", light: "bg-rose-50" },
};

export const banners: Banner[] = [
  { id: 1,  title: "Summer Wine Collection",   page: "Home",       position: "Hero Section", status: "Active",   mediaType: "image", mediaUrl: "", startDate: "2026-01-25", endDate: "2026-02-28", clicks: 1240, impressions: 18500 },
  { id: 2,  title: "Flash Sale — 30% Off",     page: "Shop",       position: "Top Bar",      status: "Active",   mediaType: "image", mediaUrl: "", startDate: "2026-02-01", endDate: "2026-02-15", clicks: 870,  impressions: 12300 },
  { id: 3,  title: "Wine Tasting Event",       page: "Blog",       position: "Sidebar",      status: "Inactive", mediaType: "image", mediaUrl: "", startDate: "2026-01-10", endDate: "2026-01-31", clicks: 340,  impressions: 5600  },
  { id: 4,  title: "Our Heritage Story",       page: "About Us",   position: "Mid Page",     status: "Active",   mediaType: "video", mediaUrl: "", startDate: "2026-02-05", endDate: "2026-03-05", clicks: 560,  impressions: 8900  },
  { id: 5,  title: "Get In Touch Campaign",    page: "Contact Us", position: "Hero Section", status: "Active",   mediaType: "image", mediaUrl: "", startDate: "2026-02-10", endDate: "2026-03-10", clicks: 430,  impressions: 7200  },
  { id: 6,  title: "Reserve Collection Promo", page: "Home",       position: "Popup",        status: "Inactive", mediaType: "image", mediaUrl: "", startDate: "2026-01-15", endDate: "2026-02-01", clicks: 920,  impressions: 15100 },
  { id: 7,  title: "Spring Arrivals",          page: "Shop",       position: "Hero Section", status: "Active",   mediaType: "image", mediaUrl: "", startDate: "2026-02-20", endDate: "2026-03-20", clicks: 280,  impressions: 4100  },
  { id: 8,  title: "Behind the Vineyard",      page: "Blog",       position: "Hero Section", status: "Active",   mediaType: "video", mediaUrl: "", startDate: "2026-02-14", endDate: "2026-03-14", clicks: 195,  impressions: 3300  },
  { id: 9,  title: "Footer Brand Banner",      page: "Home",       position: "Footer",       status: "Inactive", mediaType: "image", mediaUrl: "", startDate: "2026-01-01", endDate: "2026-01-20", clicks: 88,   impressions: 2200  },
];
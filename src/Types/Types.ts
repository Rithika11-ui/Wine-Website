
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  data: User;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  role: number;
  createdAt: string;
  // isActive: boolean;
}

export interface Wine {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: WineCategories;
  vintage?: number;
  region?: string;
  imageUrl: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface WineCategories {
    id: string,
    name: string,
    status:string
}
// "Red" | "White" | "Rosé" | "Sparkling" | "Dessert";

export interface WineFilters {
  category?: WineCategories;
  minPrice?: number;
  maxPrice?: number;
  region?: string;
  vintage?: number;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "rating";
  page?: number;
  pageSize?: number;
}

export interface CartItem {
  id: string;
  wineId: string;
  wine: Wine;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  itemCount: number;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

export interface OrderItem {
  id: string;
  wineId: string;
  wine: Wine;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user: User;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutRequest {
  shippingAddress: Address;
  paymentMethod: string;
  couponCode?: string;
  note?: string;
}

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Review {
  id: string;
  userId: string;
  user: User;
  wineId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewRequest {
  wineId: string;
  rating: number;
  comment: string;
}

export interface WishlistItem {
  id: string;
  wineId: string;
  wine: Wine;
  addedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "Order" | "Stock" | "Promotion" | "System";
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  pendingShipments: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
}

export interface RevenueChart {
  month: string;
  revenue: number;
  orders: number;
}

export interface OrderStats {
  completed: number;
  pending: number;
  inProgress: number;
  cancelled: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type DiscountType = "Percentage" | "FixedAmount";

export interface Coupon {
  id: string;
  code: string;                         
  discountType: DiscountType;            
  discountValue: number;                 
  minimumOrderAmount: number;            
  maximumDiscountAmount?: number;        
  startDate: string;
  expiryDate: string;
  isActive: boolean;
  usageLimit: number;                    
  usageCount: number;                    
  perUserLimit: number;                  
  applicableCategory?: WineCategories;    
  applicableWineIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApplyCouponRequest {
  code: string;
}

export interface ApplyCouponResponse {
  coupon: Coupon;
  discountAmount: number;              
  newTotal: number;                      
}


export type BannerPosition = "Home" | "Shop" | "Blog" | "All";

export interface UserBanner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
//   type: BannerType;
  position: BannerPosition;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  token: string;    // ✅ lowercase
  
}
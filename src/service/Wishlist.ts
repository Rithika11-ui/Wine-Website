// services/wishlist.service.ts
import api from "./Api";
import type { WishlistItem } from "../../Types/Types";

export const getWishlist = async (): Promise<WishlistItem[]> => {
  const res = await api.get<WishlistItem[]>("/wishlist");
  return res.data;
};

export const addToWishlist = async (wineId: string): Promise<WishlistItem> => {
  const res = await api.post<WishlistItem>("/wishlist", { wineId });
  return res.data;
};

export const removeFromWishlist = async (wineId: string): Promise<void> => {
  await api.delete(`/wishlist/${wineId}`);
};

export const isInWishlist = async (wineId: string): Promise<boolean> => {
  const res = await api.get<{ isWishlisted: boolean }>(`/wishlist/check/${wineId}`);
  return res.data.isWishlisted;
};
import api from "./Api";
import { UserBanner } from "../../Types/Types";

export const getBanners = async (): Promise<UserBanner[]> => {
  const res = await api.get<UserBanner[]>("/api/banner");
  return res.data;
};

export const getBannerById = async (id: string): Promise<UserBanner> => {
  const res = await api.get<UserBanner>(`/api/banner/${id}`);
  return res.data;
};

export const createBanner = async (data: FormData): Promise<UserBanner> => {
  const res = await api.post<UserBanner>("/api/banner", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateBanner = async (
  id: string,
  data: FormData
): Promise<UserBanner> => {
  const res = await api.patch<UserBanner>(`/api/banner/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteBanner = async (id: string): Promise<void> => {
  await api.delete(`/api/banner/${id}`);
};
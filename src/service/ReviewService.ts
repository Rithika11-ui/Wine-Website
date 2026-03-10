// services/review.service.ts
import { PaginatedResponse, Review, CreateReviewRequest } from "../Types/Types";
import api from "./Api";

//    USER

export const getWineReviews = async (
  wineId: string,
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse<Review>> => {
  const res = await api.get<PaginatedResponse<Review>>(`/wines/${wineId}/reviews`, {
    params: { page, pageSize },
  });
  return res.data;
};

export const createReview = async (data: CreateReviewRequest): Promise<Review> => {
  const res = await api.post<Review>("/reviews", data);
  return res.data;
};

export const updateReview = async (
  id: string,
  data: Partial<Pick<Review, "rating" | "comment">>
): Promise<Review> => {
  const res = await api.put<Review>(`/reviews/${id}`, data);
  return res.data;
};

export const deleteReview = async (id: string): Promise<void> => {
  await api.delete(`/reviews/${id}`);
};

//    ADMIN

export const adminGetAllReviews = async (params: {
  page?: number;
  pageSize?: number;
  wineId?: string;
} = {}): Promise<PaginatedResponse<Review>> => {
  const res = await api.get<PaginatedResponse<Review>>("/admin/reviews", { params });
  return res.data;
};

export const adminDeleteReview = async (id: string): Promise<void> => {
  await api.delete(`/admin/reviews/${id}`);
};
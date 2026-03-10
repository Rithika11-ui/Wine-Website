// services/dashboard.service.ts
import { DashboardStats, RevenueChart, OrderStats } from "../../Types/Types";
import api from "./Api";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const res = await api.get<DashboardStats>("/admin/dashboard/stats");
  return res.data;
};

export const getRevenueChart = async (
  period: "week" | "month" | "year" = "month"
): Promise<RevenueChart[]> => {
  const res = await api.get<RevenueChart[]>("/admin/dashboard/revenue", {
    params: { period },
  });
  return res.data;
};

export const getOrderStats = async (): Promise<OrderStats> => {
  const res = await api.get<OrderStats>("/admin/dashboard/order-stats");
  return res.data;
};


export const getNotifications = async (): Promise<Notification[]> => {
  const res = await api.get<Notification[]>("/notifications");
  return res.data;
};

export const markNotificationRead = async (id: string): Promise<void> => {
  await api.patch(`/notifications/${id}/read`);
};

export const markAllNotificationsRead = async (): Promise<void> => {
  await api.patch("/notifications/read-all");
};

export const deleteNotification = async (id: string): Promise<void> => {
  await api.delete(`/notifications/${id}`);
};
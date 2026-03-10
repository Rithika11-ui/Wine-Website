import { Coupon } from "../../Types/Types"
import api from "./Api"

export const getAllCoupon = async (): Promise<Coupon> => {
    const res = await api.get<Coupon>("/admin/coupon");
    return res.data;
}

export const getCouponById = async (id: string): Promise<Coupon> => {
    const res = await api.get(`/admin/coupon/${id}`)
    return res.data;
}

export const createCouponId = async (id: string, data: FormData): Promise<Coupon> => {
    const res = await api.post(`/admin/coupon`, { data: FormData })
    return res.data;
}

export const updateCouponId = async (id: string): Promise<Coupon> => {
    const res = await api.patch(`/admin/coupon/${id}`);
    return res.data;
}

export const deleteCoupon = async (id: string): Promise<Coupon> => {
    const res = await api.delete(`/admin/coupon/${id}`)
    return res.data;
}
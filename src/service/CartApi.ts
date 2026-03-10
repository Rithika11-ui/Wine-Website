import { Cart} from "../Types/Types";
import api from "./Api";

export const getCart = async (): Promise<Cart> => {
    const res = await api.get<Cart>("/admin/cart")
    return res.data;
}

export const getCartById = async (id: string): Promise<Cart> => {
    const res = await api.get(`/admin/cart/${id}`)
    return res.data;
}

export const createCart = async (id: string, data: FormData): Promise<Cart> => {
    const res = await api.post<Cart>("/admin/cart", { data: FormData });
    return res.data;
}

export const updateCart = async (id: string): Promise<Cart> => {
    const res = await api.patch<Cart>(`/admin/cart/${id}`)
    return res.data;
}

export const deleteCart = async (id: string): Promise<Cart> => {
    const res = await api.delete<Cart>(`/admin/cart/${id}`)
    return res.data
}


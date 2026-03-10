import { PaginatedResponse, Wine, WineFilters } from "../Types/Types";
import api from "./Api";

export const getProduct = async (filters: WineFilters ={}): Promise<PaginatedResponse<Wine>> => {
    const res = await api.get<PaginatedResponse<Wine>>("/api/products", { params: filters })
    return res.data;
};

export const getProductById = async (id: string): Promise<Wine> => {
    const res = await api.get<Wine>(`/api/products/${id}`);
    return res.data;

};

//    ADMIN — Protected routes

export const adminGetAllWine = async (filters: WineFilters = {}): Promise<PaginatedResponse<Wine>> => {
    const res = await api.get<PaginatedResponse<Wine>>("/api/products", { params: filters });
    return res.data;
};

export const adminCreateWine = async (data: FormData): Promise<Wine> => {
    const res = await api.post<Wine>("/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

export const adminUpdateWine = async (id: string, data: FormData): Promise<Wine> => {
    const res = await api.put<Wine>("/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

export const adminDeleteWine = async (id: string): Promise<void> => {
    await api.delete<Wine>(`/api/products/${id}`)
}

export const adminToggleWine = async (id: string): Promise<Wine> => {
    const res = await api.patch<Wine>(`/admin/wines/${id}/toggle-status`);
    return res.data;
}

export const adminUpdateStock = async(
    id: string, 
    stock: string,
): Promise<Wine> => {
    const res = await api.patch<Wine>(`/api/products/${id}/stock`, { stock });
    return res.data;
}
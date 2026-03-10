import { WineCategories } from "../Types/Types";
import api from "./Api"

export const getAllCategories = async (): Promise<WineCategories> => {
    const res = await api.get<WineCategories>("/admin/categories");
    return res.data;
}

export const getAllcategoriesById = async (id: string): Promise<WineCategories> => {
    const res = await api.get<WineCategories>(`/admin/categories/${id}`);
    return res.data;
}

export const UpdateCategories = async (id: string, name: string , status: string): Promise<WineCategories> => {
    const res = await api.patch<WineCategories>(`/admin/categories/${id}`)
    return res.data;
}

export const deleteCategories = async (id: string): Promise<WineCategories> => {
    const res = await api.delete<WineCategories>(`/admin/categories/${id}`);
    return res.data
}
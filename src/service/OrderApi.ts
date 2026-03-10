
import { CheckoutRequest, Order, OrderStatus, PaginatedResponse } from '../Types/Types';
import api from './Api';

export const placeOrder = async (data: CheckoutRequest): Promise<Order> => {
    const res = await api.post<Order>("/orders", data);
    return res.data;
};

export const getMyOrders = async (
    page = 1,
    pageSize = 10
): Promise<PaginatedResponse<Order>> => {
    const res = await api.get<PaginatedResponse<Order>>('/api/orders', { params: { page: pageSize } })
    return res.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
    const res = await api.get<Order>(`/api/orders/${id}`);
    return res.data;
};

export const cancelOrder = async (id: string): Promise<Order> => {
    const res = await api.delete<Order>(`/api/order/${id}`)
    return res.data;
};

//    ADMIN

export const adminGetOrders = async (params:
    {
        page?: number;
        pageSize?: number;
        status?: string;
        search?: string,
        from?: string;
        to?: string;
    } = {}): Promise<PaginatedResponse<Order>> => {
    const res = await api.get<PaginatedResponse<Order>>("/api/orders", { params })
    return res.data;
};

export const adminGetOrdersById = async (id: string): Promise<Order> => {
    const res = await api.get<Order>(`/admin/orders/${id}`)
    return res.data;
};

export const adminUpdateOrderStatus = async (id: string, status: OrderStatus, note?: string,): Promise<Order> => {
    const res = await api.patch<Order>(`/admin/orders/${id}`, { status: note })
    return res.data;
};

export const adminDeleteOrder = async (id: string): Promise<Order> => {
    const res = await api.delete<Order>(`/admin/orders/${id}`);
    return res.data;
}


    


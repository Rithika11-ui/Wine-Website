
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../Types/Types';
import api from './Api';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    localStorage.removeItem("token");
    const res = await api.post<AuthResponse>("/signin", data);
    console.log("Full response:", res.data);
    localStorage.setItem("token", res.data.token);
    // localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("users", JSON.stringify(res.data.data));
    return res.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/signup", data);
    localStorage.setItem("token", res.data.token);
    // localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("users", JSON.stringify(res.data.data));
    return res.data;
};

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout")
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("users");
};

//get current user
export const getMe = async (): Promise<User> => {
    const res = await api.get<User>("/auth/me");
    return res.data;
};

export const refreshToken = async (): Promise<{ token: string }> => {
    // const token = localStorage.getItem("refreshToken");
    // const res = await api.post<{ token: string }>("/auth/refresh", { refreshToken: token });
    // localStorage.setItem("token", res.data.token);
    // return res.data;
     const token = localStorage.getItem("token") ?? "";
    return { token };
};

export const forgotPassword = async (email: string): Promise<void> => {
    await api.post("/auth/forgot-password", { email });
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.put("/auth/change-password", { currentPassword, newPassword })
};

export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem("users");
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("token");
};

export const isAdmin = (): boolean => {
    const user = getCurrentUser();
    return user?.role === 0
};

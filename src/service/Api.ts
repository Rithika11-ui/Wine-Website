import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";


const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:5094',
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    const isAuthRoute = config.url === "/signin" || config.url === "/signup";

    if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use((res) => res, async(error:AxiosError) => {
    if (error.response?.status === 401) {
         const isAuthPage = window.location.pathname === "/signin" 
             || window.location.pathname === "/signup";
        
        if (!isAuthPage) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/signin";  
            
        }
}
return Promise.reject(error);
});

export default api


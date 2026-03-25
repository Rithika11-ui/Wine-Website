import { ReactNode, useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'
import api from '../service/Api'
import { getCurrentUser, logout } from '../service/AuthApi';
import { useNavigate } from 'react-router-dom';

type CartItem = {
    id: string,
    quantity: number;
    price: number;
}

type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    img: string;
    tag?: string;
}

const deliveryfee = 5;

const ENDPOINTS = [
    { path: "/products", setter: "setProducts" },
    // { path: "/orders",   setter: "setBlogs" },
    // { path: "/users/me", setter: "setUser" },
    // { path: "/payments", setter: "setUser" },
];

export const StoreContext = createContext<any>(null);

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const [cart,      setCart]      = useState<CartItem[]>([]);
    const [countItem, setCountItem] = useState(0);
    const [loading,   setLoading]   = useState(false);
    const [error,     setError]     = useState("");
    const [products,  setProducts]  = useState<Product[]>([]);
    const [blogs,     setBlogs]     = useState([]);
    const [user, setUser] = useState(() => getCurrentUser());
    console.log("user:", user);

    const url = process.env.REACT_APP_API_URL;

    const setters = useMemo<Record<string, (data: any) => void>>(() => ({
        setProducts,
        setBlogs,
        setUser,
    }), []);

    useEffect(() => {
        const fetchAll = async () => {
            const token = localStorage.getItem("token");
            if (!token || token === "undefined") return;

            setLoading(true);
            try {
                const responses = await Promise.all(
                    ENDPOINTS.map(({ path }) => api.get(path))
                );
                responses.forEach((res, i) => {
                    setters[ENDPOINTS[i].setter](res.data.data);
                });
            } catch (error) {
                console.error("Failed to fetch", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [setters]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addCount    = () => setCountItem((prev) => prev + 1);
    const removeCount = () => setCountItem((prev) => prev - 1);

    const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const addToCart = (product: CartItem) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (!exists) return [...prev, { ...product, quantity: 1 }];
            return prev.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        });
    };

    const updateProduct = (updatedProduct: CartItem) => {
        setCart((prev) => {
            const exist = prev.find(item => item.id === updatedProduct.id);
            if (!exist) { console.error("Product Not Found"); return prev; }
            return prev.map(item =>
                item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item
            );
        });
    };

    const removeProduct = (product: CartItem) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (!exists) { console.error("Product Not Found"); return prev; }
            return prev.filter(item => item.id !== product.id);
        });
    };

    const handleLogout = async () => {
        setError("");
        try {
            setLoading(true);
            await Promise.all([
                logout(),
                new Promise(resolve => setTimeout(resolve, 300))
            ]);
            navigate('/signin');
        } catch (error) {
            setError("Logout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const clearCart = () => setCart([]);

    const contextValue = {
        url,
        products,
        blogs,
        user,setUser,
        loading,
        error, setError,
        cart, setCart,
        countItem, setCountItem,
        addCount, removeCount,
        subTotal,
        addToCart,
        updateProduct,
        removeProduct,
        clearCart,
        deliveryfee,
        handleLogout,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
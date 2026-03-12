import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'
import api from '../service/Api'
import { logout } from '../service/AuthApi';
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

export const StoreContext = createContext<any>(null);

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [countItem, setCountItem] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    

    const url = "http://localhost:5059"

    // Fetch products only when logged in
    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem("token");
            if (!token || token === "undefined") return; // don't fetch if not logged in

            setLoadingProducts(true);
            try {
                const res = await api.get("/products");
                setProducts(res.data.data); // backend returns { success, message, data: [...] }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchProducts();
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addCount = () => {
        setCountItem((prev) => prev + 1);
    }

    const removeCount = () => {
        setCountItem((prev) => prev - 1);
    }

    const subTotal = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0)

    const addToCart = (product: CartItem) => {
        setCart((prev) => {
            const exists = prev.find((item: any) => item.id === product.id);
            if (!exists) {
                return [...prev, { ...product, quantity: 1 }];
            }
            return prev.map((item: any) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        });
    }

    const updateProduct = (updatedProduct: CartItem) => {
        setCart((prev) => {
            const exist = prev.find(item => item.id === updatedProduct.id);
            if (!exist) {
                console.error("Product Not Found");
                return prev;
            }
            return prev.map(item =>
                item.id === updatedProduct.id
                    ? { ...item, ...updatedProduct }
                    : item
            );
        });
    };

    const removeProduct = (removeProduct: CartItem) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === removeProduct.id)
            if (!exists) {
                console.error("Product Not Found");
                return prev;
            }
            return prev.filter(item => item.id !== removeProduct.id);
        })
    }

    const handleLogout = async () => {
        setError("");
        try {
            setLoading(true);
            await Promise.all([
                logout(),
                new Promise(resolve => (setTimeout(resolve, 300)))
            ]);
            // onClose();
            navigate('/signin');
            
        } catch (error) {
            setError("Logout failed. Please try again.");
        } finally {
            setLoading(false)
        }
    }
    

    const clearCart = () => setCart([]);

    const contextValue = {
        url,
        products,
        loadingProducts,
        cart,
        countItem,
        setCountItem,
        addCount,
        removeCount,
        subTotal,
        addToCart,
        setCart,
        updateProduct,
        removeProduct,
        clearCart,
        deliveryfee,
        handleLogout,
        loading,
        setError,
        error,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
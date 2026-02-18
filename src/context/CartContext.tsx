import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Producto } from '../types';

interface CartItem extends Producto {
    cantidad: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Producto, quantity?: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    // 1. Inicialización: Leemos de localStorage una sola vez al arrancar
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart_aroma_zen');
        try {
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Error al cargar el carrito:", error);
            return [];
        }
    });

    // 2. Persistencia: Cada vez que el carrito cambie, lo guardamos en localStorage
    useEffect(() => {
        localStorage.setItem('cart_aroma_zen', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Producto, quantity: number = 1) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, cantidad: item.cantidad + quantity } : item
                );
            }
            return [...prev, { ...product, cantidad: quantity }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart_aroma_zen');
    };

    const total = cart.reduce((acc, item) => acc + (Number(item.precio) * item.cantidad), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
    return context;
};
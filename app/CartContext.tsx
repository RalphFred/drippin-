"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl: string;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const isExistingItem = prevItems.find(i => i.id === item.id);

      let updatedCart;
      if (isExistingItem) {
        updatedCart = prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        updatedCart = [...prevItems, item];
      }

      // Sync with localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const updatedCart = prevItems.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]); 
    localStorage.removeItem("cart"); 
  };

  const updateCartItem = (id: string, quantity: number) => {
    setCartItems(prevItems => {
      const updatedCart = prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

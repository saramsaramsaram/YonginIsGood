import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("yongin_goods_cart") || "[]");
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);
  const prevCartCountRef = useRef(0);

  useEffect(() => {
    localStorage.setItem("yongin_goods_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setToast(`🛒 ${cartCount - prevCartCountRef.current}개 담겼어요!`);
      const timer = setTimeout(() => setToast(null), 2500);
      prevCartCountRef.current = cartCount;
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  const validateStock = (item, quantity) => {
    if (quantity > item.stock) {
      alert(`죄송합니다. 현재 재고(${item.stock}개)를 초과하여 담을 수 없습니다.`);
      return false;
    }
    return true;
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === product.id);
      const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

      if (!validateStock(product, newQuantity)) return prev;

      return existingItem
        ? prev.map((i) => (i.id === product.id ? { ...i, quantity: newQuantity } : i))
        : [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    
    setCartItems((prev) => 
      prev.map((item) => {
        if (item.id !== id) return item;
        return validateStock(item, quantity) ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, 
      clearCart, cartCount, cartTotal, toast, handleToastClose: () => setToast(null)
    }}>
      {children}
    </CartContext.Provider>
  );
};
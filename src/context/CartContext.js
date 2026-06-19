import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const CartContext = createContext();
const CART_STORAGE_KEY = "yongin_goods_cart";

// 가격을 항상 숫자로 정규화 (옛 데이터의 "10,000" 같은 문자열도 처리)
const normalizePrice = (price) => {
  if (typeof price === "number") return price;
  const parsed = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
      // 옛 형식(문자열 가격 등)으로 저장된 항목을 정리
      return stored
        .filter((item) => item && item.id != null)
        .map((item) => ({ ...item, price: normalizePrice(item.price) }));
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);
  const prevCartCountRef = useRef(0);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
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
    const normalized = { ...product, price: normalizePrice(product.price) };
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === normalized.id);
      const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

      if (!validateStock(normalized, newQuantity)) return prev;

      return existingItem
        ? prev.map((i) => (i.id === normalized.id ? { ...i, quantity: newQuantity } : i))
        : [...prev, { ...normalized, quantity }];
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
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "confida_cart_v1";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, qty, product }]

  // ✅ Load once on first mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved = raw ? safeParse(raw, []) : [];
    if (Array.isArray(saved)) setItems(saved);
  }, []);

  // ✅ Save whenever cart changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, qty = 1) => {
    if (!product?.id) return;

    setItems((prev) => {
      const existing = prev.find((x) => x.id === product.id);
      if (existing) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + qty } : x
        );
      }
      return [...prev, { id: product.id, qty, product }];
    });
  };

  const updateQty = (id, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((x) => x.id !== id);
      return prev.map((x) => (x.id === id ? { ...x, qty } : x));
    });
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const clearCart = () => setItems([]);

  const cartCount = useMemo(
    () => items.reduce((sum, x) => sum + (Number(x.qty) || 0), 0),
    [items]
  );

  const cartTotal = useMemo(
    () =>
      items.reduce(
        (sum, x) => sum + (Number(x.qty) || 0) * (Number(x.product?.price) || 0),
        0
      ),
    [items]
  );

  const value = useMemo(
    () => ({ items, addToCart, updateQty, removeFromCart, clearCart, cartCount, cartTotal }),
    [items, cartCount, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/app/data/products";

const STORAGE_KEY = "confida_cart_v1";

/* ---------- TYPES ---------- */

export type CartItem = {
  id: string;
  variantKey: string;
  selectedColor: string; // always present ("" if none)
  qty: number;
  product: Product;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, qty?: number, selectedColor?: string) => void;
  updateQty: (variantKey: string, qty: number) => void;
  removeFromCart: (variantKey: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

/* ---------- CONTEXT ---------- */

const CartContext = createContext<CartContextType | null>(null);

/* ---------- HELPERS ---------- */

function safeParse<T>(json: string, fallback: T): T {
  try {
    const v = JSON.parse(json) as T;
    return (v ?? fallback) as T;
  } catch {
    return fallback;
  }
}

function clampQty(n: unknown): number {
  const num = Number(n);
  if (!Number.isFinite(num)) return 1;
  return Math.max(1, Math.min(99, Math.floor(num)));
}

function normalizeColor(c: unknown): string {
  return String(c ?? "").trim();
}

type MaybeCartItem = CartItem | null;
function isCartItem(x: MaybeCartItem): x is CartItem {
  return x !== null;
}

/* ---------- PROVIDER ---------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart once
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved = raw ? safeParse<unknown>(raw, []) : [];

    if (!Array.isArray(saved)) return;

    const cleaned: CartItem[] = (saved as any[])
      .map((x: any): MaybeCartItem => {
        const product = x?.product as Product | undefined;
        const id = String(x?.id ?? product?.id ?? "").trim();
        if (!id || !product) return null;

        const selectedColor = normalizeColor(x?.selectedColor);
        const variantKey = String(x?.variantKey ?? `${id}:${selectedColor}`).trim();
        const qty = clampQty(x?.qty);

        return { id, variantKey, selectedColor, qty, product };
      })
      .filter(isCartItem);

    setItems(cleaned);
  }, []);

  // Save cart
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, qty = 1, selectedColor = "") => {
    if (!product?.id) return;

    const cleanColor = normalizeColor(selectedColor);
    const safeQty = clampQty(qty);
    const variantKey = `${product.id}:${cleanColor}`;

    setItems((prev) => {
      const existing = prev.find((x) => x.variantKey === variantKey);

      if (existing) {
        return prev.map((x) =>
          x.variantKey === variantKey
            ? { ...x, qty: clampQty(x.qty + safeQty) }
            : x
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          variantKey,
          selectedColor: cleanColor,
          qty: safeQty,
          product,
        },
      ];
    });
  };

  const updateQty = (variantKey: string, qty: number) => {
    const q = Number.isFinite(Number(qty)) ? Math.floor(Number(qty)) : 1;

    setItems((prev) => {
      if (q <= 0) return prev.filter((x) => x.variantKey !== variantKey);
      return prev.map((x) =>
        x.variantKey === variantKey ? { ...x, qty: clampQty(q) } : x
      );
    });
  };

  const removeFromCart = (variantKey: string) => {
    setItems((prev) => prev.filter((x) => x.variantKey !== variantKey));
  };

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

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [items, cartCount, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ---------- HOOK ---------- */

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/app/data/products";

type Props = {
  product: Product;
  color?: string; // optional if you use colors
};

export default function AddToCartButton({ product, color }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const selectedColor = color ?? product.colors?.[0] ?? "";
    addToCart(product, 1, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="w-full rounded-2xl bg-[#dda0dd] py-2.5 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30"
    >
      {added ? "Added ✅" : "Add to cart"}
    </button>
  );
}

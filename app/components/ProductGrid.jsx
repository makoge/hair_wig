"use client";

import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";

export default function ProductGrid({ filter }) {
  const { addToCart } = useCart();

  const [selectedById, setSelectedById] = useState({}); // { [productId]: "#hex" }

  const onSelectColor = (id, color) => {
    setSelectedById((prev) => ({ ...prev, [id]: color }));
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filter === "lace") return p.category === "lace";
      if (filter === "stock") return p.inStock;
      return true;
    });
  }, [filter]);

  const onAdd = (product, activeColor) => {
    addToCart({ ...product, selectedColor: activeColor || product.colors?.[0] || "" }, 1);
  };

  return (
    <div className="product-grid">
      {filtered.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          selectedColor={selectedById[p.id]}
          onSelectColor={onSelectColor}
          onAddToCart={onAdd}
        />
      ))}
    </div>
  );
}

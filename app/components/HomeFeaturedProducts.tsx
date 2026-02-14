"use client";

import { useMemo } from "react";
import { products, type Product } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";
import { useCart } from "@/app/context/CartContext";

const FEATURED_BADGES = new Set<string>([
  "Hot",
  "Best Seller",
  "New",
  "Limited",
]);

export default function HomeFeaturedProducts(){
  const { addToCart } = useCart();

  const featured: Product[] = useMemo(() => {
    return products
      .filter(
        (p): p is Product =>
          Boolean(p.badge) && FEATURED_BADGES.has(p.badge as string)
      )
      .slice(0, 10);
  }, []);

  if (!featured.length) {
    return null; // avoids empty carousel rendering
  }

  return (
    <div
      className="sc-track flex gap-6 overflow-x-auto scroll-smooth"
      tabIndex={0}
      aria-live="polite"
    >
      {featured.map((p) => (
        <div
          key={p.id}
          className="sc-card min-w-[260px] flex-shrink-0"
        >
          <ProductCard
            product={p}
            onAddToCart={() => addToCart(p, 1)}
          />
        </div>
      ))}
    </div>
  );
}

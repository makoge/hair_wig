"use client";

import { products } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";
import { useCart } from "@/app/context/CartContext";

export default function HomeFeaturedProducts() {
  const { addToCart } = useCart();

  const featured = products
    .filter((p) => ["Hot", "Best seller", "New", "Limited"].includes(p.badge))
    .slice(0, 10);

  return (
    <div className="sc-track" tabIndex={0} aria-live="polite">
      {featured.map((p) => (
        <div className="sc-card" key={p.id}>
          <ProductCard product={p} onAddToCart={() => addToCart(p, 1)} />
        </div>
      ))}
    </div>
  );
}

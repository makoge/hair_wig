"use client";

import type { Product } from "@/app/data/products";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  className?: string;
};

export default function ProductGrid({ products, className }: Props) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-black text-[#363434]">No products found</h2>
        <p className="mt-2 text-sm font-semibold text-[#363434]/70">
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <section
      className={[
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className ?? "",
      ].join(" ")}
      aria-label="product grid"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

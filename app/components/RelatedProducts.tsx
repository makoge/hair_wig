"use client";

import { useTranslations } from "next-intl";
import type { Product } from "@/app/data/products";
import ProductCard from "./ProductCard";

type Props = {
  current: Product;
  products: Product[];
};

export default function RelatedProducts({ current, products }: Props) {
  const t = useTranslations("relatedProducts");

  const related = products
    .filter((p) => p.id !== current.id && p.category === current.category && p.inStock)
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section
      className="mt-16 border-t border-black/10 pt-12"
      aria-labelledby="related-products-heading"
    >
      <div className="mb-8 flex items-end justify-between gap-3">
        <h2
          id="related-products-heading"
          className="text-2xl font-black tracking-tight text-[#363434]"
        >
          {t("title")}
        </h2>

        <span className="text-sm font-semibold text-[#363434]/60">
          {t("subtitle")}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { products } from "@/app/data/products";
import ProductGrid from "@/app/components/ProductGrid";

export default function ShopClient() {
  const t = useTranslations("shop");
  const [filter, setFilter] = useState("all");

  const filtered = products.filter((p) => {
    if (filter === "lace") return p.category === "lace";
    if (filter === "stock") return p.inStock;
    return true;
  });

  return (
    <main>
      <div className="shop-head">
        <h1>{t("title")}</h1>

        <div className="shop-toolbar">
          <button
            type="button"
            className={`chip ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            {t("all")}
          </button>

          <button
            type="button"
            className={`chip ${filter === "lace" ? "active" : ""}`}
            onClick={() => setFilter("lace")}
          >
            {t("lace")}
          </button>

          <button
            type="button"
            className={`chip ${filter === "stock" ? "active" : ""}`}
            onClick={() => setFilter("stock")}
          >
            {t("stock")}
          </button>
        </div>
      </div>

      <ProductGrid products={filtered} />
    </main>
  );
}

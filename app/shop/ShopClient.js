"use client";

import { useState } from "react";
import { products } from "../data/products";
import ProductGrid from "../components/ProductGrid";




export default function ShopClient() {
  const [filter, setFilter] = useState("all");

  const filtered = products.filter((p) => {
    if (filter === "lace") return p.category === "lace";
    if (filter === "stock") return p.inStock;
    return true;
  });

  return (
    <main>
      <div className="shop-head">
        <h1>Confida Shop</h1>

        <div className="shop-toolbar">
          <button
            type="button"
            className={`chip ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            className={`chip ${filter === "lace" ? "active" : ""}`}
            onClick={() => setFilter("lace")}
          >
            Lace front
          </button>

          <button
            type="button"
            className={`chip ${filter === "stock" ? "active" : ""}`}
            onClick={() => setFilter("stock")}
          >
            In stock
          </button>
        </div>
      </div>

      <ProductGrid products={filtered} />
    </main>
  );
}

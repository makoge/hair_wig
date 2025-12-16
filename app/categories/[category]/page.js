import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import ProductGrid from "@/app/components/ProductGrid";

const LABELS = {
  human: "Human Hair",
  lace: "Lace Wig",
  monofilament: "Monofilament",
  accessories: "Accessories",
};

export default async function CategoryPage({ params }) {
  const p = params?.then ? await params : params;
  const category = p?.category;

  const filtered = products.filter((x) => x.category === category);
  if (!filtered.length) return notFound();

  return (
    <main>
      <div className="shop-head">
        <h1>{LABELS[category] ?? category}</h1>
      </div>

      <ProductGrid products={filtered} />
    </main>
  );
}

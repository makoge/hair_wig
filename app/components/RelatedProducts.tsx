import type { Product } from "@/app/data/products";
import ProductCard from "./ProductCard";

type Props = {
  current: Product;
  products: Product[];
};

export default function RelatedProducts({ current, products }: Props) {
  const related = products
    .filter(
      (p) =>
        p.id !== current.id &&
        p.category === current.category &&
        p.inStock
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section
      className="mt-16 border-t border-white/10 pt-12"
      aria-labelledby="related-products-heading"
    >
      <div className="mb-8 flex items-end justify-between">
        <h2
          id="related-products-heading"
          className="text-2xl font-black tracking-tight text-white"
        >
          Related Products
        </h2>

        <span className="text-sm font-semibold text-white/60">
          You may also like
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {related.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

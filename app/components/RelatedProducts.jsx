import ProductCard from "./ProductCard";
import HomeFeaturedProducts from "./HomeFeaturedProducts";

export default function RelatedProducts({ current, products }) {
  const related = products
    .filter((p) => p.id !== current.id && p.category === current.category)
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="rel-wrap">
      <h2 className="rel-title">Related products</h2>
      <div className="product-grid">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

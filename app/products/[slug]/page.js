import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import Lightbox from "@/app/components/Lightbox";
import Reviews from "@/app/components/Reviews";
import RelatedProducts from "@/app/components/RelatedProducts";
import ProductDetailsClient from "@/app/components/ProductDetailsClient";


export default async function ProductDetailsPage({ params }) {
  // fixes your “params is a Promise” issue on some setups
  const p = params?.then ? await params : params;
  const slug = p?.slug;

  const product = products.find((x) => x.slug === slug);
  if (!product) return notFound();

  const imgs = product.images?.length ? product.images : [product.image];
  const price = Number(product.price || 0);

  // SEO JSON-LD (simple + effective)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: imgs,
    sku: product.id,
    brand: { "@type": "Brand", name: "Confida" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: price.toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `/products/${product.slug}`,
    },
    aggregateRating: product.reviews?.length
      ? {
          "@type": "AggregateRating",
          ratingValue:
            (
              product.reviews.reduce((s, r) => s + (r.rating || 0), 0) /
              product.reviews.length
            ).toFixed(1),
          reviewCount: product.reviews.length,
        }
      : undefined,
  };

  return (
    <main className="pd-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pd-grid">
        <div>
          <Lightbox images={imgs} />
        </div>

        <div className="pd-info">
          <h1 className="pd-title">{product.name}</h1>
          <div className="pd-price">€{price.toFixed(2)}</div>

          <div className="pd-meta">
            {product.length && <span>{product.length}</span>}
            {product.texture && <span>• {product.texture}</span>}
            {product.capType && <span>• {product.capType}</span>}
            <span className={`pd-stock ${product.inStock ? "ok" : ""}`}>
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <ProductDetailsClient product={product} />

          <div className="pd-desc">
            <h3>Details</h3>
            <p>
              Premium hair, natural look, comfortable fit, easy styling. (Add a longer unique
              paragraph here for SEO — it helps.)
            </p>
          </div>
        </div>
      </section>

      <Reviews product={product} />
      <RelatedProducts current={product} products={products} />
    </main>
  );
}
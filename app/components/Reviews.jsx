export default function Reviews({ product }) {
  const reviews = product.reviews || [];
  if (!reviews.length) return null;

  const avg =
    reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images?.length ? product.images : [product.image],
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: String(product.price),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
    },
    review: reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewRating: { "@type": "Rating", ratingValue: r.rating },
      name: r.title,
      reviewBody: r.body,
    })),
  };

  return (
    <section className="rev-wrap">
      <h2 className="rev-title">Customer reviews</h2>
      <div className="rev-summary">
        <span className="rev-score">{avg.toFixed(1)} / 5</span>
        <span className="rev-count">({reviews.length} reviews)</span>
      </div>

      <div className="rev-list">
        {reviews.map((r) => (
          <article key={r.id} className="rev-card">
            <div className="rev-top">
              <div className="rev-author">{r.author}</div>
              <div className="rev-rating">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            </div>
            <div className="rev-title2">{r.title}</div>
            <p className="rev-body">{r.body}</p>
            <div className="rev-foot">
              <span>{r.date}</span>
              {r.verified ? <span className="rev-verified">Verified purchase</span> : null}
            </div>
          </article>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

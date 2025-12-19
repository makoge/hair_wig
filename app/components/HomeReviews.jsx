import Link from "next/link";
import { products } from "@/app/data/products";

function Stars({ rating = 0 }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return <span aria-label={`${full} stars`}>{"★★★★★".slice(0, full)}{"☆☆☆☆☆".slice(0, 5 - full)}</span>;
}

export default function HomeReviews() {
  const all = products.flatMap((p) =>
    (p.reviews || []).map((r) => ({ ...r, product: p }))
  );

  const latest = all
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  if (!latest.length) return null;

  return (
    <section className="pd-wrap" aria-label="customer reviews">
      <h2>Customer Reviews</h2>

      <div className="pd-grid">
        {latest.map((r) => (
          <div className="pd-info" key={`${r.product.id}-${r.id}`}>
            <div className="" style={{ justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>{r.title}</h3>
              <span style={{ opacity: 0.9 }}>
                <Stars rating={r.rating} />
              </span>
            </div>

            <p style={{ marginTop: 10 }}>{r.body}</p>

            <p style={{ marginTop: 10, opacity: 0.8 }}>
              — {r.author} •{" "}
              <Link href={`/products/${r.product.slug}`} style={{ textDecoration: "underline" }}>
                {r.product.name}
              </Link>
              {r.verified ? " • Verified" : ""}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/app/data/products";

function Stars({ rating = 0 }) {
  const full = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  return (
    <span aria-label={`${full} stars`}>
      {"★★★★★".slice(0, full)}
      {"☆☆☆☆☆".slice(0, 5 - full)}
    </span>
  );
}

export default function HomeReviews() {
  const [reviews, setReviews] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/reviews/latest", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed");
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch (e) {
        setErr(String(e.message || e));
      }
    })();
  }, []);

  const latest = useMemo(() => {
    return reviews
      .map((r) => {
        const product = products.find((p) => String(p.id) === String(r.product_id));
        return { ...r, product };
      })
      .filter((r) => r.product); // only show if product exists
  }, [reviews]);

  if (err) return null;
  if (!latest.length) return null;

  return (
    <section className="pd-wrap" aria-label="customer reviews">
      <h2>Customer Reviews</h2>

      <div className="pd-grid">
        {latest.map((r) => (
          <div className="pd-info" key={r.id}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <h3 style={{ margin: 0 }}>{r.name}</h3>
              <span style={{ opacity: 0.9 }}>
                <Stars rating={r.rating} />
              </span>
            </div>

            <p style={{ marginTop: 10 }}>{r.comment}</p>

            <p style={{ marginTop: 10, opacity: 0.8 }}>
              —{" "}
              <Link href={`/products/${r.product.slug}`} style={{ textDecoration: "underline" }}>
                {r.product.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

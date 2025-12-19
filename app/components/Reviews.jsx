"use client";

import { useEffect, useMemo, useState } from "react";

function Stars({ value, onChange, disabled }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={disabled}
          onClick={() => onChange?.(n)}
          aria-label={`${n} star`}
          style={{
            background: "transparent",
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            fontSize: 20,
            lineHeight: 1,
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {n <= value ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

export default function Reviews({ product }) {
  const productId = product?.id; // ✅ this is what we store in DB
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const avg = useMemo(() => {
    if (!reviews.length) return null;
    const s = reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
    return (s / reviews.length).toFixed(1);
  }, [reviews]);

  async function load() {
    if (!productId) return;
    const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`, { cache: "no-store" });
    const data = await res.json();
    if (data?.ok) setReviews(data.reviews || []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  async function submit(e) {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, name, rating, comment }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus(data?.error || "Failed");
        return;
      }

      setStatus("Thanks! Your review was added.");
      setName("");
      setRating(5);
      setComment("");
      await load();
    } catch {
      setStatus("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="reviews-wrap">
      <h2>Reviews</h2>

      {avg && (
        <p style={{ marginTop: 6 }}>
          <b>{avg}</b> / 5 ({reviews.length} review{reviews.length === 1 ? "" : "s"})
        </p>
      )}

      <form onSubmit={submit} style={{ marginTop: 14, display: "grid", gap: 10, maxWidth: 520 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="input"
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Rating</span>
          <Stars value={rating} onChange={setRating} disabled={loading} />
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
          rows={4}
          className="textarea"
        />

        <button type="submit" disabled={loading} className="btn-product">
          {loading ? "Sending..." : "Submit review"}
        </button>

        {status && <div style={{ color: "#ff4081" }}>{status}</div>}
      </form>

      <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="review-card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <b>{r.name}</b>
                <span>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
              </div>
              <p style={{ marginTop: 6 }}>{r.comment}</p>
              <small style={{ opacity: 0.7 }}>
                {r.created_at ? new Date(r.created_at).toLocaleString() : ""}
              </small>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

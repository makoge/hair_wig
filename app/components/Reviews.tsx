"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/app/data/products";

type ReviewRow = {
  id: string | number;
  product_id?: string;
  name: string;
  rating: number;
  comment: string;
  created_at?: string | null;
};

type Props = {
  product: Product;
};

type Status =
  | { kind: "idle" }
  | { kind: "error"; msg: string }
  | { kind: "success"; msg: string };

function clampRating(n: unknown): number {
  const r = Math.round(Number(n) || 0);
  return Math.max(1, Math.min(5, r));
}

function Stars({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            disabled={disabled}
            onClick={() => onChange(n)}
            aria-label={`${n} star`}
            className={[
              "text-xl leading-none transition",
              disabled ? "cursor-not-allowed opacity-60" : "hover:-translate-y-0.5",
              active ? "text-[#dda0dd]" : "text-black/30 hover:text-black/60",
            ].join(" ")}
          >
            {active ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
}

export default function Reviews({ product }: Props) {
  const productId = product?.id;

  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const avg = useMemo(() => {
    if (!reviews.length) return null;
    const s = reviews.reduce((sum, r) => sum + clampRating(r.rating), 0);
    return (s / reviews.length).toFixed(1);
  }, [reviews]);

  const load = async () => {
    if (!productId) return;
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`, {
        cache: "no-store",
      });
      const data = (await res.json()) as { ok?: boolean; reviews?: ReviewRow[]; error?: string };

      if (!res.ok || !data?.ok) {
        setStatus({ kind: "error", msg: data?.error || "Failed to load reviews." });
        return;
      }
      setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      setStatus({ kind: "idle" });
    } catch {
      setStatus({ kind: "error", msg: "Network error while loading reviews." });
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productId) return;

    setStatus({ kind: "idle" });
    setLoading(true);

    try {
      const payload = {
        productId,
        name: name.trim(),
        rating: clampRating(rating),
        comment: comment.trim(),
      };

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setStatus({ kind: "error", msg: data?.error || "Failed to submit review." });
        return;
      }

      setStatus({ kind: "success", msg: "Thanks! Your review was added." });
      setName("");
      setRating(5);
      setComment("");
      await load();
    } catch {
      setStatus({ kind: "error", msg: "Network error while submitting." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-14 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-[#363434]">Reviews</h2>

          {avg ? (
            <p className="mt-1 text-sm font-semibold text-[#363434]/70">
              <span className="text-[#363434] font-extrabold">{avg}</span> / 5 •{" "}
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </p>
          ) : (
            <p className="mt-1 text-sm font-semibold text-[#363434]/60">
              No reviews yet — be the first.
            </p>
          )}
        </div>

        <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-extrabold text-[#363434]/70">
          {product.name}
        </span>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="mt-6 grid gap-3 sm:max-w-xl">
        <div className="grid gap-2">
          <label className="text-xs font-extrabold text-[#363434]/70" htmlFor="review-name">
            Your name
          </label>
          <input
            id="review-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-11 rounded-2xl border border-black/15 bg-white px-4 text-sm font-semibold text-[#363434] placeholder:text-black/35 outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-black/5 px-4 py-3">
          <span className="text-sm font-extrabold text-[#363434]/80">Rating</span>
          <Stars value={rating} onChange={setRating} disabled={loading} />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-extrabold text-[#363434]/70" htmlFor="review-comment">
            Your review
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            placeholder="Write your review..."
            className="rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-[#363434] placeholder:text-black/35 outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-[#dda0dd] px-5 py-3 text-sm font-extrabold text-black shadow-sm transition hover:-translate-y-0.5 hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Submit review"}
        </button>

        {status.kind !== "idle" ? (
          <p
            className={[
              "mt-1 text-sm font-bold",
              status.kind === "success" ? "text-emerald-700" : "text-rose-700",
            ].join(" ")}
            role="status"
            aria-live="polite"
          >
            {status.msg}
          </p>
        ) : null}
      </form>

      {/* List */}
      <div className="mt-8 grid gap-3">
        {!reviews.length ? (
          <p className="text-sm font-semibold text-[#363434]/60">No reviews yet.</p>
        ) : (
          reviews.map((r) => {
            const rr = clampRating(r.rating);
            const date = r.created_at ? new Date(r.created_at) : null;
            const dateText = date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : "";

            return (
              <article
                key={String(r.id)}
                className="rounded-2xl border border-black/10 bg-black/5 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-[#363434]">{r.name}</p>
                    {dateText ? (
                      <p className="mt-0.5 text-xs font-semibold text-[#363434]/50">
                        {dateText}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-sm font-black text-[#dda0dd]" aria-label={`${rr} stars`}>
                    {"★".repeat(rr)}
                    <span className="text-black/25">{"☆".repeat(5 - rr)}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm font-semibold leading-6 text-[#363434]/80">
                  {r.comment}
                </p>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}


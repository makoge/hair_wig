"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { products, type Product } from "@/app/data/products";

type ReviewApiItem = {
  id: string | number;
  product_id: string | number;
  name: string;
  rating: number | string;
  comment: string;
  created_at?: string;
};

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div
      className="inline-flex items-center gap-1"
      aria-label={`${full} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < full ? "text-[#ffd166]" : "text-white/25"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-xs font-bold text-white/65">
        {full.toFixed(1)}
      </span>
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur">
      <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
      <div className="mt-3 h-4 w-40 animate-pulse rounded bg-white/10" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-white/10" />
        <div className="h-3 w-11/12 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-9/12 animate-pulse rounded bg-white/10" />
      </div>
      <div className="mt-4 h-3 w-48 animate-pulse rounded bg-white/10" />
    </div>
  );
}

/**
 * next-intl throws if a namespace is missing.
 * This wrapper prevents runtime crashes and gives you safe fallbacks.
 */
function useSafeTranslations(namespace: string) {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = useTranslations(namespace);
    return (key: string, fallback: string) => {
      try {
        return t(key) as string;
      } catch {
        return fallback;
      }
    };
  } catch {
    return (_key: string, fallback: string) => fallback;
  }
}

export default function HomeReviews() {
  const locale = useLocale();
  const tt = useSafeTranslations("reviews");

  const [reviews, setReviews] = useState<ReviewApiItem[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setStatus("loading");
        const res = await fetch("/api/reviews/latest", { cache: "no-store" });
        const data = (await res.json()) as {
          reviews?: ReviewApiItem[];
          error?: string;
        };

        if (!res.ok) throw new Error(data?.error || "Failed to load reviews");

        if (!alive) return;
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
        setStatus("ready");
      } catch (e) {
        if (!alive) return;
        setStatus("error");
        setErr(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const latest = useMemo(() => {
    return reviews
      .map((r) => {
        const product = products.find((p) => String(p.id) === String(r.product_id));
        const ratingNum = Number(r.rating) || 0;
        return { ...r, ratingNum, product: product as Product | undefined };
      })
      .filter(
        (r): r is ReviewApiItem & { ratingNum: number; product: Product } =>
          Boolean(r.product)
      );
  }, [reviews]);

  return (
    <section
      id="reviews"
      className="mx-auto max-w-6xl px-4 py-10"
      aria-label="customer reviews"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#363434]">
            {tt("title", "Customer Reviews")}
          </h2>
          <p className="mt-1 text-sm font-semibold text-[#363434]/70">
            {tt("subtitle", "Latest feedback from Confida shoppers.")}
          </p>
        </div>

        <Link
          href={`/${locale}/#reviews`}
          className="hidden rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-extrabold text-[#363434] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
        >
          {tt("viewAll", "See all")}
        </Link>
      </div>

      {status === "loading" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <ReviewSkeleton />
          <ReviewSkeleton />
        </div>
      ) : status === "error" ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/20 backdrop-blur">
          <p className="font-extrabold">
            {tt("unavailable", "Reviews unavailable right now.")}
          </p>
          <p className="mt-2 text-xs text-white/60">{err}</p>
        </div>
      ) : !latest.length ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/20 backdrop-blur">
          <p className="font-extrabold">{tt("empty", "No reviews yet.")}</p>
          <p className="mt-2 text-sm text-white/70">
            {tt("emptyHint", "Be the first to review a product after purchase.")}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {latest.map((r) => (
            <article
              key={String(r.id)}
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-[#dda0dd]/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-white">{r.name}</h3>
                  <div className="mt-1">
                    <Stars rating={r.ratingNum} />
                  </div>
                </div>

                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-bold text-white/70">
                  Recent
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold leading-6 text-white/85">
                “{r.comment}”
              </p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <Link
                  href={`/${locale}/products/${r.product.slug}`}
                  className="text-sm font-extrabold text-[#dda0dd] underline decoration-[#dda0dd]/40 underline-offset-4 transition group-hover:text-white"
                >
                  {r.product.name}
                </Link>

                <span className="text-xs font-bold text-white/45">
                  {r.created_at
                    ? new Date(r.created_at).toLocaleDateString()
                    : r.product.category}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

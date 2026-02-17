import Image from "next/image";
import Link from "next/link";
import type { Post } from "contentlayer/generated";
import { products, type Product } from "@/app/data/products";

type Locale = "en" | "fr";

function money(n: number, locale: Locale) {
  // You can swap to Intl if you want currency formatting later
  return locale === "fr" ? `${n}€` : `€${n}`;
}

function normalizeText(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreProductForPost(p: Product, post: Post) {
  const text = normalizeText(
    [
      post.title,
      post.description,
      post.categorySlug,
      ...(post.tags ?? []),
    ].join(" ")
  );

  const hay = normalizeText(
    [
      p.name,
      p.slug,
      p.category,
      p.texture,
      p.capType,
      p.badge ?? "",
      ...p.length,
      ...p.highlights,
    ].join(" ")
  );

  let score = 0;

  // Strong signals
  if (hay.includes(post.categorySlug)) score += 8;

  // Tag matches
  for (const t of post.tags ?? []) {
    const tag = normalizeText(String(t));
    if (tag && hay.includes(tag)) score += 5;
  }

  // Common wig words in title/description
  const tokens = new Set(text.split(" "));
  for (const tok of tokens) {
    if (!tok || tok.length < 4) continue;
    if (hay.includes(tok)) score += 1;
  }

  // Prefer in-stock + premium badges
  if (p.inStock) score += 2;
  if (p.badge) score += 1;

  return score;
}

function pickProducts(post: Post, limit = 3): Product[] {
  const scored = products
    .map((p) => ({ p, score: scoreProductForPost(p, post) }))
    .sort((a, b) => b.score - a.score);

  const picks = scored.filter((x) => x.score > 0).slice(0, limit).map((x) => x.p);

  // fallback: in-stock best badges
  if (picks.length) return picks;
  return products
    .filter((p) => p.inStock)
    .slice(0, limit);
}

function ProductMiniCard({ locale, p }: { locale: Locale; p: Product }) {
  return (
    <Link
      href={`/${locale}/products/${p.slug}`}
      className="group flex gap-3 rounded-2xl border border-black/10 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-sm"
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-black/[0.04]">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-extrabold group-hover:underline">
              {p.name}
            </div>
            <div className="mt-1 text-xs font-semibold text-black/60">
              {p.capType} • {p.texture}
            </div>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-sm font-black">{money(p.price, locale)}</div>
            <div className={`mt-1 text-[11px] font-extrabold ${p.inStock ? "text-green-700" : "text-red-700"}`}>
              {p.inStock ? (locale === "fr" ? "En stock" : "In stock") : (locale === "fr" ? "Rupture" : "Out")}
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-black/10 bg-black/[0.02] px-2 py-1 text-[11px] font-extrabold text-black/60">
            {p.category}
          </span>
          {p.badge ? (
            <span className="rounded-full bg-[#dda0dd]/20 px-2 py-1 text-[11px] font-extrabold text-[#363434]">
              {p.badge}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default function BlogSidebar({ locale, post }: { locale: Locale; post: Post }) {
  const picks = pickProducts(post, 3);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      {/* Conversion CTA */}
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#dda0dd]/15 px-3 py-1 text-xs font-extrabold text-[#363434]">
          {locale === "fr" ? "Sélection Confida" : "Confida picks"}
        </div>

        <h3 className="mt-3 text-lg font-black">
          {locale === "fr" ? "Shoppez le look de cet article" : "Shop the look from this post"}
        </h3>

        <p className="mt-2 text-sm font-semibold text-black/70">
          {locale === "fr"
            ? "Produits choisis selon la texture, la cap construction et le style mentionné."
            : "Picked based on texture, cap construction and the style mentioned."}
        </p>

        <div className="mt-4 flex gap-3">
          <Link
            href={`/${locale}/shop`}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#dda0dd] px-4 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white"
          >
            {locale === "fr" ? "Voir la boutique" : "Shop now"}
          </Link>

          <Link
            href={`/${locale}/reviews`}
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm font-extrabold text-black transition hover:bg-black/[0.05]"
          >
            {locale === "fr" ? "Avis" : "Reviews"}
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Link
            href={`/${locale}/shipping`}
            className="rounded-2xl border border-black/10 bg-black/[0.02] p-2 text-[11px] font-extrabold text-black/70 hover:bg-black/[0.05]"
          >
            {locale === "fr" ? "Livraison" : "Shipping"}
          </Link>
          <Link
            href={`/${locale}/returns`}
            className="rounded-2xl border border-black/10 bg-black/[0.02] p-2 text-[11px] font-extrabold text-black/70 hover:bg-black/[0.05]"
          >
            {locale === "fr" ? "Retours" : "Returns"}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-2xl border border-black/10 bg-black/[0.02] p-2 text-[11px] font-extrabold text-black/70 hover:bg-black/[0.05]"
          >
            {locale === "fr" ? "Support" : "Support"}
          </Link>
        </div>
      </div>

      {/* Product picks */}
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <h4 className="text-base font-black">
          {locale === "fr" ? "Nos meilleurs choix" : "Top picks"}
        </h4>

        <div className="mt-4 space-y-3">
          {picks.map((p) => (
            <ProductMiniCard key={p.id} locale={locale} p={p} />
          ))}
        </div>

        <Link
          href={`/${locale}/shop`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-extrabold text-black transition hover:bg-black/[0.03]"
        >
          {locale === "fr" ? "Voir plus de perruques" : "See more wigs"}
        </Link>
      </div>
    </aside>
  );
}

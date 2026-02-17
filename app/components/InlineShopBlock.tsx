import Link from "next/link";
import Image from "next/image";
import type { Post } from "contentlayer/generated";
import { products, type Product } from "@/app/data/products";

type Locale = "en" | "fr";

function pickByCategory(post: Post, limit = 2): Product[] {
  // simple mapping: blog category -> shop category
  // tweak anytime
  const map: Record<string, Product["category"]> = {
    "wig-education": "human",
    "wig-treatment": "accessories",
    "hair-loss-solutions": "monofilament",
    transformations: "human",
    "styling-beauty": "lace",
  };

  const shopCat = map[post.categorySlug] ?? "human";

  const inCat = products.filter((p) => p.category === shopCat && p.inStock);
  return (inCat.length ? inCat : products.filter((p) => p.inStock)).slice(0, limit);
}

export default function InlineShopBlock({ locale, post }: { locale: Locale; post: Post }) {
  const picks = pickByCategory(post, 2);

  return (
    <section className="my-10 rounded-3xl border border-black/10 bg-[#dda0dd]/10 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-extrabold text-black/60">
            {locale === "fr" ? "SHOP PICKS" : "SHOP PICKS"}
          </div>
          <h3 className="mt-1 text-xl font-black">
            {locale === "fr" ? "Produits recommandés pour ce sujet" : "Recommended products for this topic"}
          </h3>
          <p className="mt-1 text-sm font-semibold text-black/70">
            {locale === "fr"
              ? "Deux choix rapides pour passer de la lecture à l’achat."
              : "Two quick picks to go from reading to buying."}
          </p>
        </div>

        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-black shadow-sm transition hover:-translate-y-0.5"
        >
          {locale === "fr" ? "Voir la boutique" : "Shop all"}
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {picks.map((p) => (
          <Link
            key={p.id}
            href={`/${locale}/products/${p.slug}`}
            className="group flex gap-3 rounded-2xl border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-black/[0.04]">
              {p.image ? (
                <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
              ) : null}
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold group-hover:underline">{p.name}</div>
              <div className="mt-1 text-xs font-semibold text-black/60">
                {p.capType} • {p.texture}
              </div>
              <div className="mt-2 text-xs font-extrabold text-black/70">
                {p.inStock ? (locale === "fr" ? "En stock" : "In stock") : (locale === "fr" ? "Rupture" : "Out")}
                {p.badge ? ` • ${p.badge}` : ""}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products, type Product } from "@/app/data/products";

type Locale = "en" | "fr";
type Texture = "straight" | "wavy" | "curly";
type Unit = "cm" | "in";

const LENGTHS = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30] as const;

function money(n: number, locale: Locale) {
  return locale === "fr" ? `${n}€` : `€${n}`;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

// Approx mapping: "where it falls" depends on height + texture.
// This is a friendly approximation (good enough for SEO + user value).
function estimateZone(heightCm: number, inches: number, texture: Texture) {
  // texture shortens perceived length
  const textureFactor = texture === "straight" ? 1.0 : texture === "wavy" ? 0.92 : 0.85;
  const effective = inches * textureFactor;

  // normalize height (shorter person -> hair falls lower)
  const hFactor = 165 / clamp(heightCm, 140, 190);

  const adj = effective * hFactor;

  // zones by adjusted inches
  if (adj <= 12) return { key: "chin", pct: 20 };
  if (adj <= 16) return { key: "shoulders", pct: 32 };
  if (adj <= 18) return { key: "collarbone", pct: 38 };
  if (adj <= 20) return { key: "bust", pct: 46 };
  if (adj <= 22) return { key: "midBack", pct: 58 };
  if (adj <= 24) return { key: "waist", pct: 70 };
  if (adj <= 26) return { key: "hip", pct: 78 };
  return { key: "lower", pct: 86 };
}

function zoneLabel(locale: Locale, key: string) {
  const en: Record<string, string> = {
    chin: "Chin",
    shoulders: "Shoulders",
    collarbone: "Collarbone",
    bust: "Bust / Chest",
    midBack: "Mid-back",
    waist: "Waist",
    hip: "Hip",
    lower: "Lower back",
  };
  const fr: Record<string, string> = {
    chin: "Menton",
    shoulders: "Épaules",
    collarbone: "Clavicules",
    bust: "Poitrine",
    midBack: "Milieu du dos",
    waist: "Taille",
    hip: "Hanches",
    lower: "Bas du dos",
  };
  return (locale === "fr" ? fr : en)[key] ?? key;
}

function productMatchesLength(p: Product, inches: number) {
  // product.length is like ['18"', '20"']
  return p.length.some((x) => Number(String(x).replace(/[^0-9]/g, "")) === inches);
}

function productMatchesTexture(p: Product, texture: Texture) {
  const tx = p.texture.toLowerCase();
  if (texture === "straight") return tx.includes("straight");
  if (texture === "wavy") return tx.includes("wave") || tx.includes("wavy");
  return tx.includes("curl");
}

function pickProducts(inches: number, texture: Texture, limit = 3) {
  const ranked = products
    .filter((p) => p.inStock)
    .map((p) => {
      let score = 0;
      if (productMatchesLength(p, inches)) score += 7;
      if (productMatchesTexture(p, texture)) score += 4;
      if (p.badge) score += 1;
      // prefer “human” + “monofilament” (usually higher intent)
      if (p.category === "human") score += 1;
      if (p.category === "monofilament") score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);

  const picks = ranked.filter((x) => x.score > 0).slice(0, limit).map((x) => x.p);
  return picks.length ? picks : products.filter((p) => p.inStock).slice(0, limit);
}

export default function LengthCalculator({ locale }: { locale: Locale }) {
  const [unit, setUnit] = useState<Unit>("cm");
  const [height, setHeight] = useState<number>(165); // cm default
  const [texture, setTexture] = useState<Texture>("wavy");
  const [inches, setInches] = useState<(typeof LENGTHS)[number]>(20);

  const heightCm = useMemo(() => (unit === "cm" ? height : Math.round(height * 2.54)), [unit, height]);

  const zone = useMemo(() => estimateZone(heightCm, inches, texture), [heightCm, inches, texture]);

  const picks = useMemo(() => pickProducts(inches, texture, 3), [inches, texture]);

  const title =
    locale === "fr"
      ? `Résultat : ${inches}" (${texture})`
      : `Result: ${inches}" (${texture})`;

  const note =
    locale === "fr"
      ? "Estimation basée sur la taille + texture. Les perruques bouclées tombent plus court."
      : "Estimate based on height + texture. Curly wigs fall shorter.";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Calculator */}
      <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black">{locale === "fr" ? "Calculateur" : "Calculator"}</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {/* Unit */}
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
            <div className="text-xs font-extrabold text-black/50">{locale === "fr" ? "Unité" : "Unit"}</div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setUnit("cm")}
                className={`flex-1 rounded-xl px-3 py-2 text-sm font-extrabold transition ${
                  unit === "cm" ? "bg-[#dda0dd] text-black" : "bg-white border border-black/10 text-black"
                }`}
              >
                cm
              </button>
              <button
                onClick={() => setUnit("in")}
                className={`flex-1 rounded-xl px-3 py-2 text-sm font-extrabold transition ${
                  unit === "in" ? "bg-[#dda0dd] text-black" : "bg-white border border-black/10 text-black"
                }`}
              >
                in
              </button>
            </div>
          </div>

          {/* Height */}
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 sm:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-extrabold text-black/50">{locale === "fr" ? "Taille" : "Height"}</div>
              <div className="text-sm font-black">
                {unit === "cm" ? `${height} cm` : `${height} in`}{" "}
                <span className="text-xs font-extrabold text-black/50">({heightCm} cm)</span>
              </div>
            </div>

            <input
              type="range"
              min={unit === "cm" ? 140 : 55}
              max={unit === "cm" ? 190 : 75}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-4 w-full"
            />

            <div className="mt-2 flex justify-between text-[11px] font-extrabold text-black/40">
              <span>{unit === "cm" ? "140" : "55"}</span>
              <span>{unit === "cm" ? "190" : "75"}</span>
            </div>
          </div>

          {/* Texture */}
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 sm:col-span-2">
            <div className="text-xs font-extrabold text-black/50">{locale === "fr" ? "Texture" : "Texture"}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["straight", "wavy", "curly"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTexture(t)}
                  className={`rounded-xl px-3 py-2 text-sm font-extrabold transition ${
                    texture === t ? "bg-[#dda0dd] text-black" : "bg-white border border-black/10 text-black"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
            <div className="text-xs font-extrabold text-black/50">{locale === "fr" ? "Longueur" : "Length"}</div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {LENGTHS.map((l) => (
                <button
                  key={l}
                  onClick={() => setInches(l)}
                  className={`rounded-xl px-3 py-2 text-sm font-extrabold transition ${
                    inches === l ? "bg-[#dda0dd] text-black" : "bg-white border border-black/10 text-black"
                  }`}
                >
                  {l}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual guide */}
        <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold text-black/50">{locale === "fr" ? "Résultat" : "Result"}</div>
              <div className="mt-2 text-2xl font-black">{title}</div>
              <div className="mt-2 text-sm font-semibold text-black/70">
                {locale === "fr" ? "Ça tombe environ au niveau :" : "It will fall around:"}{" "}
                <span className="font-black">{zoneLabel(locale, zone.key)}</span>
              </div>
            </div>
            <div className="text-xs font-extrabold text-black/50">{note}</div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[160px_1fr]">
            {/* Body silhouette (simple) */}
            <div className="rounded-3xl border border-black/10 bg-black/[0.02] p-4">
              <div className="relative mx-auto h-64 w-24">
                <div className="absolute left-1/2 top-3 h-10 w-10 -translate-x-1/2 rounded-full bg-black/10" />
                <div className="absolute left-1/2 top-14 h-44 w-14 -translate-x-1/2 rounded-3xl bg-black/10" />
                {/* “hair fall” marker */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#dda0dd] px-2 py-1 text-[11px] font-extrabold text-black shadow"
                  style={{ top: `${zone.pct}%` }}
                >
                  {inches}"
                </div>
              </div>
              <div className="mt-3 text-center text-xs font-extrabold text-black/60">
                {zoneLabel(locale, zone.key)}
              </div>
            </div>

            {/* Explanation + quick tips */}
            <div className="rounded-3xl border border-black/10 bg-black/[0.02] p-6">
              <div className="text-sm font-black">
                {locale === "fr" ? "Conseils rapides" : "Quick tips"}
              </div>
              <ul className="mt-3 space-y-2 text-sm font-semibold text-black/70">
                <li>• {locale === "fr" ? "Curly = plus court (shrinkage)." : "Curly looks shorter (shrinkage)."}</li>
                <li>• {locale === "fr" ? "Wavy = légèrement plus court." : "Wavy is slightly shorter."}</li>
                <li>• {locale === "fr" ? "Plus vous êtes petite, plus ça tombe bas." : "Shorter height = it falls lower."}</li>
              </ul>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/shop`}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#dda0dd] px-5 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  {locale === "fr" ? "Voir la boutique" : "Shop now"}
                </Link>
                <Link
                  href={`/${locale}/tools/lace-finder`}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:bg-black/[0.03]"
                >
                  {locale === "fr" ? "Quiz cap type" : "Cap type quiz"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product picks */}
      <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#dda0dd]/15 px-3 py-1 text-xs font-extrabold text-[#363434]">
          {locale === "fr" ? "Produits recommandés" : "Recommended products"}
        </div>

        <h3 className="mt-3 text-base font-black">
          {locale === "fr" ? "Achetez cette longueur" : "Shop this length"}
        </h3>

        <div className="mt-4 space-y-3">
          {picks.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/products/${p.slug}`}
              className="group flex gap-3 rounded-2xl border border-black/10 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-black/[0.04]">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill sizes="56px" className="object-cover" />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-extrabold group-hover:underline">{p.name}</div>
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

                <div className="mt-2 flex flex-wrap gap-2">
                  {p.badge ? (
                    <span className="rounded-full bg-[#dda0dd]/20 px-2 py-1 text-[11px] font-extrabold text-[#363434]">
                      {p.badge}
                    </span>
                  ) : null}
                  <span className="rounded-full border border-black/10 bg-black/[0.02] px-2 py-1 text-[11px] font-extrabold text-black/60">
                    {p.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href={`/${locale}/shop?q=${encodeURIComponent(`${inches}" ${texture}`)}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#dda0dd] px-4 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white"
        >
          {locale === "fr" ? "Voir plus" : "See more"}
        </Link>
      </aside>
    </div>
  );
}

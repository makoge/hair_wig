"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products, type Product } from "@/app/data/products";

type Locale = "en" | "fr";

type Answers = {
  skill: "beginner" | "intermediate" | "pro" | null;
  scalp: "sensitive" | "normal" | null;
  install: "no-glue" | "glue-ok" | null;
  style: "everyday" | "updos" | "switch" | null;
  realism: "hairline" | "scalp" | "both" | null;
  texture: "straight" | "wavy" | "curly" | "any" | null;
};

type CapKey =
  | "HD Lace"
  | "Lace Front"
  | "Glueless"
  | "Monofilament"
  | "360 Lace"
  | "U-Part"
  | "Frontal";

const LOCALE_TEXT = (locale: Locale) => ({
  startOver: locale === "fr" ? "Recommencer" : "Start over",
  next: locale === "fr" ? "Suivant" : "Next",
  back: locale === "fr" ? "Retour" : "Back",
  seeShop: locale === "fr" ? "Voir la boutique" : "Shop all",
  results: locale === "fr" ? "Résultat" : "Result",
  picks: locale === "fr" ? "Meilleurs produits pour vous" : "Best products for you",
  inStock: locale === "fr" ? "En stock" : "In stock",
  out: locale === "fr" ? "Rupture" : "Out",
  view: locale === "fr" ? "Voir" : "View",
});

function money(n: number, locale: Locale) {
  return locale === "fr" ? `${n}€` : `€${n}`;
}

function scoreCaps(a: Answers): Record<CapKey, number> {
  const s: Record<CapKey, number> = {
    "HD Lace": 0,
    "Lace Front": 0,
    Glueless: 0,
    Monofilament: 0,
    "360 Lace": 0,
    "U-Part": 0,
    Frontal: 0,
  };

  // Skill
  if (a.skill === "beginner") {
    s.Glueless += 4;
    s["Lace Front"] += 2;
    s.Monofilament += 0 as any; // noop (TS calm)
  }
  if (a.skill === "intermediate") {
    s["Lace Front"] += 3;
    s["HD Lace"] += 2;
    s.Frontal += 2;
  }
  if (a.skill === "pro") {
    s["HD Lace"] += 3;
    s["360 Lace"] += 3;
    s.Frontal += 2;
  }

  // Scalp
  if (a.scalp === "sensitive") {
    s.Monofilament += 5;
    s.Glueless += 2;
  } else if (a.scalp === "normal") {
    s["Lace Front"] += 1;
    s["HD Lace"] += 1;
  }

  // Glue preference
  if (a.install === "no-glue") {
    s.Glueless += 6;
    s["U-Part"] += 3;
    s.Monofilament += 2;
  } else if (a.install === "glue-ok") {
    s["HD Lace"] += 3;
    s["360 Lace"] += 2;
    s.Frontal += 2;
  }

  // Styling
  if (a.style === "everyday") {
    s.Glueless += 3;
    s["Lace Front"] += 2;
    s.Monofilament += 2;
  }
  if (a.style === "updos") {
    s["360 Lace"] += 6;
    s["HD Lace"] += 2;
  }
  if (a.style === "switch") {
    s["HD Lace"] += 3;
    s.Frontal += 2;
    s["Lace Front"] += 2;
  }

  // Realism priority
  if (a.realism === "hairline") {
    s["HD Lace"] += 4;
    s["Lace Front"] += 3;
    s["360 Lace"] += 2;
  }
  if (a.realism === "scalp") {
    s.Monofilament += 6;
  }
  if (a.realism === "both") {
    s.Monofilament += 4;
    s["HD Lace"] += 4;
  }

  return s;
}

function capMatchesProduct(cap: CapKey, p: Product) {
  const capType = p.capType.toLowerCase();
  const cat = p.category;

  if (cap === "Monofilament") return cat === "monofilament" || capType.includes("mono");
  if (cap === "HD Lace") return capType.includes("hd lace");
  if (cap === "Lace Front") return capType.includes("lace front");
  if (cap === "360 Lace") return capType.includes("360");
  if (cap === "Glueless") return capType.includes("glueless");
  if (cap === "U-Part") return capType.includes("u-part");
  if (cap === "Frontal") return capType.includes("frontal");

  return false;
}

function scoreProduct(p: Product, a: Answers, topCap: CapKey) {
  let score = 0;

  // Must match the recommended cap type strongly
  if (capMatchesProduct(topCap, p)) score += 10;

  // Texture alignment (loose matching)
  if (a.texture && a.texture !== "any") {
    const tx = p.texture.toLowerCase();
    if (a.texture === "straight" && tx.includes("straight")) score += 3;
    if (a.texture === "wavy" && (tx.includes("wave") || tx.includes("wavy"))) score += 3;
    if (a.texture === "curly" && tx.includes("curl")) score += 3;
  }

  // Sensitive scalp → prefer monofilament + “comfort”/breathable-ish badges
  if (a.scalp === "sensitive" && (p.category === "monofilament" || p.capType.toLowerCase().includes("mono"))) {
    score += 4;
  }

  // No glue
  if (a.install === "no-glue" && p.capType.toLowerCase().includes("glueless")) score += 4;

  // Prefer in-stock + premium badges
  if (p.inStock) score += 2;
  if (p.badge) score += 1;

  return score;
}

function topCapFromScores(scores: Record<CapKey, number>): CapKey {
  return (Object.keys(scores) as CapKey[]).sort((a, b) => scores[b] - scores[a])[0]!;
}

function capExplanation(locale: Locale, cap: CapKey) {
  const fr: Record<CapKey, { title: string; why: string; tips: string[] }> = {
    "HD Lace": {
      title: "HD Lace (ultra naturel)",
      why: "Le meilleur choix si votre priorité est une ligne frontale “invisible” et un rendu premium.",
      tips: ["Idéal pour photos/événements", "Très naturel au niveau du front", "Prévoir un peu plus d’entretien"],
    },
    "Lace Front": {
      title: "Lace Front (meilleur rapport naturel/prix)",
      why: "Parfait si vous voulez un rendu naturel au front avec un port simple au quotidien.",
      tips: ["Bon pour débuter", "Look naturel au front", "Moins de liberté pour updos hauts"],
    },
    Glueless: {
      title: "Glueless (zéro colle)",
      why: "Le plus simple et rapide : confort + mise en place facile sans adhésif.",
      tips: ["Top pour débutants", "Rapide à mettre/enlever", "Confort quotidien"],
    },
    Monofilament: {
      title: "Monofilament (scalp ultra réaliste)",
      why: "Meilleur si vous voulez l’illusion du cuir chevelu et un confort élevé, surtout pour cuir chevelu sensible.",
      tips: ["Scalp réaliste", "Respirant", "Parfait pour cheveux clairsemés"],
    },
    "360 Lace": {
      title: "360 Lace (updos & ponytails)",
      why: "Le meilleur pour les queues de cheval et chignons : dentelle tout autour.",
      tips: ["Updos faciles", "Style très versatile", "Plus technique"],
    },
    "U-Part": {
      title: "U-Part (blend avec vos cheveux)",
      why: "Idéal si vous voulez laisser une partie de vos cheveux pour un mélange naturel sans dentelle.",
      tips: ["Très naturel si leave-out OK", "Sans colle", "Nécessite cheveux à blender"],
    },
    Frontal: {
      title: "Frontal (style & flexibilité)",
      why: "Bon compromis pour un rendu naturel et de la flexibilité de coiffage.",
      tips: ["Polyvalent", "Naturel au front", "Demande un minimum de technique"],
    },
  };

  const en: Record<CapKey, { title: string; why: string; tips: string[] }> = {
    "HD Lace": {
      title: "HD Lace (most natural)",
      why: "Best if your #1 priority is an “undetectable” premium hairline.",
      tips: ["Great for photos/events", "Melts into the scalp", "Slightly more maintenance"],
    },
    "Lace Front": {
      title: "Lace Front (best value)",
      why: "Perfect for a natural hairline with simple everyday wear.",
      tips: ["Beginner-friendly", "Natural hairline", "Less freedom for high updos"],
    },
    Glueless: {
      title: "Glueless (no glue)",
      why: "Fastest and easiest: comfort + secure wear without adhesive.",
      tips: ["Best for beginners", "Quick on/off", "Everyday comfort"],
    },
    Monofilament: {
      title: "Monofilament (realistic scalp)",
      why: "Best if you want a realistic scalp illusion and high comfort—especially for sensitive scalps.",
      tips: ["Realistic scalp", "Breathable", "Great for thinning hair"],
    },
    "360 Lace": {
      title: "360 Lace (updos & ponytails)",
      why: "Best for ponytails/updos with lace around the full perimeter.",
      tips: ["Updo-friendly", "Versatile styling", "More advanced install"],
    },
    "U-Part": {
      title: "U-Part (blend with your hair)",
      why: "Great if you want leave-out blending for a natural look without lace.",
      tips: ["Very natural with leave-out", "No glue", "Needs hair to blend"],
    },
    Frontal: {
      title: "Frontal (flexible styling)",
      why: "A solid option for a natural hairline and styling flexibility.",
      tips: ["Versatile", "Natural front", "Some technique required"],
    },
  };

  return locale === "fr" ? fr[cap] : en[cap];
}

export default function LaceFinderQuiz({ locale }: { locale: Locale }) {
  const t = LOCALE_TEXT(locale);

  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({
    skill: null,
    scalp: null,
    install: null,
    style: null,
    realism: null,
    texture: null,
  });

  const steps = useMemo(
    () => [
      {
        key: "skill",
        q: locale === "fr" ? "Votre niveau avec les perruques ?" : "Your wig experience level?",
        options: [
          { v: "beginner", label: locale === "fr" ? "Débutant" : "Beginner" },
          { v: "intermediate", label: locale === "fr" ? "Intermédiaire" : "Intermediate" },
          { v: "pro", label: locale === "fr" ? "Avancé" : "Advanced" },
        ] as const,
      },
      {
        key: "scalp",
        q: locale === "fr" ? "Cuir chevelu sensible ?" : "Sensitive scalp?",
        options: [
          { v: "sensitive", label: locale === "fr" ? "Oui (priorité confort)" : "Yes (comfort first)" },
          { v: "normal", label: locale === "fr" ? "Non" : "No" },
        ] as const,
      },
      {
        key: "install",
        q: locale === "fr" ? "Vous voulez éviter la colle ?" : "Do you want to avoid glue?",
        options: [
          { v: "no-glue", label: locale === "fr" ? "Oui, zéro colle" : "Yes, no glue" },
          { v: "glue-ok", label: locale === "fr" ? "Non, colle OK" : "Glue is fine" },
        ] as const,
      },
      {
        key: "style",
        q: locale === "fr" ? "Objectif principal ?" : "Your main goal?",
        options: [
          { v: "everyday", label: locale === "fr" ? "Quotidien naturel" : "Natural everyday" },
          { v: "updos", label: locale === "fr" ? "Ponytails / updos" : "Ponytails / updos" },
          { v: "switch", label: locale === "fr" ? "Changer souvent de style" : "Switch styles often" },
        ] as const,
      },
      {
        key: "realism",
        q: locale === "fr" ? "Priorité réalisme ?" : "Realism priority?",
        options: [
          { v: "hairline", label: locale === "fr" ? "Ligne frontale" : "Hairline" },
          { v: "scalp", label: locale === "fr" ? "Scalp / raie" : "Scalp / part" },
          { v: "both", label: locale === "fr" ? "Les deux" : "Both" },
        ] as const,
      },
      {
        key: "texture",
        q: locale === "fr" ? "Texture préférée ?" : "Preferred texture?",
        options: [
          { v: "straight", label: locale === "fr" ? "Straight" : "Straight" },
          { v: "wavy", label: locale === "fr" ? "Wavy" : "Wavy" },
          { v: "curly", label: locale === "fr" ? "Curly" : "Curly" },
          { v: "any", label: locale === "fr" ? "Peu importe" : "Any" },
        ] as const,
      },
    ],
    [locale]
  );

  const done = step >= steps.length;

  const { topCap, picks, explanation } = useMemo(() => {
    if (!done) return { topCap: null as CapKey | null, picks: [] as Product[], explanation: null as any };

    const scores = scoreCaps(a);
    const cap = topCapFromScores(scores);
    const ex = capExplanation(locale, cap);

    const ranked = products
      .map((p) => ({ p, score: scoreProduct(p, a, cap) }))
      .sort((x, y) => y.score - x.score)
      .filter((x) => x.score > 0);

    const top = ranked.slice(0, 3).map((x) => x.p);
    const fallback = products.filter((p) => p.inStock).slice(0, 3);

    return {
      topCap: cap,
      explanation: ex,
      picks: top.length ? top : fallback,
    };
  }, [a, done, locale]);

  function setAnswer(key: keyof Answers, value: any) {
    setA((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setStep(0);
    setA({ skill: null, scalp: null, install: null, style: null, realism: null, texture: null });
  }

  if (done && topCap && explanation) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="text-xs font-extrabold text-black/50">{t.results}</div>
          <h2 className="mt-2 text-3xl font-black">{explanation.title}</h2>
          <p className="mt-3 text-sm font-semibold text-black/70">{explanation.why}</p>

          <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
            <div className="text-xs font-extrabold text-black/50">
              {locale === "fr" ? "Conseils rapides" : "Quick tips"}
            </div>
            <ul className="mt-2 space-y-2 text-sm font-semibold text-black/70">
              {explanation.tips.map((x: string) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/shop`}
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#dda0dd] px-5 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white"
            >
              {t.seeShop}
            </Link>
            <button
              onClick={reset}
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:bg-black/[0.03]"
            >
              {t.startOver}
            </button>
          </div>
        </section>

        <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h3 className="text-base font-black">{t.picks}</h3>

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
                        {p.inStock ? t.inStock : t.out}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    {p.badge ? (
                      <span className="rounded-full bg-[#dda0dd]/20 px-2 py-1 text-[11px] font-extrabold text-[#363434]">
                        {p.badge}
                      </span>
                    ) : null}
                    <span className="ml-auto text-[11px] font-extrabold text-black/50">{t.view}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    );
  }

  const current = steps[step];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="text-xs font-extrabold text-black/50">
          {locale === "fr" ? "Question" : "Question"} {step + 1}/{steps.length}
        </div>

        <h2 className="mt-2 text-2xl font-black">{current.q}</h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {current.options.map((o) => (
            <button
              key={o.v}
              onClick={() => {
                setAnswer(current.key as keyof Answers, o.v);
                setStep((x) => x + 1);
              }}
              className="rounded-2xl border border-black/10 bg-white p-4 text-left text-sm font-extrabold text-black transition hover:-translate-y-0.5 hover:bg-black/[0.02] hover:shadow-sm"
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setStep((x) => Math.max(0, x - 1))}
            disabled={step === 0}
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:bg-black/[0.03] disabled:opacity-50"
          >
            {t.back}
          </button>
          <button
            onClick={reset}
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.02] px-5 py-3 text-sm font-extrabold text-black transition hover:bg-black/[0.05]"
          >
            {t.startOver}
          </button>
        </div>
      </section>

      {/* sales sidebar while taking quiz */}
      <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#dda0dd]/15 px-3 py-1 text-xs font-extrabold text-[#363434]">
          {locale === "fr" ? "Pendant le quiz" : "While you quiz"}
        </div>

        <h3 className="mt-3 text-base font-black">
          {locale === "fr" ? "Top vendeurs (à acheter maintenant)" : "Best sellers (shop now)"}
        </h3>

        <div className="mt-4 space-y-3">
          {products
            .filter((p) => p.inStock)
            .slice(0, 3)
            .map((p) => (
              <Link
                key={p.id}
                href={`/${locale}/products/${p.slug}`}
                className="group flex gap-3 rounded-2xl border border-black/10 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-black/[0.04]">
                  {p.image ? <Image src={p.image} alt={p.name} fill sizes="48px" className="object-cover" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-extrabold group-hover:underline">{p.name}</div>
                  <div className="mt-1 text-xs font-semibold text-black/60">
                    {p.capType} • {money(p.price, locale)}
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <Link
          href={`/${locale}/shop`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#dda0dd] px-4 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white"
        >
          {t.seeShop}
        </Link>
      </aside>
    </div>
  );
}

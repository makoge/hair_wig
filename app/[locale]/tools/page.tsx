import Link from "next/link";
import type { Metadata } from "next";

type Locale = "en" | "fr";

export const dynamic = "force-static";

type Tool = {
  slug: string; // /tools/<slug>
  badge?: string;
  icon: string; // emoji for now (simple + fast)
  title: Record<Locale, string>;
  desc: Record<Locale, string>;
  keywords: Record<Locale, string[]>;
};

const TOOLS: Tool[] = [
  {
    slug: "lace-finder",
    badge: "Best",
    icon: "🧠",
    title: {
      en: "Wig Cap Type Finder Quiz",
      fr: "Quiz : Type de perruque (cap) idéal",
    },
    desc: {
      en: "6 questions → HD lace / lace front / monofilament / glueless + product picks.",
      fr: "6 questions → HD lace / lace front / monofilament / glueless + produits recommandés.",
    },
    keywords: {
      en: ["lace front vs hd lace", "best wig cap", "glueless wig"],
      fr: ["lace front vs hd lace", "meilleur cap", "perruque sans colle"],
    },
  },
  {
    slug: "length-calculator",
    badge: "length",
    icon: "📏",
    title: {
      en: "Wig Length Calculator",
      fr: "Calculateur de longueur de perruque",
    },
    desc: {
      en: "Pick height + texture + inches → see where it falls + recommended products.",
      fr: "Taille + texture + pouces → où ça tombe + produits recommandés.",
    },
    keywords: {
      en: ["wig length chart", "20 inch wig length", "22 inch wig length"],
      fr: ["longueur perruque 20 pouces", "guide longueur perruque", "tableau longueur perruque"],
    },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "fr" ? "Outils Confida" : "Confida Tools";
  const description =
    locale === "fr"
      ? "Outils gratuits pour choisir votre perruque : quiz cap type, calculateur de longueur, et plus."
      : "Free wig tools: cap type quiz, length calculator, and more.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/tools`,
      languages: {
        en: "/en/tools",
        fr: "/fr/tools",
      },
    },
    openGraph: { title, description, url: `/${locale}/tools`, type: "website" },
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#dda0dd]/15 px-4 py-2 text-xs font-extrabold text-[#363434]">
          {locale === "fr" ? "Hub d’outils" : "Tools hub"}
        </div>

        <h1 className="mt-4 text-4xl font-black leading-tight">
          {locale === "fr" ? "Outils gratuits pour perruques" : "Free Wig Tools"}
        </h1>

        <p className="mt-3 max-w-3xl text-sm font-semibold text-black/70">
          {locale === "fr"
            ? "Des outils rapides pour choisir la bonne perruque et acheter plus facilement."
            : "Fast tools to choose the right wig  and shop with confidence."}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/shop`}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#dda0dd] px-5 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white"
          >
            {locale === "fr" ? "Voir la boutique" : "Shop now"}
          </Link>

          <Link
            href={`/${locale}/blog`}
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:bg-black/[0.03]"
          >
            {locale === "fr" ? "Lire le blog" : "Read the blog"}
          </Link>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${locale}/tools/${tool.slug}`}
            className="group rounded-3xl border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/[0.03] text-2xl">
                  {tool.icon}
                </div>
                <div>
                  <div className="text-lg font-black group-hover:underline">
                    {tool.title[locale]}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-black/70">
                    {tool.desc[locale]}
                  </div>
                </div>
              </div>

              {tool.badge ? (
                <span className="rounded-full bg-[#dda0dd]/20 px-3 py-1 text-xs font-extrabold text-[#363434]">
                  {tool.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {tool.keywords[locale].slice(0, 3).map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs font-extrabold text-black/60"
                >
                  {k}
                </span>
              ))}
            </div>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-black/70">
              {locale === "fr" ? "Ouvrir l’outil" : "Open tool"} <span>→</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="mt-10 rounded-3xl border border-black/10 bg-[#dda0dd]/10 p-8">
        <h2 className="text-2xl font-black">
          {locale === "fr" ? "Vous ne savez pas quoi choisir ?" : "Not sure what to choose?"}
        </h2>
        <p className="mt-2 text-sm font-semibold text-black/70">
          {locale === "fr"
            ? "Commencez par le quiz cap type — c’est le plus efficace."
            : "Start with the cap type quiz — it’s the fastest way to get the right match."}
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/tools/lace-finder`}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-black shadow-sm transition hover:-translate-y-0.5"
          >
            {locale === "fr" ? "Faire le quiz" : "Take the quiz"}
          </Link>
          <Link
            href={`/${locale}/tools/length-calculator`}
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:bg-black/[0.03]"
          >
            {locale === "fr" ? "Calculer la longueur" : "Calculate length"}
          </Link>
        </div>
      </section>
    </main>
  );
}

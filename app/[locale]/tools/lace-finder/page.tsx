import type { Metadata } from "next";
import LaceFinderQuiz from "./quiz";

type Locale = "en" | "fr";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "fr"
      ? "Quiz : Quel type de perruque (lace / mono / glueless) est fait pour vous ?"
      : "Quiz: Which Wig Cap Type (Lace / Mono / Glueless) Is Best for You?";
  const description =
    locale === "fr"
      ? "Répondez à 6 questions et obtenez une recommandation de cap (HD lace, lace front, monofilament, glueless) + produits adaptés."
      : "Answer 6 questions and get your best cap type (HD lace, lace front, monofilament, glueless) + matching products.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/tools/lace-finder`,
      languages: {
        en: `/en/tools/lace-finder`,
        fr: `/fr/tools/lace-finder`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/tools/lace-finder`,
      type: "website",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#dda0dd]/15 px-4 py-2 text-xs font-extrabold text-[#363434]">
          {locale === "fr" ? "Outil gratuit" : "Free tool"}
        </div>

        <h1 className="mt-4 text-4xl font-black leading-tight">
          {locale === "fr"
            ? "Trouvez le meilleur type de perruque pour vous"
            : "Find the best wig cap type for you"}
        </h1>

        <p className="mt-3 max-w-3xl text-sm font-semibold text-black/70">
          {locale === "fr"
            ? "6 questions → une recommandation claire + des produits adaptés à acheter."
            : "6 questions → a clear recommendation + matching products to buy."}
        </p>
      </div>

      <div className="mt-8">
        <LaceFinderQuiz locale={locale} />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import LengthCalculator from "./tool";
import LengthFaq, { LengthFaqJsonLd } from "./faq";


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
      ? "Calculateur de longueur de perruque (pouces → où ça tombe)"
      : "Wig Length Calculator (inches → where it falls)";
  const description =
    locale === "fr"
      ? "Choisissez votre taille, texture et longueur : voyez où la perruque tombe (menton, épaules, poitrine, taille) + produits recommandés."
      : "Pick your height, texture, and length: see where it falls (chin, shoulders, bust, waist) + recommended products.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/tools/length-calculator`,
      languages: {
        en: `/en/tools/length-calculator`,
        fr: `/fr/tools/length-calculator`,
      },
    },
    openGraph: { title, description, url: `/${locale}/tools/length-calculator`, type: "website" },
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
          {locale === "fr" ? "Calculateur de longueur de perruque" : "Wig Length Calculator"}
        </h1>
        <p className="mt-3 max-w-3xl text-sm font-semibold text-black/70">
          {locale === "fr"
            ? "Choisissez votre taille + texture + pouces : on vous dit où la perruque tombe sur votre corps."
            : "Pick your height + texture + inches: we’ll tell you where the wig will fall on your body."}
        </p>
      </div>

      <div className="mt-8">
        <LengthCalculator locale={locale} />
      </div>
      <div className="mt-8">
        <LengthCalculator locale={locale} />
        <LengthFaqJsonLd locale={locale} />
        <LengthFaq locale={locale} />
      </div>

    </main>
  );
}

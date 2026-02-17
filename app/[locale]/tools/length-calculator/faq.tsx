"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "fr";

type QA = { q: string; a: string };

export function LengthFaqJsonLd({ locale }: { locale: Locale }) {
  const faqs = useFaqs(locale);

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: x.a,
        },
      })),
    };
  }, [faqs]);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

function useFaqs(locale: Locale): QA[] {
  if (locale === "fr") {
    return [
      {
        q: 'À quoi correspond une perruque de 20 pouces ?',
        a: "En général, 20 pouces tombe autour de la poitrine (selon votre taille et la texture). Les boucles paraissent plus courtes (shrinkage).",
      },
      {
        q: "18 pouces vs 20 pouces : quelle différence ?",
        a: "18 pouces tombe souvent aux clavicules / haut de poitrine, tandis que 20 pouces tombe plus bas (poitrine). Plus vous êtes petite, plus la perruque paraît longue.",
      },
      {
        q: "Les perruques bouclées tombent-elles plus court ?",
        a: "Oui. Les textures curly ont du shrinkage, donc une longueur en pouces peut paraître plus courte visuellement que du straight.",
      },
      {
        q: "Comment mesurer la longueur d’une perruque ?",
        a: "Mesurez du sommet (couronne) jusqu’aux pointes, sur le dos. Pour du curly, étirez légèrement pour mesurer la longueur réelle.",
      },
      {
        q: "Quelle longueur est la plus naturelle pour débuter ?",
        a: "Beaucoup de personnes commencent avec 16–20 pouces : facile à porter, look naturel, entretien plus simple que les très longues longueurs.",
      },
      {
        q: "Quelle longueur choisir pour un look “glam” ?",
        a: "22–26 pouces donne un effet plus glamour et “statement”, surtout en waves. Prévoyez plus d’entretien et de démêlage.",
      },
    ];
  }

  return [
    {
      q: "What does a 20 inch wig look like?",
      a: "Most of the time, 20 inches falls around the bust/chest area (depending on your height and texture). Curly textures appear shorter due to shrinkage.",
    },
    {
      q: "18 inch vs 20 inch wig: what’s the difference?",
      a: "18 inches often hits collarbone/upper chest, while 20 inches typically falls closer to the bust. Shorter height = it appears longer.",
    },
    {
      q: "Do curly wigs look shorter than straight?",
      a: "Yes. Curly textures have shrinkage, so the same inch length appears shorter than straight hair.",
    },
    {
      q: "How do you measure wig length?",
      a: "Measure from the crown to the ends along the back. For curly hair, gently stretch to see the true length.",
    },
    {
      q: "What wig length looks most natural for beginners?",
      a: "Many beginners start with 16–20 inches: it’s easy to wear, looks natural, and is simpler to maintain than very long lengths.",
    },
    {
      q: "What length is best for a glam look?",
      a: "22–26 inches gives a more glamorous, statement look—especially in waves. Expect more detangling and maintenance.",
    },
  ];
}

export default function LengthFaq({ locale }: { locale: Locale }) {
  const faqs = useFaqs(locale);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mt-10 rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-black">{locale === "fr" ? "FAQ longueur de perruque" : "Wig length FAQ"}</h2>
      <p className="mt-2 text-sm font-semibold text-black/70">
        {locale === "fr"
          ? "Réponses rapides aux questions les plus recherchées."
          : "Quick answers to the most searched questions."}
      </p>

      <div className="mt-6 space-y-3">
        {faqs.map((x, i) => {
          const isOpen = open === i;
          return (
            <div key={x.q} className="rounded-2xl border border-black/10 bg-black/[0.02]">
              <button
                type="button"
                onClick={() => setOpen((cur) => (cur === i ? null : i))}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-extrabold text-black">{x.q}</span>
                <span className="text-lg font-black text-black/60">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen ? (
                <div className="px-5 pb-5">
                  <p className="text-sm font-semibold leading-relaxed text-black/70">{x.a}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

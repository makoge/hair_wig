import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/app/components/Hero";
import HomeClient from "./HomeClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://confida.shop"),
  title: "Premium Human Hair Wigs & Monofilament Wigs | Confida Lace Hair",
  description:
    "Shop premium human hair wigs, lace front wigs and monofilament wigs at Confida Lace Hair. Natural look, breathable comfort and luxury quality.",
  alternates: { canonical: "/" },
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Confida Lace Hair",
    url: "https://confida.shop",
    logo: "https://confida.shop/img/hair_logo.png",
  };

  return (
    <>
      <Script
        id="jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero
        locale={locale}
        title="Premium Human Hair & Monofilament Wigs"
        description="Luxury lace front and HD lace wigs designed for natural beauty, comfort and confidence."
        buttonLabel="Shop Now"
      />

      <HomeClient />
    </>
  );
}



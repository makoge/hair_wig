import type { Metadata } from "next";
import ShopClient from "./ShopClient";
import { products } from "@/app/data/products";

export const metadata: Metadata = {
  title: "Shop Premium Human Hair & Lace Front Wigs | Confida Hair",
  description:
    "Shop premium human hair wigs, lace front wigs, and monofilament wigs at Confida Hair. Natural look, breathable comfort, luxury quality, fast delivery.",
  alternates: { canonical: "https://confida.shop/shop" },
  robots: { index: true, follow: true },
};

export default function ShopPage() {
  const itemList = products.slice(0, 10).map((p, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `https://confida.shop/product/${p.slug}`,
    name: p.name,
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Confida Hair",
      url: "https://confida.shop",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://confida.shop" },
        { "@type": "ListItem", position: 2, name: "Shop", item: "https://confida.shop/shop" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Featured wigs",
      itemListElement: itemList,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShopClient />
    </>
  );
}

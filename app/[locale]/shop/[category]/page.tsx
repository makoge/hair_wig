
import type { Metadata } from "next";
import ShopClient from "../ShopClient";

type Category = "human" | "lace" | "monofilament";

const CATEGORY_META: Record<Category, { title: string; description: string }> = {
  human: {
    title: "Human Hair Wigs | Confida Hair",
    description:
      "Shop premium human hair wigs at Confida Hair. Natural look, soft texture, luxury quality, and fast delivery.",
  },
  lace: {
    title: "Lace Front Wigs | Confida Hair",
    description:
      "Shop lace front wigs with natural hairlines at Confida Hair. Breathable comfort, premium quality, and fast delivery.",
  },
  monofilament: {
    title: "Monofilament Wigs | Confida Hair",
    description:
      "Shop monofilament wigs for a realistic scalp look at Confida Hair. Lightweight comfort and luxury quality.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const cat = params.category as Category;
  const meta = CATEGORY_META[cat];

  if (!meta) {
    return {
      title: "Shop Wigs | Confida Hair",
      description:
        "Shop premium wigs at Confida Hair. Human hair, lace front, and monofilament styles.",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://confida.shop/shop/${cat}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: "Confida Hair",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default function CategoryShopPage({
  params,
}: {
  params: { category: string };
}) {
  // ShopClient reads URL params already (filter=...), but for category pages we pass initial filter
  return <ShopClient initialFilter={params.category} />;
}

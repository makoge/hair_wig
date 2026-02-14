import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import ProductGrid from "@/app/components/ProductGrid";
import type { Category } from "@/app/data/products";

type Props = {
  params: {
    category: string;
  };
};

const LABELS: Record<Category, string> = {
  human: "Human Hair Wigs",
  lace: "Lace Front Wigs",
  monofilament: "Monofilament Wigs",
  accessories: "Hair Accessories",
};

function isValidCategory(value: string): value is Category {
  return ["human", "lace", "monofilament", "accessories"].includes(value);
}

/* ---------------- SEO Metadata ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = params.category;

  if (!isValidCategory(category)) return {};

  const title = `${LABELS[category]} | Confida Hair`;
  const description = `Shop premium ${LABELS[
    category
  ].toLowerCase()} at Confida Hair. Natural look, luxury comfort, and high-quality craftsmanship.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://confida.shop/categories/${category}`,
      siteName: "Confida Hair",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ---------------- Page ---------------- */

export default function CategoryPage({ params }: Props) {
  const category = params.category;

  if (!isValidCategory(category)) return notFound();

  const filtered = products.filter((x) => x.category === category);

  if (!filtered.length) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-[#363434]">
          {LABELS[category]}
        </h1>
        <p className="mt-2 text-sm font-semibold text-[#363434]/70">
          Premium quality {LABELS[category].toLowerCase()} designed for
          natural beauty and comfort.
        </p>
      </div>

      <ProductGrid products={filtered} />
    </main>
  );
}

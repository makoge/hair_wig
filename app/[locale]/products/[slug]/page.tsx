import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { products } from "@/app/data/products";
import ProductDetailsClient from "@/app/components/ProductDetailsClient";
import Reviews from "@/app/components/Reviews";
import ProductMediaClient from "@/app/components/ProductMediaClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const BASE_URL = "https://confida.shop";

function getHeroImage(p: (typeof products)[number]) {
  return p.images?.[0] ?? "/img/placeholder.jpg";
}

function uniq(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean)));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  const url = `${BASE_URL}/${locale}/products/${product.slug}`;
  const title = `${product.name} | Confida Lace Hair`;
  const description =
    (product.pageDescription || product.description || "Shop premium wigs at Confida Lace Hair.")
      .slice(0, 160);

  const hero = getHeroImage(product);
  const ogImg = `${BASE_URL}${hero.startsWith("/") ? hero : `/${hero}`}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/products/${product.slug}`,
        fr: `${BASE_URL}/fr/products/${product.slug}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Confida Lace Hair",
      images: [{ url: ogImg, width: 1200, height: 630, alt: product.name }],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImg],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const hero = getHeroImage(product);

  const canonicalUrl = `${BASE_URL}/${locale}/products/${product.slug}`;

  // Build a solid thumbnail list for the gallery:
  // 1) hero
  // 2) product.images
  // 3) product.colorImages values
  const thumbs = uniq([
    hero,
    ...(product.images ?? []),
    ...(product.colorImages ? Object.values(product.colorImages) : []),
  ]);

  // JSON-LD (server-rendered = great for SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.pageDescription || product.description,
    image: thumbs.map((src) => `${BASE_URL}${src.startsWith("/") ? src : `/${src}`}`),
    sku: product.id,
    brand: { "@type": "Brand", name: "Confida Lace Hair" },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: String(product.price),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: canonicalUrl,
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-[#363434]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* MEDIA (client component handles color switching & thumbnail clicks) */}
        <ProductMediaClient productName={product.name} hero={hero} thumbs={thumbs} />

        {/* INFO */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-extrabold text-[#363434]/80">
            {product.category}
          </p>

          <h1 className="mt-3 text-balance text-3xl font-black tracking-tight text-[#363434]">
            {product.name}
          </h1>

          <p className="mt-3 text-sm font-semibold leading-relaxed text-[#363434]/75">
            {product.pageDescription}
          </p>

          {/* Details client: emits onColorChange -> ProductMediaClient listens via window event */}
          <div className="text-[#363434]">
            <ProductDetailsClient product={product} locale={locale} />
          </div>

          {/* DETAILS */}
          <div className="mt-10 space-y-6">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#363434]">Key features</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-semibold text-[#363434]/75">
                {product.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#363434]">Care</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-semibold text-[#363434]/75">
                {product.care.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#363434]">Description</h2>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[#363434]/75">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-12">
        <Reviews product={product} />
      </div>
    </main>
  );
}

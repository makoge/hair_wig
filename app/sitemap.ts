import type { MetadataRoute } from "next";
import { products } from "./data/products";

const locales = ["en", "fr"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://confida.shop";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/shop`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ]);

  const productPages: MetadataRoute.Sitemap = products.flatMap((p) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...productPages];
}


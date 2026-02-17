import type { MetadataRoute } from "next";
import { products } from "./data/products";
import { getAllPosts, CATEGORIES } from "@/lib/blog";

const locales = ["en", "fr"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://confida.shop";

  const now = new Date();

  /* ---------------- STATIC CORE ---------------- */

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/shop`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${locale}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]);

  /* ---------------- TOOLS ---------------- */

  const toolPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}/tools/lace-finder`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/${locale}/tools/length-calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ]);

  /* ---------------- PRODUCT PAGES ---------------- */

  const productPages: MetadataRoute.Sitemap = products.flatMap((p) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  );

  /* ---------------- BLOG CATEGORY PILLARS ---------------- */

  const categoryPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    Object.keys(CATEGORIES).map((category) => ({
      url: `${baseUrl}/${locale}/blog/category/${category}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    }))
  );

  /* ---------------- BLOG POSTS ---------------- */

  const blogPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${baseUrl}${post.url}`,
      lastModified: new Date(
        post.frontmatter.updated || post.frontmatter.date
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  /* ---------------- RSS ---------------- */

  const rssPages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/rss.xml`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.4,
  }));

  return [
    ...staticPages,
    ...toolPages,
    ...productPages,
    ...categoryPages,
    ...blogPages,
    ...rssPages,
  ];
}



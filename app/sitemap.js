import { products } from "./data/products";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://confida.shop";

  const productUrls = (products || []).map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}

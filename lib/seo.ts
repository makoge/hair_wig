import type { Post } from "./blog";

export function absoluteUrl(pathname: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return new URL(pathname, base).toString();
}

export function articleJsonLd(post: Post) {
  const fm = post.frontmatter;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.date,
    dateModified: fm.updated || fm.date,
    mainEntityOfPage: absoluteUrl(post.url),
    url: absoluteUrl(post.url),
    author: { "@type": "Organization", name: "Confida Lace Hair" },
    publisher: { "@type": "Organization", name: "Confida Lace Hair" },
  };
}

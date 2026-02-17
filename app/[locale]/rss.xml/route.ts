// app/[locale]/rss.xml/route.ts
import { allPosts } from "contentlayer/generated";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://confida.shop";
type Locale = "en" | "fr";

function escapeXml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: Locale }> }
) {
  const { locale } = await params;

  const posts = allPosts
    .filter((p) => p.locale === locale)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 50);

  const channelTitle = locale === "fr" ? "Blog Confida" : "Confida Blog";
  const channelDesc =
    locale === "fr"
      ? "Guides perruques, coiffure, transformations, solutions chute de cheveux et entretien."
      : "Wig education, styling, transformations, hair loss solutions, and wig care.";

  const items = posts
    .map((p) => {
      const link = `${SITE_URL}${p.url}`;
      return `
        <item>
          <title><![CDATA[${p.title}]]></title>
          <link>${link}</link>
          <guid isPermaLink="true">${link}</guid>
          <pubDate>${new Date(p.date).toUTCString()}</pubDate>
          <description><![CDATA[${p.description}]]></description>
        </item>
      `.trim();
    })
    .join("\n");

  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${SITE_URL}/${locale}/blog</link>
    <description>${escapeXml(channelDesc)}</description>
    <language>${locale}</language>
    ${items}
  </channel>
</rss>
  `.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

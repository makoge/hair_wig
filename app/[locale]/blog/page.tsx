import { allPosts } from "contentlayer/generated";

type Locale = "en" | "fr";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const posts = allPosts
    .filter((p) => p.locale === locale)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black">
        {locale === "fr" ? "Blog" : "Blog"}
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <a
            key={p.url}
            href={p.url}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm hover:shadow-md"
          >
            <div className="text-xs font-extrabold opacity-60">
              {p.categorySlug}
            </div>
            <div className="mt-1 text-lg font-black hover:underline">
              {p.title}
            </div>
            <div className="mt-2 text-sm font-semibold opacity-75">
              {p.description}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import BlogSidebar from "@/app/components/BlogSidebar";
import InlineShopBlock from "@/app/components/InlineShopBlock";

type Locale = "en" | "fr";

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const joined = slug.join("/");

  const post = allPosts.find((p) => p.locale === locale && p.slug === joined);
  if (!post) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* hero header */}
      <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#dda0dd]/15 px-4 py-2 text-xs font-extrabold text-[#363434]">
          {post.categorySlug.replaceAll("-", " ")}
        </div>

        <h1 className="mt-4 text-4xl font-black leading-tight">{post.title}</h1>
        <p className="mt-3 text-sm font-semibold text-black/70">{post.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {(post.tags ?? []).slice(0, 6).map((t) => (
            <span key={String(t)} className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs font-extrabold text-black/60">
              {String(t)}
            </span>
          ))}
          <span className="ml-auto text-xs font-extrabold text-black/50">{post.readingTime}</span>
        </div>
      </div>

      {/* content + sidebar */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <article className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="prose prose-zinc max-w-none prose-h2:font-black prose-h3:font-extrabold">
            <MDXRemote
              source={post.body.raw}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
                },
              }}
            />
          </div>
             <InlineShopBlock locale={locale} post={post} />
          {/* bottom CTA */}
          <div className="mt-10 rounded-3xl border border-black/10 bg-[#dda0dd]/10 p-6">
            <div className="text-sm font-extrabold text-black/70">
              {locale === "fr" ? "Prête pour le look ?" : "Ready for the look?"}
            </div>
            <div className="mt-2 text-lg font-black">
              {locale === "fr" ? "Découvrez nos perruques les plus naturelles" : "Explore our most natural wigs"}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={`/${locale}/shop`}
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#dda0dd] px-5 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white"
              >
                {locale === "fr" ? "Voir la boutique" : "Shop the collection"}
              </a>
              <a
                href={`/${locale}/reviews`}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:bg-black/[0.03]"
              >
                {locale === "fr" ? "Voir les avis" : "Read reviews"}
              </a>
            </div>
          </div>
            
        </article>

        <BlogSidebar locale={locale} post={post} />
      </div>
    </div>
  );
}

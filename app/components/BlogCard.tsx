import type { Post } from "contentlayer/generated";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <a
      href={post.url}
      className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm hover:shadow-md"
    >
      <div className="text-xs font-extrabold opacity-60">{post.categorySlug}</div>
      <div className="mt-1 text-lg font-black group-hover:underline">{post.title}</div>
      <div className="mt-2 text-sm font-semibold opacity-75">{post.description}</div>
      {/* readingTime is from contentlayer.config.ts computedFields */}
      <div className="mt-4 text-xs font-extrabold opacity-60">{post.readingTime}</div>
    </a>
  );
}

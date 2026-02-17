import React from "react";

export default function Prose({ mdxSource }: { mdxSource: string }) {
  // Next MDX Rs compiles MDX pages automatically; since we're reading raw MDX,
  // easiest route: treat MDX as content-only and keep formatting in MDX minimal.
  // Industry-leader setup typically uses Contentlayer; this keeps it lean.
  return (
    <div className="prose prose-zinc max-w-none prose-h2:font-black prose-h3:font-extrabold">
      {/* If you want full MDX component rendering: switch to contentlayer or next-mdx-remote */}
      <div dangerouslySetInnerHTML={{ __html: "" }} />
      <p className="text-sm font-semibold opacity-70">
        (Swap this renderer to Contentlayer for full MDX components.)
      </p>
      <pre className="rounded-2xl border border-black/10 bg-white p-5 text-xs overflow-auto">
        {mdxSource}
      </pre>
    </div>
  );
}

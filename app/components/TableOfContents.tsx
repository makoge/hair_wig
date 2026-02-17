export default function TableOfContents({
  toc,
}: {
  toc: { depth: number; text: string; id: string }[];
}) {
  if (!toc.length) return null;
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="text-sm font-extrabold">On this page</div>
      <ul className="mt-3 space-y-2 text-sm font-semibold opacity-80">
        {toc.map((h) => (
          <li key={h.id} style={{ marginLeft: (h.depth - 2) * 12 }}>
            <a className="hover:underline" href={`#${h.id}`}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

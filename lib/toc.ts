export function getTocFromMdx(raw: string) {
  const lines = raw.split("\n");
  const toc: { depth: number; text: string; id: string }[] = [];
  for (const line of lines) {
    const m = /^(##+)\s(.+)$/.exec(line.trim());
    if (!m) continue;
    const depth = m[1].length;
    const text = m[2].replace(/\[|\]|\(|\)/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    toc.push({ depth, text, id });
  }
  return toc;
}

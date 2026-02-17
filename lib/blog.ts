import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Locale = "en" | "fr";

export type BlogCategory =
  | "wig-education"
  | "styling-beauty"
  | "transformations"
  | "hair-loss-solutions"
  | "wig-treatment";

export const CATEGORIES: Record<BlogCategory, { title: Record<Locale, string>; description: Record<Locale, string> }> = {
  "wig-education": {
    title: { en: "Wig Education", fr: "Éducation Perruques" },
    description: { en: "Guides and comparisons to choose the right wig.", fr: "Guides et comparatifs pour choisir la bonne perruque." },
  },
  "styling-beauty": {
    title: { en: "Styling & Beauty", fr: "Coiffure & Beauté" },
    description: { en: "Styles, looks, and tutorials for daily wear.", fr: "Styles, looks et tutoriels au quotidien." },
  },
  transformations: {
    title: { en: "Transformations", fr: "Transformations" },
    description: { en: "Before/after makeovers and inspiration.", fr: "Avant/après et inspiration." },
  },
  "hair-loss-solutions": {
    title: { en: "Hair Loss Solutions", fr: "Solutions Chute de Cheveux" },
    description: { en: "Guidance for alopecia, thinning hair, and chemo.", fr: "Conseils pour alopécie, cheveux clairsemés et chimio." },
  },
  "wig-treatment": {
    title: { en: "Wig Treatment & Care", fr: "Entretien & Soin" },
    description: { en: "Washing, conditioning, storage, and longevity.", fr: "Lavage, soin, rangement et durée de vie." },
  },
};

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO
  category: BlogCategory;
  tags?: string[];
  canonical?: string;
  updated?: string;
};

export type Post = {
  locale: Locale;
  slug: string[]; // [category, post-slug]
  url: string;    // /{locale}/blog/{category}/{post}
  frontmatter: PostFrontmatter;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(p));
    else if (e.isFile() && p.endsWith(".mdx")) files.push(p);
  }
  return files;
}

export function getAllPosts(locale: Locale): Post[] {
  const localeDir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) return [];

  const files = walk(localeDir);

  const posts = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    const rel = path.relative(localeDir, filePath).replace(/\\/g, "/");
    const parts = rel.replace(/\.mdx$/, "").split("/"); // [category, slug]
    const category = parts[0] as BlogCategory;

    const fm = data as PostFrontmatter;
    if (!fm.title || !fm.description || !fm.date || !fm.category) {
      throw new Error(`Missing frontmatter in ${locale}/${rel}`);
    }

    const url = `/${locale}/blog/${parts.join("/")}`;

    return {
      locale,
      slug: parts,
      url,
      frontmatter: { ...fm, category },
      content,
    };
  });

  return posts.sort(
    (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date),
  );
}

export function getPostBySlug(locale: Locale, slug: string[]): Post | null {
  const posts = getAllPosts(locale);
  return posts.find((p) => p.slug.join("/") === slug.join("/")) ?? null;
}

export function getPostsByCategory(locale: Locale, category: BlogCategory): Post[] {
  return getAllPosts(locale).filter((p) => p.frontmatter.category === category);
}

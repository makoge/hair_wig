"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useCart } from "@/app/context/CartContext";
import { products, type Category } from "@/app/data/products";

type ProductCategory = Category;

// ---------- safe i18n (prevents MISSING_MESSAGE crashes) ----------
function useSafeTranslations(namespace: string) {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = useTranslations(namespace);
    return (key: string, fallback: string) => {
      try {
        const v = t(key);
        return typeof v === "string" ? v : fallback;
      } catch {
        return fallback;
      }
    };
  } catch {
    return (_key: string, fallback: string) => fallback;
  }
}

// ---------- category utils (prevents predicate/type errors) ----------
const ALL_CATEGORIES: readonly Category[] = [
  "human",
  "lace",
  "monofilament",
  "accessories",
] as const;

function isCategory(v: unknown): v is Category {
  return typeof v === "string" && (ALL_CATEGORIES as readonly string[]).includes(v);
}

function getUniqueCategories(): ProductCategory[] {
  const cats = products.map((p) => p.category).filter(isCategory);
  return Array.from(new Set(cats));
}

export default function Header() {
  const locale = useLocale();
  const router = useRouter();
  const { cartCount } = useCart();

  const tt = useSafeTranslations("header");

  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [q, setQ] = useState("");
  const [qMobile, setQMobile] = useState("");

  const navRef = useRef<HTMLDivElement | null>(null);

  const categories = useMemo(() => getUniqueCategories(), []);

  const LABELS: Record<Category, string> = {
    human: tt("catHuman", "Human Hair"),
    lace: tt("catLace", "Lace Wig"),
    monofilament: tt("catMono", "Monofilament"),
    accessories: tt("catAccessories", "Accessories"),
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  // Shrink-on-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuOpen && !submenuOpen) return;
      const el = navRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) closeMenu();
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen, submenuOpen]);

  const goSearch = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    closeMenu();
    router.push(`/${locale}/shop?q=${encodeURIComponent(clean)}`);
  };

  return (
    <header
      className={[
        "sticky top-0 z-1000 border-b border-white/10",
        "bg-[#363434]/95 backdrop-blur supports-backdrop-filter:bg-[#363434]/80",
        scrolled ? "shadow-2xl shadow-black/30" : "shadow-none",
      ].join(" ")}
    >
      <div
        ref={navRef}
        className={[
          "mx-auto max-w-6xl px-4",
          "flex items-center justify-between gap-3",
          scrolled ? "h-[58px]" : "h-[68px]",
          "transition-[height] duration-200",
        ].join(" ")}
      >
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href={`/${locale}`}
            aria-label={tt("home", "Home")}
            onClick={closeMenu}
            className="inline-flex items-center"
          >
            <Image
              src="/img/hair_logo.png"
              width={64}
              height={54}
              alt={tt("logoAlt", "Confida logo")}
              priority
              className="h-[44px] w-auto"
            />
          </Link>
        </div>

        {/* Center: Desktop nav + search */}
        <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
          <nav aria-label={tt("primaryNav", "Primary navigation")}>
            <ul className="flex items-center gap-5 text-sm font-semibold text-white/90">
              <li>
                <Link
                  href={`/${locale}`}
                  onClick={closeMenu}
                  className="rounded-lg px-2 py-1 transition hover:text-white"
                >
                  {tt("home", "Home")}
                </Link>
              </li>

              {/* Products dropdown */}
              <li className="relative">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/shop`}
                    onClick={closeMenu}
                    className="rounded-lg px-2 py-1 transition hover:text-white"
                  >
                    {tt("products", "Products")}
                  </Link>

                  <button
                    type="button"
                    aria-label={tt("toggleCategories", "Toggle categories")}
                    aria-expanded={submenuOpen}
                    onClick={() => setSubmenuOpen((v) => !v)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
                  >
                    +
                  </button>
                </div>

                {submenuOpen ? (
                  <div className="absolute left-1/2 top-[calc(100%+10px)] w-[min(760px,92vw)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#2a2727]/95 p-3 shadow-2xl backdrop-blur">
                    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {categories.map((cat) => (
                        <li key={cat}>
                          <Link
                            href={`/${locale}/categories/${encodeURIComponent(cat)}`}
                            onClick={closeMenu}
                            className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 transition hover:border-[#dda0dd]/30 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
                          >
                            {LABELS[cat]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>

              <li>
                <Link
                  href={`/${locale}/treat_wig`}
                  onClick={closeMenu}
                  className="rounded-lg px-2 py-1 transition hover:text-white"
                >
                  {tt("treatWig", "Treat wig")}
                </Link>
              </li>

              <li>
                <Link
                  href={`/${locale}/contact`}
                  onClick={closeMenu}
                  className="rounded-lg px-2 py-1 transition hover:text-white"
                >
                  {tt("contact", "Contact")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              goSearch(q);
            }}
            className="group relative w-[min(360px,32vw)]"
            role="search"
            aria-label="Site search"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tt("searchPlaceholder", "Search wigs, lace, monofilament…")}
              className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none transition focus:border-[#dda0dd] focus:ring-2 focus:ring-[#dda0dd]/30"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 inline-flex items-center justify-center rounded-full bg-[#dda0dd] px-3 py-1.5 text-xs font-extrabold text-black transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30"
              aria-label="Search"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={tt("toggleMenu", "Toggle menu")}
            aria-controls="primary-navigation-mobile"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30 md:hidden"
          >
            <span className="text-xl leading-none">☰</span>
          </button>

          <Link
            href={`/${locale}/cart`}
            onClick={closeMenu}
            className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-extrabold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25 sm:inline-flex"
            aria-label={`${tt("cart", "Cart")} ${cartCount}`}
          >
            {tt("cart", "Cart")}{" "}
            <span className="ml-2 text-white/70">({cartCount})</span>
          </Link>

          <Link
            href={`/${locale}/contact`}
            onClick={closeMenu}
            className="inline-flex items-center justify-center rounded-full bg-[#dda0dd] px-4 py-2 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30"
          >
            {tt("contactUs", "Contact us")}
          </Link>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="primary-navigation-mobile"
        className={`md:hidden ${
          menuOpen ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-white/10 bg-[#2a2727]/95 backdrop-blur transition-all duration-300`}
      >
        <div className="px-4 py-4">
          {/* Mobile Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              goSearch(qMobile);
            }}
            role="search"
            aria-label="Mobile site search"
            className="mb-3 flex gap-2"
          >
            <input
              value={qMobile}
              onChange={(e) => setQMobile(e.target.value)}
              placeholder={tt("searchPlaceholder", "Search…")}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition focus:border-[#dda0dd] focus:ring-2 focus:ring-[#dda0dd]/30"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-[#dda0dd] px-4 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30"
            >
              Go
            </button>
          </form>

          <ul className="flex flex-col gap-2 text-sm font-semibold text-white/90">
            <li>
              <Link
                href={`/${locale}`}
                onClick={closeMenu}
                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                {tt("home", "Home")}
              </Link>
            </li>

            <li>
              <Link
                href={`/${locale}/shop`}
                onClick={closeMenu}
                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                {tt("products", "Products")}
              </Link>

              <button
                type="button"
                aria-label={tt("toggleCategories", "Toggle categories")}
                aria-expanded={submenuOpen}
                onClick={() => setSubmenuOpen((v) => !v)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/85 transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
              >
                {submenuOpen ? "− " : "+ "}
                {tt("toggleCategories", "Categories")}
              </button>

              {submenuOpen ? (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/${locale}/categories/${encodeURIComponent(cat)}`}
                      onClick={closeMenu}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center text-sm text-white/85 transition hover:border-[#dda0dd]/30 hover:bg-white/10"
                    >
                      {LABELS[cat]}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>

            <li>
              <Link
                href={`/${locale}/treat_wig`}
                onClick={closeMenu}
                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                {tt("treatWig", "Treat wig")}
              </Link>
            </li>

            <li>
              
            </li>

            <li>
              <Link
                href={`/${locale}/cart`}
                onClick={closeMenu}
                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                {tt("cart", "Cart")}{" "}
                <span className="text-white/70">({cartCount})</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

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

// ---------- category utils ----------
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

function swapLocaleInPath(pathname: string, nextLocale: string) {
  // replaces leading /en or /fr with next locale; if missing, prefixes it
  if (/^\/(en|fr)(\/|$)/.test(pathname)) {
    return pathname.replace(/^\/(en|fr)(?=\/|$)/, `/${nextLocale}`);
  }
  return `/${nextLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
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

  // language dropdown
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

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

  const goSearch = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    closeMenu();
    router.push(`/${locale}/shop?q=${encodeURIComponent(clean)}`);
  };

  const changeLanguage = (nextLocale: "en" | "fr") => {
    setLangOpen(false);
    closeMenu();

    const pathname = window.location.pathname;
    const search = window.location.search;
    const nextPath = swapLocaleInPath(pathname, nextLocale);
    router.push(`${nextPath}${search}`);
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
      if (e.key === "Escape") {
        closeMenu();
        setLangOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close when clicking outside (menu/submenu)
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Node)) return;

      // close language dropdown
      if (langOpen && langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false);
      }

      // close menu/submenu
      if (!menuOpen && !submenuOpen) return;
      const el = navRef.current;
      if (!el) return;
      if (!el.contains(target)) closeMenu();
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen, submenuOpen, langOpen]);

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
    onClick={() => {
      closeMenu();
      setLangOpen(false);
    }}
    className="group relative flex items-center"
  >
    {/* Soft glow behind logo */}
    <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#dda0dd]/25 to-transparent blur-xl opacity-70 transition group-hover:opacity-100" />

    {/* Glass container */}
    <span className="relative flex items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md transition group-hover:bg-white/10">
      <Image
        src="/img/hair_logo.png"
        width={80}
        height={60}
        alt={tt("logoAlt", "Confida logo")}
        priority
        className="h-[40px] w-auto object-contain drop-shadow-lg"
      />
    </span>
  </Link>
</div>


        {/* Center: Desktop nav + search */}
        <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
          <nav aria-label={tt("primaryNav", "Primary navigation")}>
            <ul className="flex items-center gap-5 text-sm font-semibold text-white/90">
              <li>
                <Link
                  href={`/${locale}`}
                  onClick={() => {
                    closeMenu();
                    setLangOpen(false);
                  }}
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
                    onClick={() => {
                      closeMenu();
                      setLangOpen(false);
                    }}
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
                            onClick={() => {
                              closeMenu();
                              setLangOpen(false);
                            }}
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
    href={`/${locale}/tools`}
    onClick={() => {
      closeMenu();
      setLangOpen(false);
    }}
    className="rounded-lg px-2 py-1 transition hover:text-white"
  >
    {tt("tools", "Tools")}
  </Link>
</li>


              {/* ✅ Removed center-menu Contact link on purpose */}
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
            onClick={() => {
              setMenuOpen((v) => !v);
              setLangOpen(false);
            }}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30 md:hidden"
          >
            <span className="text-xl leading-none">☰</span>
          </button>

          {/* Language dropdown */}
          <div ref={langRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-extrabold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
            >
              {locale.toUpperCase()}
              <span className="text-white/70">▾</span>
            </button>

            {langOpen ? (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-36 overflow-hidden rounded-2xl border border-white/10 bg-[#2a2727]/95 shadow-2xl backdrop-blur"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => changeLanguage("en")}
                  className={[
                    "w-full px-4 py-3 text-left text-sm font-bold transition",
                    "hover:bg-white/10",
                    locale === "en" ? "text-white" : "text-white/80",
                  ].join(" ")}
                >
                  English
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => changeLanguage("fr")}
                  className={[
                    "w-full px-4 py-3 text-left text-sm font-bold transition",
                    "hover:bg-white/10",
                    locale === "fr" ? "text-white" : "text-white/80",
                  ].join(" ")}
                >
                  Français
                </button>
              </div>
            ) : null}
          </div>

          <Link
            href={`/${locale}/cart`}
            onClick={() => {
              closeMenu();
              setLangOpen(false);
            }}
            className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-extrabold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25 sm:inline-flex"
            aria-label={`${tt("cart", "Cart")} ${cartCount}`}
          >
            {tt("cart", "Cart")}{" "}
            <span className="ml-2 text-white/70">({cartCount})</span>
          </Link>

          {/* ✅ Keep Contact us at the extreme right */}
          <Link
            href={`/${locale}/contact`}
            onClick={() => {
              closeMenu();
              setLangOpen(false);
            }}
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
          {/* Mobile language dropdown (simple) */}
          <div className="mb-3 flex gap-2">
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className={[
                "flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold transition",
                locale === "en" ? "text-white" : "text-white/75 hover:text-white",
              ].join(" ")}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("fr")}
              className={[
                "flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold transition",
                locale === "fr" ? "text-white" : "text-white/75 hover:text-white",
              ].join(" ")}
            >
              FR
            </button>
          </div>

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
                onClick={() => {
                  closeMenu();
                  setLangOpen(false);
                }}
                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                {tt("home", "Home")}
              </Link>
            </li>

            <li>
              <Link
                href={`/${locale}/shop`}
                onClick={() => {
                  closeMenu();
                  setLangOpen(false);
                }}
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
                      onClick={() => {
                        closeMenu();
                        setLangOpen(false);
                      }}
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
    href={`/${locale}/tools`}
    onClick={() => {
      closeMenu();
      setLangOpen(false);
    }}
    className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
  >
    {tt("tools", "Tools")}
  </Link>
</li>


            <li>
              <Link
                href={`/${locale}/cart`}
                onClick={() => {
                  closeMenu();
                  setLangOpen(false);
                }}
                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                {tt("cart", "Cart")}{" "}
                <span className="text-white/70">({cartCount})</span>
              </Link>
            </li>

            {/* ✅ Contact stays (mobile) */}
            <li>
              <Link
                href={`/${locale}/contact`}
                onClick={() => {
                  closeMenu();
                  setLangOpen(false);
                }}
                className="block rounded-xl bg-[#dda0dd] px-4 py-3 text-center text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:bg-white"
              >
                {tt("contactUs", "Contact us")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

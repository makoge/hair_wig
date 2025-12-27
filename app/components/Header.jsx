"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/app/context/CartContext";
import { products } from "@/app/data/products";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();

  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  // translated category labels
  const LABELS = {
    human: t("catHuman"),
    lace: t("catLace"),
    monofilament: t("catMono"),
    accessories: t("catAccessories")
  };

  return (
    <header>
      {/* LEFT LOGO */}
      <div className="header-left">
        <Image
          src="/img/hair_logo.png"
          width={60}
          height={50}
          alt={t("logoAlt")}
          onClick={() => (window.location.href = `/${locale}`)}
          style={{ cursor: "pointer" }}
          priority
        />
      </div>

      {/* MOBILE MENU WRAPPER */}
      <div className="mobile-menu-wrapper">
        <button
          className="menu-toggle"
          aria-label={t("toggleMenu")}
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
        >
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link href={`/${locale}`} onClick={closeMenu}>
                {t("home")}
              </Link>
            </li>

            {/* DROPDOWN */}
            <li className="dropdown">
              <div className="submenu-wrapper">
                <Link href={`/${locale}/shop`} className="dropbtn" onClick={closeMenu}>
                  {t("products")}
                </Link>

                <button
                  className="submenu-toggle"
                  aria-label={t("toggleCategories")}
                  onClick={() => setSubmenuOpen((v) => !v)}
                  type="button"
                >
                  +
                </button>
              </div>

              <div className={`dropdown-content ${submenuOpen ? "open" : ""}`}>
                <ul>
                  {categories.map((cat) => (
                    <li key={cat}>
                      <Link href={`/${locale}/categories/${cat}`} onClick={closeMenu}>
                        {LABELS[cat] ?? cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <Link href={`/${locale}/treat_wig`} onClick={closeMenu}>
                {t("treatWig")}
              </Link>
            </li>

            <li>
              <Link href={`/${locale}/contact`} onClick={closeMenu}>
                {t("contact")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className="header-right">
        <Link className="bts" href={`/${locale}/cart`} onClick={closeMenu}>
          {t("cart")} ({cartCount})
        </Link>

        <button type="button" onClick={() => (window.location.href = `/${locale}/contact`)}>
          {t("contactUs")}
        </button>
      </div>
    </header>
  );
}




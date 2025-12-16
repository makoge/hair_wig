"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { products } from "@/app/data/products";

const LABELS = {
  human: "Human Hair",
  lace: "Lace Wig",
  monofilament: "Monofilament",
  accessories: "Accessories",
};

export default function Header() {
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

  return (
    <header>
      {/* LEFT LOGO */}
      <div className="header-left">
        <Image
          src="/img/hair_logo.png"
          width={60}
          height={50}
          alt="Confida logo"
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
          priority
        />
      </div>

      {/* MOBILE MENU WRAPPER */}
      <div className="mobile-menu-wrapper">
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link href="/" onClick={closeMenu}>
                Home
              </Link>
            </li>

            {/* DROPDOWN */}
            <li className="dropdown">
              <div className="submenu-wrapper">
                <Link href="/shop" className="dropbtn" onClick={closeMenu}>
                  Products
                </Link>

                <button
                  className="submenu-toggle"
                  aria-label="Toggle product categories"
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
                      <Link href={`/categories/${cat}`} onClick={closeMenu}>
                        {LABELS[cat] ?? cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <Link href="/treat_wig" onClick={closeMenu}>
                Treat wig
              </Link>
            </li>

            <li>
              <Link href="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className="header-right">
        <Link className="bts" href="/cart" onClick={closeMenu}>
          cart({cartCount})
        </Link>

        <button type="button" onClick={() => (window.location.href = "/contact")}>
          contact us
        </button>
      </div>
    </header>
  );
}


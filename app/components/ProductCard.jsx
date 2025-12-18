"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const {
    id,
    name,
    price,
    badge,
    length,
    texture,
    colors = [],
    slug,
    image,
    colorImages = {},
  } = product;

  const defaultColor = useMemo(() => colors[0] || "", [colors]);
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  const activeColor = selectedColor || defaultColor;
  const displayImg =
    activeColor && colorImages?.[activeColor] ? colorImages[activeColor] : image;

  const handleAddToCart = () => {
    addToCart(product, 1, activeColor); // ✅ matches your updated CartContext
  };

  return (
    <article className="product-card">
      <div className="cart-media">
        {badge && <span className="badge">{badge}</span>}
        <img src={displayImg} alt={name} />
      </div>

      <div className="cart-body">
        <div className="title-row">
          <h3 className="title">{name}</h3>
          <span className="price">€{price}</span>
        </div>

        <div className="meta">
          {length && <span>{length}</span>}
          {length && texture && <span className="dot-sep" />}
          {texture && <span>{texture}</span>}
        </div>

        {colors.length > 0 && (
          <div className="swatches">
            {colors.map((c) => (
              <button
                key={`${id}-${c}`}
                type="button"
                className={`swatch ${activeColor === c ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setSelectedColor(c)}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button className="btn-product" type="button" onClick={handleAddToCart}>
            Add to cart
          </button>

          <Link href={slug ? `/products/${slug}` : "#"} className="btn-product-ghost">
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}

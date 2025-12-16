"use client";

import Link from "next/link";

export default function ProductCard({ product, selectedColor, onSelectColor, onAddToCart }) {
  const {
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

  const activeColor = selectedColor || colors[0] || "";
  const displayImg = (activeColor && colorImages[activeColor]) ? colorImages[activeColor] : image;

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
                key={c}
                type="button"
                className={`swatch ${activeColor === c ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => onSelectColor?.(product.id, c)}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button className="btn-product" type="button" onClick={() => onAddToCart?.(product, activeColor)}>
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

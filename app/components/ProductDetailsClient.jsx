"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function ProductDetailsClient({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const colors = useMemo(() => product.colors || [], [product]);
  const inStock = !!product.inStock;

  const [selectedColor, setSelectedColor] = useState(() => colors[0] || "");
  const [qty, setQty] = useState(1);

  const clampQty = (n) => {
    const num = Number(n);
    if (!Number.isFinite(num)) return 1;
    return Math.max(1, Math.min(99, Math.floor(num)));
  };

  const dec = () => setQty((q) => clampQty(q - 1));
  const inc = () => setQty((q) => clampQty(q + 1));

  const handleAdd = () => {
    if (!inStock) return;

    // ✅ matches your CartContext signature: (product, qty, selectedColor)
    addToCart(product, qty, selectedColor);
  };

  const handleBuyNow = () => {
    handleAdd();
    if (inStock) window.location.href = "/cart";
  };

  const price = Number(product.price || 0).toFixed(2);

  return (
    <>
      <div className="pd-actions">
        {/* COLORS */}
        {colors.length > 0 && (
          <div className="pd-option">
            <div className="pd-label">Color</div>
            <div className="pd-swatches">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`pd-swatch ${selectedColor === c ? "selected" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setSelectedColor(c)}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>

            {/* Optional: show picked color */}
            {selectedColor && (
              <div className="pd-selected">
                Selected: <span className="pd-chip">{selectedColor}</span>
              </div>
            )}
          </div>
        )}

        {/* QTY */}
        <div className="pd-option">
          <div className="pd-label">Quantity</div>
          <div className="pd-qty">
            <button type="button" className="pd-qtybtn" onClick={dec} disabled={!inStock}>
              −
            </button>

            <input
              className="pd-qtyinput"
              value={qty}
              onChange={(e) => setQty(clampQty(e.target.value))}
              inputMode="numeric"
              aria-label="Quantity"
              disabled={!inStock}
            />

            <button type="button" className="pd-qtybtn" onClick={inc} disabled={!inStock}>
              +
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="pd-ctaRow">
          <button type="button" className="pd-cta" onClick={handleAdd} disabled={!inStock}>
            {inStock ? "Add to cart" : "Out of stock"}
          </button>

          <button type="button" className="pd-cta ghost" onClick={handleBuyNow} disabled={!inStock}>
            Buy now
          </button>
        </div>
      </div>

      {/* STICKY MOBILE BAR */}
      <div className="pd-sticky">
        
        
        <Link className="pd-cta ghost" href="/shop">
            Continue shopping
          </Link>
      </div>
    </>
  );
}

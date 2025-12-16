"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailsClient({ product }) {
  const { addToCart } = useCart();

  const colors = useMemo(() => product.colors || [], [product.colors]);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");

  const inStock = !!product.inStock;

  const clampQty = (n) => Math.max(1, Math.min(99, n));
  const dec = () => setQty((q) => clampQty(q - 1));
  const inc = () => setQty((q) => clampQty(q + 1));

  const handleAdd = () => {
    if (!inStock) return;

    addToCart(
      {
        ...product,
        selectedColor, // keep your option stored in cart item
      },
      qty
    );
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
              onChange={(e) => setQty(clampQty(Number(e.target.value || 1)))}
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

        {/* Optional: show picked color */}
        {selectedColor && (
          <div className="pd-selected">
            Selected: <span className="pd-chip">{selectedColor}</span>
          </div>
        )}
      </div>

      {/* STICKY MOBILE BAR */}
      <div className="pd-sticky">
        <div className="pd-stickyPrice">€{price}</div>
        <button className="pd-stickyBtn" onClick={handleAdd} disabled={!inStock}>
          Add to cart
        </button>
      </div>
    </>
  );
}

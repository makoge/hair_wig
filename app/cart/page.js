"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, cartCount, cartTotal, updateQty, removeFromCart, clearCart } = useCart();

  return (
    <main className="cart-container">
      <h1>Your cart ({cartCount})</h1>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="cart-link">Go to shop</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map(({ id, qty, product }) => (
              <div key={id} className="cart-item">
                <div className="cart-thumb">
                  <Image
                    src={product.image || "/img/img1.jpg"}
                    width={96}
                    height={96}
                    alt={product.name}
                  />
                </div>

                <div className="cart-info">
                  <div className="item-title">{product.name}</div>
                  <div className="item-meta">€{Number(product.price).toFixed(2)}</div>

                  <div className="qty-row">
                    <button className="qty-btn" onClick={() => updateQty(id, qty - 1)} type="button">−</button>
                    <span className="qty-value">{qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(id, qty + 1)} type="button">+</button>

                    <button className="btn-remove" onClick={() => removeFromCart(id)} type="button">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  €{(Number(product.price) * qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <div className="row">
              <span>Items</span>
              <strong>{cartCount}</strong>
            </div>

            <div className="row">
              <span>Total</span>
              <strong>€{cartTotal.toFixed(2)}</strong>
            </div>

            <button className="btn-clear" onClick={clearCart} type="button">
              Clear cart
            </button>

            <Link href="/checkout" className="btn-checkout">Checkout</Link>
            <Link href="/shop" className="cart-link">
              Continue shopping →
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

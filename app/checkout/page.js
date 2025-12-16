"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, cartCount, cartTotal, clearCart } = useCart();

  const total = useMemo(() => Number(cartTotal || 0), [cartTotal]);

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [err, setErr] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    notes: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setCustomer((p) => ({ ...p, [name]: value }));
  };

  const placeOrder = async () => {
    setErr("");
    if (items.length === 0) return setErr("Your cart is empty.");
    if (!customer.name.trim() || !customer.email.trim())
      return setErr("Name and email are required.");

    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items,
          totals: { total, cartCount },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");

      setOrderId(data.orderId);
      clearCart();
    } catch (e) {
      setErr(e.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (orderId) {
    return (
      <main className="checkout">
        <div className="checkout-wrap">
          <h1>Order placed ✅</h1>
          <p className="muted">
            Order ID: <strong>{orderId}</strong>
          </p>
          <p className="muted">We sent a confirmation email to {customer.email}.</p>

          <Link className="btn-checkout" href="/shop">
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  // EMPTY CART
  if (items.length === 0) {
    return (
      <main className="checkout">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link className="btn-checkout" href="/shop">
          Go to shop
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout">
      <div className="checkout-wrap">
        <h1>Checkout</h1>
        <p className="muted">Items: {cartCount}</p>

        <div className="checkout-card">
          <h3>Customer details</h3>

          <div className="checkout-list" style={{ gap: 10 }}>
            <input
              name="name"
              placeholder="Full name *"
              value={customer.name}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="email"
              type="email"
              placeholder="Email *"
              value={customer.email}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={customer.phone}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="country"
              placeholder="Country"
              value={customer.country}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <textarea
              name="notes"
              placeholder="Notes (optional)"
              value={customer.notes}
              onChange={onChange}
              rows={3}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
          </div>

          <h3 style={{ marginTop: 18 }}>Order summary</h3>

          <div className="checkout-list">
            {items.map(({ id, qty, product }) => (
              <div className="checkout-row" key={id}>
                <span>
                  {product.name}
                  {product.selectedColor ? ` (${product.selectedColor})` : ""} × {qty}
                </span>
                <strong>€{(Number(product.price) * qty).toFixed(2)}</strong>
              </div>
            ))}
          </div>

          <div className="checkout-total">
            <span>Total</span>
            <strong>€{total.toFixed(2)}</strong>
          </div>

          {err && <p style={{ color: "#ff4081", marginTop: 10 }}>{err}</p>}

          <button className="btn-checkout" onClick={placeOrder} disabled={loading}>
            {loading ? "Placing order..." : "Place order"}
          </button>

          <Link className="btn-clear" href="/cart">
            Back to cart
          </Link>
        </div>
      </div>
    </main>
  );
}

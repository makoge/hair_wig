"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();

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
    notes: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setCustomer((p) => ({ ...p, [name]: value }));
  };

  const placeOrder = async () => {
    setErr("");

    if (items.length === 0) return setErr(t("errEmptyCart"));
    if (!customer.name.trim() || !customer.email.trim())
      return setErr(t("errNameEmail"));

    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items,
          totals: { total, cartCount }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || t("errCheckoutFailed"));

      setOrderId(data.orderId);
      clearCart();
    } catch (e) {
      setErr(e.message || t("errCheckoutFailed"));
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (orderId) {
    return (
      <main className="checkout">
        <div className="checkout-wrap">
          <h1>{t("successTitle")}</h1>
          <p className="muted">
            {t("orderId")}: <strong>{orderId}</strong>
          </p>
          <p className="muted">{t("emailSent", { email: customer.email })}</p>

          <Link className="btn-checkout" href={`/${locale}/shop`}>
            {t("continueShopping")}
          </Link>
        </div>
      </main>
    );
  }

  // EMPTY CART
  if (items.length === 0) {
    return (
      <main className="checkout">
        <h1>{t("title")}</h1>
        <p>{t("emptyCart")}</p>
        <Link className="btn-checkout" href={`/${locale}/shop`}>
          {t("goToShop")}
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout">
      <div className="checkout-wrap">
        <h1>{t("title")}</h1>
        <p className="muted">
          {t("items")}: {cartCount}
        </p>

        <div className="checkout-card">
          <h3>{t("customerDetails")}</h3>

          <div className="checkout-list" style={{ gap: 10 }}>
            <input
              name="name"
              placeholder={t("fullName")}
              value={customer.name}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="email"
              type="email"
              placeholder={t("email")}
              value={customer.email}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="phone"
              placeholder={t("phone")}
              value={customer.phone}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="address"
              placeholder={t("address")}
              value={customer.address}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="city"
              placeholder={t("city")}
              value={customer.city}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <input
              name="country"
              placeholder={t("country")}
              value={customer.country}
              onChange={onChange}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
            <textarea
              name="notes"
              placeholder={t("notes")}
              value={customer.notes}
              onChange={onChange}
              rows={3}
              style={{ width: "100%", padding: 10, borderRadius: 10 }}
            />
          </div>

          <h3 style={{ marginTop: 18 }}>{t("orderSummary")}</h3>

          <div className="checkout-list">
            {items.map(({ variantKey, qty, selectedColor, product }) => (
              <div className="checkout-row" key={variantKey}>
                <span>
                  {product.name}
                  {selectedColor ? ` (${selectedColor})` : ""} × {qty}
                </span>
                <strong>€{(Number(product.price) * qty).toFixed(2)}</strong>
              </div>
            ))}
          </div>

          <div className="checkout-total">
            <span>{t("total")}</span>
            <strong>€{total.toFixed(2)}</strong>
          </div>

          {err && <p style={{ color: "#ff4081", marginTop: 10 }}>{err}</p>}

          <button className="btn-checkout" onClick={placeOrder} disabled={loading}>
            {loading ? t("placingOrder") : t("placeOrder")}
          </button>

          <Link className="btn-clear" href={`/${locale}/cart`}>
            {t("backToCart")}
          </Link>
        </div>
      </div>
    </main>
  );
}

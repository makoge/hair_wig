"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/app/data/products";

type CartItem = {
  id: string;
  variantKey: string;
  selectedColor?: string;
  qty: number;
  product: Product & { selectedColor?: string };
};

type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  notes: string;
  website: string;
};

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function CheckoutClient(){
  const t = useTranslations("checkout");
  const locale = useLocale();

  const { items, cartCount, cartTotal, clearCart } = useCart() as {
    items: CartItem[];
    cartCount: number;
    cartTotal: number;
    clearCart: () => void;
  };

  const total = useMemo(() => Number(cartTotal || 0), [cartTotal]);

  const [loading, setLoading] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    notes: "",
    website: "",
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.currentTarget;
    setCustomer((p) => ({ ...p, [name]: value }));
  };

  const money = (n: number) => `€${(Number(n) || 0).toFixed(2)}`;

  const placeOrder = async (): Promise<void> => {
    setErr("");

    if (items.length === 0) {
      setErr(t("errEmptyCart"));
      return;
    }

    const name = customer.name.trim();
    const email = customer.email.trim();

    if (!name || !email) {
      setErr(t("errNameEmail"));
      return;
    }

    if (!isEmail(email)) {
      setErr(t("errInvalidEmail") ?? "Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { ...customer, name, email },
          items,
          totals: { total, cartCount },
        }),
      });

      const data = (await res.json()) as { orderId?: string; error?: string };

      if (!res.ok) throw new Error(data?.error || t("errCheckoutFailed"));

      setOrderId(String(data.orderId || ""));
      clearCart();
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("errCheckoutFailed"));
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- SUCCESS -------------------- */
  if (orderId) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black tracking-tight text-[#363434]">
            {t("successTitle")}
          </h1>

          <div className="mt-4 space-y-2 text-sm font-semibold text-[#363434]/75">
            <p>
              {t("orderId")}:{" "}
              <span className="rounded-xl bg-black/5 px-2 py-1 font-extrabold text-[#363434]">
                {orderId}
              </span>
            </p>
            <p>{t("emailSent", { email: customer.email })}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center justify-center rounded-2xl bg-[#dda0dd] px-6 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30"
            >
              {t("continueShopping")}
            </Link>

            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-extrabold text-[#363434] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Back home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* -------------------- EMPTY CART -------------------- */
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black tracking-tight text-[#363434]">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm font-semibold text-[#363434]/70">
            {t("emptyCart")}
          </p>
          <Link
            className="mt-7 inline-flex items-center justify-center rounded-2xl bg-[#dda0dd] px-6 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30"
            href={`/${locale}/shop`}
          >
            {t("goToShop")}
          </Link>
        </div>
      </main>
    );
  }

  /* -------------------- CHECKOUT -------------------- */
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-[#363434]">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm font-semibold text-[#363434]/70">
          {t("items")}: {cartCount}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        {/* LEFT: FORM */}
        <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-[#363434]">
            {t("customerDetails")}
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input
  name="website"
  value={customer.website}
  onChange={onChange}
  className="hidden"
  tabIndex={-1}
  autoComplete="off"
/>

            <input
              name="name"
              placeholder={t("fullName")}
              value={customer.name}
              onChange={onChange}
              className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm font-semibold text-[#363434] outline-none focus:ring-4 focus:ring-[#dda0dd]/25 sm:col-span-2"
              autoComplete="name"
              disabled={loading}
            />

            <input
              name="email"
              type="email"
              placeholder={t("email")}
              value={customer.email}
              onChange={onChange}
              className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm font-semibold text-[#363434] outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
              autoComplete="email"
              inputMode="email"
              disabled={loading}
            />

            <input
              name="phone"
              placeholder={t("phone")}
              value={customer.phone}
              onChange={onChange}
              className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm font-semibold text-[#363434] outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
              autoComplete="tel"
              inputMode="tel"
              disabled={loading}
            />

            <input
              name="address"
              placeholder={t("address")}
              value={customer.address}
              onChange={onChange}
              className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm font-semibold text-[#363434] outline-none focus:ring-4 focus:ring-[#dda0dd]/25 sm:col-span-2"
              autoComplete="street-address"
              disabled={loading}
            />

            <input
              name="city"
              placeholder={t("city")}
              value={customer.city}
              onChange={onChange}
              className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm font-semibold text-[#363434] outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
              autoComplete="address-level2"
              disabled={loading}
            />

            <input
              name="country"
              placeholder={t("country")}
              value={customer.country}
              onChange={onChange}
              className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm font-semibold text-[#363434] outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
              autoComplete="country-name"
              disabled={loading}
            />

            <textarea
              name="notes"
              placeholder={t("notes")}
              value={customer.notes}
              onChange={onChange}
              rows={3}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#363434] outline-none focus:ring-4 focus:ring-[#dda0dd]/25 sm:col-span-2"
              disabled={loading}
            />
          </div>

          {err ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-extrabold text-rose-700">
              {err}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void placeOrder()}
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#dda0dd] px-6 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t("placingOrder") : t("placeOrder")}
            </button>

            <Link
              href={`/${locale}/cart`}
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-extrabold text-[#363434] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {t("backToCart")}
            </Link>
          </div>
        </section>

        {/* RIGHT: SUMMARY */}
        <aside className="h-fit rounded-3xl bg-[#363434] p-6 text-white shadow-lg">
          <h2 className="text-lg font-black">{t("orderSummary")}</h2>

          <div className="mt-4 grid gap-3">
            {items.map(({ variantKey, qty, selectedColor, product }) => (
              <div
                key={variantKey}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-white">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-white/70">
                      {selectedColor ? `Color: ${selectedColor} • ` : ""}
                      Qty: {qty}
                    </p>
                  </div>

                  <p className="text-sm font-black text-white">
                    {money((Number(product.price) || 0) * qty)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm font-extrabold text-white/85">
              <span>{t("items")}</span>
              <span>{cartCount}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm font-extrabold text-white/85">
              <span>{t("total")}</span>
              <span className="text-lg font-black text-white">{money(total)}</span>
            </div>

            <p className="mt-3 text-xs font-semibold text-white/60">
              Taxes & shipping are handled after order confirmation.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}


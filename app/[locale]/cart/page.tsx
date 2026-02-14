"use client";

import Image from "next/image";
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

export default function CartPage(){
  const t = useTranslations("cartPage");
  const locale = useLocale();

  const { items, cartCount, cartTotal, updateQty, removeFromCart, clearCart } =
    useCart() as {
      items: CartItem[];
      cartCount: number;
      cartTotal: number;
      updateQty: (variantKey: string, qty: number) => void;
      removeFromCart: (variantKey: string) => void;
      clearCart: () => void;
    };

  const money = (n: number) => `€${(Number(n) || 0).toFixed(2)}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#363434]">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm font-semibold text-[#363434]/70">
            {cartCount} item{cartCount === 1 ? "" : "s"} in your cart
          </p>
        </div>

        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-extrabold text-[#363434] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {t("continue")}
        </Link>
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <section className="mt-10 rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-black text-[#363434]">{t("empty")}</p>
          <p className="mt-2 text-sm font-semibold text-[#363434]/70">
            Add something beautiful — your future self will thank you.
          </p>

          <Link
            href={`/${locale}/shop`}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#dda0dd] px-6 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30"
          >
            {t("goToShop")}
          </Link>
        </section>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <section className="space-y-4" aria-label="Cart items">
            {items.map(({ variantKey, qty, selectedColor, product }) => {
              const img =
                (selectedColor && product.colorImages?.[selectedColor]) ||
                product.images?.[0] ||
                // fallback for older products
                (product as unknown as { image?: string }).image ||
                "/img/placeholder.jpg";

              const unitPrice = Number(product.price) || 0;
              const lineTotal = unitPrice * (Number(qty) || 0);

              return (
                <article
                  key={variantKey}
                  className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 flex-none overflow-hidden rounded-2xl bg-black/5">
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-base font-black text-[#363434]">
                            {product.name}
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#363434]/70">
                            {money(unitPrice)}
                          </p>

                          {selectedColor ? (
                            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-extrabold text-[#363434]">
                              <span
                                className="h-3 w-3 rounded-full ring-2 ring-black/10"
                                style={{ backgroundColor: selectedColor }}
                              />
                              {t("color")}: {selectedColor}
                            </div>
                          ) : null}
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-extrabold text-[#363434]/60">
                            {t("total")}
                          </p>
                          <p className="text-lg font-black text-[#363434]">
                            {money(lineTotal)}
                          </p>
                        </div>
                      </div>

                      {/* Qty controls */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center rounded-2xl border border-black/10 bg-white px-2 py-1 shadow-sm">
                          <button
                            type="button"
                            className="h-10 w-10 rounded-xl bg-black/5 text-xl font-black text-[#363434] transition hover:bg-black/10"
                            onClick={() => updateQty(variantKey, qty - 1)}
                            aria-label={t("decreaseQty")}
                          >
                            −
                          </button>

                          <span className="mx-3 min-w-10 text-center text-sm font-extrabold text-[#363434]">
                            {qty}
                          </span>

                          <button
                            type="button"
                            className="h-10 w-10 rounded-xl bg-black/5 text-xl font-black text-[#363434] transition hover:bg-black/10"
                            onClick={() => updateQty(variantKey, qty + 1)}
                            aria-label={t("increaseQty")}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(variantKey)}
                          className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-extrabold text-[#363434] transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          {t("remove")}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* Summary */}
          <aside className="sticky top-24 h-fit rounded-3xl border border-black/10 bg-[#363434] p-6 text-white shadow-lg">
            <h2 className="text-lg font-black">Order summary</h2>

            <div className="mt-4 space-y-3 text-sm font-bold text-white/85">
              <div className="flex items-center justify-between">
                <span>{t("items")}</span>
                <span className="font-extrabold text-white">{cartCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>{t("total")}</span>
                <span className="text-lg font-black text-white">
                  {money(cartTotal)}
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs font-semibold text-white/70">
                Taxes & shipping calculated at checkout.
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                href={`/${locale}/checkout`}
                className="inline-flex items-center justify-center rounded-2xl bg-[#dda0dd] px-4 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30"
              >
                {t("checkout")}
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                {t("clear")}
              </button>

              <Link
                href={`/${locale}/shop`}
                className="text-center text-sm font-extrabold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                {t("continue")}
              </Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}


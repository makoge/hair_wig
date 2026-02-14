"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/app/data/products";

type Props = {
  product: Product;
  locale: string;
};

const clampQty = (n: unknown) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return 1;
  return Math.max(1, Math.min(99, Math.floor(num)));
};

export default function ProductDetailsClient({ product, locale }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();

  const colors = useMemo(() => product.colors ?? [], [product.colors]);
  const inStock = Boolean(product.inStock);

  const [selectedColor, setSelectedColor] = useState<string>(() => colors[0] ?? "");
  const [qty, setQty] = useState<number>(1);

  const dec = () => setQty((q) => clampQty(q - 1));
  const inc = () => setQty((q) => clampQty(q + 1));

  const handleAdd = () => {
    if (!inStock) return;
    addToCart(product, qty, selectedColor);
  };

  const handleBuyNow = () => {
    if (!inStock) return;
    addToCart(product, qty, selectedColor);
    router.push(`/${locale}/cart`);
  };

  const price = Number(product.price || 0).toFixed(2);

  return (
    <section className="mt-6 space-y-6 text-[#363434]">
      {/* Price + Stock */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl font-black tracking-tight text-[#363434]">${price}</p>
          <p className="mt-1 text-sm font-semibold text-[#363434]/70">
            {product.capType ? `${product.capType} • ` : ""}
            {product.texture ? product.texture : ""}
          </p>
        </div>

        <span
          className={[
            "rounded-full px-3 py-1 text-xs font-extrabold",
            inStock
              ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-600/30"
              : "bg-rose-500/10 text-rose-700 ring-1 ring-rose-600/30",
          ].join(" ")}
        >
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      {/* Colors */}
      {colors.length > 0 ? (
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-extrabold text-[#363434]">Color</p>

            {selectedColor ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-bold text-[#363434]/80">
                <span
                  className="h-3.5 w-3.5 rounded-full ring-2 ring-black/10"
                  style={{ backgroundColor: selectedColor }}
                />
                Selected
              </span>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {colors.map((c) => {
              const active = selectedColor === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={[
                    "h-9 w-9 rounded-full transition",
                    "ring-2 ring-black/10 hover:scale-[1.03] hover:ring-black/20",
                    active ? "outline outline-2 outline-[#dda0dd] outline-offset-2" : "",
                  ].join(" ")}
                  style={{ backgroundColor: c }}
                  aria-label={`Select color ${c}`}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Quantity */}
      <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
        <p className="text-sm font-extrabold text-[#363434]">Quantity</p>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={dec}
            disabled={!inStock}
            className="h-11 w-11 rounded-xl border border-black/10 bg-black/5 text-xl font-black text-[#363434] transition hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <input
            value={qty}
            onChange={(e) => setQty(clampQty(e.target.value))}
            inputMode="numeric"
            disabled={!inStock}
            aria-label="Quantity"
            className="h-11 w-20 rounded-xl border border-black/10 bg-black/5 text-center text-sm font-extrabold text-[#363434] outline-none ring-[#dda0dd]/40 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <button
            type="button"
            onClick={inc}
            disabled={!inStock}
            className="h-11 w-11 rounded-xl border border-black/10 bg-black/5 text-xl font-black text-[#363434] transition hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!inStock}
          className="w-full rounded-2xl bg-[#dda0dd] px-5 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {inStock ? "Add to cart" : "Out of stock"}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!inStock}
          className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-extrabold text-[#363434] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-black/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Buy now
        </button>
      </div>

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-2">
          <Link
            href={`/${locale}/shop`}
            className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-3 text-center text-sm font-extrabold text-[#363434] shadow-sm"
          >
            Continue shopping
          </Link>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!inStock}
            className="flex-1 rounded-xl bg-[#dda0dd] px-4 py-3 text-sm font-extrabold text-black disabled:opacity-60"
          >
            Add
          </button>
        </div>
      </div>

      <div className="h-16 md:hidden" />
    </section>
  );
}

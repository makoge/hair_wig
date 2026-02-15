"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/app/data/products";

type Props = { product: Product };

function firstImage(product: Product): string {
  return product.images?.[0] ?? product.image ?? "/img/placeholder.jpg";
}

function pickImage(product: Product, color?: string): string {
  if (color && product.colorImages?.[color]) return product.colorImages[color];
  return firstImage(product);
}

export default function ProductCard({ product }: Props) {
  const locale = useLocale();
  const { addToCart } = useCart();

  const href = `/${locale}/products/${product.slug}`;
  const inStock = Boolean(product.inStock);
  const badge = product.badge;

  const colors = useMemo(() => product.colors ?? [], [product.colors]);

  // default color: first color that has a mapped image, else first color, else ""
  const defaultColor = useMemo(() => {
    if (!colors.length) return "";
    const withImg = colors.find((c) => product.colorImages?.[c]);
    return withImg ?? colors[0];
  }, [colors, product.colorImages]);

  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);

  const img = pickImage(product, selectedColor);

  const handleAdd = () => {
    if (!inStock) return;
    addToCart(product, 1, selectedColor || product.colors?.[0] || "");
  };

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-[#dda0dd]/30">
      {/* Badge */}
      {badge ? (
        <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-extrabold text-white/90 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#dda0dd]" />
          {badge}
        </div>
      ) : null}

      {/* Stock */}
      <div className="absolute right-4 top-4 z-10">
        <span
          className={[
            "rounded-full px-3 py-1 text-[11px] font-extrabold backdrop-blur",
            inStock
              ? "border border-white/10 bg-white/10 text-white/85"
              : "border border-red-500/30 bg-red-500/10 text-red-200",
          ].join(" ")}
        >
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      {/* Clickable media + info */}
      <Link href={href} className="block" aria-label={product.name}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-black/20">
          <Image
            src={img}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 80vw, 260px"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
        </div>

        <div className="px-1 pb-1 pt-3">
          <h3 className="line-clamp-2 text-sm font-extrabold tracking-tight text-black">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center justify-between gap-3">
            <p className="text-sm font-black text-black/90">
              €{Number(product.price).toFixed(0)}
            </p>

            <span className="rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-bold text-black/70">
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      {/* Color swatches */}
      {colors.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {colors.slice(0, 6).map((c) => {
            const active = c === selectedColor;
            return (
              <button
                key={c}
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // don’t trigger Link navigation
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={[
                  "h-8 w-8 rounded-full transition",
                  "ring-2 ring-black/10 hover:scale-[1.04] hover:ring-black/20",
                  active ? "outline  outline-[#dda0dd] outline-offset-2" : "",
                ].join(" ")}
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
                title="Change color"
              />
            );
          })}

          {/* +N more */}
          {colors.length > 6 ? (
            <span className="ml-1 text-xs font-extrabold text-black/60">
              +{colors.length - 6}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Buttons */}
      <div className="mt-3 grid gap-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!inStock}
          className="w-full rounded-2xl bg-[#dda0dd] py-2.5 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to cart
        </button>

        <Link
          href={href}
          className="w-full rounded-2xl border border-black/10 bg-white py-2.5 text-center text-sm font-extrabold text-black transition hover:-translate-y-0.5 hover:bg-black/5 focus:outline-none focus:ring-4 focus:ring-black/10"
        >
          View details
        </Link>
      </div>
    </article>
  );
}


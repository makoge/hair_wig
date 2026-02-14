"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/app/data/products";

type Props = { product: Product };

function getCardImage(product: Product): string {
  return product.images?.[0] ?? "/img/placeholder.jpg";
}

export default function ProductCard({ product }: Props) {
  const locale = useLocale();
  const { addToCart } = useCart();

  const img = getCardImage(product);
  const badge = product.badge;
  const inStock = Boolean(product.inStock);

  const href = `/${locale}/products/${product.slug}`;

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

      {/* Clickable image + title */}
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
          <h3 className="line-clamp-2 text-sm font-extrabold tracking-tight text-white">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center justify-between gap-3">
            <p className="text-sm font-black text-white/90">
              ${Number(product.price).toFixed(0)}
            </p>

            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-bold text-white/70">
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      {/* Buttons */}
      <div className="mt-3 grid gap-2">
        <button
          type="button"
          onClick={() => inStock && addToCart(product, 1, product.colors?.[0] ?? "")}
          disabled={!inStock}
          className="w-full rounded-2xl bg-[#dda0dd] py-2.5 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to cart
        </button>

        <Link
          href={href}
          className="w-full rounded-2xl border border-white/15 bg-white/5 py-2.5 text-center text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/10"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

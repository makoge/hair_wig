"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/app/context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
};

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();
  const t = useTranslations("cart");

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`${t("addToCart")} ${product.name}`}
      className="
        group relative inline-flex items-center justify-center
        w-full rounded-xl
        bg-[#dda0dd] px-5 py-3
        text-sm font-extrabold text-black
        shadow-lg shadow-[#dda0dd]/20
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 hover:bg-white
        hover:shadow-xl hover:shadow-[#dda0dd]/30
        active:scale-[.98]
        focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30
      "
    >
      <span
        className={`
          transition-all duration-300
          ${added ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
        `}
      >
        {t("addToCart")}
      </span>

      <span
        className={`
          absolute transition-all duration-300
          ${added ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        `}
      >
        ✓ Added
      </span>
    </button>
  );
}


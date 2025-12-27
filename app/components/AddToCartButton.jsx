"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/app/context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const t = useTranslations("cart");

  return (
    <button
      className="btn-product pd-add"
      onClick={() => addToCart(product, 1)}
    >
      {t("addToCart")}
    </button>
  );
}

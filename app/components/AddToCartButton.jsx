"use client";
import { useCart } from "@/app/context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button className="btn-product pd-add" onClick={() => addToCart(product, 1)}>
      Add to cart
    </button>
  );
}

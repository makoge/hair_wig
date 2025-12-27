"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const t = useTranslations("cartPage");
  const locale = useLocale();

  const { items, cartCount, cartTotal, updateQty, removeFromCart, clearCart } =
    useCart();

  return (
    <main className="cart-container">
      <h1>
        {t("title")} ({cartCount})
      </h1>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>{t("empty")}</p>
          <Link href={`/${locale}/shop`} className="cart-link">
            {t("goToShop")}
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map(({ variantKey, qty, selectedColor, product }) => {
              const img =
                (selectedColor && product.colorImages?.[selectedColor]) ||
                product.image ||
                "/img/img1.jpg";

              return (
                <div key={variantKey} className="cart-item">
                  <div className="cart-thumb">
                    <Image src={img} width={96} height={96} alt={product.name} />
                  </div>

                  <div className="cart-info">
                    <div className="item-title">{product.name}</div>
                    <div className="item-meta">
                      €{Number(product.price).toFixed(2)}
                    </div>

                    {selectedColor && (
                      <div className="item-meta">
                        {t("color")}: <strong>{selectedColor}</strong>
                      </div>
                    )}

                    <div className="qty-row">
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(variantKey, qty - 1)}
                        type="button"
                        aria-label={t("decreaseQty")}
                      >
                        −
                      </button>

                      <span className="qty-value">{qty}</span>

                      <button
                        className="qty-btn"
                        onClick={() => updateQty(variantKey, qty + 1)}
                        type="button"
                        aria-label={t("increaseQty")}
                      >
                        +
                      </button>

                      <button
                        className="btn-remove"
                        onClick={() => removeFromCart(variantKey)}
                        type="button"
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    €{(Number(product.price) * qty).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="cart-summary">
            <div className="row">
              <span>{t("items")}</span>
              <strong>{cartCount}</strong>
            </div>

            <div className="row">
              <span>{t("total")}</span>
              <strong>€{cartTotal.toFixed(2)}</strong>
            </div>

            <button className="btn-clear" onClick={clearCart} type="button">
              {t("clear")}
            </button>

            <Link href={`/${locale}/checkout`} className="btn-checkout">
              {t("checkout")}
            </Link>

            <Link href={`/${locale}/shop`} className="cart-link">
              {t("continue")}
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

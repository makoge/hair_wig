"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");

  async function onSubscribe() {
    const clean = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setStatus("error");
      setMsg(t("msgInvalidEmail"));
      return;
    }

    setStatus("loading");
    setMsg("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: clean })
    });

    if (res.ok) {
      setStatus("success");
      setMsg(t("msgSuccess"));
      setEmail("");
    } else {
      setStatus("error");
      setMsg(t("msgError"));
    }
  }

  return (
    <footer className="main-footer">
      <div className="footer-grid">
        {/* FIRST COLUMN */}
        <div className="first-footer">
          <h4>{t("joinTitle")}</h4>

          <div className="subscribe">
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubscribe()}
            />
            <button onClick={onSubscribe} disabled={status === "loading"}>
              {status === "loading" ? t("sending") : t("subscribe")}
            </button>
          </div>

          {msg && <p className={`subscribe-msg ${status}`}>{msg}</p>}

          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" aria-label="instagram" rel="noreferrer">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://x.com" target="_blank" aria-label="x" rel="noreferrer">
              <i className="fab fa-x" />
            </a>
            <a href="https://facebook.com" target="_blank" aria-label="facebook" rel="noreferrer">
              <i className="fab fa-facebook" />
            </a>
            <a href="https://youtube.com" target="_blank" aria-label="youtube" rel="noreferrer">
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>

        {/* SECOND COLUMN */}
        <div className="second-footer">
          <h3>{t("helpTitle")}</h3>
          <ul>
            <li><a href="#">{t("trackOrder")}</a></li>
            <li><Link href={`/${locale}/returns`}>{t("returnsExchange")}</Link></li>
            <li><Link href={`/${locale}/returns`}>{t("changeCancel")}</Link></li>
            <li><Link href={`/${locale}/#reviews`}>{t("customerReviews")}</Link></li>
            <li><Link href={`/${locale}/contact`}>{t("faq")}</Link></li>
          </ul>
        </div>

        {/* THIRD COLUMN */}
        <div className="third-footer">
          <h4>{t("aboutTitle")}</h4>
          <ul>
            <li><a href="#">{t("ourValues")}</a></li>
            <li><a href="#">{t("innovation")}</a></li>
            <li><Link href={`/${locale}/contact`}>{t("support24h")}</Link></li>
            <li><Link href={`/${locale}/#reviews`}>{t("customerReviews")}</Link></li>
            <li><Link href={`/${locale}/contact`}>{t("faq")}</Link></li>
          </ul>
        </div>

        {/* FOURTH COLUMN */}
        <div className="fourth-footer">
          <h4>{t("aboutTitle")}</h4>
          <ul>
            <li><a href="#">{t("ourValues")}</a></li>
            <li><a href="#">{t("innovation")}</a></li>
            <li><Link href={`/${locale}/contact`}>{t("support24h")}</Link></li>
            <li><Link href={`/${locale}/#reviews`}>{t("customerReviews")}</Link></li>
            <li><Link href={`/${locale}/contact`}>{t("faq")}</Link></li>
          </ul>
        </div>
      </div>

      <p className="fifth-footer">{t("copyright", { year: new Date().getFullYear() })}</p>
    </footer>
  );
}


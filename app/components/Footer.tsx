"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState<string>("");

  const year = useMemo(() => new Date().getFullYear(), []);

  async function onSubscribe(): Promise<void> {
    const clean = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setStatus("error");
      setMsg(t("msgInvalidEmail"));
      return;
    }

    setStatus("loading");
    setMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean }),
      });

      if (res.ok) {
        setStatus("success");
        setMsg(t("msgSuccess"));
        setEmail("");
      } else {
        setStatus("error");
        setMsg(t("msgError"));
      }
    } catch {
      setStatus("error");
      setMsg(t("msgError"));
    }
  }

  const msgClass =
    status === "success"
      ? "text-green-400"
      : status === "error"
      ? "text-red-400"
      : "text-white/70";

  return (
    <footer
      aria-label={t("footerAria")}
      className="relative mt-16 overflow-hidden border-t border-white/10 bg-[#141318] text-white"
    >
      {/* soft brand glow */}
      <div
        className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#dda0dd]/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-[#dda0dd]/12 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-14">
        {/* top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1) Subscribe */}
          <section className="lg:col-span-1" aria-label={t("joinTitle")}>
            <h4 className="text-lg font-extrabold">{t("joinTitle")}</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {t("joinDesc") ?? "Get updates, offers and new arrivals."}
            </p>

            <div className="mt-5">
              <label className="sr-only" htmlFor="footer-email">
                {t("emailPlaceholder")}
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="footer-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && void onSubscribe()}
                  className="w-full flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition focus:border-[#dda0dd] focus:ring-2 focus:ring-[#dda0dd]/30"
                />

                <button
                  type="button"
                  onClick={() => void onSubscribe()}
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-xl bg-[#dda0dd] px-5 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? t("sending") : t("subscribe")}
                </button>
              </div>

              {msg ? (
                <p className={`mt-3 text-sm font-semibold ${msgClass}`} role="status" aria-live="polite">
                  {msg}
                </p>
              ) : null}
            </div>

            {/* social */}
            <div className="mt-6 flex items-center gap-4" aria-label={t("socialAria")}>
              {[
                { href: "https://instagram.com", label: "Instagram", icon: "fa-instagram" },
                { href: "https://x.com", label: "X", icon: "fa-x" },
                { href: "https://facebook.com", label: "Facebook", icon: "fa-facebook" },
                { href: "https://youtube.com", label: "YouTube", icon: "fa-youtube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:border-[#dda0dd]/40 hover:bg-white/10 hover:text-white"
                >
                  <i className={`fab ${s.icon}`} />
                </a>
              ))}
            </div>
          </section>

          {/* 2) Help */}
          <nav aria-label={t("helpTitle")} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-base font-extrabold">{t("helpTitle")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/track-order`}>
                  {t("trackOrder")}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/returns`}>
                  {t("returnsExchange")}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/returns`}>
                  {t("changeCancel")}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/reviews`}>
                  {t("customerReviews")}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/contact`}>
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* 3) About */}
          <nav aria-label={t("aboutTitle")} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h4 className="text-base font-extrabold">{t("aboutTitle")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/about`}>
                  {t("ourValues")}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/about`}>
                  {t("innovation")}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/contact`}>
                  {t("support24h")}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/reviews`}>
                  {t("customerReviews")}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/contact`}>
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* 4) Legal (better than duplicate About) */}
          <nav aria-label="Legal" className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h4 className="text-base font-extrabold">Legal</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/privacy-policy`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/terms`}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/shipping`}>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href={`/${locale}/returns`}>
                  Returns Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t("copyright", { year })}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="hover:text-white" href={`/${locale}/privacy-policy`}>
              Privacy
            </Link>
            <Link className="hover:text-white" href={`/${locale}/terms`}>
              Terms
            </Link>
            <Link className="hover:text-white" href={`/${locale}/contact`}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

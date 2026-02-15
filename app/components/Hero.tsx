"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

type HeroProps = {
  locale: string;
};

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/img/intro_background.jpg")' }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />

      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl items-center px-5 py-16 sm:min-h-[84vh]">
        <div className="w-full max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-md sm:p-10">
            
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dda0dd]" />
              {t("brand")}
            </p>

            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              {t("title")}
            </h1>

            <p className="mt-4 text-base text-white/80 sm:text-lg">
              {t("description")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/shop`}
                className="rounded-full bg-[#dda0dd] px-6 py-3 text-sm font-extrabold text-black"
              >
                {t("shop")}
              </Link>

              <Link
                href={`/${locale}/categories/human`}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white"
              >
                {t("explore")}
              </Link>
            </div>

            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-extrabold text-white">
                  {t("naturalTitle")}
                </p>
                <p className="mt-1 text-xs text-white/70">
                  {t("naturalDesc")}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-extrabold text-white">
                  {t("comfortTitle")}
                </p>
                <p className="mt-1 text-xs text-white/70">
                  {t("comfortDesc")}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-extrabold text-white">
                  {t("deliveryTitle")}
                </p>
                <p className="mt-1 text-xs text-white/70">
                  {t("deliveryDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs font-semibold text-white/70">
            {t("footerLine")}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from "next/image";

import HomeFeaturedProducts from "@/app/components/HomeFeaturedProducts";
import HomeReviews from "@/app/components/HomeReviews";
import Lightbox from "@/app/components/Lightbox";
import ContactForm from "@/app/components/ContactForm";

type ScrollDir = -1 | 1;

export default function HomeClient() {
  const t = useTranslations("home");

  const scrollByCards = (dir: ScrollDir) => {
    const track = document.querySelector<HTMLElement>(".sc-track");
    if (!track) return;
    track.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  const allImages = [
    "/img/img1.jpg",
    "/img/hair-wig-confida.jpg",
    "/img/premium-human-hair.jpg",
    "/img/human-hair-in-colors.jpg",
    "/img/img5.jpg",
    "/img/img6.jpg",
  ];

  const [galleryImages, setGalleryImages] = useState<string[]>(allImages);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setGalleryImages(mq.matches ? allImages.slice(0, 4) : allImages);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <main className="bg-[#fdfcfa] text-[#363434]">
      {/* GALLERY */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-xl">
            <h2 className="text-xl font-black tracking-tight">{t("galleryTitle")}</h2>
            <div className="mt-4">
              <Lightbox images={galleryImages} />
            </div>
          </div>

          <aside className="rounded-3xl border border-black/10 bg-white p-7 shadow-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#dda0dd]/15 px-4 py-2 text-xs font-extrabold text-[#363434]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dda0dd]" />
              Confida Lace Hair
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight">{t("beautyTitle")}</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#363434]/75">
              {t("beautyDesc")}
            </p>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#dda0dd]/50 to-transparent" />

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { title: "Natural look", desc: "Realistic finish & hairline." },
                { title: "Comfort fit", desc: "Breathable daily wear." },
                { title: "Fast delivery", desc: "Reliable EU shipping." },
              ].map((x) => (
                <div
                  key={x.title}
                  className="rounded-2xl border border-black/10 bg-[#363434]/[0.03] p-4"
                >
                  <p className="text-sm font-extrabold">{x.title}</p>
                  <p className="mt-1 text-xs font-semibold text-[#363434]/70">{x.desc}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight">{t("featuredTitle")}</h2>
            <p className="mt-1 text-sm font-semibold text-[#363434]/70">
              Premium picks customers love.
            </p>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              aria-label={t("prev")}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              aria-label={t("next")}
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-black/10 bg-white p-4 shadow-xl">
          <HomeFeaturedProducts />
        </div>
      </section>

      <HomeReviews />

      {/* CONTACT */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-xl">
            <Image
              src="/img/img4.jpg"
              alt="Premium human hair wig styling example - Confida Lace Hair"
              width={900}
              height={1100}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}


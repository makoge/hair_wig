"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contactInfo");

  return (
    <main className="bg-[#fdfcfa] text-[#2a2a2a]">
      {/* Header Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-4xl font-black tracking-tight text-[#363434]">
          {t("title")}
        </h1>

        <div className="mt-8 space-y-2 text-sm font-semibold text-[#363434]/80">
          <p>
            {t("phone")}:{" "}
            <a
              href="tel:+54535637"
              className="font-bold text-[#dda0dd] hover:underline"
            >
              54535637
            </a>
          </p>

          <p>
            {t("email")}:{" "}
            <a
              href="mailto:manuvago@gmail.com"
              className="font-bold text-[#dda0dd] hover:underline"
            >
              manuvago@gmail.com
            </a>
          </p>

          <p>
            {t("address")}:{" "}
            <span className="font-bold">Witoskila V8</span>
          </p>
        </div>
      </section>

      {/* Contact + Image Section */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/img/img4.jpg"
            alt={t("imageAlt")}
            width={800}
            height={1000}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}

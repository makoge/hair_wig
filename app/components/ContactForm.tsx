"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contactForm");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // ✅ Honeypot check (bots fill hidden fields)
    if (formData.get("website")) {
      setStatus("success");
      return; // silently ignore bot
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setMessage(t("success"));
      form.reset();
    } catch {
      setStatus("error");
      setMessage(t("error"));
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-3xl border border-white/10 bg-black/25 p-8 shadow-2xl backdrop-blur-md transition"
    >
      <h3 className="mb-6 text-2xl font-extrabold text-white">
        {t("title")}
      </h3>

      {/* Honeypot (hidden from humans) */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* NAME */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-white/80">
          {t("nameLabel")}
        </label>
        <input
          required
          name="name"
          placeholder={t("namePlaceholder")}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#dda0dd] focus:ring-2 focus:ring-[#dda0dd]/30"
        />
      </div>

      {/* EMAIL */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-white/80">
          {t("emailLabel")}
        </label>
        <input
          required
          type="email"
          name="email"
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#dda0dd] focus:ring-2 focus:ring-[#dda0dd]/30"
        />
      </div>

      {/* MESSAGE */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-white/80">
          {t("messageLabel")}
        </label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#dda0dd] focus:ring-2 focus:ring-[#dda0dd]/30"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-[#dda0dd] py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30 disabled:opacity-60"
      >
        {status === "loading" ? t("sending") : t("send")}
      </button>

      {/* STATUS */}
      {status !== "idle" && (
        <p
          className={`mt-4 text-sm font-semibold ${
            status === "success"
              ? "text-green-400"
              : status === "error"
              ? "text-red-400"
              : "text-white/70"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}


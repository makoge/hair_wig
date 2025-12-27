"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(t("sending"));
    // ...rest same
  }

  return (
    <form id="contact-form" onSubmit={onSubmit}>
      <h3>{t("title")}</h3>

      <label htmlFor="name">{t("nameLabel")}</label>
      <input id="name" name="name" placeholder={t("namePlaceholder")} />

      <label htmlFor="email">{t("emailLabel")}</label>
      <input id="email" name="email" placeholder={t("emailPlaceholder")} />

      <label htmlFor="message">{t("messageLabel")}</label>
      <textarea id="message" name="message" placeholder={t("messagePlaceholder")} />

      <button type="submit" className="ctf-button">{t("send")}</button>

      {status && <div id="form-status" style={{ marginTop: 10, color: "#ff4081" }}>{status}</div>}
    </form>
  );
}

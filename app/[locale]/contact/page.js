"use client";

import {useTranslations} from "next-intl";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contactInfo");

  return (
    <main>
      <section className="contact-page">
        <h2>{t("title")}</h2>
        <p>{t("phone")}: 54535637</p>
        <p>{t("address")}: witoskila v8</p>
        <p>{t("email")}: manuvago@gmail.com</p>
      </section>

      <section className="contact-container">
        <div className="contact-img">
          <img src="/img/img4.jpg" alt={t("imageAlt")} />
        </div>

        <div className="right-contact">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}

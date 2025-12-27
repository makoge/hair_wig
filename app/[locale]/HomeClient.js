"use client";

import {useTranslations} from "next-intl";
import { useEffect, useState } from "react";
import HomeFeaturedProducts from "@/app/components/HomeFeaturedProducts";
import HomeReviews from "@/app/components/HomeReviews";
import Lightbox from "@/app/components/Lightbox";
import ContactForm from "@/app/components/ContactForm";


export default function HomeClient() {

      const t = useTranslations("home");
      
      const scrollByCards = (dir) => {
      const track = document.querySelector(".sc-track");
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
      "/img/confida-hair-wig.jpg",
      "/img/straight-hair-wig.jpg",
      "/img/hair-wigs.jpg",
        ];

    const [galleryImages, setGalleryImages] = useState(allImages);

  useEffect(() => {
  const mq = window.matchMedia("(max-width: 768px)");

  const apply = () => {
    setGalleryImages(mq.matches ? allImages.slice(0, 6) : allImages);
  };

  apply(); // run immediately
  mq.addEventListener("change", apply);

  return () => mq.removeEventListener("change", apply);
}, []);



  return (
    <>
       
      <main>
        {/* HERO */}
        <section className="intro">
  <div className="intro-left">
    <h1>{t("heroTitle")}</h1>
    <p>{t("heroDesc")}</p>
    <button
      className="intro-button shop-button"
      onClick={() => (window.location.href = "/shop")}
    >
      {t("shopHere")}
    </button>
  </div>
</section>

        {/* GALLERY + TEXT */}
        <section className="gallery-container">
  <div className="left-gallery">
    <h2>{t("galleryTitle")}</h2>
    <Lightbox images={galleryImages} />
  </div>

  <div className="intro-para">
    <h2>{t("beautyTitle")}</h2>
    <p>{t("beautyDesc")}</p>
  </div>
</section>


        {/* WHY CHOOSE US */}
        <section className="capture">
  <h2>{t("whyTitle")}</h2>

  <div className="capture-cards">
    <div className="capture-card">
      <div className="card-header">
       <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="card-icon"
                >
                  <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                  <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                  <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                </svg>
        <h3>{t("fastDeliveryTitle")}</h3>
      </div>
      <p>{t("fastDeliveryDesc")}</p>
    </div>

    <div className="capture-card">
      <div className="card-header">
        <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="card-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75           3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                    clipRule="evenodd"
                  />
                </svg>
        <h3>{t("qualityTitle")}</h3>
      </div>
      <p>{t("qualityDesc")}</p>
    </div>

    <div className="capture-card">
      <div className="card-header">
        <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="card-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
        <h3>{t("trustedTitle")}</h3>
      </div>
      <p>{t("trustedDesc")}</p>
    </div>
  </div>
</section>

        {/* FEATURED PRODUCTS CAROUSEL – markup only, JS later */}
        <section className="product-carousel" aria-label={t("featuredAria")}>
  <h2>{t("featuredTitle")}</h2>

  <div className="sc-viewport">
    <button
      className="sc-nav sc-prev"
      onClick={() => scrollByCards(-1)}
      aria-label={t("prev")}
    >
      ‹
    </button>

    <HomeFeaturedProducts />

    <button
      className="sc-nav sc-next"
      onClick={() => scrollByCards(1)}
      aria-label={t("next")}
    >
      ›
    </button>
  </div>
</section>

       
          <HomeReviews />
       
          
        {/* QUICK BUY SECTION */}
        <section className="quick-buy">
  <div className="qb-item qb-left">
    <div className="qb-overlay">
      <h2>{t("quickBuyFrontal")}</h2>
      <button
        className="qb-btn"
        onClick={() => (window.location.href = "/shop")}
      >
        {t("quickBuy")}
      </button>
    </div>
  </div>

  <div className="qb-item qb-right">
    <div className="qb-overlay">
      <h2>{t("quickBuyAccessories")}</h2>
      <button
        className="qb-btn"
        onClick={() => (window.location.href = "/products/accessories")}
      >
        {t("shopAccessories")}
      </button>
    </div>
  </div>
</section>


        {/* CONTACT SECTION */}
        <section className="contact-container">
                <div className="contact-img">
                  <img src="/img/img4.jpg" alt={t("imageAlt")} />
                </div>
        
                <div className="right-contact">
                  <ContactForm />
                </div>
              </section>
      </main>

      
    </>
  );
}

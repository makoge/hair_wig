
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CartProvider } from "@/app/context/CartContext";
import Script from "next/script";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Confida Hair Saloon",
  description: "Quality luxury wigs at affordable prices."
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M83GGF0D8R"
          strategy="afterInteractive"
        />

        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M83GGF0D8R');
          `}
        </Script>
      </head>

      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <Header />
            {children}
            <Analytics />
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

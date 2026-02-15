import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CartProvider } from "@/app/context/CartContext";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://confida.shop"),
  title: {
    default: "Confida Lace Hair",
    template: "%s | Confida Lace Hair",
  },
  description: "Premium human hair wigs and monofilament wigs.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  let messages: Record<string, any>;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Confida Lace Hair",
    url: "https://confida.shop",
    logo: "https://confida.shop/img/hair_logo.png",
  };

  return (
    
       <NextIntlClientProvider locale={locale} messages={messages}>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

       
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      
    
  );
}




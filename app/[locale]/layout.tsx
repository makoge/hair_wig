import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CartProvider } from "@/app/context/CartContext";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  let messages: Record<string, any>;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CartProvider>
        <Header />
        {children}
        <Footer />
      </CartProvider>
    </NextIntlClientProvider>
  );
}



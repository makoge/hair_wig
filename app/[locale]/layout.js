
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import Script from "next/script";


export const metadata = {
  title: "Confida Hair Saloon",
  description: "Quality luxury wigs at affordable prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
        <CartProvider>
        <Header/>
        {children}
        <Analytics/>
        <Footer/>
        </CartProvider>
        </body>
    </html>
  );
}

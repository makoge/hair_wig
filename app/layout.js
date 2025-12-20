
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

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
      </head>
      <body>
        <CartProvider>
        <Header/>
        {children}
        <Footer/>
        </CartProvider>
        </body>
    </html>
  );
}

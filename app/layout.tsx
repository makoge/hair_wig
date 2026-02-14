import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Premium Human Hair Wigs & Monofilament Wigs | Confida Lace Hair",
    template: "%s | Confida Lace Hair",
  },
  description:
    "Shop premium human hair wigs, lace front wigs, and monofilament wigs at Confida Lace Hair. Natural look, breathable comfort, and luxury quality at affordable prices.",
  metadataBase: new URL("https://confida.shop"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


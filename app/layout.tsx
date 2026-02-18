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
   verification: {
    other: {
       "msvalidate.01":"F92AC11091A9F71912C4635E1FCF1FDE",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


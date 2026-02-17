import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.8.103", "localhost"],

  pageExtensions: ["ts", "tsx", "mdx"],
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withNextIntl(withMDX(nextConfig));

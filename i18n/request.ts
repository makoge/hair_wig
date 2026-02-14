import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, defaultLocale, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // ✅ requestLocale is a Promise in your setup — do NOT do requestLocale()
  const maybeLocale = await requestLocale;

  const locale: Locale =
    (locales as readonly string[]).includes(maybeLocale ?? "")
      ? (maybeLocale as Locale)
      : defaultLocale;

  if (!locale) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

import Link from "next/link";

type HeroProps = {
  locale: string; // pass from your server page/layout
  title: string;
  description: string;
  buttonLabel: string;
};

export default function Hero({ locale, title, description, buttonLabel }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/img/intro_background.jpg")' }}
        aria-hidden="true"
      />

      {/* Dark overlay + gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25"
        aria-hidden="true"
      />

      {/* Soft brand glows */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#dda0dd]/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-[#dda0dd]/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl items-center px-5 py-16 sm:min-h-[84vh]">
        <div className="w-full max-w-3xl">
          {/* Glass card */}
          <div className="animate-fadeUp rounded-3xl border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-md sm:p-10">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dda0dd]" />
              Confida Lace Hair
            </p>

            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              {title}
            </h1>

            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/${locale}/shop`}
                className="inline-flex items-center justify-center rounded-full bg-[#dda0dd] px-6 py-3 text-sm font-extrabold text-black shadow-lg shadow-[#dda0dd]/20 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/30"
              >
                {buttonLabel}
              </Link>

              <Link
                href={`/${locale}/categories/human`}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white/90 backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/15"
              >
                Explore Human Hair Wigs
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-extrabold text-white">Natural look</p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  Premium hairlines & realistic finish.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-extrabold text-white">Comfort fit</p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  Breathable caps for daily wear.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-extrabold text-white">Fast delivery</p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  Reliable shipping & support.
                </p>
              </div>
            </div>
          </div>

          {/* tiny premium detail */}
          <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-white/70">
            <span className="h-px w-10 bg-white/20" />
            <span>Premium wigs • Secure checkout • EU delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}

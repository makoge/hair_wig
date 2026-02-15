"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  productName: string;
  hero: string;
  thumbs: string[];
};

// Event name used to sync with ProductDetailsClient
const EVENT_NAME = "confida:color-change";

export default function ProductMediaClient({ productName, hero, thumbs }: Props) {
  const allThumbs = useMemo(() => thumbs.length ? thumbs : [hero], [thumbs, hero]);
  const [active, setActive] = useState<string>(hero);

  // Listen for color change events from ProductDetailsClient
  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ image?: string }>).detail;
      if (detail?.image) setActive(detail.image);
    };

    window.addEventListener(EVENT_NAME, onChange as EventListener);
    return () => window.removeEventListener(EVENT_NAME, onChange as EventListener);
  }, []);

  // Keep active image valid if thumbs change
  useEffect(() => {
    if (!allThumbs.includes(active)) setActive(allThumbs[0] ?? hero);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allThumbs.join("|")]);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={active}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 92vw, 520px"
            priority
          />
        </div>
      </div>

      {allThumbs.length > 1 ? (
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {allThumbs.map((src) => {
            const isActive = src === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(src)}
                className={[
                  "relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm transition",
                  isActive
                    ? "border-[#dda0dd] ring-4 ring-[#dda0dd]/20"
                    : "border-black/10 hover:border-black/20",
                ].join(" ")}
                aria-label="Change image"
              >
                <Image src={src} alt="" fill className="object-cover" sizes="96px" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  images?: string[];
  altPrefix?: string;
};

type Dir = -1 | 1;

export default function Lightbox({ images = [], altPrefix = "Gallery image" }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const hasImages = images.length > 0;

  const currentImage = useMemo(() => {
    if (activeIndex === null) return null;
    return images[activeIndex] ?? null;
  }, [activeIndex, images]);

  const close = () => setActiveIndex(null);

  const openAt = (i: number) => {
    if (!hasImages) return;
    if (i < 0 || i >= images.length) return;
    setActiveIndex(i);
  };

  const move = (dir: Dir) => {
    if (!hasImages) return;

    setActiveIndex((prev) => {
      const start = prev ?? 0;
      const next = start + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  // Keyboard + lock background scroll when open
  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };

    document.addEventListener("keydown", onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diffX = endX - touchStartX.current;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX < 0) move(1);
      else move(-1);
    }

    touchStartX.current = null;
  };

  return (
    <>
      {/* Thumbnails grid on page */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-[#dda0dd]/30 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
            aria-label={`Open ${altPrefix} ${i + 1}`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={src}
                alt={`${altPrefix} ${i + 1}`}
                fill
                sizes="(max-width: 768px) 45vw, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80"
                aria-hidden="true"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {currentImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={close}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Premium glow */}
            <div
              className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[#dda0dd]/20 blur-3xl"
              aria-hidden="true"
            />

            {/* Main frame */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40">
              {/* Image */}
              <div className="relative aspect-[16/10]">
                <Image
                  src={currentImage}
                  alt={`Expanded ${altPrefix} ${activeIndex + 1}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 95vw, 900px"
                  className="object-contain"
                />
              </div>

              {/* Top bar */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold text-white/85 backdrop-blur">
                  {activeIndex + 1} / {images.length}
                </span>

                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-xl font-black text-white/85 backdrop-blur transition hover:bg-black/45 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
                  aria-label="Close preview"
                >
                  ×
                </button>
              </div>

              {/* Arrows */}
              <button
                type="button"
                onClick={() => move(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-2xl font-black text-white/85 backdrop-blur transition hover:bg-black/45 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() => move(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-2xl font-black text-white/85 backdrop-blur transition hover:bg-black/45 focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25"
                aria-label="Next image"
              >
                ›
              </button>

              {/* Thumbnail strip (luxury feel) */}
              <div className="border-t border-white/10 bg-black/20 p-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((src, i) => {
                    const active = i === activeIndex;
                    return (
                      <button
                        key={`lb-${src}-${i}`}
                        type="button"
                        onClick={() => openAt(i)}
                        aria-label={`View ${altPrefix} ${i + 1}`}
                        className={[
                          "relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border transition focus:outline-none focus:ring-4 focus:ring-[#dda0dd]/25",
                          active
                            ? "border-[#dda0dd] shadow-lg shadow-[#dda0dd]/20"
                            : "border-white/10 hover:border-[#dda0dd]/30",
                        ].join(" ")}
                      >
                        <Image
                          src={src}
                          alt={`${altPrefix} ${i + 1}`}
                          fill
                          sizes="80px"
                          className={[
                            "object-cover transition duration-300",
                            active ? "scale-[1.02]" : "opacity-90 hover:opacity-100",
                          ].join(" ")}
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="mt-2 text-center text-xs font-semibold text-white/70">
                  Tip: swipe, use ← →, or press ESC
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}


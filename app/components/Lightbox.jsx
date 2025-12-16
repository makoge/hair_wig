"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function Lightbox({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const touchStartX = useRef(null);

  const goNext = () => {
    setActiveIndex((prev) =>
      prev === null
        ? 0
        : prev === images.length - 1
        ? 0
        : prev + 1
    );
  };

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === null
        ? 0
        : prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  const showNext = (e) => {
    e.stopPropagation();
    goNext();
  };

  const showPrev = (e) => {
    e.stopPropagation();
    goPrev();
  };

  const closeLightbox = () => setActiveIndex(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50; // px

    if (Math.abs(diffX) > threshold) {
      // swipe left → next, swipe right → prev
      if (diffX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    touchStartX.current = null;
  };

  const currentImage =
    activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      {/* THUMBNAILS */}
      <div className="gallery">
        {images.map((src, i) => (
          <div key={i} className="gallery-item">
            <Image
              src={src}
              width={500}
              height={500}
              alt={`Gallery image ${i + 1}`}
              className="gallery-thumb"
              onClick={() => setActiveIndex(i)}
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {currentImage && (
        <div className="lightbox show" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* LEFT ARROW */}
            <span className="lightbox-arrow left" onClick={showPrev}>
              ❮
            </span>

            {/* MAIN IMAGE */}
            <img
              src={currentImage}
              className="lightbox-img"
              alt="expanded"
            />

            {/* RIGHT ARROW */}
            <span className="lightbox-arrow right" onClick={showNext}>
              ❯
            </span>

            <span className="lightbox-close" onClick={closeLightbox}>
              ×
            </span>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/**
 * EventPhotos — cover image for an event card with a full-screen viewer.
 * A photo that fails to load falls back to a quiet icon tile, so a missing
 * file never shows a broken image.
 */
export default function EventPhotos({
  photos,
  title,
  icon,
  aspect = "aspect-[16/10]",
  fit = "cover",
  variant = "cover",
}: {
  photos: string[];
  title: string;
  icon: string;
  aspect?: string;
  /** "contain" keeps the whole image visible (posters, certificates). */
  fit?: "cover" | "contain";
  /** "collage" shows the first photo with a second one overlapping its corner. */
  variant?: "cover" | "collage";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const swipeX = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const usable = photos.filter((p) => !failed[p]);
  const cover = usable[0];

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) =>
        i === null ? i : (i + dir + usable.length) % usable.length
      ),
    [usable.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const markFailed = (src: string) =>
    setFailed((f) => (f[src] ? f : { ...f, [src]: true }));

  return (
    <>
      {variant === "collage" && usable.length > 0 ? (
        <div className={`relative ${aspect}`}>
          {/* Main photo */}
          <button
            type="button"
            onClick={() => setOpen(0)}
            aria-label={`View photos from ${title}`}
            className="group/photo absolute inset-0 cursor-zoom-in overflow-hidden rounded-xl bg-panel"
          >
            <Image
              src={usable[0]}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className={`transition duration-700 group-hover/photo:scale-[1.03] ${
                fit === "contain" ? "object-contain p-2" : "object-cover"
              }`}
              onError={() => markFailed(usable[0])}
            />
          </button>

          {/* Second photo, overlapping the corner like a pinned print */}
          {usable[1] && (
            <button
              type="button"
              onClick={() => setOpen(1)}
              aria-label={`View photo 2 from ${title}`}
              className="group/photo absolute -bottom-4 right-3 aspect-square w-[32%] cursor-zoom-in overflow-hidden rounded-lg border-4 shadow-xl"
              style={{ borderColor: "var(--color-bg)", background: "var(--color-panel)" }}
            >
              <Image
                src={usable[1]}
                alt={`${title}, photo 2`}
                fill
                sizes="15vw"
                className="object-cover transition duration-500 group-hover/photo:scale-105"
                onError={() => markFailed(usable[1])}
              />
              {usable.length > 2 && (
                <span
                  className="absolute inset-0 flex items-center justify-center font-mono text-sm text-heading"
                  style={{ background: "color-mix(in srgb, var(--color-bg), transparent 45%)" }}
                >
                  +{usable.length - 2}
                </span>
              )}
            </button>
          )}
        </div>
      ) : (
      <div className={`relative ${aspect} overflow-hidden bg-panel`}>
        {cover ? (
          <button
            type="button"
            onClick={() => setOpen(0)}
            aria-label={`View photos from ${title}`}
            className="group/photo absolute inset-0 block h-full w-full cursor-zoom-in"
          >
            <Image
              src={cover}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`transition duration-500 group-hover/photo:scale-105 ${
                fit === "contain" ? "object-contain p-3" : "object-cover"
              }`}
              onError={() => markFailed(cover)}
            />
            {usable.length > 1 && (
              <span
                className="absolute bottom-3 right-3 rounded-md px-2 py-1 font-mono text-[0.7rem] text-heading backdrop-blur"
                style={{ background: "color-mix(in srgb, var(--color-bg), transparent 30%)" }}
              >
                <i className="bi bi-images mr-1.5" />
                {usable.length} photos
              </span>
            )}
          </button>
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center text-4xl text-accent/50"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-accent), transparent 88%), transparent 70%)",
            }}
          >
            <i className={`bi ${icon}`} />
          </div>
        )}
      </div>
      )}

      {/* Portal to <body>: the cards tilt in 3D, and a transformed ancestor would
          trap a fixed-position viewer inside the card. */}
      {mounted && open !== null && usable[open] && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photos`}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-xl text-white transition hover:border-accent hover:text-accent sm:right-6 sm:top-6"
          >
            <i className="bi bi-x" />
          </button>

          {usable.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition hover:border-accent hover:text-accent sm:left-6"
              >
                <i className="bi bi-chevron-left" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition hover:border-accent hover:text-accent sm:right-6"
              >
                <i className="bi bi-chevron-right" />
              </button>
            </>
          )}

          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              swipeX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (swipeX.current === null) return;
              const dx = e.changedTouches[0].clientX - swipeX.current;
              swipeX.current = null;
              if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
            }}
          >
            <div className="relative mx-auto h-[70vh] w-full">
              <Image
                src={usable[open]}
                alt={`${title}, photo ${open + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center font-mono text-xs tracking-wide text-body/70">
              {title}
              {usable.length > 1 && ` · ${open + 1} / ${usable.length}`}
            </p>
            {usable.length > 1 && (
              <div className="mt-3 flex justify-center gap-2">
                {usable.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show photo ${i + 1}`}
                    onClick={() => setOpen(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === open ? "w-6 bg-accent" : "w-2.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

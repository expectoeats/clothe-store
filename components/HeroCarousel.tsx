"use client";

import { useEffect, useState } from "react";
import { IMAGES } from "@/lib/data";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {dir === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}

export default function HeroCarousel() {
  const slides = IMAGES.hero;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 4200);
    return () => clearInterval(t);
  }, [slides.length]);

  const go = (n: number) => setActive((n + slides.length) % slides.length);

  return (
    <section className="relative w-full bg-neutral-50 overflow-hidden">
      <div className="relative max-w-[1520px] mx-auto">
        <div
          className="flex transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-full aspect-[1500/600] md:aspect-[1500/560]"
            >
              <img
                src={src}
                alt={`Hero banner ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => go(active - 1)}
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur text-ink grid place-items-center shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:bg-white transition-colors"
          aria-label="Previous"
        >
          <Chevron dir="left" />
        </button>
        <button
          onClick={() => go(active + 1)}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur text-ink grid place-items-center shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:bg-white transition-colors"
          aria-label="Next"
        >
          <Chevron dir="right" />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-white" : "w-2.5 bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

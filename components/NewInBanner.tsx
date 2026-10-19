"use client";

import { useEffect, useRef, useState } from "react";
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

const CONTENT = [
  {
    eyebrow: "MEMBER EXCLUSIVE DROP",
    title: "THE RISE OF THE SYMBIOTE",
    subtitle: "",
    cta: "SHOP NOW",
  },
];

export default function NewInBanner() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollInfo, setScrollInfo] = useState({ canLeft: false, canRight: true });

  const update = () => {
    const t = trackRef.current;
    if (!t) return;
    setScrollInfo({
      canLeft: t.scrollLeft > 4,
      canRight: t.scrollLeft + t.clientWidth < t.scrollWidth - 4,
    });
  };

  useEffect(() => {
    update();
    const t = trackRef.current;
    t?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      t?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir === "left" ? -t.clientWidth * 0.85 : t.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="container-wide py-6 md:py-10">
      <div className="text-center mb-5 md:mb-7">
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-10 bg-ink-3/40" />
          <h2 className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.28em] text-ink">
            New In
          </h2>
          <span className="h-px w-10 bg-ink-3/40" />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          disabled={!scrollInfo.canLeft}
          className="hidden md:grid absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white text-ink shadow-[0_4px_14px_rgba(0,0,0,0.1)] place-items-center disabled:opacity-30 hover:scale-105 transition-all"
          aria-label="Scroll left"
        >
          <Chevron dir="left" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!scrollInfo.canRight}
          className="hidden md:grid absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white text-ink shadow-[0_4px_14px_rgba(0,0,0,0.1)] place-items-center disabled:opacity-30 hover:scale-105 transition-all"
          aria-label="Scroll right"
        >
          <Chevron dir="right" />
        </button>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2"
        >
          {CONTENT.map((c, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-full rounded-2xl overflow-hidden relative group"
            >
              <img
                src={IMAGES.venomBanner}
                alt={c.title}
                className="w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
              <div className="absolute inset-0 flex flex-col justify-center items-start md:items-end px-6 md:px-16 text-white">
                <div className="max-w-xl md:text-right">
                  <div className="text-[10px] md:text-xs font-semibold tracking-[0.28em] uppercase mb-2 md:mb-3 opacity-90">
                    {c.eyebrow}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-[1.05] mb-3 md:mb-5 drop-shadow-lg">
                    {c.title}
                  </h3>
                  <button className="inline-flex items-center gap-2 px-5 md:px-7 py-2.5 md:py-3 bg-white text-ink text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    {c.cta}
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

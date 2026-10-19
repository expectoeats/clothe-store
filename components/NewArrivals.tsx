"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/data";
import { NEW_ARRIVALS } from "@/lib/data";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
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

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill={filled ? "#ff385c" : "none"}
      stroke={filled ? "#ff385c" : "currentColor"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-white/95 backdrop-blur text-[9px] md:text-[10px] font-bold tracking-[0.14em] uppercase text-ink shadow-sm border border-black/5">
      {label}
    </span>
  );
}

function ArrivalCard({ p }: { p: Product }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group relative rounded-xl overflow-hidden bg-white border border-[color:var(--color-line-2)] hover:border-black/10 hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.25)] transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[700ms] ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.badge && <Badge label={p.badge} />}
        </div>
        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur text-ink-3 hover:text-brand grid place-items-center shadow-sm hover:shadow-md transition-all"
          aria-label="Wishlist"
        >
          <HeartIcon filled={liked} />
        </button>
      </div>
      <div className="p-3 md:p-4">
        <div className="text-[11px] md:text-[12px] font-semibold text-ink leading-snug line-clamp-2 min-h-[32px] md:min-h-[36px]">
          {p.title}
        </div>
        <div className="text-[10.5px] md:text-[11px] text-ink-3 mt-1 line-clamp-1">
          {p.subtitle}
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-[13px] md:text-[14px] font-bold text-ink">
            {p.price}
          </span>
          {p.originalPrice && (
            <span className="text-[11px] text-ink-3 line-through">
              {p.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewArrivals() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [info, setInfo] = useState({ l: false, r: true });

  const upd = () => {
    const t = trackRef.current;
    if (!t) return;
    setInfo({ l: t.scrollLeft > 4, r: t.scrollLeft + t.clientWidth < t.scrollWidth - 4 });
  };

  useEffect(() => {
    upd();
    const t = trackRef.current;
    t?.addEventListener("scroll", upd);
    window.addEventListener("resize", upd);
    return () => {
      t?.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
    };
  }, []);

  const items = NEW_ARRIVALS;

  return (
    <section className="container-wide pb-4 md:pb-8">
      <div className="text-center mb-5 md:mb-7">
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-10 bg-ink-3/40" />
          <h2 className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.28em] text-ink">
            New Arrivals
          </h2>
          <span className="h-px w-10 bg-ink-3/40" />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => trackRef.current?.scrollBy({ left: -520, behavior: "smooth" })}
          disabled={!info.l}
          className="hidden md:grid absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-ink shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-[color:var(--color-line)] place-items-center disabled:opacity-25 hover:scale-105 transition-all"
          aria-label="Scroll left"
        >
          <Chevron dir="left" />
        </button>
        <button
          onClick={() => trackRef.current?.scrollBy({ left: 520, behavior: "smooth" })}
          disabled={!info.r}
          className="hidden md:grid absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-ink shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-[color:var(--color-line)] place-items-center disabled:opacity-25 hover:scale-105 transition-all"
          aria-label="Scroll right"
        >
          <Chevron dir="right" />
        </button>

        <div
          ref={trackRef}
          className="flex gap-3 md:gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-3 md:pb-4 -mx-1 px-1"
        >
          {items.map((p) => (
            <div
              key={p.id}
              className="snap-start shrink-0 w-[72%] sm:w-[46%] md:w-[30%] lg:w-[24%] xl:w-[22%]"
            >
              <ArrivalCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

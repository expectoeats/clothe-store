"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { MAIN_PRODUCTS } from "@/lib/data";

const TABS = [
  { label: "TRENDING", active: true },
  { label: "PRINTED" },
  { label: "ANIME" },
  { label: "POLO" },
  { label: "WEEKLY DROP" },
  { label: "BACKPACK" },
  { label: "CULTURE CODE" },
];

const FILTER_PILLS = [
  "T-SHIRTS",
  "SHIRTS",
  "OVERSIZED",
  "ANIME",
  "MARVEL",
  "PRINTED",
  "CULT CLASSICS",
  "POLOS",
];

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill={filled ? "#ff385c" : "none"}
      stroke={filled ? "#ff385c" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden bg-white border border-[color:var(--color-line-2)] hover:border-black/10 hover:shadow-[0_14px_40px_-22px_rgba(0,0,0,0.28)] transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[700ms] ease-out"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {p.badge && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-white/95 backdrop-blur text-[9px] font-bold tracking-[0.14em] uppercase text-ink shadow-sm border border-black/5">
              {p.badge}
            </span>
          )}
          {p.tags && p.tags[0] && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-neutral-900/85 backdrop-blur text-[8px] font-semibold tracking-[0.16em] uppercase text-white">
              {p.tags[0]}
            </span>
          )}
        </div>
        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/92 backdrop-blur text-ink-3 hover:text-brand grid place-items-center shadow-sm hover:shadow-md transition-all"
          aria-label="Wishlist"
        >
          <HeartIcon filled={liked} />
        </button>
        <button
          className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/92 backdrop-blur text-ink-3 hover:text-ink grid place-items-center shadow-sm hover:shadow-md transition-all"
          aria-label="Add"
        >
          <PlusIcon />
        </button>
      </div>
      <div className="p-3 md:p-3.5 flex flex-col gap-1">
        <div className="text-[12px] md:text-[12.5px] font-semibold text-ink leading-snug line-clamp-2 min-h-[34px]">
          {p.title}
        </div>
        <div className="text-[10.5px] text-ink-3 line-clamp-1">{p.subtitle}</div>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-[13px] font-bold text-ink">{p.price}</span>
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

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="container-wide pb-14 md:pb-20">
      <div className="mb-5 md:mb-7 overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-[color:var(--color-line-2)] p-1 min-w-max">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(i)}
              className={`px-3.5 md:px-5 py-2 rounded-full text-[10.5px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-all ${
                i === activeTab
                  ? "bg-ink text-white shadow-sm"
                  : "text-ink-3 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 md:mb-8 overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        <div className="inline-flex flex-wrap items-center gap-2 md:gap-2.5 min-w-max">
          {FILTER_PILLS.map((p, i) => (
            <button
              key={p}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-[10.5px] md:text-[11px] font-semibold tracking-[0.14em] uppercase transition-all ${
                i === 0
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-ink-3 border-[color:var(--color-line)] hover:text-ink hover:border-ink-3"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {MAIN_PRODUCTS.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

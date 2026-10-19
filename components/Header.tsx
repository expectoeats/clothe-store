"use client";

import { useState } from "react";

const NAV = [
  { label: "MEN", active: true },
  { label: "WOMEN", active: false },
  { label: "SNEAKERS", active: false },
];

const MEGA_MEN = [
  {
    heading: "T-SHIRTS",
    items: [
      "Oversized T-Shirts",
      "Regular Fit T-Shirts",
      "Drop Shoulder Tees",
      "Full Sleeve T-Shirts",
      "Polo T-Shirts",
      "Printed T-Shirts",
    ],
  },
  {
    heading: "SHIRTS",
    items: [
      "Oversized Shirts",
      "Regular Fit Shirts",
      "Half Sleeve Shirts",
      "Full Sleeve Shirts",
      "Hawaiian Shirts",
      "Linen Shirts",
    ],
  },
  {
    heading: "BOTTOMS",
    items: [
      "Jeans",
      "Pants & Trousers",
      "Joggers",
      "Shorts",
      "Track Pants",
      "Cargos",
    ],
  },
  {
    heading: "COLLECTIONS",
    items: [
      "Cult Classics",
      "Originals",
      "Sharp Looks",
      "Culture Code",
      "Linen Edit",
      "Outerwear",
    ],
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <path d="M12 19v3" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[color:var(--color-line)]">
      <div className="container-wide">
        <div className="flex items-center gap-3 h-16 md:h-[72px]">
          <button
            className="lg:hidden p-2 -ml-2 text-ink hover:text-brand transition-colors"
            aria-label="Menu"
          >
            <MenuIcon />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.label}
                onMouseEnter={() => setOpen(n.label)}
                onMouseLeave={() => setOpen(null)}
                className={`relative text-[12px] tracking-[0.14em] font-semibold uppercase py-6 transition-colors ${
                  n.active ? "text-ink" : "text-ink-3 hover:text-ink"
                }`}
              >
                {n.label}
                {n.active && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-ink rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <a href="/" className="mx-auto lg:mx-8 flex items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ink to-neutral-700 text-white grid place-items-center">
                <span className="text-[15px] font-black tracking-tight">A</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[19px] font-black tracking-[0.18em] text-ink">
                  ADDY
                </span>
                <span className="text-[9px] font-semibold tracking-[0.28em] text-ink-3 uppercase">
                  Wear Your Story
                </span>
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-2 ml-auto w-full max-w-[460px] h-10 rounded-full bg-[color:var(--color-line-2)] border border-transparent hover:border-[color:var(--color-line)] transition-all px-2">
            <button
              className="p-2 text-ink-3 hover:text-ink shrink-0"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-ink-3 text-ink"
            />
            <div className="flex items-center gap-1 pr-1">
              <button
                className="p-1.5 rounded-full text-ink-3 hover:text-ink hover:bg-white transition-colors"
                aria-label="Voice search"
              >
                <MicIcon />
              </button>
              <button
                className="p-1.5 rounded-full text-ink-3 hover:text-ink hover:bg-white transition-colors"
                aria-label="Image search"
              >
                <CameraIcon />
              </button>
            </div>
          </div>

          <div className="ml-auto md:ml-4 flex items-center gap-1 md:gap-2">
            <button
              className="md:hidden p-2 text-ink hover:text-brand"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <button
              className="p-2 relative text-ink hover:text-brand transition-colors"
              aria-label="Wishlist"
            >
              <HeartIcon />
            </button>
            <button
              className="p-2 relative text-ink hover:text-brand transition-colors"
              aria-label="Account"
            >
              <UserIcon />
            </button>
            <button
              className="p-2 relative text-ink hover:text-brand transition-colors"
              aria-label="Cart"
            >
              <BagIcon />
              <span className="absolute top-1 right-0.5 w-[17px] h-[17px] rounded-full bg-brand text-white text-[10px] font-bold grid place-items-center leading-none">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {open === "MEN" && (
        <div
          className="hidden lg:block border-t border-[color:var(--color-line)] bg-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.15)]"
          onMouseEnter={() => setOpen("MEN")}
          onMouseLeave={() => setOpen(null)}
        >
          <div className="container-wide py-6">
            <div className="grid grid-cols-4 gap-8 max-w-4xl">
              {MEGA_MEN.map((col) => (
                <div key={col.heading}>
                  <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-ink pb-3 border-b border-[color:var(--color-line)] mb-3">
                    {col.heading}
                  </div>
                  <ul className="space-y-2.5">
                    {col.items.map((it) => (
                      <li key={it}>
                        <a
                          href="#"
                          className="text-[13px] text-ink-3 hover:text-ink transition-colors"
                        >
                          {it}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-line)] bg-[#0b0c0f] text-neutral-300">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white text-ink grid place-items-center">
                <span className="text-base font-black tracking-tight">A</span>
              </div>
              <div>
                <div className="text-lg font-black tracking-[0.22em] text-white">
                  ADDY
                </div>
                <div className="text-[10px] font-semibold tracking-[0.28em] text-neutral-400 uppercase">
                  Wear Your Story
                </div>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-neutral-400 max-w-xs">
              India&apos;s official merchandise &amp; apparel destination.
              Pop-culture tees, sharp shirts, cult classics, superhero merch
              and everyday essentials.
            </p>
          </div>

          <FooterCol
            title="Shop"
            items={[
              "Men",
              "Women",
              "Sneakers",
              "New Arrivals",
              "Accessories",
              "Sale",
            ]}
          />
          <FooterCol
            title="Help"
            items={[
              "Contact Us",
              "Shipping Info",
              "Returns & Exchanges",
              "Size Guide",
              "Track Order",
              "FAQs",
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              "About Addy",
              "Careers",
              "Press",
              "Sustainability",
              "Privacy Policy",
              "Terms",
            ]}
          />
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11.5px] text-neutral-500">
          <div>© {new Date().getFullYear()} ADDY. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-white mb-4">
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i}>
            <a
              href="#"
              className="text-[13px] text-neutral-400 hover:text-white transition-colors"
            >
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

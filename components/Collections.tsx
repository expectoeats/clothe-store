import { COLLECTIONS } from "@/lib/data";

export default function Collections() {
  return (
    <section className="container-wide pb-8 md:pb-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {COLLECTIONS.map((c, i) => (
          <a
            key={c.name}
            href="#"
            className={`group relative block rounded-3xl overflow-hidden bg-neutral-100 border border-transparent hover:border-[color:var(--color-line)] hover:shadow-[0_20px_54px_-30px_rgba(0,0,0,0.35)] transition-all duration-300 ${
              i === 1 ? "md:mt-10 lg:mt-14" : ""
            }`}
          >
            <div className="aspect-[3/4] md:aspect-[4/5]">
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute top-5 left-6 text-white">
              <div className="text-[13px] md:text-[15px] font-black uppercase tracking-[0.22em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
                {c.name}
              </div>
            </div>
            <div className="absolute bottom-5 left-6 right-6 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-ink rounded-full text-[10.5px] font-bold uppercase tracking-[0.22em] shadow-lg hover:gap-3 transition-[gap]">
                Shop Now →
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

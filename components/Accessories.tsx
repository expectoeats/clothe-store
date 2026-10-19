import { ACCESSORIES } from "@/lib/data";

export default function Accessories() {
  return (
    <section className="container-wide py-8 md:py-14">
      <div className="text-center mb-7 md:mb-10">
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-10 bg-ink-3/40" />
          <h2 className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.28em] text-ink">
            Accessories Corner
          </h2>
          <span className="h-px w-10 bg-ink-3/40" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {ACCESSORIES.map((a) => (
          <a
            key={a.name}
            href="#"
            className="group relative block rounded-2xl overflow-hidden bg-neutral-100 aspect-[4/3] md:aspect-[5/4] border border-transparent hover:border-[color:var(--color-line)] hover:shadow-[0_16px_44px_-28px_rgba(0,0,0,0.3)] transition-all duration-300"
          >
            <img
              src={a.image}
              alt={a.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[800ms] ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white text-center">
              <div className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] drop-shadow-md">
                {a.name}
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-[10.5px] md:text-[11px] font-semibold tracking-[0.18em] uppercase opacity-90 group-hover:gap-2.5 transition-[gap]">
                Explore <span aria-hidden>→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

import { IMAGES } from "@/lib/data";

export default function TrustBar() {
  return (
    <section className="w-full bg-white border-y border-[color:var(--color-line-2)]">
      <div className="max-w-[1520px] mx-auto">
        <img
          src={IMAGES.trustBar}
          alt="Cashback, Returns & Shipping promises"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
}

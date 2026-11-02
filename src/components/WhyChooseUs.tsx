import { useEffect, useRef } from "react";
import { ShieldCheck, Factory, Truck, Ruler, Headset } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { reasons } from "@/lib/content";
import { gsap } from "@/lib/motion";

const icons = [ShieldCheck, Factory, Truck, Ruler, Headset];

export function WhyChooseUs() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const big = reasons[5]!;
  const small = reasons.slice(0, 5);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-why]");
    const counter = el.querySelector<HTMLElement>("[data-why-count]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(cards, { opacity: 1, clearProps: "transform" });
      if (counter) counter.textContent = "50";
      cards.forEach((c) => (c.dataset["ready"] = "true"));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { opacity: 0, scale: 0.92 }, {
        opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
        onComplete: () => cards.forEach((c) => (c.dataset["ready"] = "true")),
      });
      if (counter) {
        const o = { v: 0 };
        counter.textContent = "0";
        gsap.to(o, { v: 50, duration: 2, ease: "power2.out", scrollTrigger: { trigger: counter, start: "top 85%", once: true },
          onUpdate: () => { counter.textContent = String(Math.round(o.v)); }, onComplete: () => { counter.textContent = "50"; } });
      }
    }, el);
    return () => ctx.revert();
  }, [lang]);

  const spot = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={root} className="why-section py-28">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-xs tracking-[0.3em] uppercase text-primary">{t({ ar: "ميزتنا", en: "Our edge" })}</p>
        <h2 className="mt-3 text-4xl md:text-6xl font-extrabold">{t({ ar: "لماذا العواضي؟", en: "Why choose us" })}</h2>
        <div className="why-grid mt-12">
          <article data-why onPointerMove={spot} className="why-card why-big">
            <span className="why-num" aria-hidden>06</span>
            <div className="relative">
              <div className="text-7xl md:text-[9rem] font-extrabold leading-none text-highlight tabular-nums" dir="ltr">
                +<span data-why-count>50</span>
              </div>
              <p className="mt-4 text-xl md:text-2xl font-bold">{t(big)}</p>
            </div>
          </article>
          {small.map((r, i) => {
            const I = icons[i] ?? ShieldCheck;
            return (
              <article key={i} data-why onPointerMove={spot} className="why-card">
                <span className="why-num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span className="why-icon"><I size={24} strokeWidth={1.6} /></span>
                <p className="relative mt-5 font-semibold text-lg">{t(r)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

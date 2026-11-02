import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { gsap } from "@/lib/motion";
import { QuoteLink } from "@/components/QuoteLink";

const layers = [
  { kind: "outer", title: { ar: "الزجاج الخارجي", en: "Outer glass" }, note: { ar: "مقسّى أو Low-E", en: "Tempered or Low-E" } },
  { kind: "spacer", title: { ar: "فاصل ألمنيوم", en: "Aluminium spacer" }, note: { ar: "فواصل أوروبية مع مادة مجففة", en: "European spacer bars with desiccant" } },
  { kind: "seal", title: { ar: "مادة العزل", en: "Sealant" }, note: { ar: "عزل مزدوج: بوتيل + سيليكون", en: "Double seal: butyl + silicone" } },
  { kind: "inner", title: { ar: "الزجاج الداخلي", en: "Inner glass" }, note: { ar: "الطبقة الداخلية للوحدة", en: "The unit’s interior pane" } },
];

export function GlassLayers() {
  const { t, lang } = useLang();
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
      const root = section.current; if (!root) return;
      const desktop = ctx.conditions?.desktop;
      const reduced = ctx.conditions?.reduce;
      const panes = root.querySelectorAll<HTMLElement>(".glass-layer");
      const spread = desktop ? [-250, -82, 82, 250] : [-135, -45, 45, 135];
      if (reduced) {
        panes.forEach((pane, i) => gsap.set(pane, desktop ? { x: spread[i] } : { y: spread[i] }));
        gsap.set(root.querySelectorAll(".layer-label"), { opacity: 1 });
        return;
      }
      const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 72%", end: "bottom 30%", scrub: .6 } });
      timeline.to(panes, { x: (i) => desktop ? spread[i] : 0, y: (i) => desktop ? 0 : spread[i], duration: 1, ease: "power2.inOut" }, 0)
        .to(root.querySelectorAll(".layer-label"), { opacity: 1, duration: .35 }, .25)
        .to({}, { duration: .5 })
        .to(panes, { x: 0, y: 0, duration: .8, ease: "power2.inOut" })
        .to(root.querySelectorAll(".layer-label"), { opacity: 0, duration: .25 }, "<")
        .to(root.querySelector(".unit-flash"), { opacity: .65, duration: .1 }).to(root.querySelector(".unit-flash"), { opacity: 0, duration: .25 });
    }, section);
    return () => media.revert();
  }, [lang]);
  return <section ref={section} className="section-light px-5 py-24" data-quote-product="panels">
    <div className="mx-auto max-w-7xl">
      <p className="text-primary text-xs uppercase">{t({ ar: "هندسة الزجاج المزدوج", en: "Inside double glazing" })}</p>
      <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t({ ar: "كل طبقة… مصنوعة بدقة", en: "EVERY LAYER. ENGINEERED." })}</h2>
      <div className="glass-layer-stage" dir="ltr" role="img" aria-label={t({ ar: "وحدة الزجاج المزدوج: زجاج خارجي، فاصل ألمنيوم، عزل مزدوج، وزجاج داخلي", en: "Double glazing: outer pane, aluminium spacer, double seal and inner pane" })}>
        <div className="glass-unit">{layers.map((layer, i) => <div key={layer.kind} className={`glass-layer layer-${layer.kind}`}>
          <div className="layer-surface" />
          <div className={`layer-label layer-label-${i}`} dir={lang === "ar" ? "rtl" : "ltr"}>
            <span className="text-primary text-xs">0{i + 1}</span><h3 className="font-semibold mt-1">{t(layer.title)}</h3><p className="text-muted-foreground mt-1 text-xs leading-relaxed">{t(layer.note)}</p>
          </div>
        </div>)}<div className="unit-flash" /></div>
      </div>
      <QuoteLink product="panels" className="px-0">{t({ ar: "اطلب عرض سعر للزجاج المزدوج ←", en: "Request a double glazing quote →" })}</QuoteLink>
    </div>
  </section>;
}
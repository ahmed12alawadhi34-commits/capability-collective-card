import { useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { gsap } from "@/lib/motion";
import { QuoteLink } from "@/components/QuoteLink";
import { ASSEMBLY_DURATION } from "@/lib/layer-scroll";
import { Button } from "@/components/ui/button";

const layers = [
  { kind: "outer", title: { ar: "الزجاج الخارجي", en: "Outer glass" }, note: { ar: "مقسّى أو Low-E", en: "Tempered or Low-E" } },
  { kind: "spacer", title: { ar: "سبيسر ألمنيوم إيطالي – Profilglass", en: "Italian aluminium spacer – Profilglass" }, note: { ar: "فواصل أوروبية مع مادة مجففة", en: "European spacer bars with desiccant" } },
  { kind: "seal", title: { ar: "مادة العزل", en: "Sealant" }, note: { ar: "عزل مزدوج: بوتيل + سيليكون Dow الأمريكي", en: "Double seal: butyl + Dow silicone (USA)" } },
  { kind: "inner", title: { ar: "الزجاج الداخلي", en: "Inner glass" }, note: { ar: "الطبقة الداخلية للوحدة", en: "The unit’s interior pane" } },
];

export function GlassLayers() {
  const { t, lang } = useLang();
  const section = useRef<HTMLElement>(null);
  const replay = useRef<() => void>(() => {});
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
      const root = section.current; if (!root) return;
      const desktop = ctx.conditions?.['desktop'];
      const panes = root.querySelectorAll<HTMLElement>(".glass-layer");
      const stage = root.querySelector<HTMLElement>(".glass-layer-stage");
      if (!stage) return;
      const labels = root.querySelectorAll<HTMLElement>(".layer-label");
      const paths = root.querySelectorAll<SVGPathElement>(".layer-connector");
      const spread = () => desktop ? [-.375, -.125, .125, .375].map((n) => n * stage.clientWidth) : [-315, -105, 105, 315];
      const drawConnectors = () => {
        const bounds = stage.getBoundingClientRect();
        panes.forEach((pane, i) => {
          const label = labels[i], path = paths[i], surface = pane.querySelector(".layer-surface");
          if (!label || !path || !surface) return;
          const p = surface.getBoundingClientRect(), l = label.getBoundingClientRect();
          const x1 = desktop ? l.left + l.width / 2 : l.left;
          const y1 = desktop ? (i % 2 === 0 ? l.bottom : l.top) : l.top + l.height / 2;
          const x2 = desktop ? p.left + p.width / 2 : p.right;
          const y2 = desktop ? (i % 2 === 0 ? p.top : p.bottom) : p.top + p.height / 2;
          path.setAttribute("d", `M ${x1 - bounds.left} ${y1 - bounds.top} L ${x2 - bounds.left} ${y2 - bounds.top}`);
        });
      };
      const resize = new ResizeObserver(drawConnectors);
      resize.observe(stage);
      const reset = () => {
        gsap.set(panes, { x: (i: number) => desktop ? (spread()[i] ?? 0) : 0, y: (i: number) => desktop ? 0 : (spread()[i] ?? 0) });
        gsap.set(labels, { opacity: 1 });
        gsap.set(root.querySelector(".unit-flash"), { opacity: 0 });
        drawConnectors();
      };
      reset();
      const timeline = gsap.timeline({ paused: true, onUpdate: drawConnectors });
      panes.forEach((pane, i) => {
        timeline.to(pane, { x: 0, y: 0, duration: .625, ease: "power2.inOut" }, i * .625);
      });
      timeline.to(root.querySelector(".unit-flash"), { opacity: .65, duration: .15 }).to(root.querySelector(".unit-flash"), { opacity: 0, duration: .35 });
      timeline.duration(ASSEMBLY_DURATION);
      replay.current = () => { timeline.pause(0); reset(); timeline.restart(); };
      let played = false;
      const observer = new IntersectionObserver((entries) => {
        if (!played && entries.some(entry => entry.isIntersecting)) { played = true; timeline.play(); observer.disconnect(); }
      }, { threshold: .15 });
      observer.observe(stage);
      drawConnectors();
      return () => { observer.disconnect(); resize.disconnect(); timeline.kill(); replay.current = () => {}; };
    }, section);
    return () => media.revert();
  }, [lang]);
  return <section ref={section} className="section-light home-raised px-5 py-24" data-quote-product="panels">
    <div className="mx-auto max-w-7xl">
      <p className="text-primary text-xs uppercase">{t({ ar: "هندسة الزجاج المزدوج", en: "Inside double glazing" })}</p>
      <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t({ ar: "كل طبقة… مصنوعة بدقة", en: "EVERY LAYER. ENGINEERED." })}</h2>
      <div className="glass-layer-stage" dir="ltr" role="img" aria-label={t({ ar: "وحدة الزجاج المزدوج: زجاج خارجي، فاصل ألمنيوم، عزل مزدوج، وزجاج داخلي", en: "Double glazing: outer pane, aluminium spacer, double seal and inner pane" })}>
        <svg className="layer-connectors" aria-hidden>{layers.map((layer) => <path key={layer.kind} className="layer-connector" />)}</svg>
        <div className="glass-unit">{layers.map((layer) => <div key={layer.kind} className={`glass-layer layer-${layer.kind}`}>
          <div className="layer-surface" />
        </div>)}<div className="unit-flash" /></div>
        {layers.map((layer, i) => <div key={layer.kind} className={`layer-label layer-callout-${i}`} dir={lang === "ar" ? "rtl" : "ltr"}>
        <span className="text-primary text-xs">0{i + 1}</span><h3 className="font-semibold mt-1">{t(layer.title)}</h3><p className="text-muted-foreground mt-1 text-xs leading-relaxed">{t(layer.note)}</p>
        </div>)}
      </div>
      <div className="mb-4 flex justify-center"><Button variant="outline" size="sm" className="min-h-11" onClick={() => replay.current()}><RotateCcw size={16} />{t({ ar: "إعادة", en: "Replay" })}</Button></div>
      <QuoteLink product="panels" className="px-0">{t({ ar: "اطلب عرض سعر للزجاج المزدوج ←", en: "Request a double glazing quote →" })}</QuoteLink>
    </div>
  </section>;
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Truck, ClipboardCheck, Package } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { services } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { SequenceVideo } from "@/components/SequenceVideo";
import hr from "@/assets/hero-rollers.mp4.asset.json";
import hrM from "@/assets/hero-rollers-m.mp4.asset.json";
import hrP from "@/assets/hero-rollers-poster.jpg.asset.json";
import hp from "@/assets/hero-polish.mp4.asset.json";
import hpM from "@/assets/hero-polish-m.mp4.asset.json";
import hpP from "@/assets/hero-polish-poster.jpg.asset.json";
import furnace from "@/assets/hero-furnace.mp4.asset.json";
import furnaceM from "@/assets/hero-furnace-m.mp4.asset.json";
import furnacePoster from "@/assets/hero-furnace-poster.jpg.asset.json";
import asm from "@/assets/glass-assembly.mp4.asset.json";
import asmM from "@/assets/glass-assembly-m.mp4.asset.json";
import asmP from "@/assets/glass-assembly-poster.jpg.asset.json";
import fin from "@/assets/glass-finished.mp4.asset.json";
import finM from "@/assets/glass-finished-m.mp4.asset.json";
import finP from "@/assets/glass-finished-poster.jpg.asset.json";
import { GlassLayers } from "@/components/GlassLayers";
import { PartnersStrip } from "@/components/PartnersStrip";
import { FactoryAbout } from "@/components/FactoryAbout";
import { GroupCompaniesRow } from "@/components/GroupCompaniesRow";
import { QuoteLink } from "@/components/QuoteLink";
import { GlassTypes } from "@/components/GlassTypes";
import { ProductionLine } from "@/components/ProductionLine";
import { HomeProductStrip } from "@/components/HomeProductStrip";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FinalQuote } from "@/components/FinalQuote";

export const Route = createFileRoute("/")({
  head: () => pageHead("/"),
  component: Index,
});

/** Masked line: text slides up from behind its own clip. */
function Line({ children, className = "" }: { children: string; className?: string }) {
  return <span className={`block overflow-hidden pb-1 ${className}`}><span data-line className="block">{children}</span></span>;
}

function Index() {
  const { t, lang } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const headline = t({ ar: "زجاجٌ بمعايير عالمية", en: "World-class glass" });
  const subline = t({ ar: "صُنع في صنعاء… لمشاريع اليمن", en: "Made in Sana'a, for Yemen's projects" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set("[data-word], [data-hero-fade], [data-line], [data-card], [data-frame]", { opacity: 1, clearProps: "transform" });
        return;
      }
      gsap.fromTo("[data-word]", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, clearProps: "transform", duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.9 });
      gsap.fromTo("[data-hero-fade]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, clearProps: "transform", duration: 1, ease: "power3.out", stagger: 0.12, delay: 1.5 });

      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((g) =>
        gsap.fromTo(g.querySelectorAll("[data-line]"), { yPercent: 105 }, { yPercent: 0, clearProps: "transform", duration: 1, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: g, start: "top 85%", once: true } }));

      gsap.fromTo("[data-frame]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, clearProps: "transform", duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: "[data-frame]", start: "top 85%", once: true } });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset["count"]), o = { v: end > 1000 ? end - 60 : 0 };
        gsap.to(o, { v: end, duration: 2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => { el.textContent = Math.round(o.v).toString(); } });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) =>
        gsap.fromTo(el, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: el.parentElement, scrub: true } }));

    }, root);
    const r = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { clearTimeout(r); ctx.revert(); };
  }, [lang]);

  return (
    <div ref={root} className="home-sections overflow-x-clip">
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-night">
        <div className="absolute inset-0"><SequenceVideo preload="auto" clips={[{ desktop: hr.url, mobile: hrM.url, poster: hrP.url }, { desktop: hp.url, mobile: hpM.url, poster: hpP.url }]} /></div>
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl w-full px-5 pt-20">
          <div className="relative max-w-4xl">
            <div aria-hidden className="orbit-ring absolute -top-24 start-[-6rem] h-[28rem] w-[28rem] md:h-[36rem] md:w-[36rem] pointer-events-none" />
            <p data-hero-fade className="relative text-xs tracking-[0.3em] uppercase text-primary">{t({ ar: "منذ 2021 · صنعاء", en: "Since 2021 · Sana'a" })}</p>
            <h1 className="relative mt-5 font-extrabold" aria-label={`${headline} — ${subline}`}>
              <span className="block text-[40px] md:text-[64px] leading-[1.35]">
                {headline.split(" ").map((w, i) => (
                  <span key={lang + i} className="inline-block overflow-hidden align-bottom pb-2 me-[0.25em]" aria-hidden>
                    <span data-word className="inline-block text-silver pb-1">{w}</span>
                  </span>
                ))}
              </span>
              <span data-hero-fade className="mt-3 block text-lg md:text-2xl font-semibold leading-[1.5] text-muted-foreground">{subline}</span>
            </h1>
            <p data-hero-fade className="relative mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              {t({ ar: "زجاج مقسّى ومعشّق ومزدوج بمواصفات عالمية، يُنتَج في مصنع حديث بصنعاء للمقاولين والمصنّعين والمشاريع الكبرى.", en: "Precision tempered, laminated and double-glazed glass to international standards — produced in a modern Sana'a facility." })}
            </p>
            <div data-hero-fade className="relative mt-9 flex flex-wrap gap-3">
              <Link to="/products" className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold">{t({ ar: "منتجاتنا", en: "Our Products" })}</Link>
              <QuoteLink className="glass rounded-full h-auto px-7 py-3.5 font-semibold text-foreground hover:no-underline">{t({ ar: "اطلب عرض سعر", en: "Request a Quote" })}</QuoteLink>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 inset-x-0 flex justify-center"><span className="h-12 w-px bg-gradient-to-b from-primary to-transparent animate-pulse" /></div>
      </section>

      {/* FACTORY VIDEO — wide cinematic frame */}
      <section className="relative px-4 py-20">
        <div data-frame className="relative mx-auto h-[75vh] w-full max-w-[1280px] overflow-hidden rounded-3xl glass md:h-auto md:aspect-video">
          <SequenceVideo fit="cover" clips={[
            { desktop: furnace.url, mobile: furnaceM.url, poster: furnacePoster.url, label: t({ ar: "الفرن والتقسية", en: "Tempering furnace" }) },
            { desktop: asm.url, mobile: asmM.url, poster: asmP.url, label: t({ ar: "التجميع", en: "Assembly" }) },
            { desktop: fin.url, mobile: finM.url, poster: finP.url, label: t({ ar: "المنتج النهائي", en: "Finished product" }) },
          ]} />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
          <div data-lines className="absolute bottom-16 start-6 z-10 text-start md:start-10">
            <h2 className="text-[32px] md:text-5xl font-extrabold leading-tight">
              <Line>{t({ ar: "دقة في", en: "Precision in" })}</Line>
              <Line className="text-highlight">{t({ ar: "كل حافة", en: "every edge" })}</Line>
            </h2>
          </div>
        </div>
      </section>

      <FactoryAbout compact />
      <GroupCompaniesRow />

      <WhyChooseUs />

      <PartnersStrip />

      <GlassTypes />

      <GlassLayers />

      <HomeProductStrip />

      {/* SERVICES */}
      <section className="section-light home-raised py-28">
        <div className="mx-auto max-w-7xl px-5">
          <h2 data-lines className="text-3xl md:text-5xl font-bold"><Line>{t({ ar: "خدماتنا", en: "Our services" })}</Line></h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((s, i) => {
              const I = { truck: Truck, check: ClipboardCheck, crate: Package }[s.icon];
              return (
                <div key={s.icon} className="reveal glass shine rounded-3xl p-8" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary"><I size={28} strokeWidth={1.4} /></div>
                  <h3 className="mt-6 text-xl font-bold">{t(s.name)}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{t(s.desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTION LINE */}
      <ProductionLine />

      <FinalQuote />

    </div>
  );
}

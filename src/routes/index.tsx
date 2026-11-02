import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Truck, ClipboardCheck, Package } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { steps, services } from "@/lib/content";
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
import { GlassComparison } from "@/components/GlassComparison";
import { HomeProductStrip } from "@/components/HomeProductStrip";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FinalQuote } from "@/components/FinalQuote";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "العواضي لصناعة الزجاج — زجاج مقسّى ومعشّق ومزدوج في صنعاء" },
      { name: "description", content: "Alawadhi for Glass Industry: precision tempered, laminated and double-glazed glass manufactured in Sana'a, Yemen." },
      { property: "og:title", content: "العواضي لصناعة الزجاج | Alawadhi for Glass Industry" },
      { property: "og:description", content: "Engineered Glass. Built for Yemen. — زجاج مُصنَّع بدقة لمشاريع اليمن." },
      { property: "og:image", content: hrP.url },
      { name: "twitter:image", content: hrP.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Masked line: text slides up from behind its own clip. */
function Line({ children, className = "" }: { children: string; className?: string }) {
  return <span className={`block overflow-hidden pb-1 ${className}`}><span data-line className="block">{children}</span></span>;
}

function Index() {
  const { t, lang } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const headline = t({ ar: "زجاج مُصنَّع بدقة لمشاريع اليمن", en: "Engineered Glass. Built for Yemen." });

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
            <h1 className="relative mt-5 text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1]" aria-label={headline}>
              {headline.split(" ").map((w, i) => (
                <span key={lang + i} className="inline-block overflow-hidden align-bottom pb-2 me-[0.25em]" aria-hidden>
                  <span data-word className={`inline-block ${i === 4 ? "text-highlight" : "text-silver"}`}>{w}</span>
                </span>
              ))}
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

      {/* ROLLERS VIDEO CARD */}
      <section className="relative px-5 py-20">
        <div data-frame className="relative mx-auto h-[80vh] min-h-[420px] w-full max-w-[820px] overflow-hidden rounded-3xl glass">
          <div aria-hidden className="absolute inset-0 bg-center bg-no-repeat video-poster-backdrop scale-125 opacity-60" style={{ backgroundImage: `url(${furnacePoster.url})` }} />
          <SequenceVideo fit="contain" clips={[
            { desktop: furnace.url, mobile: furnaceM.url, poster: furnacePoster.url, label: t({ ar: "الفرن والتقسية", en: "Tempering furnace" }) },
            { desktop: asm.url, mobile: asmM.url, poster: asmP.url, label: t({ ar: "التجميع", en: "Assembly" }) },
            { desktop: fin.url, mobile: finM.url, poster: finP.url, label: t({ ar: "المنتج النهائي", en: "Finished product" }) },
          ]} />
          <div className="absolute inset-0 bg-hero-overlay pointer-events-none" />
          <div data-lines className="absolute inset-0 grid place-items-center text-center px-5">
            <h2 className="text-4xl md:text-7xl font-extrabold">
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

      <GlassComparison className="home-comparison" />

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

      {/* PROCESS */}
      <section className="bg-night py-28">
        <div className="mx-auto max-w-7xl px-5">
          <h2 data-lines className="text-3xl md:text-5xl font-bold"><Line>{t({ ar: "مراحل الإنتاج", en: "Production process" })}</Line></h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-6 relative">
            <div className="hidden md:block absolute top-6 inset-x-0 h-px bg-border" />
            {steps.map((s, i) => (
              <li key={i} className="reveal relative" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="relative grid h-12 w-12 place-items-center rounded-full glass text-primary font-bold">{i + 1}</span>
                <p className="mt-4 font-semibold">{t(s)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalQuote />

    </div>
  );
}

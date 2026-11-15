import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { pageHead, localBusinessJsonLd } from "@/lib/seo";
import { gsap } from "@/lib/motion";
import { SequenceVideo } from "@/components/SequenceVideo";
const hr = { url: "/media/videos/hero-rollers.mp4" };
const hrM = { url: "/media/videos/hero-rollers-m.mp4" };
const hrP = { url: "/media/posters/hero-rollers-poster.jpg" };
const hp = { url: "/media/videos/hero-polish.mp4" };
const hpM = { url: "/media/videos/hero-polish-m.mp4" };
const hpP = { url: "/media/posters/hero-polish-poster.jpg" };
import { GlassLayers } from "@/components/GlassLayers";
import { PartnersStrip } from "@/components/PartnersStrip";
import { FactoryAbout } from "@/components/FactoryAbout";
import { GroupCompaniesRow } from "@/components/GroupCompaniesRow";
import { QuoteLink } from "@/components/QuoteLink";
import { GlassComparison } from "@/components/GlassComparison";
import { ProductionLine } from "@/components/ProductionLine";
import { HomeProductStrip } from "@/components/HomeProductStrip";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Capabilities } from "@/components/Capabilities";
import { FinalQuote } from "@/components/FinalQuote";

export const Route = createFileRoute("/")({
  head: () => ({ ...pageHead("/"), scripts: [localBusinessJsonLd()] }),
  component: Index,
});

function Index() {
  const { t, lang } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const headline = t({ ar: "زجاجٌ بمعايير عالمية", en: "World-class glass" });
  const subline = t({ ar: "صُنع في صنعاء… لمشاريع اليمن", en: "Made in Sana'a, for Yemen's projects" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set("[data-word], [data-hero-fade]", { opacity: 1, clearProps: "transform" });
        return;
      }
      gsap.fromTo("[data-word]", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, clearProps: "transform", duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.9 });
      gsap.fromTo("[data-hero-fade]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, clearProps: "transform", duration: 1, ease: "power3.out", stagger: 0.12, delay: 1.5 });

    }, root);
    return () => { ctx.revert(); };
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
            <p data-hero-fade className="relative text-xs tracking-[0.3em] uppercase text-primary">{t({ ar: "خبرة +50 عاماً · مصنع حديث منذ 2021", en: "50+ years of experience · Modern factory since 2021" })}</p>
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
            <p data-hero-fade className="relative mt-4 text-base md:text-xl font-bold text-primary">{t({ ar: "الرائدة في سوق الزجاج في اليمن", en: "Yemen's leading glass company" })}</p>
            <p data-hero-fade className="relative mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              {t({ ar: "سيكوريت (مقسّى) ولامينيت (مجلتن) وزجاج مزدوج بمواصفات عالمية، يُنتَج في مصنع حديث بصنعاء للمقاولين والمصنّعين والمشاريع الكبرى.", en: "Precision tempered (Securit), laminated and double-glazed glass to international standards — produced in a modern Sana'a facility." })}
            </p>
            <div data-hero-fade className="relative mt-9 flex flex-wrap gap-3">
              <Link to="/products" className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold">{t({ ar: "منتجاتنا", en: "Our Products" })}</Link>
              <QuoteLink className="glass rounded-full h-auto px-7 py-3.5 font-semibold text-foreground hover:no-underline">{t({ ar: "اطلب عرض سعر", en: "Request a Quote" })}</QuoteLink>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 inset-x-0 flex justify-center"><span className="h-12 w-px bg-gradient-to-b from-primary to-transparent animate-pulse" /></div>
      </section>

      <FactoryAbout compact />
      <GroupCompaniesRow />

      <WhyChooseUs />
      <Capabilities />

      <PartnersStrip />

      <GlassComparison className="py-24" />

      <GlassLayers />

      <HomeProductStrip />

      {/* PRODUCTION LINE */}
      <ProductionLine />

      <FinalQuote />

    </div>
  );
}

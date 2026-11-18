import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { pageHead, localBusinessJsonLd } from "@/lib/seo";
import { gsap } from "@/lib/motion";
import { BgVideo } from "@/components/BgVideo";
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
  const Arrow = lang === "ar" ? ArrowUpLeft : ArrowUpRight;
  const ScrollArrow = lang === "ar" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set("[data-word], [data-hero-fade]", { opacity: 1, clearProps: "transform" });
        return;
      }
      gsap.fromTo("[data-word]", { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, clearProps: "transform", duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.2 });
      gsap.fromTo("[data-hero-fade]", { y: 22, opacity: 0 }, { y: 0, opacity: 1, clearProps: "transform", duration: 0.85, ease: "power3.out", stagger: 0.08, delay: 0.55 });
    }, root);
    return () => { ctx.revert(); };
  }, [lang]);

  return (
    <div ref={root} className="home-sections overflow-x-clip">
      <section className="hero-2026">
        <div className="absolute inset-0"><BgVideo desktop="/media/videos/factory-hero-v4.mp4" mobile="/media/videos/factory-hero-mobile-v4.mp4" poster="/media/posters/factory-hero-poster-v4.jpg" playbackRate={0.5} /></div>
        <div aria-hidden className="hero-2026-overlay" />
        <div aria-hidden className="hero-architecture-grid" />
        <div className="hero-side-note" aria-hidden><span>AL-AWADHI</span><span>GLASS INDUSTRIES · 2026</span></div>

        <div className="hero-2026-content">
          <div className="hero-2026-copy">
            <p data-hero-fade className="section-eyebrow hero-eyebrow"><span aria-hidden />{t({ ar: "خبرة +50 عاماً · مصنع حديث منذ 2021", en: "50+ years of experience · Modern factory since 2021" })}</p>
            <h1 aria-label={`${headline} — ${subline}`}>
              <span className="hero-headline-line">
                {headline.split(" ").map((word, index) => (
                  <span key={lang + index} className="hero-word-mask" aria-hidden>
                    <span data-word className="hero-word text-silver">{word}</span>
                  </span>
                ))}
              </span>
              <span data-hero-fade className="hero-subline">{subline}</span>
            </h1>
            <p data-hero-fade className="hero-description">
              {t({ ar: "سيكوريت ولامينيت ودبل جلاس بمواصفات عالمية، يُنتَج في مصنع حديث بصنعاء للمقاولين والمصنّعين والمشاريع الكبرى.", en: "Precision tempered, laminated and double-glazed glass to international standards — produced in a modern Sana'a facility." })}
            </p>
            <div data-hero-fade className="hero-actions">
              <Link to="/products" className="hero-button hero-button-primary">{t({ ar: "اكتشف منتجاتنا", en: "Explore our products" })}<Arrow size={18} aria-hidden /></Link>
              <QuoteLink className="hero-button hero-button-secondary">{t({ ar: "اطلب عرض سعر", en: "Request a quote" })}<ScrollArrow size={17} aria-hidden /></QuoteLink>
            </div>
          </div>

          <div data-hero-fade className="hero-metrics">
            {([
              [{ ar: "4–19", en: "4–19" }, { ar: "مم · نطاق السماكات", en: "mm · thickness range" }],
              [{ ar: "2×4", en: "2×4" }, { ar: "م · أقصى مقاس للوح", en: "m · maximum panel" }],
              [{ ar: "650°", en: "650°" }, { ar: "تقسية حرارية دقيقة", en: "precision tempering" }],
            ] as const).map(([value, label]) => (
              <div key={label.en} className="hero-metric">
                <strong dir="ltr">{t(value)}</strong>
                <span>{t(label)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll-cue" aria-hidden><span>SCROLL TO DISCOVER</span><i /></div>
      </section>

      <FactoryAbout compact />
      <GroupCompaniesRow />
      <WhyChooseUs />
      <Capabilities />
      <PartnersStrip />
      <GlassComparison className="py-24" />
      <GlassLayers />
      <HomeProductStrip />
      <ProductionLine />
      <FinalQuote />
    </div>
  );
}

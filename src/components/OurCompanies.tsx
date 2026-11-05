import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { gsap, ScrollTrigger, ensureVisible } from "@/lib/motion";
import { companies, groupLogo, type Company } from "@/lib/companies";

function Logo({ c, alt }: { c: Company; alt: string }) {
  return <div className="company-logo-bg flex h-28 items-center justify-center overflow-hidden rounded-2xl p-4">
    {c.logo ? <img src={c.logo} alt={alt} width={320} height={160} loading="lazy" decoding="async" className="block h-full w-full min-h-0 object-contain" />
      : <span role="img" aria-label={alt} className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground text-xl font-extrabold tracking-wider">AA</span>}
  </div>;
}

export function OurCompanies() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-co-parent]", { y: 40, opacity: 0 }, { y: 0, opacity: 1, clearProps: "transform", duration: 1, ease: "power3.out", scrollTrigger: { trigger: "[data-co-parent]", start: "top 85%", once: true } });
      gsap.fromTo("[data-co-line]", { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, clearProps: "transform", duration: 1, ease: "power2.inOut", scrollTrigger: { trigger: "[data-co-line]", start: "top 85%", once: true } });
      const cards = gsap.utils.toArray<HTMLElement>("[data-co-card]");
      gsap.set(cards, { y: 32 });
      ScrollTrigger.batch(cards, { start: "top 90%", once: true, onEnter: (batch) => gsap.to(batch, { y: 0, clearProps: "transform", duration: 0.7, stagger: 0.08, ease: "power3.out" }) });
    }, root);
    const stop = ensureVisible(root.current?.querySelectorAll("[data-co-parent], [data-co-card], [data-co-line]") ?? []);
    return () => { stop(); ctx.revert(); };
  }, [lang]);

  return <section ref={root} className="mx-auto max-w-7xl px-5 pt-8 pb-24">
    <h2 className="text-center text-3xl md:text-5xl font-bold">{t({ ar: "شركاتنا", en: "Our Companies" })}</h2>

    <a data-co-parent href="https://www.alawadhigroup.net" target="_blank" rel="noopener noreferrer" className="company-card glass mx-auto mt-12 flex max-w-2xl flex-col items-center gap-5 rounded-3xl p-8 text-center sm:flex-row sm:text-start">
      <div className="company-logo-bg flex h-28 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl p-3"><img src={groupLogo} alt={t({ ar: "مجموعة العواضي للتجارة والصناعة", en: "Al-Awadhi Group" })} width={348} height={275} loading="lazy" className="block h-full w-full min-h-0 object-contain" /></div>
      <div className="min-w-0">
        <h3 className="text-xl md:text-2xl font-bold">{t({ ar: "مجموعة العواضي للتجارة والصناعة", en: "Al-Awadhi Group" })}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t({ ar: "تأسست 1955 · في الزجاج منذ 1974", en: "Founded 1955 · In glass since 1974" })}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary" dir="ltr">www.alawadhigroup.net <ArrowUpRight size={16} /></span>
      </div>
    </a>

    <div aria-hidden className="flex justify-center"><span data-co-line className="company-line block h-16 w-px" /></div>

    <div className="company-grid grid auto-rows-fr gap-5">
      {companies.map((c) => <article key={c.name.en} data-co-card className={`company-card glass relative flex min-w-0 flex-col rounded-3xl p-5 ${c.here ? "ring-1 ring-primary/60" : ""}`}>
        <Logo c={c} alt={t(c.name)} />
        <h3 className="company-main-name mt-4 text-lg font-bold leading-snug">{t(c.name)}</h3>
        <p className="company-secondary-name mt-1 text-xs leading-relaxed text-muted-foreground"><span dir={lang === "ar" ? "ltr" : "rtl"}>{lang === "ar" ? c.name.en : c.name.ar}</span></p>
        <p className="mt-3 text-sm text-muted-foreground"><span aria-hidden>{c.flag}</span> {t(c.city)}{lang === "ar" ? "، " : ", "}{t(c.country)}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-primary/15 px-3 py-1 font-semibold text-primary">{t({ ar: `منذ ${c.since}`, en: `Since ${c.since}` })}</span>
          {c.here && <span className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">{t({ ar: "أنت هنا", en: "You are here" })}</span>}
        </div>
        <p className="mt-3 text-sm leading-relaxed">{c.desc && t(c.desc)}</p>
        <div className="mt-auto min-h-12 pt-4">
          {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">{t({ ar: "زيارة الموقع", en: "Visit website" })} <ArrowUpRight size={16} /></a>}
        </div>
      </article>)}
    </div>
  </section>;
}

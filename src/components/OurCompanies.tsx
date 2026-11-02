import { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { gsap } from "@/lib/motion";
import groupLogo from "@/assets/companies/group.webp";
import trading from "@/assets/companies/trading.svg";
import aden from "@/assets/companies/aden.svg";
import cd from "@/assets/companies/cd.svg";
import industry from "@/assets/companies/industry.svg";
import oman from "@/assets/companies/oman.svg";
import saudi from "@/assets/companies/saudi.svg";

type L = { ar: string; en: string };
type Company = { name: L; city: L; since: number; desc?: L; url?: string; logo?: string; here?: boolean };

const countries: { flag: string; name: L; companies: Company[] }[] = [
  { flag: "🇾🇪", name: { ar: "اليمن", en: "Yemen" }, companies: [
    { name: { ar: "العواضي للتجارة المحدودة", en: "AL-AWADHI TRADING CO. LTD" }, city: { ar: "صنعاء", en: "Sana'a" }, since: 1974, desc: { ar: "الزجاج ومواد البناء والوكالات الحصرية", en: "Glass & building materials, exclusive agencies" }, url: "https://www.yemenglass.com", logo: trading },
    { name: { ar: "العواضي للزجاج والتجارة", en: "Al-Awadhi Glass and Trading" }, city: { ar: "عدن", en: "Aden" }, since: 1974, desc: { ar: "الزجاج والتجارة – جنوب اليمن", en: "Glass & trading – southern Yemen" }, logo: aden },
    { name: { ar: "البناء والتعمير للتجارة", en: "Construction & Development for Trading" }, city: { ar: "صنعاء", en: "Sana'a" }, since: 2008, desc: { ar: "تجارة مواد البناء والأدوات", en: "Building materials & hardware trading" }, url: "https://www.cdfortrading.com", logo: cd },
    { name: { ar: "العواضي لصناعة الزجاج", en: "Alawadhi for Glass Industry" }, city: { ar: "صنعاء", en: "Sana'a" }, since: 2021, desc: { ar: "مصنع الزجاج المقسّى (سكوريت) والمزدوج", en: "Tempered (Securit) & double-glazed glass factory" }, logo: industry, here: true },
  ] },
  { flag: "🇴🇲", name: { ar: "عُمان", en: "Oman" }, companies: [
    { name: { ar: "شركة العواضي للتجارة والوكالات", en: "Al-Awadhi Trading and Agencies Company" }, city: { ar: "مسقط", en: "Muscat" }, since: 2018, url: "https://www.alawadhiom.com", logo: oman },
  ] },
  { flag: "🇸🇦", name: { ar: "السعودية", en: "Saudi Arabia" }, companies: [
    { name: { ar: "شركة العواضي التجارية", en: "Al-Awadhi Trading Company" }, city: { ar: "الرياض", en: "Riyadh" }, since: 2024, url: "https://www.alawadhi.sa", logo: saudi },
  ] },
];

function Logo({ c, alt }: { c: Company; alt: string }) {
  return <div className="company-logo-bg grid h-28 place-items-center rounded-2xl p-4">
    {c.logo ? <img src={c.logo} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-contain" />
      : <span role="img" aria-label={alt} className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground text-xl font-extrabold tracking-wider">AA</span>}
  </div>;
}

export function OurCompanies() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-co-parent]", { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "[data-co-parent]", start: "top 85%" } });
      gsap.from("[data-co-line]", { scaleY: 0, transformOrigin: "top", duration: 1, ease: "power2.inOut", scrollTrigger: { trigger: "[data-co-line]", start: "top 85%" } });
      gsap.utils.toArray<HTMLElement>("[data-co-group]").forEach((g) =>
        gsap.from(g.querySelectorAll("[data-co-card]"), { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: g, start: "top 85%" } }));
    }, root);
    return () => ctx.revert();
  }, [lang]);

  return <section ref={root} className="mx-auto max-w-7xl px-5 py-24">
    <h2 className="text-center text-3xl md:text-5xl font-bold">{t({ ar: "شركاتنا", en: "Our Companies" })}</h2>

    <a data-co-parent href="https://www.alawadhigroup.net" target="_blank" rel="noopener noreferrer" className="company-card glass mx-auto mt-12 flex max-w-2xl flex-col items-center gap-5 rounded-3xl p-8 text-center sm:flex-row sm:text-start">
      <div className="company-logo-bg grid h-28 w-40 shrink-0 place-items-center rounded-2xl p-3"><img src={groupLogo} alt={t({ ar: "مجموعة العواضي للتجارة والصناعة", en: "Al-Awadhi Group" })} loading="lazy" className="h-full w-full object-contain" /></div>
      <div className="min-w-0">
        <h3 className="text-xl md:text-2xl font-bold">{t({ ar: "مجموعة العواضي للتجارة والصناعة", en: "Al-Awadhi Group" })}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t({ ar: "تأسست 1955 · في الزجاج منذ 1974", en: "Founded 1955 · In glass since 1974" })}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary" dir="ltr">www.alawadhigroup.net <ArrowUpRight size={16} /></span>
      </div>
    </a>

    <div aria-hidden className="flex justify-center"><span data-co-line className="company-line block h-16 w-px" /></div>

    <div className="space-y-12">
      {countries.map((country) => <div key={country.name.en} data-co-group>
        <h3 className="mb-5 flex items-center gap-3 text-lg font-semibold"><span aria-hidden className="text-2xl">{country.flag}</span>{t(country.name)}<span className="h-px flex-1 bg-border" /></h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {country.companies.map((c) => <article key={c.name.en} data-co-card className={`company-card glass relative flex flex-col rounded-3xl p-5 ${c.here ? "ring-1 ring-primary/60" : ""}`}>
            <Logo c={c} alt={`${c.name.ar} – ${c.name.en}`} />
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-primary/15 px-3 py-1 font-semibold text-primary">{t({ ar: `منذ ${c.since}`, en: `Since ${c.since}` })}</span>
              {c.here && <span className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">{t({ ar: "أنت هنا", en: "You are here" })}</span>}
            </div>
            <h4 className="mt-3 text-lg font-bold leading-snug">{c.name.ar}</h4>
            <p className="text-sm text-muted-foreground" dir="ltr" style={{ textAlign: lang === "ar" ? "right" : "left" }}>{c.name.en}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin size={14} className="text-primary" />{t(c.city)}</p>
            {c.desc && <p className="mt-2 text-sm leading-relaxed">{t(c.desc)}</p>}
            {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-auto pt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-primary">{t({ ar: "زيارة الموقع", en: "Visit website" })} <ArrowUpRight size={16} /></a>}
          </article>)}
        </div>
      </div>)}
    </div>
  </section>;
}

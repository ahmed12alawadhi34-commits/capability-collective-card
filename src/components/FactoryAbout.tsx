import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { groupStats, slogan } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import factory from "@/assets/p2.webp";

export function FactoryStats() {
  const { t } = useLang();
  return (
    <div className="factory-stats-2026">
      {([
        [1974, { ar: "خبرة المجموعة", en: "Group heritage" }],
        [2021, { ar: "تأسيس المصنع", en: "Factory founded" }],
        ["85%", { ar: "من سوق الزجاج في اليمن – المجموعة", en: "of Yemen's glass market – the Group" }],
        [groupStats.companies, { ar: `شركات في ${groupStats.countries} دول`, en: `companies in ${groupStats.countries} countries` }],
      ] as const).map(([number, label]) => (
        <div key={number} className="factory-stat"><strong dir="auto">{number}</strong><span>{t(label)}</span></div>
      ))}
    </div>
  );
}

export function FactoryAbout({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section className={`factory-editorial px-5 ${compact ? "factory-compact-section" : "home-raised"}`}>
      <div className={`mx-auto max-w-7xl ${compact ? "factory-compact-layout" : "factory-full-layout"}`}>
        <div className="factory-copy">
          <SectionHeading
            eyebrow={t({ ar: "من نحن", en: "Who we are" })}
            title={t({ ar: "منشأة حديثة في قلب صنعاء", en: "A modern facility in the heart of Sana'a" })}
            index="01 / FACTORY"
          />
          <p className="factory-description">{compact ? t({ ar: "تأسس مصنع العواضي لصناعة الزجاج عام 2021 ضمن مجموعة العواضي، العاملة في تجارة الزجاج منذ 1974. نصنع حلولاً زجاجية بمعايير عالمية للمقاولين والمصنّعين والمشاريع في اليمن.", en: "Founded in 2021, our factory is part of Al-Awadhi Group, in the glass trade since 1974. We manufacture world-class glass solutions for contractors, fabricators and projects across Yemen." }) : t({ ar: "تأسس مصنع العواضي لصناعة الزجاج عام 2021 كأحد أذرع مجموعة العواضي للتجارة والصناعة، الرائدة في تجارة الزجاج منذ 1974. نلتزم بأعلى معايير الجودة العالمية، ونخدم المقاولين ومصنّعي الألمنيوم والمشاريع في جميع أنحاء اليمن.", en: "Founded in 2021 as part of Al-Awadhi Group — a leader in the glass trade since 1974 — we work to international quality standards, serving contractors, aluminium fabricators and projects across Yemen." })}</p>
          {!compact && <p className="factory-slogan">«{t(slogan)}»</p>}
          {compact && <Button asChild variant="outline" className="factory-about-link"><Link to="/about">{t({ ar: "تعرّف على المصنع", en: "Discover the factory" })}<Arrow size={18} /></Link></Button>}
        </div>

        {compact ? (
          <div className="factory-year-panel" aria-label={t({ ar: "تأسس المصنع عام 2021 في صنعاء", en: "Factory founded in Sana'a in 2021" })}>
            <span className="factory-year-kicker">SANA'A · YEMEN</span>
            <strong>2021</strong>
            <div><span>{t({ ar: "عام تأسيس المصنع", en: "The year our factory began" })}</span><i aria-hidden /></div>
          </div>
        ) : (
          <div className="factory-photo-frame">
            <img src={factory} alt={t({ ar: "خط إنتاج الزجاج", en: "Glass production line" })} width={1200} height={800} loading="lazy" />
            <span>PRODUCTION / 01</span>
          </div>
        )}
      </div>
      {compact && <div className="mx-auto max-w-7xl"><FactoryStats /></div>}
    </section>
  );
}

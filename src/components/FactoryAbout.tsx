import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { groupStats, slogan } from "@/lib/content";
import factory from "@/assets/p2.jpg";

export function FactoryStats() {
  const { t } = useLang();
  return <div className="mt-8 grid grid-cols-3 gap-3">
    {([[1974, { ar: "خبرة المجموعة", en: "Group heritage" }], [2021, { ar: "تأسيس المصنع", en: "Factory founded" }], [groupStats.companies, { ar: `شركات في ${groupStats.countries} دول`, en: `companies in ${groupStats.countries} countries` }]] as const).map(([n, l]) => <div key={n} className="glass rounded-2xl p-3 md:p-4 text-center"><div className="text-3xl font-bold text-primary tabular-nums">{n}</div><div className="text-xs text-muted-foreground mt-1">{t(l)}</div></div>)}
  </div>;
}

export function FactoryAbout({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return <section className="home-raised px-5">
    <div className={`mx-auto max-w-7xl ${compact ? "max-w-4xl" : "grid gap-12 lg:grid-cols-2 items-center"}`}>
      <div>
        <p className="text-xs uppercase text-primary">{t({ ar: "من نحن", en: "Who we are" })}</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">{t({ ar: "منشأة حديثة في قلب صنعاء", en: "A modern facility in the heart of Sana'a" })}</h2>
        <p className="mt-5 text-muted-foreground leading-loose">{compact ? t({ ar: "تأسس مصنع العواضي لصناعة الزجاج عام 2021 ضمن مجموعة العواضي للتجارة والصناعة، في تجارة الزجاج منذ 1974.\nنصنع زجاجاً بمعايير عالمية للمقاولين والمصنّعين والمشاريع في اليمن.", en: "Founded in 2021, our factory is part of Al-Awadhi Group, in the glass trade since 1974.\nWe manufacture glass to international standards for contractors, fabricators and projects across Yemen." }) : t({ ar: "تأسس مصنع العواضي لصناعة الزجاج عام 2021 كأحد أذرع مجموعة العواضي للتجارة والصناعة، الرائدة في تجارة الزجاج منذ 1974. نلتزم بأعلى معايير الجودة العالمية، ونخدم المقاولين ومصنّعي الألمنيوم والمشاريع في جميع أنحاء اليمن.", en: "Founded in 2021 as part of Al-Awadhi Group — a leader in the glass trade since 1974 — we work to international quality standards, serving contractors, aluminium fabricators and projects across Yemen." })}</p>
        {!compact && <p className="mt-4 text-highlight font-semibold leading-relaxed">«{t(slogan)}»</p>}
        <FactoryStats />
        {compact && <Button asChild variant="outline" className="glass mt-8 h-auto rounded-full px-6 py-3"><Link to="/about">{t({ ar: "تعرّف علينا أكثر", en: "Learn more about us" })}<Arrow size={18} /></Link></Button>}
      </div>
      {!compact && <div className="relative rounded-3xl overflow-hidden glass h-[360px] md:h-[480px]"><img src={factory} alt={t({ ar: "خط إنتاج الزجاج", en: "Glass production line" })} width={1200} height={800} loading="lazy" className="h-full w-full object-cover" /></div>}
    </div>
  </section>;
}

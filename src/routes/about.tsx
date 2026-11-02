import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteShell";
import { FactoryAbout } from "@/components/FactoryAbout";
import { OurCompanies } from "@/components/OurCompanies";
import { CompanyTimeline } from "@/components/CompanyTimeline";
import { FinalQuote } from "@/components/FinalQuote";
import { useLang } from "@/lib/i18n";
import { slogan } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "من نحن | العواضي لصناعة الزجاج — About Alawadhi" },
    { name: "description", content: "تعرف على مصنع العواضي لصناعة الزجاج في صنعاء، وقصة المجموعة منذ 1955 وخبرتها في الزجاج منذ 1974 وشركاتها في اليمن وعُمان والسعودية." },
    { property: "og:title", content: "من نحن | Alawadhi for Glass Industry — About us" },
    { property: "og:description", content: "Our story, modern Sana'a glass factory and group companies across Yemen, Oman and Saudi Arabia. In the glass trade since 1974." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: About,
});

function About() {
  const { t } = useLang();
  return <div className="about-sections">
    <PageHeader eyebrow={t({ ar: "العواضي لصناعة الزجاج", en: "Alawadhi for Glass Industry" })} title={t({ ar: "من نحن", en: "About us" })}>
      {t({ ar: "مصنع العواضي لصناعة الزجاج جزء من مجموعة العواضي للتجارة والصناعة، الرائدة في تجارة الزجاج منذ 1974.", en: "Alawadhi for Glass Industry is part of Al-Awadhi Group for Trading and Manufacturing, in the glass trade since 1974." })}
    </PageHeader>
    <CompanyTimeline />
    <FactoryAbout />
    <section className="px-5"><div className="mx-auto max-w-5xl text-center"><p className="text-xs uppercase text-primary">{t({ ar: "نحو التميز", en: "Towards excellence" })}</p><h2 className="mt-3 text-3xl md:text-5xl font-bold">{t({ ar: "رؤيتنا", en: "Our vision" })}</h2><p className="mt-8 text-xl md:text-3xl text-silver leading-loose">«{t(slogan)}»</p></div></section>
    <div className="about-companies home-raised"><OurCompanies /></div>
    <FinalQuote />
  </div>;
}

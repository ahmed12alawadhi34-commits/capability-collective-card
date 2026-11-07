import { createFileRoute } from "@tanstack/react-router";
import { GroupIntro } from "@/components/GroupIntro";
import { Vision2030 } from "@/components/Vision2030";
import { FactoryAbout } from "@/components/FactoryAbout";
import { OurCompanies } from "@/components/OurCompanies";
import { CompanyTimeline } from "@/components/CompanyTimeline";
import { FinalQuote } from "@/components/FinalQuote";
import { useLang } from "@/lib/i18n";
import { slogan } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("/about"),
  component: About,
});

function About() {
  const { t } = useLang();
  return <div className="about-sections">
    <GroupIntro />
    <CompanyTimeline />
    <Vision2030 />
    <FactoryAbout />
    <section className="px-5"><div className="mx-auto max-w-5xl text-center"><p className="text-xs uppercase text-primary">{t({ ar: "نحو التميز", en: "Towards excellence" })}</p><h2 className="mt-3 text-3xl md:text-5xl font-bold">{t({ ar: "رؤيتنا", en: "Our vision" })}</h2><p className="mt-8 text-xl md:text-3xl text-silver leading-loose">«{t(slogan)}»</p></div></section>
    <div id="companies" className="about-companies home-raised scroll-mt-24"><OurCompanies /></div>
    <FinalQuote />
  </div>;
}

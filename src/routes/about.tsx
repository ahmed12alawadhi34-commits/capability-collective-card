import { createFileRoute } from "@tanstack/react-router";
import { GroupIntro } from "@/components/GroupIntro";
import { Vision2030 } from "@/components/Vision2030";
import { FactoryAbout } from "@/components/FactoryAbout";
import { OurCompanies } from "@/components/OurCompanies";
import { CompanyTimeline } from "@/components/CompanyTimeline";
import { FinalQuote } from "@/components/FinalQuote";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("/about"),
  component: About,
});

function About() {
  return <div className="about-sections">
    <GroupIntro />
    <CompanyTimeline />
    <Vision2030 />
    <FactoryAbout />
    <div id="companies" className="about-companies home-raised scroll-mt-24"><OurCompanies /></div>
    <FinalQuote />
  </div>;
}

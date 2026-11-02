import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { companies } from "@/lib/companies";
import { useLang } from "@/lib/i18n";

export function GroupCompaniesRow() {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return <section className="group-companies-row px-5">
    <div className="mx-auto max-w-7xl">
      <h2 className="text-center text-2xl md:text-3xl font-bold">{t({ ar: "شركات المجموعة", en: "Group companies" })}</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {companies.map((company) => {
          const logo = <img src={company.logo} alt={t(company.name)} loading="lazy" decoding="async" className="h-full w-full object-contain" />;
          return company.url ? <a key={company.name.en} href={company.url} target="_blank" rel="noopener noreferrer" className="logo-tile group-logo-tile" aria-label={t(company.name)}>{logo}</a> : <div key={company.name.en} className="logo-tile group-logo-tile">{logo}</div>;
        })}
      </div>
      <div className="mt-6 text-center"><Link to="/about" className="inline-flex gap-2 items-center text-primary text-sm font-semibold hover:underline">{t({ ar: "كل الشركات", en: "All companies" })}<Arrow size={16} /></Link></div>
    </div>
  </section>;
}

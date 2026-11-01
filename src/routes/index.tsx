import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { useLang } from "@/lib/i18n";
import { groupName, intro, companies, partners } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مجموعة العوضي للتجارة والصناعة — منذ 1974 | Al-Awadhi Group" },
      { name: "description", content: "مجموعة العوضي: زجاج، مواد بناء، صناعة وتجارة في اليمن والسعودية وعُمان منذ 1974." },
      { property: "og:title", content: "مجموعة العوضي للتجارة والصناعة" },
      { property: "og:description", content: "Glass, building materials and manufacturing across Yemen, Saudi Arabia and Oman since 1974." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();
  const stats = [
    { n: "1974", l: { ar: "سنة التأسيس", en: "Established" } },
    { n: "7", l: { ar: "شركات تابعة", en: "Subsidiaries" } },
    { n: "3", l: { ar: "دول", en: "Countries" } },
    { n: "12+", l: { ar: "شريك عالمي", en: "Global partners" } },
  ];
  return (
    <>
      <section className="relative min-h-[82vh] flex items-end text-primary-foreground overflow-hidden">
        <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-fade" />
        <div className="relative mx-auto max-w-6xl w-full px-5 pb-16 pt-32">
          <p className="text-xs tracking-[0.3em] uppercase opacity-80">{t({ ar: "منذ 1974", en: "Established in 1974" })}</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight max-w-3xl">{t(groupName)}</h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg opacity-90 leading-relaxed">{t(intro)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/companies" className="rounded-sm bg-accent text-accent-foreground px-6 py-3 font-semibold">{t({ ar: "تعرّف على شركاتنا", en: "Our companies" })}</Link>
            <Link to="/contact" className="rounded-sm border border-primary-foreground/40 px-6 py-3 font-semibold">{t({ ar: "تواصل معنا", en: "Contact us" })}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 -mt-10 relative grid grid-cols-2 md:grid-cols-4 bg-card shadow-lg border">
        {stats.map((s) => (
          <div key={s.n} className="p-6 text-center border-border even:border-s md:border-s md:first:border-s-0">
            <div className="font-display text-3xl font-bold text-accent">{s.n}</div>
            <div className="mt-1 text-sm text-muted-foreground">{t(s.l)}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-2xl md:text-3xl font-bold">{t({ ar: "منظومة متكاملة من الشركات", en: "An integrated family of companies" })}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.slice(0, 6).map((c, i) => (
            <div key={i} className="border bg-card p-6 hover:border-accent transition">
              <p className="text-xs text-accent font-semibold">{t(c.place)}</p>
              <h3 className="mt-2 font-bold">{t(c.name)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(c.desc)}</p>
            </div>
          ))}
        </div>
        <Link to="/companies" className="inline-block mt-6 text-accent font-semibold">{t({ ar: "جميع الشركات ←", en: "All companies →" })}</Link>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-2xl font-bold">{t({ ar: "شركاء النجاح", en: "Success partners" })}</h2>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 font-display text-lg font-semibold text-primary/70" dir="ltr">
            {partners.map((p) => <span key={p.name}>{p.name}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}

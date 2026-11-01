import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { products, reasons, steps } from "@/lib/content";
import { ProductIcon } from "@/components/ProductIcon";
import factory from "@/assets/p2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "العواضي لصناعة الزجاج — زجاج مقسّى ومعشّق ومزدوج في صنعاء" },
      { name: "description", content: "Alawadhi for Glass Industry: precision tempered, laminated and double-glazed glass manufactured in Sana'a, Yemen." },
      { property: "og:title", content: "العواضي لصناعة الزجاج | Alawadhi for Glass Industry" },
      { property: "og:description", content: "Engineered Glass. Built for Yemen. — زجاج مُصنَّع بدقة لمشاريع اليمن." },
    ],
  }),
  component: Index,
});

function GlassScene() {
  const panes = [
    { ry: "-28deg", cls: "start-[6%] top-[22%] h-72 w-44", d: "0s" },
    { ry: "18deg", cls: "start-[30%] top-[12%] h-96 w-56", d: "-2s" },
    { ry: "-12deg", cls: "end-[24%] top-[30%] h-80 w-48", d: "-4s" },
    { ry: "30deg", cls: "end-[4%] top-[16%] h-64 w-40", d: "-6s" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden [perspective:1200px]" aria-hidden>
      <div className="absolute -inset-[50%] animate-rays opacity-30 [background:repeating-conic-gradient(from_0deg,var(--glass-border)_0deg_2deg,transparent_2deg_14deg)]" />
      {panes.map((p, i) => (
        <div key={i} style={{ ["--ry" as string]: p.ry, animationDelay: p.d }} className={`absolute ${p.cls} glass shine rounded-2xl animate-floaty`} />
      ))}
      <div className="absolute inset-0 bg-fade" />
    </div>
  );
}

function Index() {
  const { t } = useLang();
  return (
    <>
      <section className="relative min-h-screen flex items-center bg-night overflow-hidden">
        <GlassScene />
        <div className="relative mx-auto max-w-7xl w-full px-5 pt-28 pb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-primary [animation:rise_.8s_ease_both]">{t({ ar: "منذ 2021 · صنعاء", en: "Since 2021 · Sana'a" })}</p>
          <h1 className="mt-5 text-5xl md:text-7xl font-extrabold leading-[1.1] max-w-4xl text-silver [animation:rise_.9s_.1s_ease_both]">
            {t({ ar: "زجاج مُصنَّع بدقة. لمشاريع اليمن.", en: "Engineered Glass. Built for Yemen." })}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed [animation:rise_.9s_.2s_ease_both]">
            {t({ ar: "زجاج مقسّى ومعشّق ومزدوج بمواصفات عالمية، يُنتَج في مصنع حديث بصنعاء للمقاولين والمصنّعين والمشاريع الكبرى.", en: "Precision tempered, laminated and double-glazed glass to international standards — produced in a modern Sana'a facility for contractors, fabricators and major projects." })}
          </p>
          <div className="mt-9 flex flex-wrap gap-3 [animation:rise_.9s_.3s_ease_both]">
            <Link to="/products" className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold">{t({ ar: "منتجاتنا", en: "Our Products" })}</Link>
            <Link to="/quote" className="glass rounded-full px-7 py-3.5 font-semibold">{t({ ar: "اطلب عرض سعر", en: "Request a Quote" })}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 grid gap-12 lg:grid-cols-2 items-center">
        <div className="reveal">
          <p className="text-xs tracking-[0.3em] uppercase text-primary">{t({ ar: "عن المصنع", en: "About the factory" })}</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">{t({ ar: "منشأة حديثة في قلب صنعاء", en: "A modern facility in the heart of Sana'a" })}</h2>
          <p className="mt-5 text-muted-foreground leading-loose">{t({ ar: "تأسس مصنع العواضي لصناعة الزجاج عام 2021 كأحد أذرع مجموعة العوضي للتجارة والصناعة، الرائدة في تجارة الزجاج منذ 1974. نلتزم بأعلى معايير الجودة العالمية، ونخدم المقاولين ومصنّعي الألمنيوم والمشاريع السكنية والتجارية في جميع أنحاء اليمن.", en: "Founded in 2021 as part of Al-Awadhi Group for Trading and Manufacturing — a leader in the glass trade since 1974 — Alawadhi for Glass Industry works to international quality standards, serving contractors, aluminium fabricators and residential and commercial projects across Yemen." })}</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[["1974", { ar: "خبرة المجموعة", en: "Group heritage" }], ["2021", { ar: "تأسيس المصنع", en: "Factory founded" }], ["5", { ar: "فئات منتجات", en: "Product lines" }]].map(([n, l]) => (
              <div key={n as string} className="glass rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">{n as string}</div>
                <div className="text-xs text-muted-foreground mt-1">{t(l as { ar: string; en: string })}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal shine rounded-3xl overflow-hidden glass">
          <img src={factory} alt={t({ ar: "خط إنتاج الزجاج", en: "Glass production line" })} width={1200} height={800} loading="lazy" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="bg-night py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4 reveal">
            <h2 className="text-3xl md:text-4xl font-bold">{t({ ar: "منتجاتنا", en: "Our products" })}</h2>
            <Link to="/products" className="text-primary text-sm inline-flex items-center gap-1">{t({ ar: "التفاصيل", en: "Details" })} <ArrowUpRight size={16} /></Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((p) => (
              <div key={p.icon} className="reveal glass shine rounded-2xl p-6 hover:-translate-y-1 transition">
                <div className="text-primary"><ProductIcon name={p.icon} /></div>
                <h3 className="mt-5 font-semibold leading-snug">{t(p.name)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-3xl md:text-4xl font-bold reveal">{t({ ar: "لماذا العواضي؟", en: "Why choose us" })}</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={i} className="reveal glass rounded-2xl p-6 flex items-center gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Check size={20} /></span>
              <span className="font-medium">{t(r)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-night py-24">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-3xl md:text-4xl font-bold reveal">{t({ ar: "مراحل الإنتاج", en: "Production process" })}</h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-6 relative">
            <div className="hidden md:block absolute top-6 inset-x-0 h-px bg-border" />
            {steps.map((s, i) => (
              <li key={i} className="reveal relative" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="relative grid h-12 w-12 place-items-center rounded-full glass text-primary font-bold">{i + 1}</span>
                <p className="mt-4 font-semibold">{t(s)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="reveal glass shine rounded-3xl p-10 md:p-14 grid gap-8 md:grid-cols-[1.5fr_1fr] items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary">{t({ ar: "مجموعتنا", en: "Our group" })}</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">{t({ ar: "جزء من مجموعة العوضي للتجارة والصناعة", en: "Part of Al-Awadhi Group for Trading and Manufacturing" })}</h2>
            <p className="mt-3 text-muted-foreground">{t({ ar: "خمسون عاماً من الثقة في الزجاج ومواد البناء في اليمن والسعودية وعُمان.", en: "Fifty years of trust in glass and building materials across Yemen, Saudi Arabia and Oman." })}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://www.alawadhigroup.net" target="_blank" rel="noreferrer" className="glass rounded-full px-6 py-3 flex justify-between items-center">alawadhigroup.net <ArrowUpRight size={16} /></a>
            <a href="https://www.yemenglass.com" target="_blank" rel="noreferrer" className="glass rounded-full px-6 py-3 flex justify-between items-center">yemenglass.com <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>
    </>
  );
}

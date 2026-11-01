import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, type MouseEvent } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { products, reasons, steps } from "@/lib/content";
import { ProductIcon } from "@/components/ProductIcon";
import { BgVideo } from "@/components/BgVideo";
import { gsap, ScrollTrigger } from "@/lib/motion";
import factory from "@/assets/p2.jpg";
import p1 from "@/assets/p1.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import rollers from "@/assets/glass-rollers.mp4.asset.json";
import rollersM from "@/assets/glass-rollers-m.mp4.asset.json";
import rollersPoster from "@/assets/glass-rollers-poster.jpg.asset.json";
import furnace from "@/assets/factory-furnace.mp4.asset.json";
import furnaceM from "@/assets/factory-furnace-m.mp4.asset.json";
import furnacePoster from "@/assets/factory-furnace-poster.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "العواضي لصناعة الزجاج — زجاج مقسّى ومعشّق ومزدوج في صنعاء" },
      { name: "description", content: "Alawadhi for Glass Industry: precision tempered, laminated and double-glazed glass manufactured in Sana'a, Yemen." },
      { property: "og:title", content: "العواضي لصناعة الزجاج | Alawadhi for Glass Industry" },
      { property: "og:description", content: "Engineered Glass. Built for Yemen. — زجاج مُصنَّع بدقة لمشاريع اليمن." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Masked line: text slides up from behind its own clip. */
function Line({ children, className = "" }: { children: string; className?: string }) {
  return <span className={`block overflow-hidden pb-1 ${className}`}><span data-line className="block">{children}</span></span>;
}

function tilt(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget, r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  el.style.transform = `perspective(800px) rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 14}deg) translateZ(0)`;
  el.style.setProperty("--mx", `${x * 100}%`); el.style.setProperty("--my", `${y * 100}%`);
}
function untilt(e: MouseEvent<HTMLDivElement>) { e.currentTarget.style.transform = ""; }

function Index() {
  const { t, lang } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const headline = t({ ar: "زجاج مُصنَّع بدقة لمشاريع اليمن", en: "Engineered Glass. Built for Yemen." });
  const gallery = [
    { src: p1, t: { ar: "واجهة برج تجاري", en: "Commercial tower facade" } },
    { src: p3, t: { ar: "درابزين وفواصل زجاجية", en: "Glass railings & partitions" } },
    { src: factory, t: { ar: "خط التقسية", en: "Tempering line" } },
    { src: p4, t: { ar: "وحدات زجاج مزدوج", en: "Insulated glass units" } },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-word]", { yPercent: 110, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.9 });
      gsap.from("[data-hero-fade]", { y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 1.5 });

      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((g) =>
        gsap.from(g.querySelectorAll("[data-line]"), { yPercent: 105, duration: 1, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: g, start: "top 85%" } }));

      gsap.from("[data-frame]", { opacity: 0, y: 40, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: "[data-frame]", start: "top 85%" } });

      gsap.from("[data-card]", { x: lang === "ar" ? -80 : 80, rotateY: lang === "ar" ? 25 : -25, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: "[data-cards]", start: "top 80%" } });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset["count"]), o = { v: end > 1000 ? end - 60 : 0 };
        gsap.to(o, { v: end, duration: 2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => { el.textContent = Math.round(o.v).toString(); } });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) =>
        gsap.fromTo(el, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: el.parentElement, scrub: true } }));

      const track = document.querySelector<HTMLElement>("[data-track]");
      if (track) {
        const dist = () => track.scrollWidth - window.innerWidth + 40;
        gsap.to(track, { x: () => (lang === "ar" ? dist() : -dist()), ease: "none", scrollTrigger: { trigger: "[data-hscroll]", start: "top top", end: () => `+=${dist()}`, scrub: 1, pin: true, invalidateOnRefresh: true } });
      }
    }, root);
    const r = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { clearTimeout(r); ctx.revert(); };
  }, [lang]);

  return (
    <div ref={root} className="overflow-x-clip">
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-night">
        <div className="absolute inset-0"><BgVideo desktop={furnace.url} mobile={furnaceM.url} poster={furnacePoster.url} /></div>
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl w-full px-5 pt-20">
          <div className="relative max-w-4xl">
            <div aria-hidden className="orbit-ring absolute -top-24 start-[-6rem] h-[28rem] w-[28rem] md:h-[36rem] md:w-[36rem] pointer-events-none" />
            <p data-hero-fade className="relative text-xs tracking-[0.3em] uppercase text-primary">{t({ ar: "منذ 2021 · صنعاء", en: "Since 2021 · Sana'a" })}</p>
            <h1 className="relative mt-5 text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1]" aria-label={headline}>
              {headline.split(" ").map((w, i) => (
                <span key={lang + i} className="inline-block overflow-hidden align-bottom pb-2 me-[0.25em]" aria-hidden>
                  <span data-word className={`inline-block ${i === (lang === "ar" ? 4 : 2) ? "text-highlight" : "text-silver"}`}>{w}</span>
                </span>
              ))}
            </h1>
            <p data-hero-fade className="relative mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              {t({ ar: "زجاج مقسّى ومعشّق ومزدوج بمواصفات عالمية، يُنتَج في مصنع حديث بصنعاء للمقاولين والمصنّعين والمشاريع الكبرى.", en: "Precision tempered, laminated and double-glazed glass to international standards — produced in a modern Sana'a facility." })}
            </p>
            <div data-hero-fade className="relative mt-9 flex flex-wrap gap-3">
              <Link to="/products" className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold">{t({ ar: "منتجاتنا", en: "Our Products" })}</Link>
              <Link to="/quote" className="glass rounded-full px-7 py-3.5 font-semibold">{t({ ar: "اطلب عرض سعر", en: "Request a Quote" })}</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 inset-x-0 flex justify-center"><span className="h-12 w-px bg-gradient-to-b from-primary to-transparent animate-pulse" /></div>
      </section>

      {/* ROLLERS VIDEO CARD */}
      <section className="relative px-5 py-20">
        <div data-frame className="relative mx-auto max-w-[1200px] h-[60vh] min-h-[360px] overflow-hidden rounded-3xl glass">
          <BgVideo desktop={rollers.url} mobile={rollersM.url} poster={rollersPoster.url} preload="metadata" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div data-lines className="absolute inset-0 grid place-items-center text-center px-5">
            <h2 className="text-4xl md:text-7xl font-extrabold">
              <Line>{t({ ar: "دقة في", en: "Precision in" })}</Line>
              <Line className="text-highlight">{t({ ar: "كل حافة", en: "every edge" })}</Line>
            </h2>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-5 py-28 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-primary">{t({ ar: "عن المصنع", en: "About the factory" })}</p>
          <h2 data-lines className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            <Line>{t({ ar: "منشأة حديثة", en: "A modern facility" })}</Line>
            <Line>{t({ ar: "في قلب صنعاء", en: "in the heart of Sana'a" })}</Line>
          </h2>
          <p className="reveal mt-5 text-muted-foreground leading-loose">{t({ ar: "تأسس مصنع العواضي لصناعة الزجاج عام 2021 كأحد أذرع مجموعة العوضي للتجارة والصناعة، الرائدة في تجارة الزجاج منذ 1974. نلتزم بأعلى معايير الجودة العالمية، ونخدم المقاولين ومصنّعي الألمنيوم والمشاريع في جميع أنحاء اليمن.", en: "Founded in 2021 as part of Al-Awadhi Group — a leader in the glass trade since 1974 — we work to international quality standards, serving contractors, aluminium fabricators and projects across Yemen." })}</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {([[1974, { ar: "خبرة المجموعة", en: "Group heritage" }], [2021, { ar: "تأسيس المصنع", en: "Factory founded" }], [7, { ar: "فروع", en: "Branches" }]] as const).map(([n, l]) => (
              <div key={n} className="glass rounded-2xl p-4 text-center">
                <div data-count={n} className="text-3xl font-bold text-primary tabular-nums">{n}</div>
                <div className="text-xs text-muted-foreground mt-1">{t(l)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-3xl overflow-hidden glass h-[480px]">
          <img data-parallax src={factory} alt={t({ ar: "خط إنتاج الزجاج", en: "Glass production line" })} width={1200} height={800} loading="lazy" className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover" />
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section-light py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 data-lines className="text-3xl md:text-5xl font-bold"><Line>{t({ ar: "منتجاتنا", en: "Our products" })}</Line></h2>
            <Link to="/products" className="text-primary text-sm inline-flex items-center gap-1">{t({ ar: "التفاصيل", en: "Details" })} <ArrowUpRight size={16} /></Link>
          </div>
          <div data-cards className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 [perspective:1000px]">
            {products.map((p) => (
              <div key={p.icon} data-card onMouseMove={tilt} onMouseLeave={untilt} className="glass glare rounded-2xl p-6 min-h-48 transition-transform duration-200 ease-out will-change-transform">
                <div className="text-primary"><ProductIcon name={p.icon} /></div>
                <h3 className="mt-5 font-semibold leading-snug">{t(p.name)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTAL GALLERY */}
      <section data-hscroll className="h-screen flex flex-col justify-center overflow-hidden">
        <div className="mx-auto max-w-7xl w-full px-5 mb-10">
          <h2 data-lines className="text-3xl md:text-5xl font-bold"><Line>{t({ ar: "أعمال نفخر بها", en: "Work we're proud of" })}</Line></h2>
        </div>
        <div data-track className="flex gap-6 px-5 w-max">
          {gallery.map((g, i) => (
            <figure key={i} className="relative h-[55vh] w-[78vw] sm:w-[48vw] lg:w-[36vw] shrink-0 overflow-hidden rounded-3xl">
              <img data-parallax src={g.src} alt={t(g.t)} loading="lazy" className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover" />
              <figcaption className="absolute inset-x-4 bottom-4 glass rounded-2xl px-5 py-3 font-semibold">{t(g.t)}</figcaption>
            </figure>
          ))}
          <Link to="/projects" className="glass h-[55vh] w-[60vw] sm:w-[30vw] shrink-0 rounded-3xl grid place-items-center text-xl font-semibold text-primary">{t({ ar: "كل المشاريع", en: "All projects" })} <ArrowUpRight /></Link>
        </div>
      </section>

      {/* WHY */}
      <section className="section-light py-28"><div className="mx-auto max-w-7xl px-5">
        <h2 data-lines className="text-3xl md:text-5xl font-bold"><Line>{t({ ar: "لماذا العواضي؟", en: "Why choose us" })}</Line></h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={i} className="reveal glass rounded-2xl p-6 flex items-center gap-4" style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Check size={20} /></span>
              <span className="font-medium">{t(r)}</span>
            </div>
          ))}
        </div>
      </div></section>

      {/* PROCESS */}
      <section className="bg-night py-28">
        <div className="mx-auto max-w-7xl px-5">
          <h2 data-lines className="text-3xl md:text-5xl font-bold"><Line>{t({ ar: "مراحل الإنتاج", en: "Production process" })}</Line></h2>
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

      {/* GROUP */}
      <section className="mx-auto max-w-7xl px-5 py-28">
        <div className="reveal glass shine rounded-3xl p-10 md:p-14 grid gap-8 md:grid-cols-[1.5fr_1fr] items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary">{t({ ar: "مجموعتنا", en: "Our group" })}</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">{t({ ar: "جزء من مجموعة العوضي للتجارة والصناعة", en: "Part of Al-Awadhi Group for Trading and Manufacturing" })}</h2>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://www.alawadhigroup.net" target="_blank" rel="noreferrer" className="glass rounded-full px-6 py-3 flex justify-between items-center">alawadhigroup.net <ArrowUpRight size={16} /></a>
            <a href="https://www.yemenglass.com" target="_blank" rel="noreferrer" className="glass rounded-full px-6 py-3 flex justify-between items-center">yemenglass.com <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}

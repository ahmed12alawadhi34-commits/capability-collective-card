import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { ensureVisible, gsap } from "@/lib/motion";

const goals = [
  {
    title: { ar: "التوسع الصناعي", en: "Industrial expansion" },
    text: { ar: "خطوط إنتاج جديدة للزجاج المعماري (لامينيت ودبل جلاس) لتلبية طلب السوق المتنامي.", en: "New architectural glass lines (laminated and double glazing) to meet growing demand." },
  },
  {
    title: { ar: "نمو الشبكة", en: "Network growth" },
    text: { ar: "فروع ومصانع جديدة في اليمن والخليج لنكون أقرب إلى عملائنا.", en: "New branches and factories in Yemen and the Gulf, closer to our customers." },
  },
  {
    title: { ar: "التحول الرقمي", en: "Digital transformation" },
    text: { ar: "تحديث أنظمة الإدارة والمخزون وخدمة العملاء لأعلى كفاءة تشغيلية.", en: "Modern management, inventory and customer-service systems for maximum efficiency." },
  },
  {
    title: { ar: "الشراكات العالمية", en: "Global partnerships" },
    text: { ar: "تعزيز شراكاتنا مع العلامات العالمية الرائدة في الزجاج ومواد البناء.", en: "Stronger alliances with world-leading glass and building-material brands." },
  },
  {
    title: { ar: "المسؤولية المجتمعية", en: "Community responsibility" },
    text: { ar: "تدريب وتوظيف الشباب اليمني ونقل الخبرة الصناعية إلى وطننا.", en: "Training and employing young Yemenis and bringing industrial know-how home." },
  },
] as const;

export function Vision2030() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-vision-card]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cards, { opacity: 1, clearProps: "transform" });
      return;
    }
    let timeline: gsap.core.Timeline | undefined;
    const context = gsap.context(() => {
      timeline = gsap.timeline({ paused: true }).fromTo(cards,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", clearProps: "transform" },
      );
    }, el);
    const stop = ensureVisible(cards);
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      timeline?.play();
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(el);
    return () => { observer.disconnect(); stop(); context.revert(); };
  }, [lang]);

  return (
    <section ref={root} className="px-5" aria-labelledby="vision-2030-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">{t({ ar: "الأفق الاستراتيجي", en: "Strategic horizon" })}</p>
          <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-highlight">{t({ ar: "رؤيتنا 2030", en: "Our Vision 2030" })}</span>
        </div>
        <h2 id="vision-2030-title" className="mt-4 max-w-4xl scroll-mt-28 text-3xl font-bold leading-tight md:text-5xl">{t({ ar: "نحو ريادة صناعة الزجاج في المنطقة", en: "Leading the region's glass industry" })}</h2>
        <p className="mt-5 max-w-3xl leading-loose text-muted-foreground">{t({ ar: "انطلاقاً من خمسة عقود من الثقة، تمضي مجموعة العواضي في خطة نمو للسنوات القادمة.", en: "Building on five decades of trust, Al-Awadhi Group is moving ahead with a growth plan for the years ahead." })}</p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6">
          {goals.map((goal, index) => (
            <article key={goal.title.en} data-vision-card className={`glass rounded-3xl p-7 md:col-span-2 md:p-8 ${index === 3 ? "md:col-start-2" : ""} ${index === 4 ? "md:col-start-4" : ""}`}>
              <span className="text-sm font-bold tabular-nums text-primary" dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-xl font-bold md:text-2xl">{t(goal.title)}</h3>
              <p className="mt-3 text-sm leading-loose text-muted-foreground md:text-base">{t(goal.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

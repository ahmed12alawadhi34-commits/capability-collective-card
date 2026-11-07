import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { gsap } from "@/lib/motion";

const stats = [
  { value: 50, prefix: "+", suffix: "", label: { ar: "سنة خبرة", en: "Years of experience" } },
  { value: 85, prefix: "", suffix: "%", label: { ar: "من سوق الزجاج في اليمن", en: "of Yemen's glass market" } },
  { value: 6, prefix: "", suffix: "", label: { ar: "شركات", en: "Companies" } },
  { value: 3, prefix: "", suffix: "", label: { ar: "دول", en: "Countries" } },
] as const;

export function GroupIntro() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const counters = Array.from(el.querySelectorAll<HTMLElement>("[data-group-count]"));
    const tweens: gsap.core.Tween[] = [];
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      counters.forEach((counter) => {
        const target = Number(counter.dataset.groupCount ?? 0);
        const prefix = counter.dataset.prefix ?? "";
        const suffix = counter.dataset.suffix ?? "";
        const state = { value: 0 };
        const render = () => { counter.textContent = `${prefix}${Math.round(state.value)}${suffix}`; };
        render();
        tweens.push(gsap.to(state, { value: target, duration: 1.6, ease: "power2.out", onUpdate: render, onComplete: render }));
      });
    }, { threshold: 0.25 });
    observer.observe(el);
    return () => { observer.disconnect(); tweens.forEach((tween) => tween.kill()); };
  }, [lang]);

  const scrollToCompanies = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("companies")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <section ref={root} className="group-hero bg-night px-5 pb-20 pt-36 md:pb-24 md:pt-44">
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">{t({ ar: "العواضي لصناعة الزجاج", en: "Al-Awadhi for Glass Industry" })}</p>
        <h1 className="mt-4 break-words text-5xl font-extrabold leading-tight text-silver sm:text-6xl md:text-7xl lg:text-8xl">{t({ ar: "مجموعة العواضي", en: "Al-Awadhi Group" })}</h1>
        <p className="mt-6 max-w-4xl text-base leading-loose text-muted-foreground md:text-lg">
          {t({
            ar: "مصنع العواضي لصناعة الزجاج جزء من مجموعة العواضي للتجارة والصناعة، الرائدة رقم واحد في سوق الزجاج في اليمن منذ 1974. مجموعة عائلية متكاملة تعمل في الزجاج ومواد البناء، بشركات في اليمن والمملكة العربية السعودية وسلطنة عُمان.",
            en: "Al-Awadhi for Glass Industry is part of Al-Awadhi Group for Trading and Manufacturing — Yemen's number-one glass company since 1974. An integrated family group in glass and building materials, with companies in Yemen, Saudi Arabia and Oman.",
          })}
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.value} className="glass rounded-2xl p-4 text-center md:p-5">
              <div className="text-3xl font-extrabold tabular-nums text-highlight md:text-4xl" dir="ltr">
                <span data-group-count={stat.value} data-prefix={stat.prefix} data-suffix={stat.suffix}>{stat.prefix}{stat.value}{stat.suffix}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground md:text-sm">{t(stat.label)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="button" onClick={scrollToCompanies} className="min-h-11 w-full rounded-full px-7 sm:w-auto">
            <Building2 size={18} />{t({ ar: "شركاتنا", en: "Our companies" })}
          </Button>
          <Button asChild variant="outline" className="glass min-h-11 w-full rounded-full px-7 sm:w-auto">
            <Link to="/contact">{t({ ar: "تواصل معنا", en: "Contact us" })}<Arrow size={18} /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

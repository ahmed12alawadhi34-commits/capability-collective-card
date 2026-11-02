import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { history } from "@/lib/history";

export function CompanyTimeline() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      gsap.fromTo(".history-line-progress", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: ".history-list", start: "top 80%", end: "bottom 65%", scrub: true } });
      if (!reduced) gsap.utils.toArray<HTMLElement>(".history-point").forEach((point) => gsap.fromTo(point, { opacity: 0, y: 20 }, { opacity: 1, y: 0, clearProps: "transform", duration: .7, scrollTrigger: { trigger: point, start: "top 90%", once: true } }));
    }, root);
    return () => context.revert();
  }, [lang]);
  return <section ref={root} className="px-5"><div className="mx-auto max-w-5xl">
    <p className="text-xs text-primary uppercase">{t({ ar: "رحلتنا", en: "Our journey" })}</p>
    <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t({ ar: "قصتنا", en: "Our story" })}</h2>
    <ol className="history-list relative mt-12">
      <div aria-hidden className="history-line"><span className="history-line-progress" /></div>
      {history.map((point) => <li key={point.year} className="history-point relative ps-12 pb-14 last:pb-0"><span aria-hidden className="history-dot" /><div className="text-primary text-3xl md:text-4xl font-bold tabular-nums">{point.year}</div><h3 className="mt-3 text-lg md:text-xl font-semibold leading-relaxed">{t(point.title)}</h3></li>)}
    </ol>
  </div></section>;
}

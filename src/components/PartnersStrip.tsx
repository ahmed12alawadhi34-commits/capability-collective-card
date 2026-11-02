import { useLang } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";

type Asset = { url: string };
const files = import.meta.glob<Asset>("../assets/partners/*.png.asset.json", { eager: true, import: "default" });
const url = (slug: string) => files[`../assets/partners/${slug}-color.png.asset.json`]?.url;

const partners: { name: string; slug?: string }[] = [
  { name: "Saint-Gobain", slug: "saint-gobain" },
  { name: "Guardian Glass", slug: "guardianglass" },
  { name: "Şişecam", slug: "sisecamflatglass" },
  { name: "Taiwan Glass", slug: "taiwanglass" },
  { name: "Obeikan Glass", slug: "obeikan" },
  { name: "Wacker", slug: "wacker" },
  { name: "Dow", slug: "dow" },
  { name: "MAB – ASSA ABLOY", slug: "assaabloy" },
  { name: "Yale", slug: "yale" },
  { name: "Profilglass", slug: "profilglass" },
  { name: "Alcobond", slug: "alcobond" },
  { name: "Casma", slug: "casma" },
  { name: "Dormate", slug: "dormate" },
  { name: "hi-tech", slug: "hi-tech" },
  { name: "Speedy", slug: "speedy" },
  { name: "Mr. Build", slug: "mrbuild" },
];

export function PartnersStrip() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      const onScreen = !!entry?.isIntersecting;
      setVisible(onScreen);
      if (onScreen) setStarted(true);
    }, { threshold: 0.1 });
    if (root.current) io.observe(root.current);
    return () => { io.disconnect(); if (timer.current) clearTimeout(timer.current); };
  }, []);
  const pauseTouch = () => {
    setPaused(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPaused(false), 1800);
  };
  return <section ref={root} className="partners-section py-16 overflow-hidden">
    <h2 className="px-5 text-center text-2xl md:text-3xl font-bold">{t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}</h2>
    <div className="partners-window mt-10" dir="ltr" tabIndex={0} onPointerDown={(e) => { if (e.pointerType !== "mouse") pauseTouch(); }} aria-label={t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}>
      <div className={`partners-track ${started ? "partners-started" : ""} ${!visible || paused ? "partners-paused" : ""}`}>{[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="partners-group">{partners.map((p) => {
        const color = p.slug && url(p.slug);
        return <li key={p.name} className={`partner-item ${["yale", "assaabloy", "obeikan"].includes(p.slug ?? "") ? "partner-compact" : ""}`}>
          {color ? <img src={color} alt={copy === 1 ? "" : p.name} loading="lazy" decoding="async" draggable={false} className="partner-logo" /> : <span className="partner-name">{p.name}</span>}
        </li>;
      })}</ul>)}</div>
    </div>
  </section>;
}

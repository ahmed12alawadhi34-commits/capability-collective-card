import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ShieldCheck, Layers, Columns2, BadgeCheck, CalendarCheck, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { gsap } from "@/lib/motion";
import mark from "@/assets/mark-white.png";

type PanelId = "ordinary" | "tempered" | "laminated" | "double";

const panels: { id: PanelId; icon: typeof ShieldCheck; name: { ar: string; en: string }; badge: { ar: string; en: string }; tone: "red" | "green" | "blue" }[] = [
  { id: "ordinary", icon: AlertTriangle, name: { ar: "زجاج عادي", en: "Ordinary glass" }, badge: { ar: "غير آمن", en: "Unsafe" }, tone: "red" },
  { id: "tempered", icon: ShieldCheck, name: { ar: "زجاج سيكوريت", en: "Tempered (Securit)" }, badge: { ar: "آمن", en: "Safe" }, tone: "green" },
  { id: "laminated", icon: Layers, name: { ar: "زجاج لامينيت (مجلتن)", en: "Laminated" }, badge: { ar: "يبقى متماسكاً", en: "Stays in one piece" }, tone: "blue" },
  { id: "double", icon: Columns2, name: { ar: "زجاج دبل جلاس", en: "Double glazing" }, badge: { ar: "عزل حراري وصوتي", en: "Thermal & sound insulation" }, tone: "blue" },
];

const features = [
  { icon: BadgeCheck, name: { ar: "جودة عالية", en: "High quality" }, desc: { ar: "منتجات بمعايير عالمية", en: "World-class products" } },
  { icon: CalendarCheck, name: { ar: "التزام بالمواعيد", en: "On time" }, desc: { ar: "توريد دقيق وموثوق", en: "Precise, reliable supply" } },
  { icon: Ruler, name: { ar: "دقة في التفاصيل", en: "Precision" }, desc: { ar: "من التصنيع حتى التوصيل", en: "From production to delivery" } },
];

/** Radial sharp cracks for ordinary glass. */
function RadialCracks() {
  return <svg viewBox="0 0 100 150" className="gt-cracks" aria-hidden>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const r = (a * Math.PI) / 180, x = 50 + Math.cos(r) * 52, y = 75 + Math.sin(r) * 78;
      return <line key={a} x1="50" y1="75" x2={x} y2={y} />;
    })}
    <line x1="50" y1="75" x2="20" y2="30" /><line x1="50" y1="75" x2="82" y2="120" />
  </svg>;
}

/** Spider-web cracks for laminated glass — the panel stays in one piece. */
function SpiderCracks() {
  return <svg viewBox="0 0 100 150" className="gt-cracks" aria-hidden>
    <circle cx="50" cy="75" r="14" /><circle cx="50" cy="75" r="28" /><circle cx="50" cy="75" r="44" />
    {[15, 60, 110, 160, 205, 250, 300, 340].map((a) => {
      const r = (a * Math.PI) / 180;
      return <line key={a} x1="50" y1="75" x2={50 + Math.cos(r) * 55} y2={75 + Math.sin(r) * 80} />;
    })}
  </svg>;
}

const granules = Array.from({ length: 18 }, (_, i) => ({ x: 8 + (i % 5) * 20 + (i % 2) * 6, y: 10 + Math.floor(i / 5) * 34, d: (i % 6) * 0.05 }));

function Panel({ id, broken, onBreak }: { id: PanelId; broken: boolean; onBreak: () => void }) {
  const { t } = useLang();
  const p = panels.find((x) => x.id === id)!;
  const I = p.icon;
  return (
    <div className="gt-item" data-gt-panel>
      <button type="button" onClick={onBreak} aria-label={t({ ar: `شاهد كيف يتصرف ${p.name.ar} عند الكسر`, en: `See how ${p.name.en} behaves when broken` })}
        className={`gt-panel gt-${id} ${broken ? "is-broken" : ""}`}>
        {id === "double" ? (
          <span className="gt-double" aria-hidden>
            <span className="gt-pane" /><span className="gt-spacer" /><span className="gt-pane" />
          </span>
        ) : (
          <span className="gt-glass" aria-hidden>
            {id === "ordinary" && <RadialCracks />}
            {id === "laminated" && <SpiderCracks />}
            {id === "tempered" && <span className="gt-granules">{granules.map((g, i) => <i key={i} style={{ left: `${g.x}%`, top: `${g.y}%`, transitionDelay: `${g.d}s` }} />)}</span>}
          </span>
        )}
      </button>
      <div className="gt-card glass">
        <span className="gt-icon"><I size={22} strokeWidth={1.6} /></span>
        <p className="mt-2 font-bold">{t(p.name)}</p>
        <span className={`gt-badge gt-badge-${p.tone}`}>{t(p.badge)}</span>
        <Link to="/products" className="mt-2 inline-flex min-h-11 items-center text-xs text-primary hover:underline">{t({ ar: "التفاصيل ←", en: "Details →" })}</Link>
      </div>
    </div>
  );
}

export function GlassTypes({ className = "" }: { className?: string }) {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [broken, setBroken] = useState<PanelId | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.querySelectorAll("[data-gt-panel]"), { opacity: 1, clearProps: "transform" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-gt-panel]", { y: -60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.18, clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [lang]);

  const breakPanel = (id: PanelId) => {
    if (broken) return;
    setBroken(id);
    setTimeout(() => setBroken(null), 2000);
  };

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(".gt-item");
    el.scrollBy({ left: dir * (item ? item.offsetWidth + 16 : 260) * (document.documentElement.dir === "rtl" ? -1 : 1), behavior: "smooth" });
  };

  return (
    <section ref={root} className={className || "bg-night py-28"} data-quote-product="shield">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="text-3xl md:text-5xl font-bold leading-[1.35]">{t({ ar: "زجاج يصنع المستقبل… بشفافية أكبر", en: "Glass that builds the future, with more clarity" })}</h2>
        <p className="mt-3 text-muted-foreground">{t({ ar: "جودة .. التزام .. دقة في التفاصيل", en: "Quality .. Commitment .. Precision in details" })}</p>

        <div className="gt-stage" dir="ltr">
          {/* Factory scene: hangar, furnace with logo sign, robot arm, moving conveyor */}
          <svg className="gt-scene" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMax slice" aria-hidden>
            <defs>
              <linearGradient id="gt-furnace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff9a3c" /><stop offset="0.55" stopColor="#f26a1b" /><stop offset="1" stopColor="#7a2b06" />
              </linearGradient>
              <linearGradient id="gt-steel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2a3c55" /><stop offset="1" stopColor="#16233a" />
              </linearGradient>
            </defs>
            {/* hangar columns and lights */}
            {[80, 420, 760, 1100].map((x) => <rect key={x} x={x} y="0" width="10" height="430" fill="#0e1930" />)}
            {[200, 560, 920].map((x) => <rect key={x} x={x} y="26" width="150" height="8" rx="4" fill="#274264" opacity="0.8" />)}
            {/* furnace */}
            <g>
              <rect x="880" y="120" width="290" height="315" rx="10" fill="url(#gt-steel)" stroke="#33486b" strokeWidth="2" />
              <rect className="gt-furnace-glow" x="905" y="190" width="240" height="220" rx="6" fill="url(#gt-furnace)" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={922 + i * 29} y="200" width="6" height="200" fill="#3a1404" opacity="0.55" />)}
              <rect x="905" y="60" width="240" height="52" rx="8" fill="#eef4fb" />
              <image href={mark} x="918" y="68" width="52" height="36" preserveAspectRatio="xMidYMid meet" style={{ filter: "invert(0.7) sepia(1) saturate(3) hue-rotate(180deg)" }} />
              <text x="1138" y="92" textAnchor="end" fontSize="19" fontWeight="700" fill="#12325e" fontFamily="Cairo, sans-serif">العواضي لصناعة الزجاج</text>
            </g>
            {/* robot arm */}
            <g className="gt-robot" style={{ transformOrigin: "180px 420px" }}>
              <rect x="150" y="410" width="70" height="24" rx="8" fill="#c9a227" />
              <rect x="170" y="300" width="22" height="120" rx="10" fill="#e3b92e" transform="rotate(18 181 420)" />
              <rect x="205" y="240" width="20" height="110" rx="10" fill="#e3b92e" transform="rotate(-35 215 350)" />
              <circle cx="181" cy="300" r="14" fill="#8a6d12" /><circle cx="262" cy="252" r="11" fill="#8a6d12" />
              <rect x="252" y="236" width="34" height="14" rx="6" fill="#c9a227" />
            </g>
            {/* conveyor belt */}
            <rect x="0" y="430" width="1200" height="14" fill="#1d3b45" />
            <line className="gt-belt-line" x1="0" y1="447" x2="1200" y2="447" stroke="#e3b92e" strokeWidth="3" strokeDasharray="16 14" />
            <rect x="0" y="450" width="1200" height="26" fill="#12232c" />
            {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={20 + i * 40} cy="463" r="7" fill="#2a4250" stroke="#3c5c6e" strokeWidth="1.5" />)}
          </svg>

          {/* panels standing on the belt */}
          <div ref={track} className="gt-panels">
            {panels.map((p) => <Panel key={p.id} id={p.id} broken={broken === p.id} onBreak={() => breakPanel(p.id)} />)}
          </div>

          <div className="gt-arrows md:hidden">
            <button type="button" aria-label={t({ ar: "السابق", en: "Previous" })} onClick={() => scroll(-1)} className="glass rounded-full p-3"><ChevronRight size={20} /></button>
            <button type="button" aria-label={t({ ar: "التالي", en: "Next" })} onClick={() => scroll(1)} className="glass rounded-full p-3"><ChevronLeft size={20} /></button>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((f) => {
            const I = f.icon;
            return (
              <div key={f.name.en} className="reveal glass rounded-2xl p-6 flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary"><I size={24} strokeWidth={1.6} /></span>
                <div><p className="font-bold">{t(f.name)}</p><p className="mt-1 text-sm text-muted-foreground">{t(f.desc)}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

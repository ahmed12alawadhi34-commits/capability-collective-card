import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { gsap } from "@/lib/motion";

type Bi = { ar: string; en: string };
export type LineStep = { name: Bi; en: string; desc: Bi; spec: Bi; x: number; y: number; wide?: boolean };

/** The 9 stations on the serpentine belt (SVG coordinates, viewBox 600×600). */
export const lineSteps: LineStep[] = [
  { name: { ar: "المخزن", en: "Raw glass storage" }, en: "RAW GLASS", x: 490, y: 150, desc: { ar: "استلام ألواح الزجاج الخام وتخزينها على حوامل حديدية.", en: "Raw glass sheets are received and stored on steel racks." }, spec: { ar: "3210×6000 مم · 4–12 مم", en: "3210×6000 mm · 4–12 mm" } },
  { name: { ar: "القص", en: "CNC cutting" }, en: "CNC CUTTING", x: 300, y: 150, desc: { ar: "قص اللوح بالمقاسات المطلوبة على طاولة قص آلية بأقل هدر.", en: "The sheet is cut to size on an automatic table with minimal waste." }, spec: { ar: "دقة ±1 مم", en: "±1 mm accuracy" } },
  { name: { ar: "تشطيب الحواف", en: "Edging" }, en: "EDGING", x: 110, y: 150, desc: { ar: "صنفرة وتلميع الحواف لتصبح ناعمة وآمنة.", en: "Edges are ground and polished smooth and safe." }, spec: { ar: "حافة مصقولة / مشطوفة", en: "Polished / bevelled edge" } },
  { name: { ar: "المغسلة", en: "Washing" }, en: "WASHING", x: 110, y: 300, desc: { ar: "غسل وتجفيف اللوح قبل الفرن.", en: "The sheet is washed and dried before the furnace." }, spec: { ar: "ماء منزوع الأملاح", en: "Demineralised water" } },
  { name: { ar: "فرن التقسية", en: "Tempering furnace" }, en: "TEMPERING", x: 300, y: 300, wide: true, desc: { ar: "تسخين الزجاج ثم تبريده فجأة بالهواء، فيصبح أقوى 4–5 مرات.", en: "The glass is heated then air-quenched, becoming 4–5× stronger." }, spec: { ar: "≈650°C ثم تبريد سريع", en: "≈650°C then rapid cooling" } },
  { name: { ar: "الزجاج المزدوج", en: "Double glazing" }, en: "DOUBLE GLAZING", x: 490, y: 300, desc: { ar: "تجميع لوحين بإطار ألمنيوم ومادة مجففة، ثم عزل مزدوج بوتيل + سيليكون.", en: "Two panes are assembled with an aluminium spacer and desiccant, then double-sealed with butyl + silicone." }, spec: { ar: "عزل حراري وصوتي", en: "Thermal & sound insulation" } },
  { name: { ar: "فحص الجودة", en: "Quality check" }, en: "QUALITY CHECK", x: 380, y: 445, desc: { ar: "فحص المقاسات والحواف والتشوّهات قبل الاعتماد.", en: "Dimensions, edges and distortion are checked before approval." }, spec: { ar: "فحص بصري + قياس", en: "Visual + measurement" } },
  { name: { ar: "التغليف والتحميل", en: "Packing & loading" }, en: "LOADING", x: 150, y: 445, desc: { ar: "تغليف الزجاج ووضعه على حوامل فوق دينا التوصيل.", en: "The glass is packed and placed on racks on the delivery truck." }, spec: { ar: "حوامل مبطّنة ضد الكسر", en: "Padded anti-breakage racks" } },
  { name: { ar: "الشحن والتوصيل", en: "Delivery" }, en: "DELIVERY", x: 300, y: 545, desc: { ar: "تخرج دينا المصنع وتوصل الزجاج إلى موقع المشروع.", en: "The factory truck leaves and delivers the glass to the project site." }, spec: { ar: "جاهز للتركيب", en: "Ready for installation" } },
];

/** Belt waypoints: station 1→8 along the serpentine, then to the gate. */
const beltPath: [number, number][] = [
  [490, 150], [300, 150], [110, 150], [110, 300], [300, 300], [490, 300], [490, 445], [380, 445], [150, 445], [150, 512], [300, 512],
];
const beltD = beltPath.map(([x, y]) => `L ${x} ${y}`).join(" ").replace("L", "M");

const segments: { from: number; to: number; len: number }[] = [];
let totalLen = 0;
for (let i = 0; i < beltPath.length - 1; i++) {
  const [x1, y1] = beltPath[i]!, [x2, y2] = beltPath[i + 1]!;
  const len = Math.hypot(x2 - x1, y2 - y1);
  segments.push({ from: totalLen, to: totalLen + len, len });
  totalLen += len;
}
/** Distance along the belt at each station (steps 1–8; step 9 is the truck ride). */
const stationDist = [0, ...segments.slice(0, 7).map((s) => s.to)];

function pointAt(d: number): [number, number] {
  const seg = segments.find((s) => d <= s.to) ?? segments[segments.length - 1]!;
  const i = segments.indexOf(seg);
  const [x1, y1] = beltPath[i]!, [x2, y2] = beltPath[i + 1]!;
  const r = seg.len ? (d - seg.from) / seg.len : 0;
  return [x1 + (x2 - x1) * r, y1 + (y2 - y1) * r];
}

export function ProductionLine() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const sheet = useRef<SVGGElement>(null);
  const truck = useRef<SVGGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = root.current, sh = sheet.current, tr = truck.current;
    if (!el || !sh || !tr) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { d: 0 };
    const place = () => {
      const [x, y] = pointAt(state.d);
      sh.setAttribute("transform", `translate(${x} ${y})`);
    };
    const resetSheet = () => {
      sh.classList.remove("pl-hot", "pl-double", "pl-loaded");
      gsap.set(sh, { scale: 1, opacity: 1, transformOrigin: "center" });
      gsap.set(tr, { x: 0, opacity: 1 });
    };

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
    tlRef.current = tl;
    tl.call(resetSheet);
    // dwell at each station, then travel to the next
    for (let i = 0; i < 8; i++) {
      tl.addLabel(`step${i}`);
      tl.call(() => setStep(i));
      tl.to({}, { duration: 1.5 });
      if (i === 1) tl.to(sh, { scale: 0.7, duration: 0.4 }, "<"); // smaller after cutting
      if (i === 4) tl.call(() => sh.classList.add("pl-hot")); // furnace glow
      if (i === 5) tl.call(() => { sh.classList.remove("pl-hot"); sh.classList.add("pl-double"); });
      if (i < 7) {
        tl.to(state, { d: stationDist[i + 1]!, duration: (stationDist[i + 1]! - stationDist[i]!) / 90, ease: "none", onUpdate: place });
      }
    }
    // to the gate, load the truck, drive out
    tl.addLabel("step8");
    tl.call(() => setStep(8));
    tl.to(state, { d: totalLen, duration: (totalLen - stationDist[7]!) / 90, ease: "none", onUpdate: place });
    tl.to({}, { duration: 0.8 });
    tl.call(() => sh.classList.add("pl-loaded"));
    tl.to(sh, { opacity: 0, duration: 0.4 });
    tl.to(tr, { x: 340, opacity: 0, duration: 2.4, ease: "power1.in" });
    if (reduced) tl.timeScale(0.45);

    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { tl.play(); setPlaying(true); } else { tl.pause(); setPlaying(false); }
    }, { threshold: 0.25 });
    io.observe(el);
    const onHidden = () => { if (document.hidden) tl.pause(); else if (el.getBoundingClientRect().top < window.innerHeight) tl.play(); };
    document.addEventListener("visibilitychange", onHidden);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onHidden); tl.kill(); tlRef.current = null; };
  }, [lang]);

  const jump = (i: number) => { tlRef.current?.play(`step${i}`); setPlaying(true); };
  const toggle = () => { const tl = tlRef.current; if (!tl) return; if (tl.paused()) { tl.play(); setPlaying(true); } else { tl.pause(); setPlaying(false); } };
  const restart = () => { tlRef.current?.restart(); setPlaying(true); };

  const current = lineSteps[step]!;
  return (
    <section ref={root} className="bg-night py-28">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-xs tracking-[0.3em] uppercase text-primary">{t({ ar: "داخل المصنع", en: "Inside the factory" })}</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t({ ar: "رحلة لوح الزجاج داخل المصنع", en: "A glass sheet's journey through the factory" })}</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">{t({ ar: "من المخزن إلى باب المشروع: لوح خام يدخل الهنجر، ويخرج زجاجاً مقسّى أو مزدوجاً على دينا التوصيل. اضغط على أي مرحلة لتشاهدها.", en: "From storage to the project gate: a raw sheet enters the hangar and leaves as tempered or double glass on the delivery truck. Tap any step to watch it." })}</p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_minmax(0,600px)] items-start">
          {/* info panel + step list */}
          <div className="order-2 lg:order-1">
            <div className="glass rounded-3xl p-6 min-h-44">
              <p className="text-xs text-primary font-semibold" dir="auto">{t({ ar: `المرحلة ${step + 1} من 9`, en: `Step ${step + 1} of 9` })}</p>
              <h3 className="mt-2 text-2xl font-bold">{t(current.name)}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{t(current.desc)}</p>
              <p className="mt-3 text-sm text-primary" dir="auto">{t(current.spec)}</p>
            </div>
            <ol className="mt-6 grid gap-1">
              {lineSteps.map((s, i) => (
                <li key={s.en}>
                  <button type="button" onClick={() => jump(i)} aria-current={i === step}
                    className={`pl-step ${i === step ? "pl-step-active" : ""} ${i < step ? "pl-step-done" : ""}`}>
                    <span className="pl-lamp" aria-hidden />
                    <span className="flex-1 text-start"><span className="block font-semibold">{t(s.name)}</span><span className="block text-xs text-muted-foreground" dir="ltr">{s.en}</span></span>
                    <span className="pl-num">{i + 1}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={toggle} className="glass rounded-full px-5 py-2.5 min-h-11 text-sm font-semibold inline-flex items-center gap-2">
                {playing ? <Pause size={16} /> : <Play size={16} />} {playing ? t({ ar: "إيقاف", en: "Pause" }) : t({ ar: "تشغيل", en: "Play" })}
              </button>
              <button type="button" onClick={restart} className="glass rounded-full px-5 py-2.5 min-h-11 text-sm font-semibold inline-flex items-center gap-2">
                <RotateCcw size={16} /> {t({ ar: "من البداية", en: "Restart" })}
              </button>
            </div>
          </div>

          {/* blueprint floor plan */}
          <div className="order-1 lg:order-2 glass rounded-3xl p-3 md:p-5">
            <svg viewBox="0 0 600 600" className="w-full h-auto" role="img" aria-label={t({ ar: "مخطط خط الإنتاج داخل الهنجر", en: "Factory floor production-line plan" })} dir="ltr">
              <defs>
                <pattern id="pl-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1c2f47" strokeWidth="0.6" />
                </pattern>
                <pattern id="pl-hazard" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="8" height="16" fill="#e3b92e" /><rect x="8" width="8" height="16" fill="#141d2c" />
                </pattern>
              </defs>
              <rect width="600" height="600" fill="#0d1626" />
              {/* road */}
              <rect x="0" y="528" width="600" height="72" fill="#101a2b" />
              <line x1="0" y1="564" x2="600" y2="564" stroke="#3a4c66" strokeWidth="2" strokeDasharray="22 18" />
              <text x="20" y="592" fontSize="10" fill="#41566f" letterSpacing="3">ROAD</text>
              {/* hangar */}
              <rect x="30" y="40" width="540" height="472" fill="url(#pl-grid)" stroke="#33507a" strokeWidth="2.5" />
              <text x="44" y="62" fontSize="10" fill="#41566f" letterSpacing="3">HANGAR</text>
              {[110, 230, 350, 470].map((x) => <rect key={x} x={x} y="215" width="10" height="10" fill="#2a405f" />)}
              {/* loading gate */}
              <rect x="256" y="506" width="88" height="10" fill="url(#pl-hazard)" stroke="#e3b92e" strokeWidth="0.8" />
              <text x="300" y="500" textAnchor="middle" fontSize="9" fill="#e3b92e" letterSpacing="2">LOADING GATE</text>
              {/* belt */}
              <path d={beltD} fill="none" stroke="#1d4a52" strokeWidth="16" strokeLinejoin="round" />
              <path d={beltD} fill="none" stroke="#e3b92e" strokeWidth="2" strokeDasharray="10 10" className="pl-belt-dash" />
              {/* furnace body at station 5 */}
              <rect x="238" y="282" width="124" height="36" rx="6" fill="#3a1a08" stroke="#f26a1b" strokeWidth="1.5" className="pl-furnace" />
              {/* station cards */}
              {lineSteps.slice(0, 8).map((s, i) => (
                <g key={s.en} transform={`translate(${s.x} ${s.y})`} className="pl-station" data-active={i === step} data-done={i < step}>
                  <rect x={s.wide ? -78 : -58} y="-52" width={s.wide ? 156 : 116} height="34" rx="7" fill="#14263c" stroke={i === step ? "#e3b92e" : "#2c4566"} strokeWidth="1.4" />
                  <text x={s.wide ? -68 : -48} y="-36" fontSize="8.5" fill="#7d93ad">{String(i + 1).padStart(2, "0")}</text>
                  <text x={s.wide ? 68 : 48} y="-36" textAnchor="end" fontSize="11" fontWeight="700" fill="#e8f1fa" fontFamily="Cairo, sans-serif">{s.name.ar}</text>
                  <text x={s.wide ? 68 : 48} y="-24" textAnchor="end" fontSize="7" fill="#7d93ad" letterSpacing="1">{s.en}</text>
                  <circle className="pl-station-lamp" cx={s.wide ? -60 : -40} cy="-27" r="4" />
                </g>
              ))}
              {/* truck outside the gate */}
              <g ref={truck} transform="translate(300 552)">
                <rect x="-34" y="-16" width="68" height="26" rx="4" fill="#28405e" stroke="#3c5c80" strokeWidth="1.5" />
                <rect x="-34" y="-16" width="14" height="26" rx="4" fill="#37577e" />
                <rect x="-8" y="-24" width="30" height="8" rx="2" fill="#8fc2e8" opacity="0.5" />
                <circle cx="-20" cy="12" r="5" fill="#0d1626" stroke="#4a678a" strokeWidth="1.5" />
                <circle cx="20" cy="12" r="5" fill="#0d1626" stroke="#4a678a" strokeWidth="1.5" />
              </g>
              {/* travelling glass sheet */}
              <g ref={sheet} transform="translate(490 150)">
                <rect className="pl-sheet" x="-16" y="-11" width="32" height="22" rx="2" />
                <rect className="pl-sheet pl-sheet-b" x="-16" y="-11" width="32" height="22" rx="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

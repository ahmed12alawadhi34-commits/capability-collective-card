import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import normal from "@/assets/normal-glass-shards.jpg";
import tempered from "@/assets/tempered-glass-granules.jpg";

export function GlassComparison() {
  const { t } = useLang();
  const [position, setPosition] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  return <section className="mx-auto max-w-7xl px-5 py-24" data-quote-product="shield">
    <p className="text-xs uppercase text-primary">{t({ ar: "الفرق عند الكسر", en: "The difference when it breaks" })}</p>
    <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t({ ar: "سيكوريت أم زجاج عادي؟", en: "Tempered vs normal glass" })}</h2>
    <div className="mt-8 flex justify-between gap-6 text-sm md:text-lg font-semibold" dir="ltr">
      <p dir="auto">{t({ ar: "زجاج عادي: قطع حادة وخطيرة", en: "Normal glass: sharp, dangerous shards" })}</p>
      <p dir="auto" className="text-end text-primary">{t({ ar: "سيكوريت: حبيبات صغيرة آمنة", en: "Tempered: small, safer granules" })}</p>
    </div>
    <div ref={frame} className="glass-comparison relative mt-5 overflow-hidden rounded-3xl" dir="ltr">
      <img src={tempered} alt={t({ ar: "حبيبات زجاج مقسّى مكسور", en: "Small granules of broken tempered glass" })} width={1440} height={960} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <img src={normal} alt={t({ ar: "شظايا زجاج عادي حادة", en: "Sharp ordinary glass shards" })} width={1440} height={960} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100-position}% 0 0)` }} />
      <div className="comparison-divider" style={{ left: `${position}%` }}><span><ChevronsLeftRight size={22} /></span></div>
      <input type="range" min={5} max={95} value={position} onChange={(e) => setPosition(Number(e.target.value))} aria-label={t({ ar: "مقارنة الزجاج العادي والسيكوريت", en: "Compare normal and tempered glass" })} aria-valuetext={`${position}%`} className="comparison-range" />
    </div>
  </section>;
}
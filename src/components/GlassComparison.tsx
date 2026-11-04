import { useId, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import normal from "@/assets/normal-glass-shards.jpg";
import tempered from "@/assets/tempered-glass-granules.jpg";
import laminated from "@/assets/laminated-glass-cracks.jpg";
import { Button } from "@/components/ui/button";
import { comparisonPair, type GlassTab } from "@/lib/glass-comparison";

const glass = {
  ordinary: { image: normal, tab: { ar: "عادي", en: "Ordinary" }, label: { ar: "زجاج عادي: قطع حادة وخطيرة", en: "Normal glass: sharp, dangerous shards" }, alt: { ar: "شظايا زجاج عادي حادة", en: "Sharp ordinary glass shards" } },
  tempered: { image: tempered, tab: { ar: "سيكوريت", en: "Tempered" }, label: { ar: "سيكوريت: حبيبات صغيرة آمنة", en: "Tempered: small, safer granules" }, alt: { ar: "حبيبات زجاج مقسّى مكسور", en: "Small granules of broken tempered glass" } },
  laminated: { image: laminated, tab: { ar: "لامينيت", en: "Laminated" }, label: { ar: "لامينيت: يتشقق لكن يبقى متماسكاً", en: "Laminated: cracks but stays in one piece" }, alt: { ar: "زجاج لامينيت متشقق يبقى متماسكاً داخل إطاره", en: "Cracked laminated glass held in one piece in its frame" } },
};

export function GlassComparison({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const [position, setPosition] = useState(50);
  const [tab, setTab] = useState<GlassTab>("ordinary");
  const [left, right] = comparisonPair(tab);
  const id = useId();
  const frame = useRef<HTMLDivElement>(null);
  return <section className={className || "mx-auto max-w-7xl px-5 py-24"} data-quote-product="shield">
    <div className={className ? "mx-auto max-w-7xl px-5" : undefined}>
    <p className="text-xs uppercase text-primary">{t({ ar: "الفرق عند الكسر", en: "The difference when it breaks" })}</p>
    <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t({ ar: "سيكوريت أم زجاج عادي؟", en: "Tempered vs normal glass" })}</h2>
    <div className="mt-6 flex gap-2" role="tablist" aria-label={t({ ar: "نوع الزجاج", en: "Glass type" })}>
      {(["ordinary", "tempered", "laminated"] as const).map((value) => <Button key={value} id={`${id}-${value}`} role="tab" aria-selected={tab === value} aria-controls={`${id}-comparison`} variant={tab === value ? "default" : "outline"} className="min-h-11 flex-1 sm:flex-none" onClick={() => { setTab(value); setPosition(50); }}>{t(glass[value].tab)}</Button>)}
    </div>
    <div className="mt-8 flex justify-between gap-6 text-sm md:text-lg font-semibold" dir="ltr">
      <p dir="auto">{t(glass[left].label)}</p>
      <p dir="auto" className="text-end text-primary">{t(glass[right].label)}</p>
    </div>
    <div ref={frame} id={`${id}-comparison`} role="tabpanel" aria-labelledby={`${id}-${tab}`} className="glass-comparison relative mt-5 overflow-hidden rounded-3xl" dir="ltr">
      <img src={glass[right].image} alt={t(glass[right].alt)} width={1440} height={960} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <img src={glass[left].image} alt={t(glass[left].alt)} width={1440} height={960} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100-position}% 0 0)` }} />
      <div className="comparison-divider" style={{ left: `${position}%` }}><span><ChevronsLeftRight size={22} /></span></div>
      <input type="range" min={5} max={95} value={position} onChange={(e) => setPosition(Number(e.target.value))} aria-label={t({ ar: `مقارنة ${glass[left].tab.ar} و${glass[right].tab.ar}`, en: `Compare ${glass[left].tab.en} and ${glass[right].tab.en}` })} aria-valuetext={`${position}%`} className="comparison-range" />
    </div>
    </div>
  </section>;
}
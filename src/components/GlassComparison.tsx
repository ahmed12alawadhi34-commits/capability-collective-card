import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import normal from "@/assets/normal-glass-shards.jpg";
import tempered from "@/assets/tempered-glass-granules.jpg";
import laminated from "@/assets/laminated-glass-cracks.jpg";
import { Button } from "@/components/ui/button";
import { glassOrder, INITIAL_BOUNDARIES, moveBoundary } from "@/lib/glass-comparison";

const glass = {
  ordinary: { image: normal, tab: { ar: "عادي", en: "Ordinary" }, label: { ar: "زجاج عادي: قطع حادة وخطيرة", en: "Ordinary: sharp, dangerous shards" }, alt: { ar: "شظايا زجاج عادي حادة", en: "Sharp ordinary glass shards" } },
  tempered: { image: tempered, tab: { ar: "سيكوريت", en: "Tempered" }, label: { ar: "سيكوريت: حبيبات صغيرة آمنة", en: "Tempered: small safe granules" }, alt: { ar: "حبيبات زجاج مقسّى مكسور", en: "Small granules of broken tempered glass" } },
  laminated: { image: laminated, tab: { ar: "لامينيت", en: "Laminated" }, label: { ar: "لامينيت: يتشقق لكن يبقى متماسكاً", en: "Laminated: cracks but stays in one piece" }, alt: { ar: "زجاج لامينيت متشقق يبقى متماسكاً داخل إطاره", en: "Cracked laminated glass held in one piece in its frame" } },
};

export function GlassComparison({ className = "" }: { className?: string }) {
  const { t, lang } = useLang();
  const [boundaries, setBoundaries] = useState<[number, number]>(INITIAL_BOUNDARIES);
  const order = glassOrder(lang);
  const readingOrder = glassOrder("en");
  const frame = useRef<HTMLDivElement>(null);
  const drag = (index: 0 | 1, clientX: number) => {
    const bounds = frame.current?.getBoundingClientRect();
    if (!bounds || bounds.width === 0) return;
    setBoundaries(previous => moveBoundary(previous, index, (clientX - bounds.left) / bounds.width * 100));
  };
  return <section className={className || "mx-auto max-w-7xl px-5 py-24"} data-quote-product="shield">
    <div className={className ? "mx-auto max-w-7xl px-5" : undefined}>
    <p className="text-xs uppercase text-primary">{t({ ar: "الفرق عند الكسر", en: "The difference when it breaks" })}</p>
    <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t({ ar: "عادي، سيكوريت أم لامينيت؟", en: "Ordinary, tempered or laminated?" })}</h2>
    <div className="comparison-labels mt-8 text-sm md:text-lg font-semibold">
      {readingOrder.map(type => <p key={type} className={type === "ordinary" ? "text-foreground" : "text-primary"}>{t(glass[type].label)}</p>)}
    </div>
    <div ref={frame} className="glass-comparison relative mt-5 overflow-hidden rounded-3xl" dir="ltr">
      {order.map((type, index) => {
        const start = index === 0 ? 0 : boundaries[index - 1] ?? 0;
        const end = index === 2 ? 100 : boundaries[index] ?? 100;
        return <div key={type} data-glass-type={type} className="comparison-panel absolute inset-y-0 overflow-hidden" style={{ left: `${start}%`, width: `${end - start}%` }}>
          <img src={glass[type].image} alt={t(glass[type].alt)} width={1440} height={960} loading="lazy" draggable={false} className="h-full w-full object-cover" />
        </div>;
      })}
      {([0, 1] as const).map(index => <div key={index} className="comparison-divider" style={{ left: `${boundaries[index]}%` }}>
        <Button variant="default" className="comparison-handle" role="slider" aria-orientation="horizontal" aria-valuemin={index === 0 ? 8 : boundaries[0] + 12} aria-valuemax={index === 0 ? boundaries[1] - 12 : 92} aria-valuenow={Math.round(boundaries[index])} aria-label={t({ ar: `الفاصل بين ${glass[order[index] ?? "ordinary"].tab.ar} و${glass[order[index + 1] ?? "tempered"].tab.ar}`, en: `Boundary between ${glass[order[index] ?? "ordinary"].tab.en} and ${glass[order[index + 1] ?? "tempered"].tab.en}` })}
          onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); }}
          onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) drag(index, event.clientX); }}
          onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
          onKeyDown={event => {
            const delta = event.key === "ArrowLeft" ? -2 : event.key === "ArrowRight" ? 2 : 0;
            if (delta || event.key === "Home" || event.key === "End") {
              event.preventDefault();
              setBoundaries(previous => moveBoundary(previous, index, event.key === "Home" ? 0 : event.key === "End" ? 100 : previous[index] + delta));
            }
          }}><ChevronsLeftRight size={22} /></Button>
      </div>)}
    </div>
    </div>
  </section>;
}
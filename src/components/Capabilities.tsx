import { Maximize2, Layers3, Flame, Spline, ShieldHalf, Thermometer, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { BgVideo } from "@/components/BgVideo";

const specs = [
  { icon: Maximize2, value: { ar: "حتى 2×4 م", en: "Up to 2×4 m" }, label: { ar: "أقصى مقاس للوح", en: "Max panel size" } },
  { icon: Layers3, value: { ar: "4–19 مم", en: "4–19 mm" }, label: { ar: "السماكات", en: "Thickness range" } },
  { icon: Flame, value: { ar: "≈650°C", en: "≈650°C" }, label: { ar: "فرن التقسية", en: "Tempering furnace" } },
  { icon: Spline, value: { ar: "سيكوريت منحني", en: "Curved tempered" }, label: { ar: "بأقواس حسب التصميم", en: "Custom radii" } },
  { icon: ShieldHalf, value: { ar: "لامينيت", en: "Laminated" }, label: { ar: "مضاد للتناثر ومقاوم للرصاص", en: "Anti-shatter & bullet-resistant" } },
  { icon: Thermometer, value: { ar: "دبل جلاس", en: "Double glazing" }, label: { ar: "عزل حراري وصوتي", en: "Thermal & sound insulation" } },
];

export function Capabilities() {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section className="capabilities relative overflow-hidden px-5 py-20 md:py-28">
      <div aria-hidden className="absolute inset-0"><BgVideo desktop="/media/videos/capabilities.mp4" mobile="/media/videos/capabilities-mobile.mp4" poster="/media/posters/capabilities-poster.jpg" preload="metadata" /></div>
      <div aria-hidden className="absolute inset-0 capabilities-overlay" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-center text-3xl md:text-5xl font-bold">{t({ ar: "قدراتنا", en: "Our capabilities" })}</h2>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {specs.map(({ icon: Icon, value, label }) => (
            <div key={value.en} className="cap-card rounded-2xl p-4 md:p-7">
              <Icon size={22} className="text-primary" aria-hidden />
              <p className="mt-4 text-xl md:text-3xl font-bold leading-tight text-white" dir="auto">{t(value)}</p>
              <p className="mt-2 text-xs md:text-sm text-white/70 leading-relaxed">{t(label)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/quote" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
            {t({ ar: "اطلب عرض سعر لمشروعك", en: "Request a quote for your project" })} <Arrow size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

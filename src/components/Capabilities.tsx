import { Maximize2, Layers3, Flame, Spline, ShieldHalf, Thermometer, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

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
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl md:text-5xl font-bold">{t({ ar: "قدراتنا", en: "Our capabilities" })}</h2>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {specs.map(({ icon: Icon, value, label }) => (
            <div key={value.en} className="why-card glass rounded-2xl p-4 md:p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><Icon size={20} /></span>
              <p className="mt-3 text-lg md:text-2xl font-bold leading-snug" dir="auto">{t(value)}</p>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-relaxed">{t(label)}</p>
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

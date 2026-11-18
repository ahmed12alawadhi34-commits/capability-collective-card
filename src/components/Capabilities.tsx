import { Maximize2, Layers3, Flame, Spline, ShieldHalf, Thermometer, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { BgVideo } from "@/components/BgVideo";
import { SectionHeading } from "@/components/SectionHeading";

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
    <section className="capabilities relative overflow-hidden px-5">
      <div aria-hidden className="absolute inset-0"><BgVideo desktop="/media/videos/capabilities.mp4" mobile="/media/videos/capabilities-mobile.mp4" poster="/media/posters/capabilities-poster.jpg" preload="metadata" /></div>
      <div aria-hidden className="absolute inset-0 capabilities-overlay" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t({ ar: "هندسة خلف كل لوح", en: "Engineering behind every pane" })}
          title={t({ ar: "قدرات تصنع الفرق", en: "Capabilities that make a difference" })}
          description={t({ ar: "معدات حديثة وخبرة تصنيع تمنحك مقاسات أدق وجودة ثابتة في كل طلب.", en: "Modern equipment and manufacturing expertise deliver precise dimensions and consistent quality on every order." })}
          index="02 / CAPABILITIES"
        />
        <div className="capability-grid">
          {specs.map(({ icon: Icon, value, label }, index) => (
            <div key={value.en} className="cap-card">
              <div className="cap-card-top"><Icon size={23} className="text-primary" aria-hidden /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <p className="cap-value" dir="auto">{t(value)}</p>
              <p className="cap-label">{t(label)}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/quote" className="text-link">{t({ ar: "ناقش مواصفات مشروعك معنا", en: "Discuss your project specifications with us" })}<Arrow size={17} /></Link>
        </div>
      </div>
    </section>
  );
}

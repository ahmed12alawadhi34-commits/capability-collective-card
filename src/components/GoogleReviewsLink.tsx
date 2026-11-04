import { Star } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { MAP_LINK } from "@/lib/maps";

export function GoogleReviewsLink({ className = "" }: { className?: string }) {
  const { t } = useLang();
  return (
    <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-foreground hover:no-underline ${className}`}>
      <Star size={16} className="fill-primary text-primary" />
      {t({ ar: "شاهد تقييماتنا على جوجل", en: "See our Google reviews" })} <span dir="ltr" className="text-primary">★4.3</span>
    </a>
  );
}

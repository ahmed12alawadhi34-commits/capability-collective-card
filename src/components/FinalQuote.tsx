import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { quoteUrl } from "@/lib/whatsapp";

export function FinalQuote() {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section className="final-quote-section px-5">
      <div className="final-quote final-quote-2026">
        <div className="final-quote-copy">
          <p className="section-eyebrow"><span aria-hidden />{t({ ar: "لنبدأ مشروعك", en: "Start your project" })}</p>
          <h2>{t({ ar: "جاهز لمشروعك القادم؟", en: "Ready for your next project?" })}</h2>
          <p>{t({ ar: "أرسل المقاسات ونرد عليك بعرض سعر سريع", en: "Send us your sizes and get a fast quote" })}</p>
        </div>
        <div className="final-quote-actions">
          <Button asChild size="lg" className="final-primary-action"><Link to="/quote">{t({ ar: "اطلب عرض سعر", en: "Request a quote" })}<Arrow size={18} /></Link></Button>
          <Button asChild variant="outline" size="lg" className="final-secondary-action"><a href={quoteUrl(lang)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{t({ ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" })}</a></Button>
        </div>
        <span className="final-quote-index" aria-hidden>NEXT / 01</span>
      </div>
    </section>
  );
}

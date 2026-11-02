import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { quoteUrl } from "@/lib/whatsapp";

export function FinalQuote() {
  const { t, lang } = useLang();
  return <section className="home-raised px-5">
    <div className="final-quote glass relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-16 text-center md:px-16 md:py-20">
      <h2 className="relative text-3xl font-bold md:text-5xl">{t({ ar: "جاهز لمشروعك القادم؟", en: "Ready for your next project?" })}</h2>
      <p className="relative mt-5 text-muted-foreground text-lg">{t({ ar: "أرسل المقاسات ونرد عليك بعرض سعر سريع", en: "Send us your sizes and get a fast quote" })}</p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" className="h-auto rounded-full px-7 py-3.5"><Link to="/quote">{t({ ar: "اطلب عرض سعر", en: "Request a quote" })}<ArrowUpRight /></Link></Button>
        <Button asChild variant="outline" size="lg" className="glass h-auto rounded-full px-7 py-3.5"><a href={quoteUrl(lang)} target="_blank" rel="noopener noreferrer"><MessageCircle />{t({ ar: "واتساب", en: "WhatsApp" })}</a></Button>
      </div>
    </div>
  </section>;
}
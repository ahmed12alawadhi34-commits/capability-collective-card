import { createFileRoute } from "@tanstack/react-router";
import { QuoteLink } from "@/components/QuoteLink";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => pageHead("/projects"),
  component: Projects,
});

function Projects() {
  const { t } = useLang();
  return (
    <section className="bg-night min-h-[70vh] px-5 pt-40 pb-24 flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-silver">{t({ ar: "قريباً", en: "Coming soon" })}</h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">{t({ ar: "نعمل على تجهيز معرض مشاريعنا", en: "Our project gallery is being prepared" })}</p>
        <QuoteLink className="mt-9 rounded-full bg-primary text-primary-foreground h-auto px-7 py-3.5 font-semibold hover:no-underline">
          {t({ ar: "اطلب عرض سعر", en: "Request a quote" })}<ArrowUpRight size={18} aria-hidden />
        </QuoteLink>
      </div>
      </section>
  );
}

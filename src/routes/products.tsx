import { createFileRoute } from "@tanstack/react-router";
import { QuoteLink } from "@/components/QuoteLink";
import { GlassComparison } from "@/components/GlassComparison";
import { PageHeader } from "@/components/SiteShell";
import { ProductIcon } from "@/components/ProductIcon";
import { useLang } from "@/lib/i18n";
import { products } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/products")({
  head: () => pageHead("/products"),
  component: Products,
});

function Products() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t({ ar: "المنتجات", en: "Products" })} title={t({ ar: "زجاج لكل مشروع", en: "Glass for every project" })} />
      <section className="mx-auto max-w-7xl px-5 py-20 grid gap-5 md:grid-cols-2">
        {products.map((p) => (
          <article key={p.icon} data-quote-product={p.icon} className="reveal glass shine rounded-3xl p-8">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary"><ProductIcon name={p.icon} size={28} /></div>
            <h2 className="mt-6 text-2xl font-bold">{t(p.name)}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{t(p.desc)}</p>
            <QuoteLink product={p.icon} className="mt-6 h-auto p-0 inline-block text-sm text-primary">{t({ ar: "اطلب عرض سعر ←", en: "Request a quote →" })}</QuoteLink>
          </article>
        ))}
      </section>
      <GlassComparison />
    </>
  );
}

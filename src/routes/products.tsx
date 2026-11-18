import { createFileRoute } from "@tanstack/react-router";
import { GlassComparison } from "@/components/GlassComparison";
import { PageHeader } from "@/components/SiteShell";
import { ProductShowcase } from "@/components/ProductShowcase";
import { SectionHeading } from "@/components/SectionHeading";
import { useLang } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/products")({
  head: () => pageHead("/products"),
  component: Products,
});

function Products() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t({ ar: "مجموعة المنتجات", en: "Product collection" })} title={t({ ar: "سبعة منتجات. احتمالات بلا حدود.", en: "Seven products. Endless possibilities." })}>
        <p>{t({ ar: "حلول زجاجية متكاملة للواجهات والمنازل والمشاريع التجارية، تُصنع في صنعاء وفق مقاساتك ومواصفاتك.", en: "Complete glass solutions for façades, homes and commercial projects, made in Sana'a to your exact dimensions and specifications." })}</p>
        <div className="page-hero-meta" aria-hidden><span>2026 COLLECTION</span><span>07 PRODUCTS</span><span>MADE IN SANA'A</span></div>
      </PageHeader>

      <section className="products-catalog-section">
        <div className="mx-auto max-w-[1440px] px-5">
          <SectionHeading
            eyebrow={t({ ar: "صُنع حسب مشروعك", en: "Made for your project" })}
            title={t({ ar: "اختر الزجاج. واترك الدقة علينا.", en: "Choose the glass. Leave the precision to us." })}
            description={t({ ar: "من لوح واحد إلى واجهة كاملة، نساعدك في اختيار النوع والسماكة والتشطيب المناسب.", en: "From a single pane to a complete façade, we help you select the right type, thickness and finish." })}
            index="01—07"
          />
          <ProductShowcase />
        </div>
      </section>

      <div className="products-comparison-wrap">
        <GlassComparison />
      </div>
    </>
  );
}

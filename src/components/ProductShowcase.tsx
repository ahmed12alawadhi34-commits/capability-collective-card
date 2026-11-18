import { ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/lib/content";
import { getProductCatalog } from "@/lib/product-catalog";
import { useLang } from "@/lib/i18n";
import { QuoteLink } from "@/components/QuoteLink";

export function ProductShowcase() {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="product-showcase-grid">
      {products.map((product, index) => {
        const catalog = getProductCatalog(product.icon);
        return (
          <article key={product.icon} data-quote-product={product.icon} className={`product-showcase-card ${index === 0 ? "product-showcase-featured" : ""}`}>
            <div className="product-card-media">
              <img
                src={catalog.image}
                alt={t(product.name)}
                width={1600}
                height={900}
                loading={index < 2 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <span className="product-card-number" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="product-card-content">
              <p className="product-card-tagline">{t(catalog.tagline)}</p>
              <h2>{t(product.name)}</h2>
              <p className="product-card-description">{t(product.desc)}</p>
              <ul className="product-card-specs" aria-label={t({ ar: "أبرز المواصفات", en: "Key specifications" })}>
                {catalog.specs.map((spec) => <li key={spec.en}>{t(spec)}</li>)}
              </ul>
              <QuoteLink product={product.icon} className="product-quote-link">
                {t({ ar: "اطلب عرض سعر", en: "Request a quote" })}<Arrow size={17} aria-hidden />
              </QuoteLink>
            </div>
          </article>
        );
      })}
    </div>
  );
}

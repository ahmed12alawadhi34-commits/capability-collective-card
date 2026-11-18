import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMarquee } from "@/lib/marquee";
import { products } from "@/lib/content";
import { getProductCatalog } from "@/lib/product-catalog";
import { useLang } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";

const names = [
  { ar: "سيكوريت (مقسّى)", en: "Tempered (Securit)" },
  { ar: "سيكوريت منحني", en: "Curved Securit" },
  { ar: "لامينيت (مجلتن)", en: "Laminated" },
  { ar: "دبل جلاس", en: "Double glazing" },
  { ar: "ساندبلاست", en: "Sandblasted" },
  { ar: "معشّق ورسم على الزجاج", en: "Stained & painted" },
  { ar: "زجاج الأثاث", en: "Furniture glass" },
];

export function HomeProductStrip() {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const { root, track } = useMarquee(30, "right", 2000);
  return (
    <section ref={root} className="home-products-strip products-strip-2026 overflow-hidden">
      <div className="products-strip-heading">
        <SectionHeading eyebrow={t({ ar: "مجموعة 2026", en: "2026 collection" })} title={t({ ar: "سبعة منتجات. مصنع واحد.", en: "Seven products. One factory." })} index="07" />
        <Link to="/products" className="text-link">{t({ ar: "استكشف المجموعة", en: "Explore the collection" })}<Arrow size={17} /></Link>
      </div>
      <div className="products-window mt-10" dir="ltr">
        <div ref={track} className="products-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="products-group">
              {products.map((product, index) => (
                <li key={product.icon}>
                  <Link to="/products" tabIndex={copy === 1 ? -1 : undefined} className="product-chip" data-quote-product={copy === 0 ? product.icon : undefined} dir={lang === "ar" ? "rtl" : "ltr"}>
                    <img src={getProductCatalog(product.icon).image} alt="" width={1600} height={900} loading="lazy" />
                    <span className="product-chip-copy"><small>{String(index + 1).padStart(2, "0")}</small><strong>{t(names[index] ?? product.name)}</strong></span>
                    <Arrow size={17} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

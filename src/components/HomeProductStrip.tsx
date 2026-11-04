import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMarquee } from "@/lib/marquee";
import { ProductIcon } from "@/components/ProductIcon";
import { products } from "@/lib/content";
import { useLang } from "@/lib/i18n";

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
  return <section ref={root} className="home-products-strip overflow-hidden">
    <h2 className="px-5 text-center text-2xl md:text-3xl font-bold">{t({ ar: "منتجاتنا", en: "Our products" })}</h2>
    <div className="products-window mt-8" dir="ltr">
      <div ref={track} className="products-track">
        {[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="products-group">
          {products.map((product, i) => <li key={product.icon}>
            <Link to="/products" tabIndex={copy === 1 ? -1 : undefined} className="product-chip glass" data-quote-product={copy === 0 ? product.icon : undefined} dir={lang === "ar" ? "rtl" : "ltr"}>
              <span className="text-primary"><ProductIcon name={product.icon} size={30} /></span><span>{t(names[i] ?? product.name)}</span>
            </Link>
          </li>)}
        </ul>)}
      </div>
    </div>
    <div className="mt-6 text-center">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{t({ ar: "كل المنتجات", en: "All products" })}<Arrow size={16} /></Link>
    </div>
  </section>;
}

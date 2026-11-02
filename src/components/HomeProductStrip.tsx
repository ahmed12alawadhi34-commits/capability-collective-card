import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductIcon } from "@/components/ProductIcon";
import { products } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const names = [
  { ar: "سيكوريت", en: "Securit" },
  { ar: "سيكوريت منحني", en: "Curved Securit" },
  { ar: "مجلتن", en: "Laminated" },
  { ar: "دبل جلاس", en: "Double glazing" },
  { ar: "ساندبلاست", en: "Sandblasted" },
  { ar: "معشّق ورسم على الزجاج", en: "Stained & painted" },
  { ar: "زجاج الأثاث", en: "Furniture glass" },
];

export function HomeProductStrip() {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return <section className="home-products-strip px-5">
    <div className="mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold">{t({ ar: "منتجاتنا", en: "Our products" })}</h2>
      <div className="product-chip-row mt-6">
        {products.map((product, i) => <Button key={product.icon} asChild variant="ghost" className="product-chip glass" data-quote-product={product.icon}>
          <Link to="/products"><span className="text-primary"><ProductIcon name={product.icon} /></span><span>{t(names[i] ?? product.name)}</span></Link>
        </Button>)}
        <Button asChild variant="link" className="product-chip-all"><Link to="/products">{t({ ar: "كل المنتجات", en: "All products" })}<Arrow size={16} /></Link></Button>
      </div>
    </div>
  </section>;
}
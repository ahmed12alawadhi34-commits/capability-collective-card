import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const root = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      const on = !!e?.isIntersecting;
      setVisible(on);
      if (on) setStarted(true);
    }, { threshold: 0.1 });
    if (root.current) io.observe(root.current);
    return () => { io.disconnect(); if (timer.current) clearTimeout(timer.current); };
  }, []);
  const pauseTouch = () => {
    setPaused(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPaused(false), 2000);
  };
  return <section ref={root} className="home-products-strip overflow-hidden">
    <h2 className="px-5 text-center text-2xl md:text-3xl font-bold">{t({ ar: "منتجاتنا", en: "Our products" })}</h2>
    <div className="products-window mt-8" dir="ltr" onPointerDown={(e) => { if (e.pointerType !== "mouse") pauseTouch(); }}>
      <div className={`products-track ${started ? "products-started" : ""} ${!visible || paused ? "products-paused" : ""}`}>
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

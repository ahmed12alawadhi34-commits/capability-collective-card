import type { Lang } from "@/lib/i18n";

/** Single source for the site's public origin — switch to https://alawadhi-ind.com here. */
export const SITE_URL = "https://alawadhi-ind.com";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const NOINDEX_PATHS = ["/projects"] as const;

type Bi = { ar: string; en: string };
export type PageSeo = { title: Bi; description: Bi };

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    title: { ar: "العواضي لصناعة الزجاج — سيكوريت (مقسّى) ولامينيت (مجلتن) وزجاج مزدوج في صنعاء", en: "Alawadhi for Glass Industry — Tempered (Securit), Laminated & Double Glass in Sana'a" },
    description: { ar: "سيكوريت (مقسّى) ولامينيت (مجلتن) وزجاج مزدوج بمواصفات عالمية، يُنتَج في مصنع حديث بصنعاء للمقاولين والمصنّعين والمشاريع الكبرى.", en: "Precision tempered (Securit), laminated and double-glazed glass to international standards — produced in a modern Sana'a facility." },
  },
  "/about": {
    title: { ar: "من نحن | العواضي لصناعة الزجاج", en: "About us | Alawadhi for Glass Industry" },
    description: { ar: "تعرف على مصنع العواضي لصناعة الزجاج في صنعاء، وقصة المجموعة منذ 1955 وخبرتها في الزجاج منذ 1974 وشركاتها في اليمن وعُمان والسعودية.", en: "Our story, modern Sana'a glass factory and group companies across Yemen, Oman and Saudi Arabia. In the glass trade since 1974." },
  },
  "/products": {
    title: { ar: "المنتجات — سيكوريت (مقسّى) ولامينيت (مجلتن) وزجاج مزدوج | العواضي لصناعة الزجاج", en: "Products — Tempered (Securit), Laminated & Double Glass | Alawadhi" },
    description: { ar: "سيكوريت (مقسّى) ومنحنٍ ولامينيت (مجلتن) ومزدوج ومرمّل ومعشّق وزجاج أثاث من العواضي لصناعة الزجاج.", en: "Tempered (Securit), curved, laminated, double-glazed, sandblasted, decorative and furniture glass from Alawadhi for Glass Industry." },
  },
  "/quote": {
    title: { ar: "طلب عرض سعر | العواضي لصناعة الزجاج", en: "Request a Quote | Alawadhi for Glass Industry" },
    description: { ar: "اطلب عرض سعر لسيكوريت (مقسّى) أو لامينيت (مجلتن) أو الزجاج المزدوج خلال دقائق عبر واتساب.", en: "Request a quote for tempered (Securit), laminated or double-glazed glass in minutes via WhatsApp." },
  },
  "/contact": {
    title: { ar: "تواصل معنا | العواضي لصناعة الزجاج", en: "Contact us | Alawadhi for Glass Industry" },
    description: { ar: "زورونا في المنطقة الصناعية القيضي بصنعاء، أو تواصلوا معنا هاتفياً وعبر واتساب.", en: "Visit Alawadhi for Glass Industry in Al-Qaidi Industrial Area, Sana'a, or contact us by phone and WhatsApp." },
  },
  "/projects": {
    title: { ar: "معرض المشاريع قريباً | العواضي لصناعة الزجاج", en: "Projects coming soon | Alawadhi for Glass Industry" },
    description: { ar: "نعمل على تجهيز معرض مشاريعنا — اطلب عرض سعر للزجاج اليوم.", en: "Our project gallery is being prepared — request a glass quote today." },
  },
};

/** LocalBusiness (Manufacturer) structured data as an inert JSON script tag (CSP-safe). */
export function localBusinessJsonLd() {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "Manufacturer"],
      name: "العواضي لصناعة الزجاج / Alawadhi for Glass Industry",
      alternateName: ["العواضي لصناعة الزجاج", "Alawadhi for Glass Industry"],
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      image: OG_IMAGE,
      telephone: "+967 1 601700",
      openingHours: "Sa-Th 08:00-17:00",
      address: { "@type": "PostalAddress", streetAddress: "Al-Qa' Industrial Area – Al-Qaidi", addressLocality: "Sana'a", addressCountry: "YE" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: 4.3, reviewCount: 6, bestRating: 5 },
    }),
  };
}

/** Static SSR head for a route: Arabic defaults plus canonical and share tags. */
export function pageHead(path: string) {
  const seo = pageSeo[path] ?? pageSeo["/"]!;
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title: seo.title.ar },
      { name: "description", content: seo.description.ar },
      { property: "og:title", content: seo.title.ar },
      { property: "og:description", content: seo.description.ar },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(NOINDEX_PATHS.some(noindex => noindex === path) ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  document.querySelector(`meta[${attr}="${key}"]`)?.setAttribute("content", value);
}

/** Client-side: make title/description/og follow the selected language. */
export function applyPageSeo(pathname: string, lang: Lang) {
  const seo = pageSeo[pathname] ?? pageSeo["/"]!;
  document.title = seo.title[lang];
  setMeta("name", "description", seo.description[lang]);
  setMeta("property", "og:title", seo.title[lang]);
  setMeta("property", "og:description", seo.description[lang]);
}

import type { Lang } from "@/lib/i18n";

/** Single source for the site's public origin — switch to https://alawadhi-ind.com here. */
export const SITE_URL = "https://alawadhi-ind.com";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const NOINDEX_PATHS = ["/projects"] as const;

type Bi = { ar: string; en: string };
export type PageSeo = { title: Bi; description: Bi };

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    title: { ar: "العواضي لصناعة الزجاج — زجاج مقسّى ومعشّق ومزدوج في صنعاء", en: "Alawadhi for Glass Industry — Tempered, Laminated & Double Glass in Sana'a" },
    description: { ar: "زجاج مقسّى ومعشّق ومزدوج بمواصفات عالمية، يُنتَج في مصنع حديث بصنعاء للمقاولين والمصنّعين والمشاريع الكبرى.", en: "Precision tempered, laminated and double-glazed glass to international standards — produced in a modern Sana'a facility." },
  },
  "/about": {
    title: { ar: "من نحن | العواضي لصناعة الزجاج", en: "About us | Alawadhi for Glass Industry" },
    description: { ar: "تعرف على مصنع العواضي لصناعة الزجاج في صنعاء، وقصة المجموعة منذ 1955 وخبرتها في الزجاج منذ 1974 وشركاتها في اليمن وعُمان والسعودية.", en: "Our story, modern Sana'a glass factory and group companies across Yemen, Oman and Saudi Arabia. In the glass trade since 1974." },
  },
  "/products": {
    title: { ar: "المنتجات — زجاج مقسّى ومعشّق ومزدوج | العواضي لصناعة الزجاج", en: "Products — Tempered, Laminated & Double Glass | Alawadhi" },
    description: { ar: "زجاج مقسّى ومنحنٍ ومجلتن ومزدوج ومرمّل ومعشّق وزجاج أثاث من العواضي لصناعة الزجاج.", en: "Tempered, curved, laminated, double-glazed, sandblasted, decorative and furniture glass from Alawadhi for Glass Industry." },
  },
  "/quote": {
    title: { ar: "طلب عرض سعر | العواضي لصناعة الزجاج", en: "Request a Quote | Alawadhi for Glass Industry" },
    description: { ar: "اطلب عرض سعر للزجاج المقسّى أو المجلتن أو المزدوج خلال دقائق عبر واتساب.", en: "Request a quote for tempered, laminated or double-glazed glass in minutes via WhatsApp." },
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

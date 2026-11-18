export const productCatalog = {
  shield: {
    image: "/media/products/tempered.webp",
    tagline: { ar: "قوة تُرى بوضوح", en: "Strength in clarity" },
    specs: [
      { ar: "4–19 مم", en: "4–19 mm" },
      { ar: "حتى 2×4 م", en: "Up to 2×4 m" },
      { ar: "أقوى 4–5 مرات", en: "4–5× stronger" },
    ],
  },
  curve: {
    image: "/media/products/curved.webp",
    tagline: { ar: "انحناءات بلا حدود", en: "Curves without limits" },
    specs: [
      { ar: "أقواس حسب التصميم", en: "Custom radii" },
      { ar: "واجهات وقباب", en: "Façades & domes" },
      { ar: "تقسية دقيقة", en: "Precision tempering" },
    ],
  },
  layers: {
    image: "/media/products/laminated.webp",
    tagline: { ar: "أمان يبقى متماسكاً", en: "Safety that holds together" },
    specs: [
      { ar: "مضاد للتناثر", en: "Anti-shatter" },
      { ar: "طبقات متعددة", en: "Multi-layer" },
      { ar: "مقاوم للرصاص", en: "Bullet-resistant" },
    ],
  },
  panels: {
    image: "/media/products/double-glazing.webp",
    tagline: { ar: "راحة في كل موسم", en: "Comfort in every season" },
    specs: [
      { ar: "عزل حراري", en: "Thermal insulation" },
      { ar: "عزل صوتي", en: "Sound insulation" },
      { ar: "كفاءة الطاقة", en: "Energy efficiency" },
    ],
  },
  spray: {
    image: "/media/products/sandblasted.webp",
    tagline: { ar: "خصوصية تسمح للضوء", en: "Privacy that welcomes light" },
    specs: [
      { ar: "رسم حسب الطلب", en: "Custom patterns" },
      { ar: "شعارات الشركات", en: "Company logos" },
      { ar: "تشطيب ناعم", en: "Satin finish" },
    ],
  },
  palette: {
    image: "/media/products/decorative.webp",
    tagline: { ar: "الزجاج يتحول إلى فن", en: "Glass becomes art" },
    specs: [
      { ar: "معشّق وملون", en: "Stained & painted" },
      { ar: "تصاميم خاصة", en: "Bespoke designs" },
      { ar: "قباب ونوافذ", en: "Domes & windows" },
    ],
  },
  armchair: {
    image: "/media/products/custom.webp",
    tagline: { ar: "دقة في كل تفصيل", en: "Precision in every detail" },
    specs: [
      { ar: "قطع CNC", en: "CNC cutting" },
      { ar: "حواف مصقولة", en: "Polished edges" },
      { ar: "أشكال حسب الطلب", en: "Custom shapes" },
    ],
  },
} as const;

export function getProductCatalog(icon: string) {
  return productCatalog[icon as keyof typeof productCatalog] ?? productCatalog.shield;
}

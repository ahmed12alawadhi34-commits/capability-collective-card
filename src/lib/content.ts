export const STAFF_LOGIN = "http://132.145.55.226:8182/apex/f?p=factory:LOGIN_DESKTOP";
export const WHATSAPP = "967778888597";
export const PHONES = ["+967 778 888 597", "+967 771 358 888"];
export const EMAIL = "info@alawadhi-ind.com";

export const nav = [
  { to: "/", ar: "الرئيسية", en: "Home" },
  { to: "/products", ar: "المنتجات", en: "Products" },
  { to: "/projects", ar: "المشاريع", en: "Projects" },
  { to: "/quote", ar: "طلب عرض سعر", en: "Request a Quote" },
  { to: "/contact", ar: "تواصل معنا", en: "Contact" },
] as const;

export const brand = { ar: "العواضي لصناعة الزجاج", en: "Alawadhi for Glass Industry" };

export const address = {
  ar: "قاع القيضي، بالقرب من محطة النصر، صنعاء، اليمن",
  en: "Qa'a Al-Qaidi, near Al-Nasr Station, Sana'a, Yemen",
};

export const hours = { ar: "السبت – الخميس: 8:00 ص – 5:00 م", en: "Sat – Thu: 8:00 AM – 5:00 PM" };

export const products = [
  { icon: "shield", name: { ar: "زجاج مقسّى (سيكوريت)", en: "Tempered (Securit) Safety Glass" }, desc: { ar: "أقوى بأربع إلى خمس مرات من الزجاج العادي، وينكسر إلى حبيبات آمنة. مثالي للأبواب والواجهات والدرابزين.", en: "4–5× stronger than ordinary glass and breaks into safe granules. Ideal for doors, facades and balustrades." } },
  { icon: "layers", name: { ar: "زجاج معشّق (لامينيتد)", en: "Laminated Glass" }, desc: { ar: "طبقتان أو أكثر مع طبقة PVB تمنع تناثر الزجاج، مع عزل صوتي وحماية من الأشعة فوق البنفسجية.", en: "Two or more panes bonded with PVB to hold fragments in place, with acoustic insulation and UV protection." } },
  { icon: "panels", name: { ar: "زجاج مزدوج / وحدات عازلة", en: "Double-Glazed Insulated Units" }, desc: { ar: "عزل حراري وصوتي عالٍ يقلل استهلاك الطاقة، بمقاسات وسماكات حسب الطلب.", en: "High thermal and acoustic insulation that cuts energy use, in custom sizes and thicknesses." } },
  { icon: "building", name: { ar: "زجاج معماري وواجهات", en: "Architectural & Facade Glass" }, desc: { ar: "حلول للواجهات الزجاجية والمباني التجارية بألوان وانعكاسات متعددة.", en: "Curtain-wall and commercial facade solutions in a range of tints and reflective finishes." } },
  { icon: "sparkles", name: { ar: "مرايا وزجاج ديكوري", en: "Mirrors & Decorative Glass" }, desc: { ar: "مرايا عالية الوضوح وزجاج مصنفر وملون للتصاميم الداخلية الراقية.", en: "High-clarity mirrors, frosted and tinted glass for refined interiors." } },
] as const;

export const reasons = [
  { ar: "رقابة صارمة على الجودة", en: "Strict quality control" },
  { ar: "آلات وخطوط إنتاج حديثة", en: "Modern machinery & lines" },
  { ar: "توريد سريع", en: "Fast delivery" },
  { ar: "مقاسات حسب الطلب", en: "Custom sizes" },
  { ar: "دعم فني متخصص", en: "Technical support" },
  { ar: "خبرة مجموعة تمتد 50 عاماً", en: "Backed by 50 years of group experience" },
];

export const steps = [
  { ar: "القص", en: "Cutting" },
  { ar: "تشطيب الحواف", en: "Edging" },
  { ar: "التقسية", en: "Tempering" },
  { ar: "التعشيق / التزجيج المزدوج", en: "Lamination / Double glazing" },
  { ar: "فحص الجودة", en: "Quality check" },
  { ar: "التسليم", en: "Delivery" },
];

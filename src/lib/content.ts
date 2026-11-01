export const STAFF_LOGIN = "http://132.145.55.226:8182/apex/f?p=factory:LOGIN_DESKTOP";
// Placeholders — to be filled in by the owner
export const WHATSAPP = "[WHATSAPP]";
export const PHONES = ["[PHONE]"];
export const EMAIL = "[EMAIL]";
export const contactReady = !WHATSAPP.startsWith("[");

export const nav = [
  { to: "/", ar: "الرئيسية", en: "Home" },
  { to: "/products", ar: "المنتجات", en: "Products" },
  { to: "/projects", ar: "المشاريع", en: "Projects" },
  { to: "/quote", ar: "طلب عرض سعر", en: "Request a Quote" },
  { to: "/contact", ar: "تواصل معنا", en: "Contact" },
] as const;

export const brand = { ar: "العواضي لصناعة الزجاج", en: "Alawadhi for Glass Industry" };

export const slogan = {
  ar: "نحن نسعى دائماً للتميز ولتقديم أفضل المنتجات والخدمات",
  en: "We aim for excellence in providing the best quality products and services",
};

export const address = {
  ar: "المنطقة الصناعية القيضي، صنعاء، اليمن",
  en: "Al-Qaidi Industrial Area, Sana'a, Yemen",
};

export const hours = { ar: "السبت – الخميس: 8:00 ص – 5:00 م", en: "Sat – Thu: 8:00 AM – 5:00 PM" };

export const products = [
  { icon: "shield", name: { ar: "زجاج مقسّى (سيكوريت)", en: "Tempered Glass (Securit)" }, desc: { ar: "أقوى بأربع إلى خمس مرات من الزجاج العادي، ويتحمل حرارة أعلى بنحو ثلاث مرات، وينكسر إلى قطع صغيرة آمنة. سماكات من 4 إلى 19 مم ومقاسات حتى 2×4 متر — شفاف، مصنفر، منقوش، ملوّن ولو-إي. للواجهات والأبواب والنوافذ والسلالم والديكور.", en: "4–5× stronger than normal glass, withstands about 3× more heat, and breaks into small safe pieces. Thickness 4–19 mm, sizes up to 2×4 m — clear, frosted, patterned, coloured and Low-E. For curtain walls, doors, windows, stairs and decor." } },
  { icon: "curve", name: { ar: "السيكوريت المنحني", en: "Curved Tempered Glass" }, desc: { ar: "زجاج مقسّى منحنٍ بمقاسات وأقواس حسب التصميم، للواجهات والزوايا المعمارية المميزة.", en: "Tempered glass curved to your design's radii and dimensions, for distinctive facades and architectural corners." } },
  { icon: "layers", name: { ar: "زجاج مجلتن (لامينيتد)", en: "Laminated Glass" }, desc: { ar: "طبقات متعددة تبقى متماسكة عند الكسر، مع خيارات مضادة للتناثر ومقاومة للرصاص.", en: "Multi-layer glass that stays in place when broken, with anti-shatter and bullet-resistant options." } },
  { icon: "panels", name: { ar: "زجاج مزدوج (دبل جلاس)", en: "Double Glazing" }, desc: { ar: "وحدات عازلة للحرارة والصوت تقلل استهلاك الطاقة، بمقاسات وسماكات حسب الطلب.", en: "Insulated units for heat and sound insulation that cut energy use, in custom sizes and thicknesses." } },
  { icon: "spray", name: { ar: "زجاج مرمّل (ساندبلاست)", en: "Sandblasted Glass" }, desc: { ar: "تشطيب مصنفر أنيق مع إمكانية تنفيذ النقوش والشعارات والنصوص على الزجاج.", en: "An elegant frosted finish, with patterns, logos and text sandblasted onto the glass." } },
  { icon: "palette", name: { ar: "زجاج معشّق ورسم على الزجاج", en: "Decorative & Stained Glass" }, desc: { ar: "زجاج معشّق ملوّن ورسم فني على الزجاج للتصاميم الداخلية الراقية.", en: "Coloured stained glass and hand-painted artwork on glass for refined interiors." } },
  { icon: "armchair", name: { ar: "زجاج الأثاث والأشكال", en: "Furniture Glass & Custom Shapes" }, desc: { ar: "زجاج للطاولات والأثاث بأشكال ومقاسات خاصة حسب الطلب، مع تشطيب حواف دقيق.", en: "Glass for tables and furniture in custom shapes and sizes, with precise edge finishing." } },
] as const;

export const services = [
  { icon: "truck", name: { ar: "توصيل سريع وآمن", en: "Fast, safe delivery" }, desc: { ar: "سيارات نقل مجهزة خصيصاً لنقل الزجاج تصل إلى موقعك بسرعة وأمان.", en: "Specially equipped glass trucks deliver to your site quickly and safely." } },
  { icon: "check", name: { ar: "فحص الجودة", en: "Quality inspection" }, desc: { ar: "فحص دقيق للجودة قبل التسليم وبعده لضمان مطابقة المواصفات.", en: "Careful quality inspection before and after delivery to guarantee specifications." } },
  { icon: "crate", name: { ar: "تغليف احترافي", en: "Professional packing" }, desc: { ar: "تغليف في صناديق خشبية متينة يحمي الزجاج أثناء النقل والتخزين.", en: "Sturdy wooden-crate packing that protects glass during transport and storage." } },
] as const;

export const groupCompanies = [
  { name: { ar: "مجموعة العوضي للتجارة والصناعة", en: "Al-Awadhi Group for Trading and Manufacturing" }, url: "https://www.alawadhigroup.net" },
  { name: { ar: "شركة العوضي للتجارة المحدودة (صنعاء)", en: "AL-AWADHI TRADING CO. LTD (Sana'a)" }, url: "https://www.yemenglass.com" },
  { name: { ar: "العوضي للزجاج والتجارة (عدن)", en: "Al-Awadhi Glass and Trading (Aden)" }, url: "" },
  { name: { ar: "البناء والتطوير للتجارة", en: "Construction & Development for Trading" }, url: "https://www.cdfortrading.com" },
  { name: { ar: "شركة العوضي للتجارة والوكالات (عُمان)", en: "Al-Awadhi Trading and Agencies Company (Oman)" }, url: "" },
  { name: { ar: "شركة العوضي للتجارة (السعودية)", en: "Al-Awadhi Trading Company (Saudi Arabia)" }, url: "https://www.alawadhi.sa" },
  { name: { ar: "العواضي لصناعة الزجاج", en: "Alawadhi for Glass Industry" }, url: "https://www.alawadhi-ind.com" },
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

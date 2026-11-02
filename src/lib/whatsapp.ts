import { z } from "zod";
import { products, WHATSAPP } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

export function quoteUrl(lang: Lang, product?: string) {
  const selected = products.find((p) => p.icon === product);
  const text = selected
    ? (lang === "ar" ? `مرحباً، أريد عرض سعر لـ: ${selected.name.ar}` : `Hello, I would like a quote for: ${selected.name.en}`)
    : (lang === "ar" ? "مرحباً، أريد عرض سعر لمشروعي في الزجاج." : "Hello, I would like a glass quote for my project.");
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function visibleProduct() {
  const focused = document.activeElement?.closest<HTMLElement>("[data-quote-product]");
  if (focused?.dataset['quoteProduct']) return focused.dataset['quoteProduct'];
  const visible = Array.from(document.querySelectorAll<HTMLElement>("[data-quote-product]")).filter((el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * .8 && r.bottom > window.innerHeight * .2;
  });
  return visible.sort((a, b) => Math.abs(a.getBoundingClientRect().top - window.innerHeight / 2) - Math.abs(b.getBoundingClientRect().top - window.innerHeight / 2))[0]?.dataset['quoteProduct'];
}

const measurement = z.coerce.number().finite().positive().max(100000);
export const quoteSchema = z.object({
  product: z.string().refine((v) => products.some((p) => p.icon === v)),
  thickness: z.coerce.number().finite().positive().max(200),
  width: measurement, height: measurement,
  quantity: z.coerce.number().int().min(1).max(100000),
  city: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().regex(/^\+?[0-9\s()-]{7,30}$/),
  notes: z.string().trim().max(1000),
});
export type QuoteInput = z.input<typeof quoteSchema>;
export function formQuoteUrl(input: QuoteInput, lang: Lang) {
  const f = quoteSchema.parse(input);
  const p = products.find((p) => p.icon === f.product);
  const lines = lang === "ar" ? ["مرحباً، أريد عرض سعر:", `المنتج: ${p?.name.ar}`, `السماكة: ${f.thickness} مم`, `المقاس: ${f.width} × ${f.height} مم`, `الكمية: ${f.quantity}`, `المدينة: ${f.city}`, `الاسم: ${f.name}`, `الهاتف: ${f.phone}`, ...(f.notes ? [`ملاحظات: ${f.notes}`] : [])]
    : ["Hello, I would like a quote:", `Product: ${p?.name.en}`, `Thickness: ${f.thickness} mm`, `Dimensions: ${f.width} × ${f.height} mm`, `Quantity: ${f.quantity}`, `City: ${f.city}`, `Name: ${f.name}`, `Phone: ${f.phone}`, ...(f.notes ? [`Notes: ${f.notes}`] : [])];
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
}
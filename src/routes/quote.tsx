import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { products } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { quoteSchema, formQuoteUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/quote")({
  head: () => pageHead("/quote"),
  component: Quote,
});

const field = "w-full rounded-xl bg-input/40 border border-border px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:border-primary";

function Quote() {
  const { t, lang } = useLang();
  const [f, setF] = useState({ product: products[0].icon as string, thickness: "", width: "", height: "", quantity: "1", city: "", name: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (key: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setF((old) => ({ ...old, [key]: e.target.value })); setErrors((old) => ({ ...old, [key]: "" })); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(f);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => { next[String(issue.path[0])] = t({ ar: "يرجى إدخال قيمة صحيحة", en: "Please enter a valid value" }); });
      setErrors(next); return;
    }
    window.open(formQuoteUrl(parsed.data, lang), "_blank", "noopener,noreferrer");
  };
  const input = (key: Exclude<keyof typeof f, "product" | "notes">, label: { ar: string; en: string }, type = "text", unit = false) => <label className="grid gap-2 text-sm" key={key}>
    <span>{t(label)}{unit ? t({ ar: " (مم)", en: " (mm)" }) : ""} *</span>
    <input name={key} type={type} required min={type === "number" ? (key === "quantity" ? 1 : .1) : undefined} max={type === "number" ? (key === "thickness" ? 200 : 100000) : undefined} step={type === "number" ? (key === "quantity" ? 1 : "any") : undefined} maxLength={type === "tel" ? 30 : 100} dir={type === "tel" ? "ltr" : undefined} className={field} value={f[key]} onChange={set(key)} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `error-${key}` : undefined} />
    {errors[key] && <span id={`error-${key}`} className="text-destructive" role="alert">{errors[key]}</span>}
  </label>;
  return <>
    <PageHeader eyebrow={t({ ar: "طلب عرض سعر", en: "Request a quote" })} title={t({ ar: "أخبرنا عن مشروعك", en: "Tell us about your project" })} />
    <section className="mx-auto max-w-3xl px-5 py-16">
      <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-10 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm md:col-span-2"><span>{t({ ar: "نوع الزجاج *", en: "Glass type *" })}</span>
          <select name="product" className={field} value={f.product} onChange={set("product")} required>{products.map((p) => <option key={p.icon} value={p.icon} className="bg-popover">{t(p.name)}</option>)}</select>
        </label>
        {input("thickness", { ar: "السماكة", en: "Thickness" }, "number", true)}
        {input("quantity", { ar: "الكمية", en: "Quantity" }, "number")}
        {input("width", { ar: "العرض", en: "Width" }, "number", true)}
        {input("height", { ar: "الارتفاع", en: "Height" }, "number", true)}
        {input("city", { ar: "المدينة", en: "City" })}
        {input("name", { ar: "الاسم", en: "Name" })}
        {input("phone", { ar: "رقم الهاتف", en: "Phone" }, "tel")}
        <label className="grid gap-2 text-sm md:col-span-2"><span>{t({ ar: "ملاحظات", en: "Notes" })}</span><textarea name="notes" rows={4} maxLength={1000} className={field} value={f.notes} onChange={set("notes")} /></label>
        <Button type="submit" className="md:col-span-2 h-auto rounded-full py-3.5 font-semibold"><MessageCircle />{t({ ar: "إرسال عبر واتساب", en: "Send via WhatsApp" })}</Button>
        <p className="md:col-span-2 -mt-2 text-center text-xs text-muted-foreground">{t({ ar: "بياناتك تُرسل مباشرة إلى واتساب المصنع فقط ولا تُحفظ في الموقع", en: "Your details are sent only to our WhatsApp and are not stored on the website." })}</p>
      </form>
    </section>
  </>;
}

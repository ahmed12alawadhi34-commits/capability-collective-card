import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import { products, WHATSAPP } from "@/lib/content";

export const Route = createFileRoute("/quote")({
  validateSearch: (s: Record<string, unknown>): { product?: string } => ({ product: typeof s["product"] === "string" ? (s["product"] as string) : undefined }),
  head: () => ({
    meta: [
      { title: "طلب عرض سعر | العواضي لصناعة الزجاج" },
      { name: "description", content: "Request a quote for tempered, laminated or double-glazed glass from Alawadhi for Glass Industry." },
      { property: "og:title", content: "اطلب عرض سعر | العواضي لصناعة الزجاج" },
      { property: "og:description", content: "Request a glass quote in minutes." },
    ],
  }),
  component: Quote,
});

const field = "w-full rounded-xl bg-input/40 border border-border px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:border-primary";

function Quote() {
  const { t } = useLang();
  const { product } = Route.useSearch();
  const [f, setF] = useState({ name: "", company: "", phone: "", email: "", product: product ?? products[0].icon, size: "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = products.find((x) => x.icon === f.product);
    const lines = [
      "طلب عرض سعر / Quote request",
      `Name: ${f.name}`, `Company: ${f.company}`, `Phone: ${f.phone}`, `Email: ${f.email}`,
      `Product: ${p?.name.en}`, `Size/Qty: ${f.size}`, `Message: ${f.message}`,
    ];
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  };
  return (
    <>
      <PageHeader eyebrow={t({ ar: "طلب عرض سعر", en: "Request a quote" })} title={t({ ar: "أخبرنا عن مشروعك", en: "Tell us about your project" })}>
        {t({ ar: "سيُرسل طلبك مباشرة إلى فريق المبيعات عبر واتساب.", en: "Your request goes straight to our sales team on WhatsApp." })}
      </PageHeader>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-10 grid gap-4 md:grid-cols-2">
          <input required maxLength={100} className={field} placeholder={t({ ar: "الاسم *", en: "Name *" })} value={f.name} onChange={set("name")} />
          <input maxLength={100} className={field} placeholder={t({ ar: "الشركة", en: "Company" })} value={f.company} onChange={set("company")} />
          <input required type="tel" maxLength={30} className={field} placeholder={t({ ar: "الهاتف *", en: "Phone *" })} value={f.phone} onChange={set("phone")} />
          <input type="email" maxLength={150} className={field} placeholder={t({ ar: "البريد الإلكتروني", en: "Email" })} value={f.email} onChange={set("email")} />
          <select className={`${field} md:col-span-2`} value={f.product} onChange={set("product")}>
            {products.map((p) => <option key={p.icon} value={p.icon} className="bg-popover">{t(p.name)}</option>)}
          </select>
          <input maxLength={200} className={`${field} md:col-span-2`} placeholder={t({ ar: "المقاس / الكمية", en: "Size / quantity" })} value={f.size} onChange={set("size")} />
          <textarea rows={5} maxLength={1000} className={`${field} md:col-span-2`} placeholder={t({ ar: "رسالتك", en: "Message" })} value={f.message} onChange={set("message")} />
          <button className="md:col-span-2 rounded-full bg-primary text-primary-foreground py-3.5 font-semibold">{t({ ar: "إرسال الطلب", en: "Send request" })}</button>
        </form>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import { address, hours, PHONES, EMAIL, WHATSAPP } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | العواضي لصناعة الزجاج" },
      { name: "description", content: "Visit Alawadhi for Glass Industry in Qa'a Al-Qaidi, Sana'a, or contact us by phone and WhatsApp." },
      { property: "og:title", content: "تواصل معنا | العواضي لصناعة الزجاج" },
      { property: "og:description", content: "Address, phone, WhatsApp and working hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  const rows = [
    { icon: MapPin, label: t({ ar: "العنوان", en: "Address" }), body: t(address) },
    { icon: Clock, label: t({ ar: "ساعات العمل", en: "Working hours" }), body: t(hours) },
    { icon: Mail, label: t({ ar: "البريد", en: "Email" }), body: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> },
  ];
  return (
    <>
      <PageHeader eyebrow={t({ ar: "تواصل معنا", en: "Contact" })} title={t({ ar: "زورونا في صنعاء", en: "Visit us in Sana'a" })} />
      <section className="mx-auto max-w-7xl px-5 py-16 grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 content-start">
          {rows.map((r, i) => (
            <div key={i} className="glass rounded-2xl p-5 flex gap-4">
              <r.icon className="text-primary shrink-0" />
              <div><p className="text-xs text-muted-foreground">{r.label}</p><div className="mt-1 font-medium">{r.body}</div></div>
            </div>
          ))}
          <div className="glass rounded-2xl p-5 flex gap-4">
            <Phone className="text-primary shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">{t({ ar: "الهاتف", en: "Phone" })}</p>
              {PHONES.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} dir="ltr" className="font-medium text-start">{p}</a>)}
            </div>
          </div>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="rounded-full bg-primary text-primary-foreground py-3.5 font-semibold flex justify-center items-center gap-2">
            <MessageCircle size={20} /> {t({ ar: "راسلنا على واتساب", en: "Chat on WhatsApp" })}
          </a>
        </div>
        <div className="glass rounded-3xl overflow-hidden min-h-96">
          <iframe title="map" className="w-full h-full min-h-96 grayscale-[40%]" loading="lazy" src="https://www.google.com/maps?q=Al-Nasr+Station+Qa'a+Al-Qaidi+Sana'a+Yemen&output=embed" />
        </div>
      </section>
    </>
  );
}

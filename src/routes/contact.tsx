import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import { address, hours, PHONES, EMAIL, emailReady, WHATSAPP, contactReady } from "@/lib/content";
import { pageHead, localBusinessJsonLd } from "@/lib/seo";
import { quoteUrl } from "@/lib/whatsapp";

import { MAP_EMBED, MAP_LINK } from "@/lib/maps";
import { GoogleReviewsLink } from "@/components/GoogleReviewsLink";

export const Route = createFileRoute("/contact")({
  head: () => ({ ...pageHead("/contact"), scripts: [localBusinessJsonLd()] }),
  component: Contact,
});

function Contact() {
  const { t, lang } = useLang();
  const rows = [
    { icon: MapPin, label: t({ ar: "العنوان", en: "Address" }), body: t(address) },
    { icon: Clock, label: t({ ar: "ساعات العمل", en: "Working hours" }), body: t(hours) },
    ...(emailReady ? [{ icon: Mail, label: t({ ar: "البريد", en: "Email" }), body: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> }] : []),
  ];
  return (
    <>
      <PageHeader eyebrow={t({ ar: "تواصل معنا", en: "Contact" })} title={t({ ar: "زورونا في صنعاء", en: "Visit us in Sana'a" })} />
      <section className="section-light"><div className="mx-auto max-w-7xl px-5 py-16 grid gap-6 lg:grid-cols-2">
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
              {PHONES.map((p) =>
                contactReady ? (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} dir="ltr" className="font-medium text-start">{p}</a>
                ) : (
                  <span key={p} dir="ltr" className="font-medium text-start">{p}</span>
                )
              )}
            </div>
          </div>
          {contactReady ? (
            <a href={quoteUrl(lang)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary text-primary-foreground py-3.5 font-semibold flex justify-center items-center gap-2">
              <MessageCircle size={20} /> {t({ ar: "راسلنا على واتساب", en: "Chat on WhatsApp" })}
            </a>
          ) : (
            <div className="glass rounded-2xl p-5 flex gap-4 items-center">
              <MessageCircle className="text-primary shrink-0" size={20} />
              <div><p className="text-xs text-muted-foreground">WhatsApp</p><p dir="ltr" className="mt-1 font-medium">{WHATSAPP}</p></div>
            </div>
          )}
        </div>
        <div>
          <div className="glass rounded-3xl overflow-hidden min-h-96">
            <iframe title={t({ ar: "موقع المصنع على خرائط جوجل", en: "Factory location on Google Maps" })} className="w-full h-full min-h-96 grayscale-[40%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={MAP_EMBED} />
          </div>
          <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary hover:no-underline">
            <ExternalLink size={16} /> {t({ ar: "افتح في خرائط جوجل", en: "Open in Google Maps" })}
          </a>
          <GoogleReviewsLink className="mt-4 ms-3" />
        </div>
      </div></section>
    </>
  );
}

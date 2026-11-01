import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone } from "lucide-react";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import { branches } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "الفروع والتواصل | مجموعة العوضي" },
      { name: "description", content: "فروع مجموعة العوضي في صنعاء وعدن والمكلا والرياض ومسقط وأرقام التواصل." },
      { property: "og:title", content: "الفروع والتواصل | مجموعة العوضي" },
      { property: "og:description", content: "Al-Awadhi Group branches and contact numbers." },
    ],
  }),
  component: Contact,
});

const WHATSAPP = "967778888111";

function Contact() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(`${name}\n${msg}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };
  return (
    <>
      <PageHeader eyebrow={t({ ar: "الفروع والتواصل", en: "Branches & contact" })} title={t({ ar: "نسعد بخدمتكم", en: "We're happy to serve you" })} />
      <section className="mx-auto max-w-6xl px-5 py-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {branches.map((b, i) => (
            <div key={i} className="border bg-card p-5">
              <h2 className="font-semibold leading-relaxed">{t(b.name)}</h2>
              <div className="mt-3 space-y-1">
                {b.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-accent" dir="ltr">
                    <Phone size={14} /> {p}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={send} className="bg-primary text-primary-foreground p-6 h-fit space-y-4">
          <h2 className="text-xl font-bold">{t({ ar: "راسلنا عبر واتساب", en: "Message us on WhatsApp" })}</h2>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ ar: "الاسم", en: "Name" })} className="w-full rounded-sm bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 placeholder:text-primary-foreground/50" />
          <textarea required rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t({ ar: "رسالتك", en: "Your message" })} className="w-full rounded-sm bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 placeholder:text-primary-foreground/50" />
          <button className="w-full rounded-sm bg-accent text-accent-foreground py-3 font-semibold">{t({ ar: "إرسال", en: "Send" })}</button>
        </form>
      </section>
    </>
  );
}

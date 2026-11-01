import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import { partners } from "@/lib/content";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "شركاء النجاح | مجموعة العوضي" },
      { name: "description", content: "سان جوبان، واكر، ييل، شيشه جام وغيرها من شركاء مجموعة العوضي العالميين." },
      { property: "og:title", content: "شركاء النجاح | مجموعة العوضي" },
      { property: "og:description", content: "Saint-Gobain, Wacker, Yale, Şişecam and more global partners." },
    ],
  }),
  component: Partners,
});

function Partners() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t({ ar: "شركاء النجاح", en: "Success partners" })} title={t({ ar: "شراكات مع رواد الصناعة عالمياً", en: "Partnerships with global industry leaders" })} />
      <section className="mx-auto max-w-6xl px-5 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border">
        {partners.map((p) => (
          <div key={p.name} className="bg-card p-8 text-center">
            <div className="font-display text-xl font-bold text-primary" dir="ltr">{p.name}</div>
            <div className="mt-2 text-xs text-muted-foreground">{t(p.origin)}</div>
          </div>
        ))}
      </section>
    </>
  );
}

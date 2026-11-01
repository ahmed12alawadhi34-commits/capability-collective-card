import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import { companies } from "@/lib/content";

export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title: "الشركات التابعة | مجموعة العوضي" },
      { name: "description", content: "الشركات التابعة لمجموعة العوضي في اليمن والسعودية وعُمان." },
      { property: "og:title", content: "الشركات التابعة | مجموعة العوضي" },
      { property: "og:description", content: "Al-Awadhi Group subsidiaries in Yemen, Saudi Arabia and Oman." },
    ],
  }),
  component: Companies,
});

function Companies() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t({ ar: "الكيان والشركات التابعة", en: "The entity & subsidiaries" })} title={t({ ar: "قوة واحدة موحّدة", en: "One unified force" })}>
        {t({ ar: "تقود شركة العوضي للتجارة المحدودة منظومة متكاملة من الشركات المتخصصة لتقديم حلول شاملة محلياً وإقليمياً.", en: "Al-Awadhi Trading Co. Ltd. leads an integrated ecosystem of specialized subsidiaries delivering comprehensive solutions locally and regionally." })}
      </PageHeader>
      <section className="mx-auto max-w-5xl px-5 py-16 space-y-4">
        {companies.map((c, i) => (
          <article key={i} className="grid grid-cols-[auto_1fr] gap-5 border bg-card p-6">
            <span className="font-display text-4xl font-bold text-accent/60">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-xs font-semibold text-accent">{t(c.place)}</p>
              <h2 className="mt-1 text-xl font-bold">{t(c.name)}</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{t(c.desc)}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

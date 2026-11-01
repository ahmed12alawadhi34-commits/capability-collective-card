import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import { timeline } from "@/lib/content";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "مسيرتنا منذ 1955 | مجموعة العوضي" },
      { name: "description", content: "محطات تأسيس مجموعة العوضي من 1955 حتى اليوم." },
      { property: "og:title", content: "مسيرتنا | مجموعة العوضي" },
      { property: "og:description", content: "Al-Awadhi Group milestones from 1955 to today." },
    ],
  }),
  component: History,
});

function History() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t({ ar: "مسيرتنا", en: "Our journey" })} title={t({ ar: "تأسيس مجموعة العوضي", en: "Establishment of Al-Awadhi Group" })} />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <ol className="border-s-2 border-accent/40 space-y-10">
          {timeline.map((e, i) => (
            <li key={i} className="relative ps-8">
              <span className="absolute -start-[9px] top-2 h-4 w-4 rounded-full bg-accent" />
              <div className="font-display text-3xl font-bold text-primary">{e.year}</div>
              <h2 className="mt-1 text-lg font-bold">{t(e.title)}</h2>
              <p className="mt-1 text-muted-foreground leading-relaxed">{t(e.desc)}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

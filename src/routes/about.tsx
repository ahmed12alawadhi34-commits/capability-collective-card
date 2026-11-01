import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import { about, vision, mission, pillars, values } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن — رؤيتنا ورسالتنا | مجموعة العوضي" },
      { name: "description", content: "تعرف على مجموعة العوضي للتجارة والصناعة: الرؤية، الرسالة والقيم." },
      { property: "og:title", content: "من نحن | مجموعة العوضي" },
      { property: "og:description", content: "About Al-Awadhi Group: vision, mission and core values." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t({ ar: "من نحن", en: "About us" })} title={t({ ar: "إرث يمتد لأكثر من خمسة عقود", en: "A heritage of more than five decades" })} />
      <section className="mx-auto max-w-4xl px-5 py-16 space-y-5 text-lg leading-loose">
        {t(about).map((p, i) => <p key={i}>{p}</p>)}
      </section>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-accent">{t({ ar: "الرؤية", en: "Vision" })}</h2>
            <p className="mt-4 leading-loose opacity-90">{t(vision)}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-accent">{t({ ar: "الرسالة", en: "Mission" })}</h2>
            <p className="mt-4 leading-loose opacity-90">{t(mission)}</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">{t({ ar: "ركائز الرؤية المستقبلية", en: "Future vision pillars" })}</h2>
          <ol className="mt-6 space-y-3">
            {pillars.map((p, i) => (
              <li key={i} className="flex items-center gap-4 border-b pb-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center bg-brand text-primary-foreground text-sm font-bold">{i + 1}</span>
                {t(p)}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t({ ar: "القيم الأساسية", en: "Core values" })}</h2>
          <div className="mt-6 grid gap-3">
            {values.map((v, i) => <div key={i} className="border-s-4 border-accent bg-secondary px-4 py-3 font-semibold">{t(v)}</div>)}
          </div>
        </div>
      </section>
    </>
  );
}

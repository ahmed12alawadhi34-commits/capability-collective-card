import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import { activities } from "@/lib/content";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "الأنشطة والقطاعات | مجموعة العوضي" },
      { name: "description", content: "الزجاج، مواد البناء، الديكور، المقاولات، الكلادينج والتجميل." },
      { property: "og:title", content: "الأنشطة والقطاعات | مجموعة العوضي" },
      { property: "og:description", content: "Glass, building materials, decoration, contracting, cladding and beauty." },
    ],
  }),
  component: Activities,
});

function Activities() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t({ ar: "الأنشطة والقطاعات", en: "Activities & sectors" })} title={t({ ar: "قطاعات حيوية متنوعة", en: "Diverse vital sectors" })}>
        {t({ ar: "تتوزع الأنشطة على فروع وشركات متخصصة لضمان التركيز والكفاءة.", en: "Activities are distributed across specialized branches and companies to ensure focus and efficiency." })}
      </PageHeader>
      <section className="mx-auto max-w-6xl px-5 py-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((a, i) => (
          <div key={i} className="bg-card border p-8">
            <div className="h-1 w-10 bg-brand" />
            <h2 className="mt-5 text-lg font-bold leading-relaxed">{t(a)}</h2>
          </div>
        ))}
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "المشاريع | العواضي لصناعة الزجاج" },
      { name: "description", content: "Projects using glass from Alawadhi for Glass Industry — facades, interiors and insulated glazing." },
      { property: "og:title", content: "مشاريعنا | العواضي لصناعة الزجاج" },
      { property: "og:description", content: "Facades, interiors and insulated glazing projects." },
      { property: "og:image", content: "https://capability-collective-card.lovable.app/og-image.jpg" },
      { name: "twitter:image", content: "https://capability-collective-card.lovable.app/og-image.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

const items = [
  { src: p1, w: 912, h: 1200, t: { ar: "واجهة برج تجاري", en: "Commercial tower facade" } },
  { src: p3, w: 1200, h: 912, t: { ar: "درابزين وفواصل زجاجية", en: "Glass railings & partitions" } },
  { src: p2, w: 1200, h: 800, t: { ar: "خط التقسية", en: "Tempering line" } },
  { src: p4, w: 912, h: 1104, t: { ar: "وحدات زجاج مزدوج", en: "Insulated glass units" } },
];

function Projects() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t({ ar: "المشاريع", en: "Projects" })} title={t({ ar: "أعمال نفخر بها", en: "Work we're proud of" })}>
        {t({ ar: "صور توضيحية — سيتم استبدالها بصور مشاريعنا الفعلية.", en: "Illustrative images — to be replaced with our actual projects." })}
      </PageHeader>
      <section className="mx-auto max-w-7xl px-5 py-20 columns-1 sm:columns-2 gap-5 [&>*]:mb-5">
        {items.map((it, i) => (
          <figure key={i} className="reveal group relative overflow-hidden rounded-3xl break-inside-avoid">
            <img src={it.src} alt={t(it.t)} width={it.w} height={it.h} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
            <figcaption className="absolute inset-x-4 bottom-4 glass rounded-2xl px-5 py-3 font-semibold opacity-90 group-hover:opacity-100">{t(it.t)}</figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

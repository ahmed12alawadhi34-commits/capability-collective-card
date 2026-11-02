import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";
import p2 from "@/assets/p2.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "معرض المصنع | العواضي لصناعة الزجاج" },
      { name: "description", content: "The factory tempering line at Alawadhi for Glass Industry, Sana'a." },
      { property: "og:title", content: "معرض المصنع | العواضي لصناعة الزجاج" },
      { property: "og:description", content: "Our factory — glass production and tempering line." },
      { property: "og:image", content: "https://capability-collective-card.lovable.app/og-image.jpg" },
      { name: "twitter:image", content: "https://capability-collective-card.lovable.app/og-image.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

const items = [
  { src: p2, w: 1200, h: 800, t: { ar: "مصنعنا – خط التقسية", en: "Our factory – tempering line" } },
];

function Projects() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t({ ar: "المصنع", en: "The factory" })} title={t({ ar: "معرض المصنع", en: "Factory gallery" })} />
      <section className="mx-auto max-w-7xl px-5 py-20">
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

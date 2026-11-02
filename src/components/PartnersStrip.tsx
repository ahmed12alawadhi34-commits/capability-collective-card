import { useLang } from "@/lib/i18n";
import { useMarquee } from "@/lib/marquee";

type Asset = { url: string };
const files = import.meta.glob<Asset>("../assets/partners/*.png.asset.json", { eager: true, import: "default" });
const url = (slug: string, variant: "color" | "white") => files[`../assets/partners/${slug}-${variant}.png.asset.json`]?.url;

/** Logos too dark for the navy background use their white version. */
const whiteLogos = new Set(["alcobond", "assaabloy", "casma", "guardianglass", "hi-tech", "speedy", "taiwanglass", "wacker"]);

const partners: { name: string; slug?: string }[] = [
  { name: "Saint-Gobain", slug: "saint-gobain" },
  { name: "Guardian Glass", slug: "guardianglass" },
  { name: "Şişecam", slug: "sisecamflatglass" },
  { name: "Taiwan Glass", slug: "taiwanglass" },
  { name: "Obeikan Glass", slug: "obeikan" },
  { name: "Wacker", slug: "wacker" },
  { name: "Dow", slug: "dow" },
  { name: "MAB – ASSA ABLOY", slug: "assaabloy" },
  { name: "Yale", slug: "yale" },
  { name: "Profilglass", slug: "profilglass" },
  { name: "Alcobond", slug: "alcobond" },
  { name: "Casma", slug: "casma" },
  { name: "Dormate", slug: "dormate" },
  { name: "hi-tech", slug: "hi-tech" },
  { name: "Speedy", slug: "speedy" },
  { name: "Mr. Build", slug: "mrbuild" },
];

export function PartnersStrip() {
  const { t } = useLang();
  const { root, track } = useMarquee(38, "left", 1800);
  return <section ref={root} className="partners-section py-16 overflow-hidden">
    <h2 className="px-5 text-center text-2xl md:text-3xl font-bold">{t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}</h2>
    <div className="partners-window mt-10" dir="ltr" tabIndex={0} aria-label={t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}>
      <div ref={track} className="partners-track">{[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="partners-group">{partners.map((p) => {
        const variant = p.slug && whiteLogos.has(p.slug) ? "white" : "color";
        const src = p.slug && url(p.slug, variant);
        return <li key={p.name} className={`partner-item ${["yale", "assaabloy", "obeikan", "casma"].includes(p.slug ?? "") ? "partner-compact" : ""}`}>
          {src ? <img src={src} alt={copy === 1 ? "" : p.name} loading="lazy" decoding="async" draggable={false} className="partner-logo" /> : <span className="partner-name">{p.name}</span>}
        </li>;
      })}</ul>)}</div>
    </div>
  </section>;
}

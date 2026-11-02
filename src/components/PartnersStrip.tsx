import { useLang } from "@/lib/i18n";

type Asset = { url: string };
const files = import.meta.glob<Asset>("../assets/partners/*.png.asset.json", { eager: true, import: "default" });
const url = (slug: string, v: "mono" | "color") => files[`../assets/partners/${slug}-${v}.png.asset.json`]?.url;

const partners: { name: string; slug?: string }[] = [
  { name: "Saint-Gobain", slug: "saint-gobain" },
  { name: "Guardian Glass", slug: "guardianglass" },
  { name: "Şişecam", slug: "sisecamflatglass" },
  { name: "Taiwan Glass", slug: "taiwanglass" },
  { name: "Obeikan Glass", slug: "obeikan" },
  { name: "Wacker", slug: "wacker" },
  { name: "Dow", slug: "dow" },
  { name: "Yale", slug: "yale" },
  { name: "MAB – ASSA ABLOY", slug: "assaabloy" },
  { name: "Alcobond", slug: "alcobond" },
  { name: "Casma", slug: "casma" },
  { name: "Speedy", slug: "speedy" },
  { name: "Dormate", slug: "dormate" },
  { name: "hi-tech", slug: "hi-tech" },
  { name: "Mr. Build", slug: "mrbuild" },
  { name: "Profilglass" },
];

export function PartnersStrip() {
  const { t } = useLang();
  return <section className="section-light py-16 overflow-hidden">
    <h2 className="px-5 text-center text-2xl md:text-3xl font-bold">{t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}</h2>
    <div className="partners-window mt-10" dir="ltr" tabIndex={0} aria-label={t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}>
      <div className="partners-track">{[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="partners-group">{partners.map((p) => {
        const mono = p.slug && url(p.slug, "mono"), color = p.slug && url(p.slug, "color");
        return <li key={p.name} className="partner-item">
          {mono && color ? <span className="partner-logo-wrap">
            <img src={mono} alt={copy === 1 ? "" : p.name} decoding="async" draggable={false} className="partner-logo partner-logo-mono" />
            <img src={color} alt="" aria-hidden decoding="async" draggable={false} className="partner-logo partner-logo-color" />
          </span> : <span className="partner-name">{p.name}</span>}
        </li>;
      })}</ul>)}</div>
    </div>
  </section>;
}

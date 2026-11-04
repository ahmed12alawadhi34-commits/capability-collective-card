import { useLang } from "@/lib/i18n";
import { useMarquee } from "@/lib/marquee";

const url = (slug: string, variant: "color" | "white") => `/media/partners/partner-${slug}-${variant}.png`;


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
    <h2 className="px-5 text-center text-2xl md:text-3xl font-bold">{t({ ar: "شركاء النجاح", en: "Partners of Success" })}</h2>
    <div className="partners-window mt-10" dir="ltr" aria-label={t({ ar: "شركاء النجاح", en: "Partners of Success" })}>
      <div ref={track} className="partners-track">{[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="partners-group">{partners.map((p) => {
        const src = p.slug ? url(p.slug, "color") : undefined;
        return <li key={p.name} className={`partner-item ${["yale", "assaabloy", "obeikan", "casma"].includes(p.slug ?? "") ? "partner-compact" : ""}`}>
          {src ? <img src={src} alt={copy === 1 ? "" : p.name} loading="lazy" decoding="async" draggable={false} className="partner-logo" /> : <span className="partner-name">{p.name}</span>}
        </li>;
      })}</ul>)}</div>
    </div>
  </section>;
}

import { useLang } from "@/lib/i18n";
import saintGobain from "@/assets/partners/saint-gobain.svg.asset.json";
import guardian from "@/assets/partners/guardianglass.svg.asset.json";
import sisecam from "@/assets/partners/sisecamflatglass.svg.asset.json";
import taiwan from "@/assets/partners/taiwanglass.svg.asset.json";
import obeikan from "@/assets/partners/obeikan.svg.asset.json";
import wacker from "@/assets/partners/wacker.svg.asset.json";
import dow from "@/assets/partners/dow.svg.asset.json";
import yale from "@/assets/partners/yale.svg.asset.json";
import assa from "@/assets/partners/assaabloy.svg.asset.json";
import alcobond from "@/assets/partners/alcobond.svg.asset.json";
import casma from "@/assets/partners/casma.svg.asset.json";
import speedy from "@/assets/partners/speedy.svg.asset.json";
import dormate from "@/assets/partners/dormate.svg.asset.json";
import hitech from "@/assets/partners/hi-tech.svg.asset.json";
import mrbuild from "@/assets/partners/mrbuild.svg.asset.json";

const partners: { name: string; logo?: string }[] = [
  { name: "Saint-Gobain", logo: saintGobain.url },
  { name: "Guardian Glass", logo: guardian.url },
  { name: "Şişecam", logo: sisecam.url },
  { name: "Taiwan Glass", logo: taiwan.url },
  { name: "Obeikan Glass", logo: obeikan.url },
  { name: "Wacker", logo: wacker.url },
  { name: "Dow", logo: dow.url },
  { name: "Yale", logo: yale.url },
  { name: "MAB – ASSA ABLOY", logo: assa.url },
  { name: "Alcobond", logo: alcobond.url },
  { name: "Casma", logo: casma.url },
  { name: "Speedy", logo: speedy.url },
  { name: "Dormate", logo: dormate.url },
  { name: "hi-tech", logo: hitech.url },
  { name: "Mr. Build", logo: mrbuild.url },
  { name: "Profilglass" },
];

export function PartnersStrip() {
  const { t } = useLang();
  return <section className="section-light py-16 overflow-hidden">
    <h2 className="px-5 text-center text-2xl md:text-3xl font-bold">{t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}</h2>
    <div className="partners-window mt-10" dir="ltr" tabIndex={0} aria-label={t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}>
      <div className="partners-track">{[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="partners-group">{partners.map((p) => <li key={p.name} className="partner-item">
        {p.logo ? <img src={p.logo} alt={copy === 1 ? "" : p.name} loading="lazy" decoding="async" draggable={false} className="partner-logo" /> : <span className="partner-name">{p.name}</span>}
      </li>)}</ul>)}</div>
    </div>
  </section>;
}

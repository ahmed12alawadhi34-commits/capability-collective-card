import { useLang } from "@/lib/i18n";
const partners = ["Saint-Gobain", "Guardian Glass", "Şişecam", "Taiwan Glass", "Obeikan Glass", "WACKER", "DOW", "Profilglass"];
export function PartnersStrip() {
  const { t } = useLang();
  return <section className="section-light py-16 overflow-hidden">
    <h2 className="px-5 text-center text-2xl md:text-3xl font-bold">{t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}</h2>
    <div className="partners-window mt-10" dir="ltr" tabIndex={0} aria-label={t({ ar: "شركاؤنا العالميون", en: "Our global partners" })}>
      <div className="partners-track">{[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="partners-group">{partners.map((p, i) => <li key={p} className={`partner-name partner-name-${i}`}>{p}</li>)}</ul>)}</div>
    </div>
  </section>;
}
import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, LogIn, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { nav, brand, STAFF_LOGIN, WHATSAPP, PHONES, EMAIL, address, contactReady } from "@/lib/content";
import logo from "@/assets/logo-white.png";
import mark from "@/assets/mark-white.png";
import { initSmoothScroll } from "@/lib/motion";
import { quoteUrl, visibleProduct } from "@/lib/whatsapp";

function Loader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setHide(true), 900);
    const b = setTimeout(() => setGone(true), 1600);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (gone) return null;
  return (
    <div className={`fixed inset-0 z-[100] grid place-items-center bg-night transition-opacity duration-700 ${hide ? "opacity-0 pointer-events-none" : ""}`}>
      <div className="shine p-6"><img src={logo} alt="" width={824} height={415} className="w-56" /></div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.12 });
    const scan = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => { initSmoothScroll(); }, []);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-night text-foreground">
      <Loader />
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "glass mx-3 mt-3 rounded-full lg:mx-auto lg:max-w-6xl" : ""}`}>
        <div className={`mx-auto max-w-7xl px-5 flex transition-all duration-500 ${scrolled ? "py-2" : "py-5"} items-center justify-between gap-4`}>
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <img src={mark} alt={t(brand)} width={388} height={191} className={`w-auto transition-all duration-500 ${scrolled ? "h-7" : "h-10"}`} />
            <span className="text-sm font-bold leading-tight hidden sm:block">{t(brand)}</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {nav.map((n) => (
              n.to === "/quote" ? <a key={n.to} href={quoteUrl(lang)} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.currentTarget.href = quoteUrl(lang, visibleProduct()); }} className="text-muted-foreground hover:text-foreground transition">{n[lang]}</a> : <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-foreground transition" activeProps={{ className: "!text-primary" }} activeOptions={{ exact: true }}>{n[lang]}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="glass rounded-full px-3 py-1.5 text-xs font-semibold">{lang === "ar" ? "EN" : "ع"}</button>
            <a href={STAFF_LOGIN} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1.5 text-xs text-primary hover:bg-primary/10">
              <LogIn size={14} /> {t({ ar: "دخول الموظفين", en: "Staff Login" })}
            </a>
            <button className="lg:hidden p-1" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
        {open && (
          <nav className="lg:hidden px-5 pb-5 flex flex-col">
            {nav.map((n) => (
              n.to === "/quote" ? <a key={n.to} href={quoteUrl(lang)} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.currentTarget.href = quoteUrl(lang, visibleProduct()); setOpen(false); }} className="py-3 border-b border-border">{n[lang]}</a> : <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 border-b border-border" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>{n[lang]}</Link>
            ))}
            <a href={STAFF_LOGIN} target="_blank" rel="noreferrer" className="py-3 text-primary flex items-center gap-2"><LogIn size={16} /> {t({ ar: "دخول الموظفين", en: "Staff Login" })}</a>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-night">
        <div className="mx-auto max-w-7xl px-5 py-14 grid gap-10 md:grid-cols-4 text-sm">
          <div className="md:col-span-2">
            <img src={logo} alt={t(brand)} width={824} height={415} loading="lazy" className="w-44" />
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">{t({ ar: "عضو في مجموعة العواضي للتجارة والصناعة — في تجارة الزجاج منذ 1974.", en: "Part of Al-Awadhi Group for Trading and Manufacturing — in the glass trade since 1974." })}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold mb-1">{t({ ar: "روابط", en: "Links" })}</p>
            {nav.map((n) => n.to === "/quote" ? <a key={n.to} href={quoteUrl(lang)} onClick={(e) => { e.currentTarget.href = quoteUrl(lang, visibleProduct()); }} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">{n[lang]}</a> : <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-foreground">{n[lang]}</Link>)}
            <Link to="/quote" className="text-primary">{t({ ar: "نموذج مواصفات الزجاج", en: "Glass specifications form" })}</Link>
          </div>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <p className="font-semibold mb-1 text-foreground">{t({ ar: "تواصل", en: "Contact" })}</p>
            <span className="flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5" />{t(address)}</span>
            {PHONES.map((p) =>
              contactReady ? (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex gap-2"><Phone size={16} /><span dir="ltr">{p}</span></a>
              ) : (
                <span key={p} className="flex gap-2"><Phone size={16} /><span dir="ltr">{p}</span></span>
              )
            )}
            {EMAIL && <a href={`mailto:${EMAIL}`} className="flex gap-2"><Mail size={16} />{EMAIL}</a>}
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Alawadhi for Glass Industry</div>
      </footer>

      {contactReady && (
        <a href={quoteUrl(lang)} onClick={(e) => { e.currentTarget.href = quoteUrl(lang, visibleProduct()); }} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="fixed bottom-5 end-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition">
          <MessageCircle size={26} />
        </a>
      )}
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-night pt-36 pb-16">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-xs tracking-[0.3em] uppercase text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-bold text-silver leading-tight">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">{children}</div>}
      </div>
    </section>
  );
}

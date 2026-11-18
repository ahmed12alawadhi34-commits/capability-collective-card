import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { nav, brand, PHONES, EMAIL, address, contactReady } from "@/lib/content";
import { applyPageSeo } from "@/lib/seo";
import logo from "@/assets/logo-white.png";
import mark from "@/assets/mark-white.png";
import { initSmoothScroll } from "@/lib/motion";
import { quoteUrl, visibleProduct } from "@/lib/whatsapp";
import { GoogleReviewsLink } from "@/components/GoogleReviewsLink";

function Loader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("aw-loader") === "1"; sessionStorage.setItem("aw-loader", "1"); } catch { seen = false; }
    if (seen) { setGone(true); return; }
    const a = setTimeout(() => setHide(true), 250);
    const b = setTimeout(() => setGone(true), 600);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (gone) return null;
  return (
    <div className={`loader-2026 ${hide ? "is-hidden" : ""}`}>
      <div className="loader-brand"><img src={logo} alt="" width={824} height={415} /><span /></div>
    </div>
  );
}

function UkFlag() {
  return <svg width="20" height="14" viewBox="0 0 60 42" aria-hidden="true" className="shrink-0 rounded-[3px]"><clipPath id="ukc"><rect width="60" height="42" rx="5" /></clipPath><g clipPath="url(#ukc)"><rect width="60" height="42" fill="#012169" /><path d="M0 0l60 42M60 0L0 42" stroke="#fff" strokeWidth="8" /><path d="M0 0l60 42M60 0L0 42" stroke="#C8102E" strokeWidth="3" /><path d="M30 0v42M0 21h60" stroke="#fff" strokeWidth="12" /><path d="M30 0v42M0 21h60" stroke="#C8102E" strokeWidth="7" /></g></svg>;
}

function YemenFlag() {
  return <svg width="20" height="14" viewBox="0 0 60 42" aria-hidden="true" className="shrink-0 rounded-[3px]"><clipPath id="yec"><rect width="60" height="42" rx="5" /></clipPath><g clipPath="url(#yec)"><rect width="60" height="14" fill="#CE1126" /><rect y="14" width="60" height="14" fill="#fff" /><rect y="28" width="60" height="14" fill="#000" /></g></svg>;
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in")), { threshold: 0.12 });
    const scan = () => document.querySelectorAll(".reveal:not(.in)").forEach((element) => io.observe(element));
    const timer = setTimeout(() => {
      scan();
      const observer = new MutationObserver(scan);
      observer.observe(document.body, { childList: true, subtree: true });
      cleanup = () => observer.disconnect();
    }, 150);
    let cleanup = () => {};
    return () => { clearTimeout(timer); cleanup(); io.disconnect(); };
  }, []);
}

function LangMeta() {
  const { lang } = useLang();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => { applyPageSeo(pathname, lang); }, [lang, pathname]);
  return null;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => { initSmoothScroll(); }, []);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-night text-foreground">
      <Loader />
      <LangMeta />
      <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
        <div className="site-header-inner">
          <Link to="/" onClick={() => setOpen(false)} className="site-brand" aria-label={t(brand)}>
            <img src={mark} alt="" width={388} height={191} />
            <span className="site-brand-copy"><strong>{t(brand)}</strong><small>GLASS INDUSTRIES · SANA'A</small></span>
          </Link>
          <nav className="site-nav" aria-label={t({ ar: "التنقل الرئيسي", en: "Main navigation" })}>
            {nav.map((item) => item.to === "/quote" ? (
              <a key={item.to} href={quoteUrl(lang)} target="_blank" rel="noopener noreferrer" onClick={(event) => { event.currentTarget.href = quoteUrl(lang, visibleProduct()); }} className="site-nav-link site-nav-quote">{item[lang]}</a>
            ) : (
              <Link key={item.to} to={item.to} className="site-nav-link" activeProps={{ className: "is-active" }} activeOptions={{ exact: true }}>{item[lang]}</Link>
            ))}
          </nav>
          <div className="site-header-actions">
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"} className="language-switch">
              {lang === "ar" ? <UkFlag /> : <YemenFlag />}<span lang={lang === "ar" ? "en" : "ar"}>{lang === "ar" ? "English" : "عربي"}</span>
            </button>
            <button className="menu-switch" aria-label={t({ ar: "القائمة", en: "Menu" })} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
          </div>
        </div>
        {open && (
          <nav className="site-mobile-nav" aria-label={t({ ar: "قائمة الجوال", en: "Mobile navigation" })}>
            {nav.map((item, index) => item.to === "/quote" ? (
              <a key={item.to} href={quoteUrl(lang)} target="_blank" rel="noopener noreferrer" onClick={(event) => { event.currentTarget.href = quoteUrl(lang, visibleProduct()); setOpen(false); }}><span>{String(index + 1).padStart(2, "0")}</span>{item[lang]}</a>
            ) : (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} activeProps={{ className: "is-active" }} activeOptions={{ exact: true }}><span>{String(index + 1).padStart(2, "0")}</span>{item[lang]}</Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="site-footer">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <img src={logo} alt={t(brand)} width={824} height={415} loading="lazy" />
            <p>{t({ ar: "عضو في مجموعة العواضي للتجارة والصناعة — في تجارة الزجاج منذ 1974.", en: "Part of Al-Awadhi Group for Trading and Manufacturing — in the glass trade since 1974." })}</p>
            <span>PRECISION GLASS · MADE IN YEMEN</span>
          </div>
          <div className="site-footer-column">
            <p className="site-footer-title">{t({ ar: "استكشف", en: "Explore" })}</p>
            {nav.map((item) => item.to === "/quote" ? <a key={item.to} href={quoteUrl(lang)} onClick={(event) => { event.currentTarget.href = quoteUrl(lang, visibleProduct()); }} target="_blank" rel="noopener noreferrer">{item[lang]}</a> : <Link key={item.to} to={item.to}>{item[lang]}</Link>)}
            <Link to="/quote" className="footer-form-link">{t({ ar: "نموذج مواصفات الزجاج", en: "Glass specifications form" })}</Link>
          </div>
          <div className="site-footer-column site-footer-contact">
            <p className="site-footer-title">{t({ ar: "تواصل معنا", en: "Contact us" })}</p>
            <span className="flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5" />{t(address)}</span>
            {PHONES.map((phone) => contactReady ? <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="flex gap-2"><Phone size={16} /><span dir="ltr">{phone}</span></a> : <span key={phone} className="flex gap-2"><Phone size={16} /><span dir="ltr">{phone}</span></span>)}
            {EMAIL && <a href={`mailto:${EMAIL}`} className="flex gap-2"><Mail size={16} />{EMAIL}</a>}
            <GoogleReviewsLink className="mt-2 self-start" />
          </div>
        </div>
        <div className="site-footer-bottom"><span>© {new Date().getFullYear()} Al-Awadhi for Glass Industry</span><span>SANA'A · YEMEN</span></div>
      </footer>

      {contactReady && <a href={quoteUrl(lang)} onClick={(event) => { event.currentTarget.href = quoteUrl(lang, visibleProduct()); }} target="_blank" rel="noopener noreferrer" aria-label={t({ ar: "واتساب", en: "WhatsApp" })} className="whatsapp-fab"><MessageCircle size={25} /></a>}
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid" aria-hidden />
      <div className="page-hero-watermark" aria-hidden>AW / 2026</div>
      <div className="page-hero-content">
        <p className="section-eyebrow"><span aria-hidden />{eyebrow}</p>
        <h1>{title}</h1>
        {children && <div className="page-hero-description">{children}</div>}
      </div>
    </section>
  );
}

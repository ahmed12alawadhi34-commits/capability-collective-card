import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { nav, groupName } from "@/lib/content";

export function SiteShell({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-sm bg-brand font-display text-lg font-bold">A</span>
            <span className="font-display text-sm font-semibold leading-tight max-w-[14rem]">{t(groupName)}</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-5 text-sm">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100 transition" activeProps={{ className: "opacity-100 text-accent" }} activeOptions={{ exact: true }}>
                {n[lang]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="rounded-sm border border-primary-foreground/30 px-3 py-1 text-xs font-semibold hover:bg-primary-foreground/10">
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <button className="lg:hidden p-1" aria-label="Menu" onClick={() => setOpen(!open)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="lg:hidden border-t border-primary-foreground/15 px-5 py-3 flex flex-col">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 border-b border-primary-foreground/10 last:border-0" activeProps={{ className: "text-accent" }} activeOptions={{ exact: true }}>
                {n[lang]}
              </Link>
            ))}
          </nav>
        )}
        <div className="h-1 bg-brand" />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-primary text-primary-foreground">
        <div className="h-1 bg-brand" />
        <div className="mx-auto max-w-6xl px-5 py-10 grid gap-6 md:grid-cols-3 text-sm">
          <div>
            <p className="font-display font-semibold">{t(groupName)}</p>
            <p className="opacity-70 mt-2">{t({ ar: "منذ 1974 — اليمن · السعودية · عُمان", en: "Since 1974 — Yemen · Saudi Arabia · Oman" })}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 opacity-80 md:col-span-2">
            {nav.map((n) => <Link key={n.to} to={n.to}>{n[lang]}</Link>)}
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-brand text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <p className="text-xs tracking-[0.25em] uppercase opacity-80">{eyebrow}</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">{title}</h1>
        {children && <div className="mt-4 max-w-2xl opacity-90 leading-relaxed">{children}</div>}
      </div>
    </section>
  );
}

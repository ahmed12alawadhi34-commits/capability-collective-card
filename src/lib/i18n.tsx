import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: <T>(v: { ar: T; en: T }) => T };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (l: Lang) => {
    localStorage.setItem("lang", l);
    setLangState(l);
  };
  return (
    <LangContext.Provider value={{ lang, setLang, t: (v) => v[lang] }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang outside provider");
  return c;
}

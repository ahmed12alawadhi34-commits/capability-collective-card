import groupLogoColor from "@/assets/companies/group.webp";
import groupLogoWhite from "@/assets/companies/group-white.png.asset.json";
import trading from "@/assets/companies/trading.webp";
import tradingWhite from "@/assets/companies/trading-white.png.asset.json";
import aden from "@/assets/companies/aden.webp";
import adenWhite from "@/assets/companies/aden-white.png.asset.json";
import cd from "@/assets/companies/cd.webp";
import cdWhite from "@/assets/companies/cd-white.png.asset.json";
import oman from "@/assets/companies/oman.webp";
import saudi from "@/assets/companies/saudi.webp";
import saudiWhite from "@/assets/companies/saudi-white.png.asset.json";

/** Group logo shown on dark backgrounds (white version reads better on navy). */
export const groupLogo = groupLogoWhite.url;

export type L = { ar: string; en: string };
export type Company = { name: L; city: L; since: number; desc?: L; url?: string; logo?: string; here?: boolean };

const countries: { flag: string; name: L; companies: Company[] }[] = [
  { flag: "🇾🇪", name: { ar: "اليمن", en: "Yemen" }, companies: [
    { name: { ar: "العواضي للتجارة المحدودة", en: "AL-AWADHI TRADING CO. LTD" }, city: { ar: "صنعاء", en: "Sana'a" }, since: 1974, desc: { ar: "الزجاج ومواد البناء والوكالات الحصرية", en: "Glass & building materials, exclusive agencies" }, url: "https://www.yemenglass.com", logo: tradingWhite.url },
    { name: { ar: "العواضي للزجاج والتجارة", en: "Al-Awadhi Glass and Trading" }, city: { ar: "عدن", en: "Aden" }, since: 1974, desc: { ar: "الزجاج والتجارة – جنوب اليمن", en: "Glass & trading – southern Yemen" }, logo: adenWhite.url },
    { name: { ar: "البناء والتعمير للتجارة", en: "Construction & Development for Trading" }, city: { ar: "صنعاء", en: "Sana'a" }, since: 2008, desc: { ar: "تجارة مواد البناء والأدوات", en: "Building materials & hardware trading" }, url: "https://www.cdfortrading.com", logo: cdWhite.url },
  ] },
  { flag: "🇴🇲", name: { ar: "عُمان", en: "Oman" }, companies: [
    { name: { ar: "شركة العواضي للتجارة والوكالات", en: "Al-Awadhi Trading and Agencies Company" }, city: { ar: "مسقط", en: "Muscat" }, since: 2018, desc: { ar: "التجارة والوكالات في سلطنة عُمان", en: "Trading & agencies in Oman" }, url: "https://www.alawadhiom.com", logo: oman },
  ] },
  { flag: "🇸🇦", name: { ar: "السعودية", en: "Saudi Arabia" }, companies: [
    { name: { ar: "شركة العواضي التجارية", en: "Al-Awadhi Trading Company" }, city: { ar: "الرياض", en: "Riyadh" }, since: 2024, desc: { ar: "التجارة ومواد البناء في السعودية", en: "Trading & building materials in Saudi Arabia" }, url: "https://www.alawadhi.sa", logo: saudiWhite.url },
  ] },
];

export const companies = countries.flatMap((country) => country.companies.map((c) => ({ ...c, country: country.name, flag: country.flag })));

// Keep the original colour files referenced so they stay in the bundle for light surfaces.
void groupLogoColor; void trading; void aden; void cd; void saudi;

import { readFileSync, writeFileSync } from "node:fs";

export function generateSeo() {
  const source = readFileSync(new URL("../src/lib/seo.ts", import.meta.url), "utf8");
  const origin = source.match(/export const SITE_URL = "(https:\/\/[^"\s]+)"/)?.[1];
  if (!origin) throw new Error("SITE_URL must contain the production HTTPS origin in src/lib/seo.ts");
  const excluded = [...(source.match(/export const NOINDEX_PATHS = \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map(match => match[1]);
  const paths = [...source.matchAll(/^  "(\/[^\"]*)": \{/gm)].map(match => match[1]).filter(path => !excluded.includes(path));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${origin}${path}</loc></url>`).join("\n")}\n</urlset>\n`;
  writeFileSync(new URL("../public/sitemap.xml", import.meta.url), sitemap);
  const robotsPath = new URL("../public/robots.txt", import.meta.url);
  const robots = readFileSync(robotsPath, "utf8").replace(/^Sitemap:.*$/gm, `Sitemap: ${origin}/sitemap.xml`);
  writeFileSync(robotsPath, robots);
}

generateSeo();
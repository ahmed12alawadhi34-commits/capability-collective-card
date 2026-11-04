import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { lineSteps } from "@/components/ProductionLine";
import { pageSeo, SITE_URL } from "@/lib/seo";

describe("final update rules", () => {
  it("removes the staff login and its server IP from the source", () => {
    const files = ["src/lib/content.ts", "src/components/SiteShell.tsx"];
    for (const f of files) {
      const src = readFileSync(f, "utf8");
      expect(src).not.toContain("STAFF_LOGIN");
      expect(src).not.toContain("132.145");
    }
  });
  it("has exactly nine bilingual production steps with descriptions and specs", () => {
    expect(lineSteps).toHaveLength(9);
    for (const s of lineSteps) {
      expect(s.name.ar.length).toBeGreaterThan(0);
      expect(s.name.en.length).toBeGreaterThan(0);
      expect(s.desc.ar.length).toBeGreaterThan(0);
      expect(s.spec.ar.length).toBeGreaterThan(0);
      expect(s.spec.en.length).toBeGreaterThan(0);
    }
  });
  it("serves a sitemap with indexed pages under the single SITE_URL origin", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    for (const p of ["/", "/about", "/products", "/quote", "/contact"]) {
      expect(sitemap).toContain(`${SITE_URL}${p}`);
    }
    expect(sitemap).not.toContain(`${SITE_URL}/projects`);
    expect(readFileSync("public/robots.txt", "utf8")).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
  it("has bilingual titles and descriptions for every page", () => {
    for (const p of ["/", "/about", "/products", "/quote", "/contact", "/projects"]) {
      const seo = pageSeo[p];
      expect(seo, p).toBeDefined();
      expect(seo!.title.ar).not.toBe(seo!.title.en);
      expect(seo!.description.ar.length).toBeGreaterThan(0);
      expect(seo!.description.en.length).toBeGreaterThan(0);
    }
  });
});

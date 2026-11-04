import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { comparisonPair } from "@/lib/glass-comparison";
import { SITE_URL } from "@/lib/seo";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap(name => { const path = join(dir, name); return statSync(path).isDirectory() ? files(path) : [path]; });
}

describe("independent hosting and comparison rules", () => {
  it("compares Ordinary with Tempered by default", () => expect(comparisonPair("ordinary")).toEqual(["ordinary", "tempered"]));
  it("keeps the original comparison when Tempered is selected", () => expect(comparisonPair("tempered")).toEqual(["ordinary", "tempered"]));
  it("compares Tempered with Laminated when Laminated is selected", () => expect(comparisonPair("laminated")).toEqual(["tempered", "laminated"]));
  it("uses the owner's independent domain", () => expect(SITE_URL).toBe("https://alawadhi-ind.com"));
  it("includes all 60 original CDN media files locally with no remaining pointers", () => {
    expect(files("public/media")).toHaveLength(60);
    expect(files("src").filter(path => path.endsWith(".asset.json"))).toEqual([]);
    for (const path of files("public/media")) expect(statSync(path).size, path).toBeGreaterThan(0);
  });
  it("has no hosted-editor URL in app source or public text files", () => {
    const forbidden = ["__" + "l5e", "lovable" + ".app", "lovable" + ".dev"];
    for (const path of [...files("src"), ...files("public")].filter(path => /\.(tsx?|css|xml|txt|json)$/.test(path) && !path.includes("/test/"))) {
      const text = readFileSync(path, "utf8");
      for (const value of forbidden) expect(text, path).not.toContain(value);
    }
  });
});
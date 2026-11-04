import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { glassOrder, INITIAL_BOUNDARIES, moveBoundary } from "@/lib/glass-comparison";
import { SITE_URL } from "@/lib/seo";
import { ASSEMBLY_DURATION } from "@/lib/layer-scroll";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap(name => { const path = join(dir, name); return statSync(path).isDirectory() ? files(path) : [path]; });
}

describe("independent hosting and comparison rules", () => {
  it("plays assembly in three seconds without depending on viewport distance", () => expect(ASSEMBLY_DURATION).toBe(3));
  it("starts the three images in equal thirds", () => expect(INITIAL_BOUNDARIES).toEqual([100 / 3, 200 / 3]));
  it("puts Ordinary on the right in Arabic", () => expect(glassOrder("ar")).toEqual(["laminated", "tempered", "ordinary"]));
  it("puts Ordinary on the left in English", () => expect(glassOrder("en")).toEqual(["ordinary", "tempered", "laminated"]));
  it("moves both boundaries independently without crossing", () => { expect(moveBoundary([33, 66], 0, 44)).toEqual([44, 66]); expect(moveBoundary([33, 66], 1, 75)).toEqual([33, 75]); expect(moveBoundary([33, 66], 0, 90)).toEqual([54, 66]); });
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
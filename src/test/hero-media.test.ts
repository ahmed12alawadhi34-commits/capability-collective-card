import { describe, expect, it } from "vitest";
import { statSync } from "node:fs";

describe("hero image size limit", () => {
  it("keeps the hero photos light (each at or below 250 KB)", () => {
    for (const file of ["public/media/images/hero-furnace.webp", "public/media/images/hero-furnace-sm.webp"]) {
      const bytes = statSync(file).size;
      expect(bytes).toBeGreaterThan(0);
      expect(bytes).toBeLessThanOrEqual(250_000);
    }
  });
});

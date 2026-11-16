import { describe, expect, it } from "vitest";
import { statSync } from "node:fs";

describe("hero video size limit", () => {
  it("keeps the mobile hero video at or below 1 MB", () => {
    const bytes = statSync("public/media/videos/factory-hero-mobile-v4.mp4").size;
    expect(bytes).toBeGreaterThan(0);
    expect(bytes).toBeLessThanOrEqual(1_000_000);
  });
});
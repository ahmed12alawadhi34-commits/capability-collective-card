import { describe, expect, it } from "vitest";
import { nav } from "@/lib/content";

describe("Project gallery preparation", () => {
  it("excludes the unfinished projects page from shared navigation", () => {
    expect(nav.map((item) => item.to)).not.toContain("/projects");
    expect(nav.map((item) => item.to)).toContain("/products");
    expect(nav.map((item) => item.to)).toContain("/quote");
  });
});
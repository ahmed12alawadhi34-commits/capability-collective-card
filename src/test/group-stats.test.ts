import { describe, expect, it } from "vitest";
import { groupStats } from "@/lib/content";

describe("group facts", () => {
  it("has six companies", () => expect(groupStats.companies).toBe(6));
  it("operates in three countries", () => expect(groupStats.countries).toBe(3));
  it("has more than fifty years in glass", () => {
    expect(groupStats.glassExperienceYears).toBe(50);
    expect(groupStats.moreThan).toBe(true);
  });
});
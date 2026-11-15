import { describe, expect, it } from "vitest";
import { responseTime } from "@/lib/content";

describe("quote response policy", () => {
  it("promises a response within one hour", () => {
    expect(responseTime.maxHours).toBe(1);
  });
  it("limits the response promise to working hours", () => {
    expect(responseTime.workingHoursOnly).toBe(true);
  });
});
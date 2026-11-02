import { describe, expect, it, vi } from "vitest";
import { companies } from "@/lib/companies";
import { history } from "@/lib/history";
import { marqueeDuration } from "@/lib/marquee";
import { watchVideoInteraction } from "@/lib/video-interaction";

describe("requested presentation rules", () => {
  it("lists five other companies in their original order, excluding the factory", () => {
    expect(companies.map(c => c.since)).toEqual([1974, 1974, 2008, 2018, 2024]);
    expect(companies.some(c => c.here || c.since === 2021)).toBe(false);
  });
  it("does not invent a website for Aden", () => expect(companies.find(c => c.city.en === "Aden")?.url).toBeUndefined());
  it("retains all six historical milestones", () => expect(history.map(p => p.year)).toEqual([1955, 1974, 2008, 2018, 2021, 2024]));
  it("keeps partners moving more slowly with reduced motion", () => { expect(marqueeDuration(38, false)).toBe(38); expect(marqueeDuration(38, true)).toBeCloseTo(60.8); });
  it("keeps products moving more slowly with reduced motion", () => { expect(marqueeDuration(30, false)).toBe(30); expect(marqueeDuration(30, true)).toBe(48); });
  it("retries blocked playback on touch and scroll and removes listeners when unmounted", () => {
    const retry = vi.fn(); const stop = watchVideoInteraction(retry);
    window.dispatchEvent(new Event("touchstart")); window.dispatchEvent(new Event("scroll")); expect(retry).toHaveBeenCalledTimes(2);
    stop(); window.dispatchEvent(new Event("touchstart")); expect(retry).toHaveBeenCalledTimes(2);
  });
});

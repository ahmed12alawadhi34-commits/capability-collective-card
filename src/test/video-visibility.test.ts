import { expect, it, vi } from "vitest";
import { watchVideoVisibility } from "@/lib/video-visibility";

it("plays only the most visible section and pauses all sections off screen", () => {
  let update: ((entries: Partial<IntersectionObserverEntry>[]) => void) | undefined;
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: typeof update) { update = callback; }
    observe() {}
    unobserve() {}
    disconnect() {}
  });
  const hero = document.createElement("div"), lower = document.createElement("div");
  const heroChange = vi.fn(), lowerChange = vi.fn();
  const stopHero = watchVideoVisibility(hero, heroChange);
  const stopLower = watchVideoVisibility(lower, lowerChange);
  update?.([{ target: hero, isIntersecting: true, intersectionRatio: 0.9 }, { target: lower, isIntersecting: true, intersectionRatio: 0.2 }]);
  expect(heroChange).toHaveBeenLastCalledWith(true);
  expect(lowerChange).toHaveBeenLastCalledWith(false);
  update?.([{ target: hero, isIntersecting: true, intersectionRatio: 0.1 }, { target: lower, isIntersecting: true, intersectionRatio: 0.8 }]);
  expect(heroChange).toHaveBeenLastCalledWith(false);
  expect(lowerChange).toHaveBeenLastCalledWith(true);
  update?.([{ target: hero, isIntersecting: false, intersectionRatio: 0 }, { target: lower, isIntersecting: false, intersectionRatio: 0 }]);
  expect(heroChange).toHaveBeenLastCalledWith(false);
  expect(lowerChange).toHaveBeenLastCalledWith(false);
  stopHero(); stopLower(); vi.unstubAllGlobals();
});
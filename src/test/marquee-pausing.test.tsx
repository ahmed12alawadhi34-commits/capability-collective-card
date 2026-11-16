import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMarquee } from "@/lib/marquee";

/** 10s loop, left direction, 1.8s touch pause; the duplicated list is what the track scrolls. */
function Strip() {
  const { root, track } = useMarquee(10, "left", 1800);
  return <section ref={root}><div ref={track}><ul /><ul /></div></section>;
}

class FakeIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) { this.callback = callback; }
  observe(target: Element) { this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
  unobserve() {}
  disconnect() {}
}
class FakeResizeObserver {
  constructor(private render: () => void) {}
  observe() { this.render(); }
  unobserve() {}
  disconnect() {}
}

const pointer = (type: string, name = "pointerdown") => {
  const event = new Event(name, { bubbles: true });
  Object.defineProperty(event, "pointerType", { value: type });
  return event;
};

describe("marquee never pauses", () => {
  let section: HTMLElement, track: HTMLElement;
  /** Distance travelled from the strip's start, in px (half the 400px track is one loop). */
  const travelled = () => Math.abs(Number(/translate3d\((-?[\d.]+)px/.exec(track.style.transform)?.[1] ?? 0));

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    vi.stubGlobal("ResizeObserver", FakeResizeObserver);
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", { configurable: true, get: () => 400 });
    const { container } = render(<Strip />);
    section = container.querySelector("section")!;
    track = container.querySelector("div")!;
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("keeps scrolling when a finger tap focuses the strip", () => {
    section.dispatchEvent(new Event("focusin", { bubbles: true }));
    vi.advanceTimersByTime(1000);
    expect(travelled()).toBeGreaterThan(10);
  });

  it("never stops when a finger taps the strip", () => {
    section.dispatchEvent(pointer("touch"));
    vi.advanceTimersByTime(500);
    expect(travelled()).toBeGreaterThan(5);
  });

  it("never stops while a mouse hovers the strip", () => {
    section.dispatchEvent(pointer("mouse", "pointerenter"));
    vi.advanceTimersByTime(1000);
    expect(travelled()).toBeGreaterThan(10);
  });
});

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Call from useEffect only. Sets up Lenis smooth scroll synced to ScrollTrigger once. */
export function initSmoothScroll() {
  gsap.registerPlugin(ScrollTrigger);
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };

/**
 * Safety net for entrance tweens that start at opacity 0: once an element enters
 * the viewport, force it visible after 1.5s so jumps or fast scrolls never leave it hidden.
 */
export function ensureVisible(targets: Iterable<Element> | ArrayLike<Element>, delay = 1500) {
  const els = Array.from(targets as ArrayLike<Element>);
  const timers: ReturnType<typeof setTimeout>[] = [];
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    timers.push(setTimeout(() => {
      const el = e.target as HTMLElement;
      if (parseFloat(getComputedStyle(el).opacity) < 1) gsap.set(el, { opacity: 1, clearProps: "transform" });
    }, delay));
  }));
  els.forEach((el) => io.observe(el));
  return () => { io.disconnect(); timers.forEach(clearTimeout); };
}

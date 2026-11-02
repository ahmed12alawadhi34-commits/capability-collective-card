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

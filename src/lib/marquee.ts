import { useEffect, useRef } from "react";

export const marqueeDuration = (seconds: number, reduced: boolean) => reduced ? seconds * 1.6 : seconds;

/** JavaScript transforms keep core content moving even when CSS animations are suppressed. */
export function useMarquee(seconds: number, direction: "left" | "right", touchPause: number) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = root.current, element = track.current;
    if (!section || !element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false, hovered = false, pausedUntil = 0, progress = 0, last = 0, frame = 0;
    const render = () => {
      const width = element.scrollWidth / 2;
      element.style.transform = `translate3d(${direction === "left" ? -progress * width : (progress - 1) * width}px,0,0)`;
    };
    const tick = (now: number) => {
      const delta = last ? Math.min(now - last, 64) : 0; last = now;
      if (visible && !hovered && now >= pausedUntil && !document.hidden) {
        progress = (progress + delta / (marqueeDuration(seconds, media.matches) * 1000)) % 1;
        render();
      }
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => { visible = !!entry?.isIntersecting; }, { threshold: .1 });
    io.observe(section);
    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") hovered = true; };
    const leave = () => { hovered = false; };
    const touch = (e: PointerEvent) => { if (e.pointerType !== "mouse") pausedUntil = performance.now() + touchPause; };
    section.addEventListener("pointerenter", enter); section.addEventListener("pointerleave", leave);
    section.addEventListener("pointerdown", touch);
    const resize = new ResizeObserver(render); resize.observe(element); render(); frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); io.disconnect(); resize.disconnect(); section.removeEventListener("pointerenter", enter); section.removeEventListener("pointerleave", leave); section.removeEventListener("pointerdown", touch); };
  }, [seconds, direction, touchPause]);
  return { root, track };
}

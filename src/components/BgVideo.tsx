import { useEffect, useRef } from "react";

/** Muted looping video; light file on small screens, poster until ready, pauses when off screen. */
export function BgVideo({ desktop, mobile, poster, className = "", preload = "auto" }: { desktop: string; mobile: string; poster: string; className?: string; preload?: "auto" | "metadata" }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.src = window.matchMedia("(max-width: 767px)").matches ? mobile : desktop;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.05 });
    io.observe(v);
    return () => io.disconnect();
  }, [desktop, mobile]);
  return <video ref={ref} poster={poster} muted loop playsInline preload={preload} aria-hidden className={`h-full w-full object-cover ${className}`} />;
}

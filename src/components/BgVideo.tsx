import { useEffect, useRef } from "react";

/** Muted looping video; picks the light file on small screens, shows poster until ready. */
export function BgVideo({ desktop, mobile, poster, className = "" }: { desktop: string; mobile: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.src = window.matchMedia("(max-width: 767px)").matches ? mobile : desktop;
    v.play().catch(() => {});
  }, [desktop, mobile]);
  return <video ref={ref} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden className={`h-full w-full object-cover ${className}`} />;
}

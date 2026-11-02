import { useEffect, useRef } from "react";
import { watchVideoVisibility } from "@/lib/video-visibility";

/** Muted looping video; light file on small screens, poster until ready, pauses when off screen. */
export function BgVideo({ desktop, mobile, poster, className = "", preload = "auto" }: { desktop: string; mobile: string; poster: string; className?: string; preload?: "auto" | "metadata" }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = 1;
    return watchVideoVisibility(v, (onScreen) => {
      if (onScreen) {
        const src = window.matchMedia("(max-width: 767px)").matches ? mobile : desktop;
        if (v.getAttribute("src") !== src) v.src = src;
        v.play().catch(() => {});
      } else v.pause();
    });
  }, [desktop, mobile]);
  return <video ref={ref} poster={poster} muted loop playsInline preload={preload} aria-hidden className={`h-full w-full object-cover ${className}`} />;
}

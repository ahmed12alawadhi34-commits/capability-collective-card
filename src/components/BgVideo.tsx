import { useEffect, useRef } from "react";
import { playVideo, playWhenReady, watchVideoInteraction } from "@/lib/video-interaction";
import { watchVideoVisibility } from "@/lib/video-visibility";

/** Muted looping video; light file on small screens, poster until ready, pauses when off screen. */
export function BgVideo({ desktop, mobile, poster, className = "", preload = "auto" }: { desktop: string; mobile: string; poster: string; className?: string; preload?: "auto" | "metadata" }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = 1;
    let visible = false;
    const stopReady = playWhenReady(v);
    const stopInteraction = watchVideoInteraction(() => { if (visible) playVideo(v); });
    const stopVisibility = watchVideoVisibility(v, (onScreen) => {
      visible = onScreen;
      if (onScreen) {
        const src = window.matchMedia("(max-width: 767px)").matches ? mobile : desktop;
        if (v.getAttribute("src") !== src) v.src = src;
        playVideo(v);
      } else v.pause();
    });
    return () => { stopReady(); stopInteraction(); stopVisibility(); };
  }, [desktop, mobile]);
  return <video ref={ref} poster={poster} autoPlay muted loop playsInline preload={preload} aria-hidden className={`h-full w-full object-cover ${className}`} />;
}

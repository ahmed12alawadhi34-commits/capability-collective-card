import { useEffect, useRef, useState } from "react";
import { playVideo, playWhenReady, watchVideoInteraction } from "@/lib/video-interaction";
import { watchVideoVisibility } from "@/lib/video-visibility";

type Clip = { desktop: string; mobile: string; poster: string; label?: string };

/** Plays clips one after another with a crossfade, loops, and pauses off screen. */
export function SequenceVideo({ clips, preload = "metadata", fit = "cover" }: { clips: Clip[]; preload?: "auto" | "metadata"; fit?: "cover" | "contain" }) {
  const wrap = useRef<HTMLDivElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const visible = useRef(false);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)").matches;
    const element = wrap.current;
    if (!element) return;
    const stopReady = vids.current.map((v) => (v ? playWhenReady(v) : () => {}));
    const stopInteraction = watchVideoInteraction(() => {
      if (visible.current) { const v = vids.current[activeRef.current]; if (v) playVideo(v); }
    });
    const stopVisibility = watchVideoVisibility(element, (onScreen) => {
      visible.current = onScreen;
      if (onScreen) vids.current.forEach((v, i) => { const clip = clips[i]; if (v && clip) { const src = small ? clip.mobile : clip.desktop; if (v.getAttribute("src") !== src) v.src = src; v.playbackRate = 1; } });
      vids.current.forEach((v, i) => { if (!v) return; if (visible.current && i === activeRef.current) playVideo(v); else v.pause(); });
    });
    return () => { stopReady.forEach((s) => s()); stopInteraction(); stopVisibility(); };
  }, [clips]);

  const activeRef = useRef(0);
  useEffect(() => {
    activeRef.current = active;
    vids.current.forEach((video, i) => { if (i !== active) video?.pause(); });
    const v = vids.current[active];
    if (v && visible.current) { v.currentTime = 0; playVideo(v); }
  }, [active]);

  const next = (i: number) => { if (i === activeRef.current) setActive((i + 1) % clips.length); };
  const nearEnd = (i: number, v: HTMLVideoElement) => {
    // start next clip slightly early so the crossfade overlaps
    if (i === activeRef.current && v.duration && v.duration - v.currentTime < 0.7) {
      const n = (i + 1) % clips.length, nv = vids.current[n];
      if (nv && nv.paused && visible.current) { nv.currentTime = 0; playVideo(nv); }
    }
  };

  return (
    <div ref={wrap} className="absolute inset-0">
      {clips.map((c, i) => (
        <video key={i} ref={(el) => { vids.current[i] = el; }} poster={c.poster} autoPlay muted playsInline preload={preload} aria-hidden
          onEnded={() => next(i)} onTimeUpdate={(e) => nearEnd(i, e.currentTarget)}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${fit === "cover" ? "object-cover" : "object-contain"} ${i === active ? "opacity-100" : "opacity-0"}`} />
      ))}
      {clips.some((c) => c.label) && <div className="absolute bottom-4 inset-x-0 z-10 flex justify-center gap-2">
        {clips.map((c, i) => (
          <button key={i} type="button" aria-pressed={i === active} onClick={() => setActive(i)}
            className={`video-label cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-500 ${i === active ? "text-primary border-primary/60" : "text-muted-foreground hover:text-foreground"}`}>{c.label}</button>
        ))}
      </div>}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

type Clip = { desktop: string; mobile: string; poster: string; label: string };

/** Plays clips one after another with a crossfade, loops, and pauses off screen. */
export function SequenceVideo({ clips }: { clips: Clip[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const visible = useRef(false);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)").matches;
    vids.current.forEach((v, i) => { if (v) v.src = small ? clips[i]!.mobile : clips[i]!.desktop; });
    const io = new IntersectionObserver(([e]) => {
      visible.current = !!e?.isIntersecting;
      vids.current.forEach((v, i) => { if (!v) return; if (visible.current && i === activeRef.current) v.play().catch(() => {}); else v.pause(); });
    }, { threshold: 0.1 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, [clips]);

  const activeRef = useRef(0);
  useEffect(() => {
    activeRef.current = active;
    const v = vids.current[active];
    if (v && visible.current) { v.currentTime = 0; v.play().catch(() => {}); }
  }, [active]);

  const next = (i: number) => { if (i === activeRef.current) setActive((i + 1) % clips.length); };
  const nearEnd = (i: number, v: HTMLVideoElement) => {
    // start next clip slightly early so the crossfade overlaps
    if (i === activeRef.current && v.duration && v.duration - v.currentTime < 0.7) {
      const n = (i + 1) % clips.length, nv = vids.current[n];
      if (nv && nv.paused && visible.current) { nv.currentTime = 0; nv.play().catch(() => {}); }
    }
  };

  return (
    <div ref={wrap} className="absolute inset-0">
      {clips.map((c, i) => (
        <video key={i} ref={(el) => { vids.current[i] = el; }} poster={c.poster} muted playsInline preload="metadata" aria-hidden
          onEnded={() => next(i)} onTimeUpdate={(e) => nearEnd(i, e.currentTarget)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${i === active ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div className="absolute bottom-5 inset-x-0 z-10 flex justify-center gap-2">
        {clips.map((c, i) => (
          <span key={i} className={`glass rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-500 ${i === active ? "text-primary" : "text-muted-foreground"}`}>{c.label}</span>
        ))}
      </div>
    </div>
  );
}

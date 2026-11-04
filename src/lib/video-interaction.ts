/** Retry synchronously inside a user gesture; the caller preserves visibility ownership. */
export function watchVideoInteraction(retry: () => void) {
  const events = ["touchstart", "pointerdown", "scroll", "keydown"] as const;
  events.forEach((event) => window.addEventListener(event, retry, { passive: true }));
  return () => events.forEach((event) => window.removeEventListener(event, retry));
}

/** iOS Safari blocks autoplay unless muted is set as a property AND attribute before play(). */
export function primeVideo(v: HTMLVideoElement) {
  v.muted = true;
  v.defaultMuted = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "");
}

/** Prime then play; retry once after 300ms if the first attempt is rejected. */
export function playVideo(v: HTMLVideoElement) {
  primeVideo(v);
  const p = v.play();
  if (p) p.catch(() => setTimeout(() => { primeVideo(v); v.play().catch(() => {}); }, 300));
}

/** Play again when data is ready (keeps the poster until the first frame). */
export function playWhenReady(v: HTMLVideoElement) {
  const onReady = () => { if (!v.paused) return; playVideo(v); };
  v.addEventListener("loadeddata", onReady);
  v.addEventListener("canplay", onReady);
  return () => { v.removeEventListener("loadeddata", onReady); v.removeEventListener("canplay", onReady); };
}

/** Retry synchronously inside a user gesture; the caller preserves visibility ownership. */
export function watchVideoInteraction(retry: () => void) {
  const events = ["touchstart", "pointerdown", "scroll", "keydown"] as const;
  events.forEach((event) => window.addEventListener(event, retry, { passive: true }));
  return () => events.forEach((event) => window.removeEventListener(event, retry));
}

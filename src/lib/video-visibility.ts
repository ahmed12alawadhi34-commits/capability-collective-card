type Entry = { element: Element; onChange: (active: boolean) => void; ratio: number };
const entries = new Map<Element, Entry>();
let observer: IntersectionObserver | undefined;

export function watchVideoVisibility(element: Element, onChange: (active: boolean) => void) {
  if (!observer) observer = new IntersectionObserver((changes) => {
    changes.forEach((change) => {
      const entry = entries.get(change.target);
      if (entry) entry.ratio = change.isIntersecting ? change.intersectionRatio : 0;
    });
    let winner: Entry | undefined;
    entries.forEach((entry) => { if (entry.ratio > (winner?.ratio ?? 0)) winner = entry; });
    entries.forEach((entry) => entry.onChange(entry === winner));
  }, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) });
  entries.set(element, { element, onChange, ratio: 0 });
  observer.observe(element);
  return () => {
    observer?.unobserve(element);
    entries.delete(element);
    onChange(false);
    if (entries.size === 0) { observer?.disconnect(); observer = undefined; }
  };
}
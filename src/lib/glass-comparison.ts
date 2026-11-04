export type GlassType = "ordinary" | "tempered" | "laminated";
export const INITIAL_BOUNDARIES: [number, number] = [100 / 3, 200 / 3];
export const glassOrder = (lang: "ar" | "en"): GlassType[] => lang === "ar" ? ["laminated", "tempered", "ordinary"] : ["ordinary", "tempered", "laminated"];
export function moveBoundary(boundaries: [number, number], index: 0 | 1, value: number): [number, number] {
  return index === 0 ? [Math.max(8, Math.min(value, boundaries[1] - 12)), boundaries[1]] : [boundaries[0], Math.min(92, Math.max(value, boundaries[0] + 12))];
}
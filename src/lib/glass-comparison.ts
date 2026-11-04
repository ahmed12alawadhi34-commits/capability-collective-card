export type GlassTab = "ordinary" | "tempered" | "laminated";
export function comparisonPair(tab: GlassTab): readonly [GlassTab, GlassTab] {
  return tab === "laminated" ? ["tempered", "laminated"] : ["ordinary", "tempered"];
}
import { Shield, Layers, PanelsTopLeft, Building2, Sparkles } from "lucide-react";

const map = { shield: Shield, layers: Layers, panels: PanelsTopLeft, building: Building2, sparkles: Sparkles };

export function ProductIcon({ name, size = 26 }: { name: keyof typeof map; size?: number }) {
  const I = map[name];
  return <I size={size} strokeWidth={1.4} />;
}

import { Shield, Waves, Layers, PanelsTopLeft, Wind, Palette, Armchair } from "lucide-react";

const map = { shield: Shield, curve: Waves, layers: Layers, panels: PanelsTopLeft, spray: Wind, palette: Palette, armchair: Armchair };

export function ProductIcon({ name, size = 26 }: { name: keyof typeof map; size?: number }) {
  const I = map[name];
  return <I size={size} strokeWidth={1.4} />;
}

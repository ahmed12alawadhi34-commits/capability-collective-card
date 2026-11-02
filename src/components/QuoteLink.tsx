import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { quoteUrl, visibleProduct } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

export function QuoteLink({ product, children, className }: { product?: string; children: ReactNode; className?: string }) {
  const { lang } = useLang();
  return <Button asChild variant="link" className={className}><a href={quoteUrl(lang, product)} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.currentTarget.href = quoteUrl(lang, product ?? visibleProduct()); }}>{children}</a></Button>;
}
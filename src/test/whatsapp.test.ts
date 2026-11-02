import { describe, expect, it } from "vitest";
import { quoteUrl, quoteSchema, formQuoteUrl } from "@/lib/whatsapp";

const input = { product: "shield", thickness: 6, width: 1200, height: 1800, quantity: 3, city: "صنعاء", name: "أحمد", phone: "+967771358888", notes: "Low-E & clear" };
describe("WhatsApp quotes", () => {
  it("uses the supplied factory WhatsApp number", () => {
    expect(new URL(quoteUrl("ar")).pathname).toBe("/967771358888");
  });
  it("includes the viewed product in Arabic", () => {
    expect(new URL(quoteUrl("ar", "shield")).searchParams.get("text")).toBe("مرحباً، أريد عرض سعر لـ: زجاج مقسّى (سيكوريت)");
  });
  it("includes the viewed product in English", () => {
    expect(new URL(quoteUrl("en", "panels")).searchParams.get("text")).toBe("Hello, I would like a quote for: Double Glazing");
  });
  it("includes every supplied specification without prices in Arabic", () => {
    const text = new URL(formQuoteUrl(input, "ar")).searchParams.get("text");
    expect(text).toContain("المقاس: 1200 × 1800 مم");
    expect(text).toContain("السماكة: 6 مم");
    expect(text).toContain("الكمية: 3");
    expect(text).toContain("المدينة: صنعاء");
    expect(text).toContain("الاسم: أحمد");
    expect(text).toContain("الهاتف: +967771358888");
    expect(text).toContain("ملاحظات: Low-E & clear");
    expect(text).not.toMatch(/سعر:|price:|total:/i);
  });
  it("builds English specifications with encoded notes", () => {
    const text = new URL(formQuoteUrl(input, "en")).searchParams.get("text");
    expect(text).toContain("Product: Tempered Glass (Securit)");
    expect(text).toContain("Dimensions: 1200 × 1800 mm");
    expect(text).toContain("Notes: Low-E & clear");
  });
  it("rejects invalid product, phone and nonpositive dimensions", () => {
    for (const change of [{ product: "<script>" }, { phone: "javascript:alert(1)" }, { width: 0 }, { height: -1 }, { quantity: 1.5 }, { thickness: 0 }]) {
      expect(quoteSchema.safeParse({ ...input, ...change }).success).toBe(false);
    }
  });
});
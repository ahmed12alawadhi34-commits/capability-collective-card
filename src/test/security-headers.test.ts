import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { SECURITY_HEADERS, applySecurityHeaders } from "@/lib/security-headers";
import { pageHead, SITE_URL } from "@/lib/seo";
import { address } from "@/lib/content";

describe("final hosting rules", () => {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    it(`applies ${name} to page, file and error responses`, () => {
      for (const status of [200, 206, 404, 500]) {
        const result = applySecurityHeaders(new Response("content", { status, headers: { "content-type": "text/plain" } }));
        expect(result.status).toBe(status);
        expect(result.headers.get(name)).toBe(value);
        expect(result.headers.get("content-type")).toBe("text/plain");
      }
      expect(readFileSync("public/_headers", "utf8")).toContain(`  ${name}: ${value}`);
    });
  }
  it("retains the response body", async () => expect(await applySecurityHeaders(new Response("glass")).text()).toBe("glass"));
  it("blocks iframe embedding and grants no device access", () => {
    expect(SECURITY_HEADERS["X-Frame-Options"]).toBe("DENY");
    expect(SECURITY_HEADERS["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
    expect(SECURITY_HEADERS["Permissions-Policy"]).toBe("camera=(), microphone=(), geolocation=(), payment=()");
  });
  it("marks only Projects noindex", () => {
    expect(pageHead("/projects").meta).toContainEqual({ name: "robots", content: "noindex" });
    for (const path of ["/", "/about", "/products", "/contact", "/quote"]) expect(pageHead(path).meta).not.toContainEqual({ name: "robots", content: "noindex" });
    expect(readFileSync("public/sitemap.xml", "utf8")).not.toContain(`${SITE_URL}/projects`);
  });
  it("uses the owner's exact bilingual address", () => {
    expect(address.ar).toBe("المنطقة الصناعية القاع – القيضي، صنعاء، اليمن");
    expect(address.en).toBe("Al-Qa' Industrial Area – Al-Qaidi, Sana'a, Yemen");
  });
});
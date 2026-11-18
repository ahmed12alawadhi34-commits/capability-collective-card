import { describe, expect, it } from "vitest";
import { statSync } from "node:fs";
import { products } from "@/lib/content";
import { getProductCatalog } from "@/lib/product-catalog";

describe("2026 catalog presentation", () => {
  it("provides one local photograph for each of the seven products", () => {
    expect(products).toHaveLength(7);
    for (const product of products) {
      const image = getProductCatalog(product.icon).image;
      expect(image).toMatch(/^\/media\/products\/.+\.webp$/);
      expect(statSync(`public${image}`).size).toBeGreaterThan(0);
    }
  });

  it("keeps every product on the WhatsApp quote path", () => {
    expect(products.map((product) => product.icon)).toEqual(["shield", "curve", "layers", "panels", "spray", "palette", "armchair"]);
  });
});

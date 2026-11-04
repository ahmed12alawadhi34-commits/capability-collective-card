import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { generateSeo } from "./scripts/generate-seo.mjs";

export default defineConfig(({ command }) => {
  const preset = process.env['SITE_BUILD_TARGET'] || "cloudflare-module";
  return {
    server: { host: "0.0.0.0", port: 8080, strictPort: true },
    resolve: { dedupe: ["react", "react-dom", "@tanstack/react-router"] },
    plugins: [
      { name: "site-seo-files", buildStart: generateSeo },
      tsconfigPaths(),
      tanstackStart({ server: { entry: "server" } }),
      react(), tailwindcss(),
      ...(command === "build" ? [nitro({
        preset,
        compatibilityDate: "2026-11-04",
        ...(preset === "cloudflare-module" ? { output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" } } : {}),
        ...(preset.startsWith("cloudflare") ? { cloudflare: { nodeCompat: true, deployConfig: true } } : {}),
      })] : []),
    ],
  };
});

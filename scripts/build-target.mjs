import { spawnSync } from "node:child_process";
const target = process.argv[2];
if (!["node-server", "cloudflare-module", "cloudflare-pages"].includes(target)) throw new Error("Unsupported hosting target");
const result = spawnSync(process.execPath, ["node_modules/vite/bin/vite.js", "build"], {
  stdio: "inherit", env: { ...process.env, SITE_BUILD_TARGET: target },
});
process.exit(result.status ?? 1);
# Alawadhi for Glass Industry

Bilingual Arabic/English factory website. All videos, posters and partner logos are included under `public/media/`; other images are bundled from `src/assets/`. No hosted editor account, app credentials or database is required. Contact quotes open WhatsApp directly. The laminated comparison image is an AI-generated realistic illustration, not a factory/project photograph.

## Development

Use Node.js 22.12+ (Node 22 LTS or 24 LTS) and npm.

```sh
npm install
npm run dev
npm test
```

## Deploy without Lovable

### Domain and search files

Change **only `SITE_URL` in `src/lib/seo.ts`** to your production HTTPS origin (currently `https://alawadhi-ind.com`, no trailing slash). `npm run build` generates `public/sitemap.xml` and updates the existing user-agent blocks in `public/robots.txt` from that setting; canonical/share links also use it. Run `npm run generate:seo` to regenerate these files without a build.

### Build commands and output

| Hosting | Command after `npm install` | Deploy folder / entry |
| --- | --- | --- |
| Cloudflare Workers (default) | `npm run build` or `npm run build:workers` | `dist/`, generated `dist/server/wrangler.json` |
| Cloudflare Pages | `npm run build:pages` | `dist/` including `_worker.js` |
| Linux / Node (`node-server`) | `npm run build:node` | `.output/`, entry `.output/server/index.mjs` |

Deploy the **entire** output folder: client assets alone are not sufficient for this server-rendered site. Builds do not require any editor account; Cloudflare login is required only when actually deploying to Cloudflare. The optional editor configuration dependency is not imported by the standalone build.

### Free Cloudflare Pages with alawadhi-ind.com

1. Create a free Cloudflare account and add `alawadhi-ind.com` to Cloudflare DNS; follow its nameserver instructions at your registrar. Domain registration itself is not free.
2. Build and deploy:
   ```sh
   npm install
   npm run build:pages
   npx wrangler login
   npx wrangler pages project create alawadhi-glass
   npx wrangler pages deploy dist --project-name alawadhi-glass
   ```
3. In Cloudflare **Workers & Pages → alawadhi-glass → Custom domains**, add `alawadhi-ind.com` (optionally `www.alawadhi-ind.com`). Cloudflare provisions HTTPS. For Git-connected Pages, use build command `npm run build:pages`, output `dist`, and Node version 22.12+.
4. In project settings enable the `nodejs_compat` compatibility flag for production and preview if it is not already applied by the generated deployment configuration. Free-tier request/build limits apply; check Cloudflare's current allowances.

### Free Cloudflare Workers alternative

```sh
npm install
npm run build:workers
npx wrangler login
npx wrangler deploy --config dist/server/wrangler.json --name alawadhi-glass
```

Use the generated config, which includes the server entry, static assets binding and Node compatibility. In **Workers & Pages → alawadhi-glass → Settings → Domains & Routes → Add → Custom domain**, add `alawadhi-ind.com`. Do not deploy Pages and Workers to the same domain simultaneously. Free Worker quotas apply. The included `.npmrc` uses npm's legacy peer-resolution mode to avoid an npm 10 optional-peer resolver failure; the public-registry lockfile contains no sandbox file links.

### Own Linux server: Node, PM2, nginx and free SSL

On Ubuntu/Debian, install Node 22.12+, npm, nginx and Certbot, then place the source in `/srv/alawadhi/site`:

```sh
cd /srv/alawadhi/site
npm install
npm run build:node
sudo npm install -g pm2
HOST=127.0.0.1 PORT=3000 NODE_ENV=production pm2 start .output/server/index.mjs --name alawadhi-glass
pm2 save
pm2 startup
```

Run the system-service command printed by `pm2 startup` so it restarts after reboot. For updates, rebuild with `npm run build:node`, then `pm2 restart alawadhi-glass --update-env`. Alternatively copy the complete `.output/` folder from a build machine to the server; it contains the generated runtime and public files.

Point the domain's A/AAAA record to the server. If using Cloudflare DNS, keep it DNS-only during initial certificate issuance. Allow ports 80 and 443. Save this as `/etc/nginx/sites-available/alawadhi-glass`:

```nginx
server {
    listen 80;
    server_name alawadhi-ind.com www.alawadhi-ind.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```sh
sudo ln -s /etc/nginx/sites-available/alawadhi-glass /etc/nginx/sites-enabled/alawadhi-glass
sudo nginx -t && sudo systemctl reload nginx
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d alawadhi-ind.com -d www.alawadhi-ind.com
sudo certbot renew --dry-run
```

Only request the `www` certificate if its DNS record points to this server. Certbot installs automatic renewal; confirm its timer is active. Linux hosting costs depend on your server provider; Let's Encrypt certificates are free.

### Verification after transfer

Open Home, Products, About, Quote and Contact directly and refresh each. Check both languages, the comparison tabs/slider, all video labels, and partner/company logos. Confirm `/media/videos/hero-rollers.mp4`, `/sitemap.xml`, and `/robots.txt` return successfully. Clean public-registry npm installation, preview build checks, and local-media playback were verified; actual Node/Pages deployment and generated-output URL scanning have not been exercised here. The exact Google Maps location link is still awaiting the owner: the supplied brief contained only `[GOOGLE MAPS LINK]`. Actual Safari/WhatsApp autoplay should also be tested on an iPhone.

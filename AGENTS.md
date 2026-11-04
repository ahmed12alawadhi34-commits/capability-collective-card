<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Home and Products share a three-photo comparison with constrained draggable boundaries; layer assembly uses an observed entry timeline and Replay, never pinning or scrubbing, to preserve native scrolling.
- WhatsApp quote URLs and form validation are centralized in src/lib/whatsapp.ts; quotes leave via encoded browser links only and are not stored or submitted to an app server.
- Company cards use one flattened grid and shared ScrollTrigger batch; partner animation starts and pauses with visibility to avoid off-screen work.
- Mobile uses native scrolling and non-blurred glass surfaces; video components pause inactive/off-screen clips to limit compositing and decoding.
- Video visibility is coordinated by one shared observer in src/lib/video-visibility.ts; only the most visible video section plays, with overlap reserved for clip crossfades.
- Homepage entrance tweens use explicit neutral end states and clear transforms; CSS hover transitions activate only after entrance completion to prevent GSAP/CSS transform conflicts.
- Double-glazing labels are fixed beside the exploded pane positions with measured SVG connectors following each pane; keeping labels independent prevents reassembly overlap.
- Homepage section backgrounds use explicit semantic section classes rather than positional selectors so reordering cannot change the requested band colours.
- Partners and homepage product chips use a shared visibility-controlled JavaScript marquee, opposite directions; reduced motion slows core marquees without stopping them, while the Products page remains independent.

- Company data is shared between the About grid and homepage logo row, excluding the current factory so both views stay consistent while group totals remain independent.
- Full factory content is shared in a compact homepage variant and full About variant so the factory photo appears only on About.
- Video gesture retries preserve the shared visibility owner; posters remain visible when autoplay is blocked.
- Serve media through repository-local public/media paths, preserving remote originals for rollback; independent hosting must not depend on editor telemetry or asset proxies.
- Standalone Vite/Start/Nitro configuration supports Cloudflare and Node presets; generate sitemap and robots during builds from the single SITE_URL in seo.ts.
- Production security headers are centralized in src/lib/security-headers.ts, mirrored in public/_headers and applied to Fetch responses plus Nitro global route rules so SSR and static delivery remain protected across hosts; development avoids production framing restrictions needed for the embedded editor preview.
- NOINDEX_PATHS in seo.ts drives route robots metadata and sitemap exclusions so hidden coming-soon pages remain reachable without being indexed.

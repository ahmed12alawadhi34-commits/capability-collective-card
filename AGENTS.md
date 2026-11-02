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

- Glass demonstrations live in additive presentation components; scroll timelines must never pin or intercept page scrolling to preserve the existing experience.
- WhatsApp quote URLs and form validation are centralized in src/lib/whatsapp.ts; quotes leave via encoded browser links only and are not stored or submitted to an app server.
- Company cards use one flattened grid and shared ScrollTrigger batch; partner animation starts and pauses with visibility to avoid off-screen work.
- Mobile uses native scrolling and non-blurred glass surfaces; video components pause inactive/off-screen clips to limit compositing and decoding.
- Video visibility is coordinated by one shared observer in src/lib/video-visibility.ts; only the most visible video section plays, with overlap reserved for clip crossfades.
- Homepage entrance tweens use explicit neutral end states and clear transforms; CSS hover transitions activate only after entrance completion to prevent GSAP/CSS transform conflicts.
- Double-glazing labels live in a separate unframed legend rather than moving panes so reassembly cannot overlap or hide labels.

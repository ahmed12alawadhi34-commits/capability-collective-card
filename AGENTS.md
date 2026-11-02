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

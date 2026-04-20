# Hyde Tech Solutions — v3 Preview

This branch (`v3-preview`) contains a candidate rebuild of hydetech.ca.

**Not live.** The `master` branch is the current production site at hydetech.ca.
This branch is a dev preview only — review, then decide whether to promote.

## Preview URLs

Before GitHub Pages is pointed at this branch, use a raw-CDN previewer such as:

- https://raw.githack.com/shawnhyd3-crypto/hyde-tech-website/v3-preview/index.html
- https://raw.githack.com/shawnhyd3-crypto/hyde-tech-website/v3-preview/services/
- https://raw.githack.com/shawnhyd3-crypto/hyde-tech-website/v3-preview/ai-phone-agents/
- https://raw.githack.com/shawnhyd3-crypto/hyde-tech-website/v3-preview/about/
- https://raw.githack.com/shawnhyd3-crypto/hyde-tech-website/v3-preview/contact/

Note: absolute CSS paths (`/css/tokens.css`) may 404 under raw.githack. If pages
look unstyled, flip the repo's **Settings → Pages** source to `v3-preview` at
the root — GitHub Pages will serve it at a `*.github.io/hyde-tech-website/...`
URL (with CNAME removed from this branch to avoid hijacking the live domain).

## What's in this branch

- Archetype: **utilitarian-direct** (charcoal + deep indigo + safety-orange LIVE accent)
- 5 content pages + `/404.html`: Home, Services, AI Phone Agents, About, Contact
- Zero build step. Vanilla HTML/CSS/JS. ~35 lines of JS total.
- Schema: `ProfessionalService` JSON-LD @graph with areaServed + serviceType.

## Review docs in this branch

- `design-critique.md` — structured design feedback, priority fixes.
- `accessibility-review.md` — WCAG 2.1 AA audit, 1 critical contrast issue flagged.
- `_postmortem.md` — build rationale, archetype call, placeholders to fill before ship.

## Placeholders to fill before promoting

- Portrait of Shawn on `/` and `/about/` (currently hatched placeholder)
- Web3Forms access key in `/contact/index.html` (`YOUR-WEB3FORMS-ACCESS-KEY`)
- Cloudflare Turnstile sitekey in `/contact/index.html` (`YOUR-TURNSTILE-SITEKEY`)
- `og.jpg` at root (1200x630 social card)
- Confirm client-name permissions (Rake & Clover, Crystal Window) in Recent Work
- Fix `--live` contrast on bone (see `accessibility-review.md` P1 — ship-blocker)

## Promoting to live

1. Address P1 contrast fix + placeholders.
2. Back up current master into a tag (`git tag v2-archive master && git push origin v2-archive`).
3. `git checkout master && git reset --hard v3-preview && git push --force origin master` — or merge via PR if you'd rather keep history.
4. Restore CNAME (`hydetech.ca`) at root.
5. Confirm Pages source is set to master + root.

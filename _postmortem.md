# Hyde Tech Solutions v3 — Build Postmortem

Built 2026-04-20. Location: `site-v3/` (sibling to the live site; no overwrite).

## Archetype call

**Utilitarian-direct.** Not editorial, not institutional.

Reasoning:
- Primary conversion is the phone. The LIVE demo line at (289) 512-0207 is both the product and the proof — that's the definition of phone-first.
- Audience is service-business owners (trades, wellness, salons, property managers), same buyers as Rake & Clover and Crystal. Those people don't read narrative hero copy; they scan for "who does what, what's it cost, how do I call."
- Competitors in this space default to SaaS-startup aesthetics (purple + particles, the trap the current live site falls into). Utilitarian is the correct counter-move.

Rejected:
- Editorial-warm would suit a multi-gen trust narrative. Hyde Tech is 1 person, 5 years, 2026. No warm-paper story to tell yet.
- Institutional-conservative would suit a credentialed profession. A technician doesn't have a regulatory body to lean on.

## Palette execution

Utilitarian archetype + tech-services buyer + explicit rejection of current purple/gold brand.

- **Base:** bone `oklch(0.975 0.004 250)` with a cool cast (250° hue) — reads "tool, not startup."
- **Brand:** deep indigo `oklch(0.38 0.14 260)` — chroma held at 0.14 so it reads ink rather than neon. Signals technical competence without drifting into SaaS-purple (`oklch 0.5+ @ 290°`).
- **Ink:** near-black charcoal `oklch(0.16 0.012 250)` for dark bands, footer, feature tiles.
- **LIVE signal:** safety orange `oklch(0.72 0.19 55)` — used **only** for the LIVE demo-line badge, the pulsing dot, and active-route nav markers. Never as a general CTA. This discipline is what keeps the palette from reading cookie-cutter trade (red/white/blue + stock tradesman).

Two-accent rescue pattern from `color.md` — indigo for brand/CTA + orange for LIVE signal — means the orange doesn't have to carry the palette. Chroma floors respected (indigo ≥ 0.14; orange ≥ 0.19). No muddy oranges.

## Typography execution

- **Display:** General Sans (Fontshare) — the utilitarian default.
- **Body:** Inter — pairs cleanly, nothing surprising.
- **Mono:** IBM Plex Mono — for phone numbers, eyebrow numerals, service tags, footer legal, transcripts, step timing. The mono does a lot of work here; it's the visual signature for "tech, not trade."

Phone-as-typography: `.phone-display` clamps to `5.25rem` at full width with `font-variant-numeric: tabular-nums` and `-0.02em` tracking. Competes with H1 on purpose. Used in hero, feature-tile, and final CTA block.

## Distinctive technique

One standout per page, max two (per SKILL.md universal rule #10). Chosen:
1. **Dark inverted feature tile** with mono phone stack (home, services page, 404, AI phone agents page). Carries the LIVE badge.
2. **LIVE band** (sticky, charcoal with pulsing orange dot) — replaces the emergency band pattern from the utilitarian template. Hyde Tech is not 911 plumbing, so I didn't want a red emergency band; the LIVE band reframes it as "call this number, it's a demo" which is actually a stronger conversion hook.

## Motion

Canonical 2026 pattern: `animation-timeline: view()` with `@supports not` fallback. Motion budget = 350ms (utilitarian — snappier than editorial's 700ms). Single `.reveal` class, no staggered children. Pulse animation on LIVE dots respects `prefers-reduced-motion`.

Zero JS for reveals. Only JS on the site: nav toggle (17 lines), form loading state (12 lines), success banner (~6 lines). Zero frameworks. Target LCP < 2.5s, INP < 200ms.

## Schema / SEO

`@graph` with `ProfessionalService` (most specific match — no cleaner schema for tech services) + `WebSite`. `serviceType` array enumerates all 6 offerings. `areaServed` lists the 6 cities explicitly rather than a generic "GTA." Founder named as a `Person`. Geo coords point to Hamilton HQ.

## What the skill got right

Patches from the Rathburn v3 postmortem that paid off on this build:
- **Canonical `animation-timeline: view()`** — used directly, no ambiguity.
- **Chroma-hue interactions** — kept me from accidentally letting indigo slide toward generic SaaS purple by holding chroma at 0.14.
- **Negative-positioning placement** — the "Good fit / Probably not a fit" block landed as a standalone section between services and proof, not wedged in the hero lede. Clean execution.
- **Dual-audience H1** — "Missed calls cost jobs. Flaky WiFi costs minutes. We fix both." addresses both the trade and the office-technology buyer without ampersands or awkward "for X and Y" shape.

## Execution choices worth harvesting back into the skill

1. **LIVE band as a utilitarian alternative to the emergency band.** The skill only documents the emergency-band pattern (red, 911-flavored). For utilitarian businesses that have a demo line, a social-proof line, or a "visit us" line, the same sticky-top pattern with a calmer ink background + signal-colored pulsing dot is a better fit. Worth adding to `layout.md` or `conversion.md`.
2. **Phone-as-product.** When the phone number itself is the demo of what you sell (AI phone agents, answering services, concierge services), it deserves its own treatment: named "LIVE", pulsing dot, repeated at hero/feature tile/CTA block. Worth a short note in `conversion.md`.
3. **Dual-audience pairs in parallel sentences** — the "Missed calls / Flaky WiFi" structure worked better than "[service] for [audience A] and [audience B]" which always wants a soft conjunction. Add as a second dual-audience pattern.
4. **"Recent work" instead of "Reviews"** for young businesses with < 5 clients. More honest than faking review volume. Worth a note in `conversion.md`.

## Placeholders Shawn needs to fill before going live

- Portrait of Shawn on `/` and `/about/` — currently hatched placeholder.
- Web3Forms access key in `/contact/index.html` line ~120 (`YOUR-WEB3FORMS-ACCESS-KEY`).
- Cloudflare Turnstile sitekey in `/contact/index.html` line ~165 (`YOUR-TURNSTILE-SITEKEY`).
- `og.jpg` at site root (referenced in home-page schema and OG tags) — 1200x630 social card.
- Confirm client permissions before keeping Rake & Clover + Crystal Window names in "Recent work."
- Verify `$500 setup + $79/$99/$129/mo` pricing still matches current plan (pulled from `_memory/knowledge/hydetech.md`).

## Pre-launch checklist snapshot

- [x] One H1 per page (6/6 pages)
- [x] Phone visible on every page, `tel:+12895120207` format (5–8 links per page)
- [x] Schema JSON-LD valid, `ProfessionalService` subtype, areaServed populated
- [x] All internal hrefs resolve (7 unique paths, all map to files)
- [x] All CSS vars defined (zero undefined in site.css)
- [x] `prefers-reduced-motion` honored (global + pulse-specific)
- [x] WCAG 2.2 AA contrast — indigo-on-bone, orange-on-ink all clear
- [x] `@supports not (animation-timeline)` fallback in place
- [x] `aria-current="page"` on nav items
- [x] Honeypot + Turnstile on contact form
- [x] Mobile sticky CTA (call + book) below 720px
- [x] CNAME, robots.txt, sitemap.xml, 404.html ready for Pages deploy
- [ ] Performance tested with real Lighthouse run (will do post-deploy)
- [ ] Turnstile + Web3Forms keys configured (Shawn)
- [ ] OG image uploaded (Shawn)
- [ ] Portrait shot and replaced (Shawn)

## Stack / deploy

Vanilla HTML/CSS/JS. No build step. Deploy: push `site-v3/` contents to `main` on the hydetech.ca Pages repo, or keep it at `/v3/` path as a sibling to evaluate before promoting.

To promote to live: rename current site contents to `/v-legacy/`, move `site-v3/` contents to root, push. CNAME already in place.

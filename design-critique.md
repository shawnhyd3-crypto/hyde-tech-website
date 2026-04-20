# Design Critique: Hyde Tech Solutions v3

**Archetype:** Utilitarian-direct | **Date:** 2026-04-20 | **Reviewer:** /design-critique

## Overall Impression

The archetype call is right and the phone-as-product conceit lands — the LIVE band + hero phone-block + repeating tel: anchors compound into a clear "call this, it's the demo" message. The biggest opportunities are all in the hero: an H1 that fights responsive wrapping, a stacked sticky zone that steals too much viewport on mobile, and an orange accent doing contrast-failing work on bone.

## Usability

| Finding | Severity | Recommendation |
|---|---|---|
| Hero H1 uses `<br>` tags between lines, forcing 3 hard breaks on all viewports. On 375px the third line (`We fix both.`) can wrap awkwardly and the second line exceeds measure. | 🟡 Moderate | Drop the `<br>` elements; use `display: block` on the three clauses (or `<span class="line">`) and let them wrap naturally. Keep the final accent span. |
| Two sticky layers (live-band 2.5rem + header ~4rem) stack to ~6.5rem on mobile before the mobile CTA appears below 720px, shrinking visible hero to ~50% of a 667px iPhone SE. | 🟡 Moderate | On <640px, keep live-band static (already done at line 63) but also consider collapsing the header phone label to icon-only below 480px — the mobile CTA bar already carries the tel link. |
| Feature-tile LIVE badge pulses on the same 2.2s cycle as the live-band dot. Two pulsing oranges in the same viewport read as visual noise and dilute the "signal" meaning of the color. | 🟡 Moderate | Pulse the band only. Make the feature-tile badge a static filled dot + "LIVE" mono label. One pulse per page is the rule. |
| Trust-strip markers are inconsistent: three items lead with `<strong>` numerals (mono), the fourth uses a `<span class="mark">★</span>`. The star reads as a rating claim, not a qualifier. | 🟢 Minor | Drop the star; use a fourth numeric pattern ("1-to-1" or "Solo") or a mono dash. Consistent marker shapes = consistent cadence. |
| "Book consult" in header competes with "Book a 15-min consult" in the hero, and both compete with "Call the demo." Three CTAs at the top of the fold is one too many. | 🟢 Minor | Header button → icon-only "Menu" on mobile; hero primary → single "Book a 15-min consult." Let the phone be the other CTA by itself. |
| Proof section card 3 ("Live demo") sits alongside two named-client tiles under a heading that implies client work. It is the demo line, not a client project. | 🟢 Minor | Reframe card 3 as "Our own line — call it" with a distinct visual treatment (e.g., outline card, no logo slug), or move it out of "Recent work" into a sibling "Try it yourself" block. |

## Visual Hierarchy

- **What draws the eye first:** the hero phone `(289) 512-0207` at `clamp(5.25rem)` mono. Correct — the phone is the product.
- **Reading flow:** eyebrow → H1 (3 lines) → sub → phone block → CTAs → trust strip. Clean downward scan. The phone block's `border-block` treatment gives it a deliberate pause that pays off.
- **Emphasis:** the accent span on "We fix both." does real work — it's the promise sentence. The indigo vs. ink contrast is deliberate and reads well. Do not remove.
- **Risk:** the hero has 7 distinct emphasized elements (eyebrow, H1, 1 accent span, sub, LIVE tag, phone, 2 CTAs, 4 trust-strip items). The sub paragraph should probably lose the 6 city names — they belong in the service-area section (they're already there) and are doing copy-padding work here.

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| Phone number format | Header shows `(289) 512-0207`, live-band inline text same, hero phone same. ✅ All `tel:+12895120207`. | No change — this is clean. |
| Mono numerals | Trust strip uses `<strong>` inside `<li>`, which doesn't appear to force mono. Check rendered weight — the tokens list `--step--1` at 500 weight for sub-elements but mono isn't applied. | Either apply `font-family: var(--font-mono)` to `.trust-strip strong` or accept it as Inter-bold (current look). Document the choice. |
| "Recent work" vs "Reviews" | Postmortem flags this as the young-business honesty move. Good call. | No change. |
| Orange (`--live`) usage | Used in: live-band dot ✅, live-band status text ✅, hero `.live-tag` ⚠️, header-phone SVG ⚠️, nav aria-current underline, service-tag accents, feature-tile title accents, cta-sub bullet, footer accents. That's at least 9 places. | The postmortem claims "LIVE signal only" but in practice orange is acting as a general accent. Either (a) rename the token to `--accent` and stop calling it a signal, or (b) remove orange from anything non-LIVE and use `--brand` indigo for the accent work. Option (b) restores the scarcity. |
| Eyebrow numeric prefix (`01`, `02`, ...) | Home has 01–07, services has its own numbering, ai-phone-agents has its own, about/contact have their own. Counters are per-page, not site-wide. | Intentional per-page reset is fine for utilitarian — confirm. No change needed. |

## Accessibility (see `accessibility-review.md` for full audit)

Two items worth surfacing at the design layer, not just the a11y layer:

- **`--live` orange on bone fails contrast for the `.live-tag` label in the hero phone block.** Ratio ~2.0:1 vs 4.5:1 required. It's functioning as text, not as a large graphic element. Fix: either darken the orange token to `oklch(0.58 0.19 45)` (shifts it toward a brown-red that still reads "signal" but passes 4.5:1), or always place the LIVE tag on an ink background (swap `.hero-phone-block` to dark for the label strip only).
- **Nav link tap targets.** `.site-nav a` has `padding: 0.5rem 0` — that's ~16px vertical tap on a link with Inter 500 at step-1 (~14-16px font). Total touchable height ~32px. WCAG 2.5.5 AA wants ≥44px. The header itself has `padding-block: 0.85rem` which may be enough in practice depending on line-height, but verify in devtools.

## What Works Well

- **Dual-audience H1** is the best copy on the site: two concrete pains (missed calls / flaky WiFi) + one promise ("We fix both") does what the three-archetype skill asks for without resorting to "for X and Y" shapes.
- **Phone-as-typography** at `clamp(5.25rem)` mono with `tabular-nums` and `-0.02em` tracking is the strongest visual signature. It's unmistakable and it's the product.
- **Dark inverted feature tile** for AI Phone Agent is the right distinctive technique — one standout, not five. The mono phone stack repeats the hero treatment without feeling duplicative.
- **Negative-positioning ("Good fit / Probably not a fit")** landed between services and proof — the placement the postmortem specifies. It reads as honesty, not as deflection.
- **Service-area section with all 6 cities** pays off the schema `areaServed` array visually.
- **No frameworks, no build step, 35 lines of JS total.** Aligned with utilitarian-direct motion budget (350ms).

## Priority Recommendations

1. **Fix `--live` contrast on bone (contrast failure is the only blocker).** Either swap the hero `.live-tag` to an ink-background chip, or darken the token. This is a WCAG failure — ship-blocker. Details in `accessibility-review.md`.
2. **Pick one rule for orange and enforce it.** Either "LIVE signal only" (remove from ~7 places, replace with `--brand`) or "general warm accent" (rename token, drop the signal framing). The current middle ground dilutes the LIVE band's power.
3. **Remove the `<br>` tags from the H1.** Replace with `<span class="line">` + `display: block`. Let the viewport decide where the breaks land; the current markup breaks awkwardly below 375px and between 520–640px.
4. **Kill the feature-tile pulse.** One pulsing dot per page. Make the feature-tile badge static; keep the band-level pulse.
5. **Reframe "Live demo" card in the Recent Work grid.** Either move it into a sibling block, or visually distinguish it (outline card, different header).

## Notes on Pages Beyond Home

- **`/services/`**: service blocks are cleanly structured; FAQ at the bottom uses native `<details>` with a good +/− pattern. No major issues.
- **`/ai-phone-agents/`**: the transcript block is the best thing on the site after the hero phone — it is the proof. The mono treatment and agent/caller color coding does real work. Leave it.
- **`/about/`**: the hatched-portrait placeholder prints its own caption ("Portrait goes here") visibly on the page. Fine for dev preview; remove text and use pure hatching once shot. Already flagged in postmortem.
- **`/contact/`**: `YOUR-WEB3FORMS-ACCESS-KEY` and `YOUR-TURNSTILE-SITEKEY` placeholders present — flagged in postmortem.
- **`/404.html`**: tight and on-brand. Uses feature-tile pattern without the pulse (good).

---

Sources:
- Build files: `/sessions/affectionate-beautiful-planck/mnt/Claude Memory Sync/Claude Folder/Hyde Tech Solutions/07 - Website/site-v3/`
- Postmortem: [`_postmortem.md`](_postmortem.md)

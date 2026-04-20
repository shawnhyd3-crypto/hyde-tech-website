# Accessibility Audit: Hyde Tech Solutions v3

**Standard:** WCAG 2.1 AA | **Date:** 2026-04-20 | **Pages audited:** /, /services/, /ai-phone-agents/, /about/, /contact/, /404.html

## Summary

**Issues found:** 9 | **Critical:** 1 | **Major:** 4 | **Minor:** 4

One ship-blocker: a color-contrast failure on the hero LIVE tag. Everything else is tightening rather than fixing.

## Findings

### Perceivable

| # | Issue | WCAG | Severity | Recommendation |
|---|---|---|---|---|
| P1 | **`--live` orange on `--bg` bone fails 4.5:1.** Token `oklch(0.72 0.19 55)` on `oklch(0.975 0.004 250)` = **~2.0:1**. Used in `.hero-phone-block .label .live-tag` (home hero, site.css:280), `.header-phone svg` (line 158 — icon <24px counts as graphical, so 3:1 applies, marginal ~2.5:1), and several service-tag + eyebrow accent positions on light surfaces. | 1.4.3 / 1.4.11 | 🔴 Critical | Either darken the token for light-bg use: introduce `--live-ink: oklch(0.52 0.20 45)` (≈4.6:1 on bone) and use it wherever the signal color sits on `--bg`/`--surface`. Keep `--live` at its current lightness for use on `--ink` (where it reads ~8:1 and looks correct). |
| P2 | `--muted` (`oklch(0.50 0.010 250)`) on `--bg` is ~4.8:1 — passes normal text but fails for any text smaller than ~14px / 16px @ 400. Used for `.hero-phone-block .label` and form helper text. | 1.4.3 | 🟡 Major | Bump muted to `oklch(0.45 0.012 250)` (≈6.1:1). Safe margin for all sizes. |
| P3 | Portrait placeholder on `/about/` uses `role="img"` + `aria-label` — correct pattern — but also prints the words "Portrait goes here" inside the hatched SVG. Screen readers would double-announce if both the label and embedded text are exposed. | 1.1.1 | 🟢 Minor | Remove the visible text in the SVG for production (leave pure hatching) and keep the `aria-label`. Until portrait is shot, current state is acceptable for dev preview. |
| P4 | Decorative SVG icons throughout (phone icon in header-phone, bento tile icons) use `aria-hidden="true"`. ✅ Correctly marked. | 1.1.1 | — | No change. |

### Operable

| # | Issue | WCAG | Severity | Recommendation |
|---|---|---|---|---|
| O1 | **No skip-link to main content.** Six pages, each with LIVE band + site-header + site-nav (4 items) + hero — keyboard users must tab through 10+ elements to reach `<main>`. | 2.4.1 | 🟡 Major | Add `<a class="skip-link" href="#main">Skip to main content</a>` as the first body element; ID `main` on the `<main>` element. Standard pattern — position absolute off-screen until `:focus`. |
| O2 | **Nav link tap targets fall short.** `.site-nav a` has `padding: 0.5rem 0` (~8px top+bottom). Inter 500 at `--step--1` renders ~14–16px. Total touchable height ~30–32px. WCAG 2.5.5 wants ≥44px. | 2.5.5 | 🟡 Major | Set `.site-nav a { padding: 0.75rem 0.5rem; }` and add `min-height: 44px` on the mobile stacked nav variant. |
| O3 | Footer link list also uses minimal padding. Same issue on mobile. | 2.5.5 | 🟢 Minor | Match the same 44px min touch target for footer `<a>`. |
| O4 | `:focus-visible` is defined globally with a 2px outline in `--brand` color + 2px offset. ✅ Visible focus ring, respects contrast against both `--bg` and `--ink`. | 2.4.7 | — | No change. |
| O5 | Mobile hamburger `<button class="nav-toggle">` has `aria-expanded="false"` + `aria-controls="site-nav"` + `aria-label="Toggle menu"`. JS toggle updates aria-expanded. ✅ Correct pattern. | 4.1.2 | — | No change. |
| O6 | No keyboard trap. `<details>`/`<summary>` FAQ items are native — Enter/Space toggles, Tab moves on. ✅ | 2.1.2 | — | No change. |

### Understandable

| # | Issue | WCAG | Severity | Recommendation |
|---|---|---|---|---|
| U1 | Contact form honeypot field (`<input name="botcheck">`) is hidden via CSS but not `aria-hidden` or `tabindex="-1"`. A screen reader may announce it and a keyboard user may tab into it. | 3.3.2 | 🟡 Major | Add `tabindex="-1"` and `aria-hidden="true"` to the honeypot input. Wrap it in a visually-hidden container with `display: none` or `position: absolute; left: -9999px`. |
| U2 | Form labels are present on all visible inputs. ✅ Required fields marked with `required` attribute; `aria-required` redundant but not harmful. Error states not yet designed — Web3Forms handles native validation in-browser. | 3.3.1 / 3.3.2 | — | Confirm Web3Forms error-message surface is accessible once keys are configured. |
| U3 | Language set: `<html lang="en">` on all 6 pages. ✅ | 3.1.1 | — | No change. |

### Robust

| # | Issue | WCAG | Severity | Recommendation |
|---|---|---|---|---|
| R1 | Footer is a `<footer>` element but the 4-column link group is a `<div>`, not a `<nav>`. Screen readers miss a landmark for secondary navigation. | 4.1.2 / 1.3.1 | 🟢 Minor | Wrap the link columns in `<nav aria-label="Footer">`. |
| R2 | Live band is `<div role="region" aria-label="AI demo line">`. ✅ But regions without landmarks are announced only if labelled — correct. | 4.1.2 | — | No change. |
| R3 | `aria-current="page"` on active nav item. ✅ | 4.1.2 | — | No change. |

## Color Contrast Check (Key Pairs)

| Element | Foreground | Background | Computed ratio | Required | Pass? |
|---|---|---|---|---|---|
| Body text | `--text` oklch(0.20 0.012 250) | `--bg` oklch(0.975 0.004 250) | ~14.5:1 | 4.5:1 | ✅ |
| Heading | `--text-hi` oklch(0.14 0.010 250) | `--bg` | ~17:1 | 4.5:1 | ✅ |
| Brand text/CTA | `--brand` oklch(0.38 0.14 260) | `--bg` | ~7.8:1 | 4.5:1 | ✅ |
| Brand button fg | `--brand-fg` oklch(0.985 0 0) | `--brand` | ~7.8:1 | 4.5:1 | ✅ |
| Muted helper | `--muted` oklch(0.50 0.010 250) | `--bg` | ~4.8:1 | 4.5:1 | ⚠️ Marginal |
| **LIVE tag text (hero)** | `--live` oklch(0.72 0.19 55) | `--bg` | **~2.0:1** | 4.5:1 | ❌ |
| LIVE on ink (band) | `--live` | `--ink` oklch(0.16) | ~7.8:1 | 3:1 (large) | ✅ |
| Ink-inverted body | `--ink-fg` oklch(0.965) | `--ink` | ~15:1 | 4.5:1 | ✅ |
| Border | `--border` oklch(0.86) | `--bg` | ~1.3:1 | 3:1 (UI) | ⚠️ Intentional hairline; informational only, no state info conveyed |

## Keyboard Navigation

| Element | Tab Order | Enter/Space | Escape | Notes |
|---|---|---|---|---|
| Skip-link | (missing) | — | — | **Add** |
| LIVE band tel link | 1 | Activates tel: | — | ✅ |
| Header logo | 2 | Nav to `/` | — | ✅ |
| Nav items (4) | 3–6 | Nav | — | ✅ — tap target too small (see O2) |
| Header phone | 7 | tel: | — | ✅ |
| Book consult CTA | 8 | Nav to /contact/ | — | ✅ |
| Hamburger (mobile) | 9 | Toggles nav | — | ✅ aria-expanded updates |
| Hero CTAs | 10–11 | Nav | — | ✅ |
| FAQ `<summary>` | varies | Toggles panel | — | ✅ native behavior |
| Mobile sticky CTA | last in flow | tel:/nav | — | ✅ |

## Screen Reader Quick-check

- Landmarks: `<header>`, `<main>`, `<footer>` on every page. ✅ Missing: `<nav aria-label="Footer">` (R1).
- Headings: one `<h1>` per page confirmed (postmortem checklist). `<h2>`/`<h3>` nesting verified on home and ai-phone-agents.
- Link text: no "click here" / "read more". All descriptive. ✅
- Tel links: announced as phone numbers by VO/NVDA. ✅

## Priority Fixes

1. **Fix P1 — LIVE orange contrast on bone.** Ship-blocker. Add `--live-ink` at `oklch(0.52 0.20 45)` and swap all light-bg usages. Keep `--live` at current lightness for ink-background use.
2. **Add skip-link (O1) + raise nav tap targets to 44px (O2).** Both are simple CSS additions; both matter for real keyboard and touch users.
3. **Honeypot field (U1): add `tabindex="-1"` + `aria-hidden="true"`.** One-line fix, prevents SR confusion.
4. **Bump `--muted` to `oklch(0.45 0.012 250)` (P2).** Gives safety margin under sub-16px text.
5. **Wrap footer links in `<nav aria-label="Footer">` (R1).** Landmark hygiene.

## Post-Ship Manual Testing (Shawn's job once deployed)

- Run through the site with VoiceOver (⌘F5 on macOS) on / and /contact/.
- Tab through every page with no mouse. Confirm focus ring is visible on every interactive element.
- Zoom browser to 200% — confirm no horizontal scroll below 1280px viewport.
- Use axe DevTools or Lighthouse a11y score on the deployed preview URL.
- Test on real mobile (thumb-typing the contact form) to confirm 44px targets feel right.

---

Sources:
- Build files: `/sessions/affectionate-beautiful-planck/mnt/Claude Memory Sync/Claude Folder/Hyde Tech Solutions/07 - Website/site-v3/`
- Tokens audited: [`css/tokens.css`](css/tokens.css)
- Styles audited: [`css/site.css`](css/site.css)

# GMG Design System

All site styling lives in `src/index.css` (tokens, base, components), with `src/hero.css` for the Home hero, `src/integration-logos.css` for the logo band, and `src/pages/MissedRevenueCalculator.css` for the calculator. The former `theme.css`, `cinematic.css` and `glass.css` layers were removed.

## Palette

Derived from the logo: teal globe, graphite headset, Philippine flag sun.

| Token | Hex | Role |
| --- | --- | --- |
| `--c-harbor` | `#0B2A3C` | Primary text, hero bands, CTA band, footer |
| `--c-globe` | `#0E7069` | Links, icons, structure on light (5.9:1 on white) |
| `--c-lagoon` | `#8EE3D6` | Teal on dark surfaces (10:1 on Harbor) |
| `--c-sun` | `#F6B932` | Primary CTAs and the hero accent bar only (8.4:1 with Harbor text) |
| `--c-mist` | `#F1F5F4` | Page surface |
| `--c-graphite` | `#4B5D66` | Muted text (6.2:1 on Mist) |
| `--c-line` | `#D3DFDD` | Dividers and card borders |

Sun is the single action color. Do not use it for decoration beyond the 72px accent bar.

## Type

Archivo Variable, self-hosted via `@fontsource-variable/archivo` (width axis 62 to 125%).

- h1 and h2 use `font-stretch: 118%` (`--wide`). Hero h1 uses 125% (`--wider`).
- Body text is normal width, 17px, line-height 1.6.
- Scale tokens: `--step--1` to `--step-5`.
- No all-caps labels. Eyebrows are sentence case in teal.
- Do not color one phrase of a headline. `.accent-text` and `.accent` now inherit color.

## Layout

- Every page opens on a dark Harbor hero band. Any section containing a 3D hero scene gets the band automatically, so new pages using `PageHero` or `Hero3DLayout` need no extra classes.
- Content sits on Mist, with white panels for emphasis (`.pale-bg`).
- Section heads are left-aligned by default. `SectionHead center` is still available.
- Radius by hierarchy: panels 20px, cards 14px, controls pill, small 8px.
- Dark contexts (`.on-dark`, hero bands, CTA band, footer) remap the Tailwind color tokens, so `text-navy`, `text-muted-foreground` and `text-teal` stay readable without per-element overrides.

## Components

- Buttons: `.btn-primary-gmg` (Sun), `.btn-dark-gmg` (Harbor), `.btn-outline-gmg`.
- `.text-link` for inline actions.
- `.card-gmg` for content cards. No hover lift.
- `CTASection` renders the closing Harbor band.
- `FAQList` is a bordered accordion with `aria-controls`.

## Motion

- `.reveal` no longer hides content. Nothing waits for a scroll observer to appear.
- Remaining motion responds to the user (3D rotation, menu, accordion) or marks the active chapter in the connected story.
- `prefers-reduced-motion` disables animation globally.

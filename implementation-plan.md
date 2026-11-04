# Independent — Implementation Plan

Companion to `website-brief.md`. Build order is designed so each phase ends with something viewable.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4 with design tokens as CSS variables; logical properties (`ms-`, `pe-`, etc.) for RTL readiness |
| CMS | Sanity (embedded Studio at `/studio`) |
| i18n | `next-intl`, `[locale]` route segment, `en` only at launch, `ar` added later |
| Motion | Lenis (smooth scroll) + GSAP/ScrollTrigger (reveals, carousel) or Motion for component-level animation |
| Maps | MapLibre GL with a custom cream/black style |
| Forms | Server Action → Resend (email routing), Cloudflare Turnstile, Zod validation |
| Media | Sanity image CDN via `next/image`; video on Mux or Cloudinary (or compressed MP4 on Vercel Blob) |
| Hosting | Vercel (preview deploy per branch) |
| Analytics | Plausible or GA4 |

---

## Phase 0 — Scaffolding
- Create Next.js app (TS, ESLint, Prettier), Tailwind, folder structure:
  `app/[locale]/(site)/...`, `components/ui`, `components/sections`, `lib/sanity`, `lib/motion`, `styles/tokens.css`.
- Set up `next-intl` with `en` locale and `dir` attribute on `<html>` (RTL-ready from day one).
- Init Sanity project + embedded Studio; env vars; preview/draft mode.
- Vercel project, preview deploys, domain staging.
- Placeholder media folder + a `placeholder()` helper so pages work before real assets arrive.

**Done when:** blank site deploys to a preview URL with Studio reachable.

## Phase 1 — Design system
- `tokens.css`: colors (`--paper`, `--card`, `--ink`, `--ink-muted`, `--line`, `--ink-inverse`), spacing scale, radii, fluid type scale (`clamp`), grid.
- Load fonts with `next/font`: Instrument Sans for everything (display, body, labels, nav); reserve an Arabic font slot.
- Base components: `Container`, `Grid`, `Heading` (display sizes), `Text`, `Label` (mono), `Button` (primary/ghost/link), `Tag/Chip`, `Media` (image/video with poster + lazy autoplay), `Logo` (black/white variants).
- Motion primitives: `<Reveal>` (text lines), `<ImageReveal>`, Lenis provider, reduced-motion hook.
- A `/styleguide` dev page showing all tokens and components.

**Done when:** styleguide page shows type, colors, buttons, cards and reveals.

## Phase 2 — CMS schemas & data layer
- Schemas: `brand`, `location`, `moment`, `person`, `job`, `enquiryRoute`, `siteSettings` (fields per brief §5), localizable string/text fields.
- GROQ queries + typed fetchers; ISR with on-demand revalidation via Sanity webhook.
- Seed script with placeholder data for the 7 brands, 34 SALT locations, ~15 moments, leadership.

**Done when:** pages can fetch real-shaped seeded data.

## Phase 3 — Global layout
- Header: logo, nav (Brands · About · Locations · Contact), "Partner with us" button; compact-on-scroll; inverted variant over hero; mobile full-screen menu.
- Footer: black block, cream logo, nav, brand list, countries, socials, legal.
- Page transition wrapper (fade + slide, respects reduced motion).
- 404 page.

## Phase 4 — Home
1. Hero: one-liner + full-bleed looping video montage (poster first, video after load).
2. Numbers strip with count-up.
3. **Brand carousel (Auge)**: infinite loop (GSAP ticker), pause on hover/focus, hovered card expands and reveals details; drag/swipe on touch; keyboard + pause button; static row when reduced motion.
4. The Independent way story block.
5. **Moments feed (Bruno cards)**: CSS masonry (columns) with S/M/L size hints, video cards play on hover/in view, "load more".
6. Partner CTA → `/contact?topic=partnership`.

**Done when:** full homepage works with placeholder data on desktop + mobile.

## Phase 5 — Brands
- `/brands`: Keypass-style 4:5 grid, filter chips (home-grown/franchise, country), hover image swap + brand-color tint.
- `/brands/[slug]`: hero, facts bar, story, Bruno-card gallery, brand locations (list + mini map), external links, partner CTA (preselects brand), next-brand link.
- `generateStaticParams`, per-brand OG image (`next/og`).

## Phase 6 — About & Leadership
- `/about`: intro, origin story, timeline (horizontal scroll desktop / vertical mobile), principles, numbers, teasers.
- `/leadership`: 4:5 portrait grid + side panel bio (accessible dialog).

## Phase 7 — Locations
- Filters (country, city, brand) synced to URL query.
- Desktop split: list + MapLibre map with brand markers; list ↔ marker hover sync.
- Mobile: list with map toggle.

## Phase 8 — Careers & Contact
- `/careers`: culture intro, jobs list from CMS (or external board link, per decision).
- `/contact`: topic picker → fields; prefill from query params (`topic`, `brand`); Zod validation; Turnstile; Server Action sends via Resend to the inbox from `enquiryRoute`; confirmation state; auto-reply email.
- Offices + general contact block.

## Phase 9 — SEO, accessibility, performance
- Metadata per route, OG images, `Organization` / `Restaurant` JSON-LD, `sitemap.xml`, `robots.txt`, redirects from old indpt.com URLs.
- Accessibility pass: keyboard paths, focus styles, carousel controls, alt/captions enforced in CMS, contrast checks on cream.
- Performance pass: LCP < 2.5s on 4G, video sizes, image `sizes`, font subsetting, Lighthouse ≥ 90.

## Phase 10 — Content, QA & launch
- Swap placeholders for real assets (shot list in brief §7).
- Cross-browser/device QA (Safari iOS, Chrome Android, desktop).
- Analytics + enquiry tracking events.
- Client CMS walkthrough + short editor guide.
- DNS cutover, monitor forms and 404s for the first week.

## Phase 11 — Arabic (post-launch)
- Add `ar` locale, translate CMS content, switch font to IBM Plex Sans Arabic, flip `dir="rtl"`.
- Mirror direction-aware motion (carousel direction, slide transitions).
- RTL QA on every template; language switcher in header.

---

## Dependencies on the client
| Needed for | Item |
|---|---|
| Phase 1 | Black SVG logo; font licensing decision |
| Phase 2 | Confirmed brand list, numbers, location list |
| Phase 4–5 | Brand logos, photos, video loops |
| Phase 6 | Leadership names, roles, portraits, bios; timeline facts |
| Phase 8 | Enquiry inbox mapping; careers approach |

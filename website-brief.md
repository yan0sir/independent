# Independent — Website Brief

Status: ideation, v1 (2 Nov 2026)
Current site: https://indpt.com
References: https://keypass.no · https://auge-xp.com · https://www.bruno.co

---

## 1. Purpose

### The business
Independent ("The Independent Food Company") is a hospitality group based in Saudi Arabia and the UAE, operating across the GCC. It creates and runs its own food brands and holds franchise rights.

- Home-grown brands (confirmed): **SALT** (flagship), **Somewhere**, **Public**, **Parker's**, **Shalwa**, **Kumo**
- Franchise: **Joe & The Juice** (exclusive franchisee, KSA)
- Scale (from current site, to confirm): **40+ branches**, **15+ years** in F&B, UAE, KSA and Qatar. SALT alone has 34 confirmed branches (25 UAE, 8 KSA, 1 Qatar)
- Origin story: SALT started in 2014 from an Airstream trailer on Dubai's Kite Beach

### What the site has to do
The current site is a dark, single-scroll page with uppercase copy and a contact form. The new site should present Independent as a **brand builder**: a group that creates concepts people line up for, and that partners can trust to open and run them.

Primary goals, in order:
1. **Partners & landlords** (malls, developers, franchise partners): show the brand portfolio, footprint, track record, and make it easy to start a partnership/leasing conversation.
2. **Investors & press**: credibility, story, leadership, numbers.
3. **Guests**: find a brand, see where it is, jump to its own site or socials.

Secondary: **Careers**, a simple page that lists roles or links out to a job board. Not a main focus.

### Success looks like
- A partner can understand "who they are, what they run, where, and how big" in under 30 seconds on the homepage.
- Every brand has a page strong enough to send to a landlord as a link.
- Enquiries arrive already sorted by type, country and brand.

---

## 2. Design direction

**Warm, light, editorial.** A cream paper base with black type. No accent color: the food photography and each brand's own colors bring the color. The tone is confident and a little playful (like Bruno's hero line) but never loud. Inspired by the layouts of Keypass and Bruno, with Auge's interactive carousel.

### What we take from each reference

| Reference | What we take | Where it goes |
|---|---|---|
| **Keypass** | The layout: dense, uniform grid of 4:5 portrait cards, bold uppercase name under each, small mono metadata. Minimal 3-item-feel nav, roster-first page. | Brands index, Leadership, Locations |
| **Auge** | The carousel: a looping horizontal row of project cards that **pauses on hover** and **reveals details** (name, category, extra info). | Home: brand carousel |
| **Bruno** | The layout and **cards**: a masonry feed of mixed-size cards (photo, short video, text) with a small title and a short line under each. Witty one-line hero. | Home: "moments" feed; brand detail galleries |

What we leave out: Auge's WebGL/canvas effects (too heavy for "rich but calm"), Bruno's tiny all-14px type (too quiet for a partner audience), Keypass's dark base (we're going light).

### Color

No accent. Black on cream, with brand colors only inside brand cards and brand pages.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F2EFE8` | Page background (warm cream) |
| `--card` | `#FAF8F3` | Card surfaces, form fields |
| `--ink` | `#141414` | Text, logo, buttons, borders on hover |
| `--ink-muted` | `#6B675F` | Secondary text, metadata |
| `--line` | `rgba(20,20,20,0.12)` | Dividers, card outlines |
| `--ink-inverse` | `#F2EFE8` | Text on photos/video, footer if inverted |
| `--brand` | per brand (CMS field) | Brand page tint, brand card hover |

Notes
- The supplied logo is **white**; we need a **black** version (SVG) for the light theme. Keep the white one for use over photos/video.
- Footer can flip to `--ink` background with cream text to close each page, the only "dark" moment.

### Typography

Three roles, echoing the wordmark (heavy grotesk "INDEPENDENT") and Keypass's condensed-plus-mono pairing. Open-source defaults are listed, with premium alternatives if budget allows.

| Role | Default (free) | Premium alternative | Use |
|---|---|---|---|
| Display | **Instrument Sans** (medium weight, tight tracking) | PP Neue Montreal | H1/H2, brand names on cards, big numbers. Sentence case. |
| Body | **Instrument Sans** | PP Neue Montreal | Paragraphs, nav, buttons |
| Label | **Instrument Sans** (small, uppercase, tracked) | PP Neue Montreal | Nav, tags, card metadata ("34 BRANCHES · UAE · KSA · QATAR"), form labels |
| Arabic (later) | **IBM Plex Sans Arabic** | 29LT Bukra / Effra Arabic | Arabic body + display; pairs with Plex Mono |

Scale (fluid, `clamp`): Display XL 64–144px · Display L 40–80px · H3 24–32px · Body 16–18px · Label 11–12px mono, uppercase, +4% tracking.

### Layout & grid
- 12-column grid, 16px gutters mobile / 24px desktop, side margins 16px → 40px.
- Max content width 1600px; feeds and grids run edge to edge within margins.
- Card ratios: **4:5** (Keypass portrait grid), **free height** (Bruno masonry), **3:4** for carousel cards.
- Generous vertical rhythm: sections separated by 120–200px on desktop.

### Motion ("rich but calm")
- Smooth scrolling (Lenis).
- Text: line-by-line reveal on headings when they enter the viewport.
- Images: soft clip/scale reveal (1.05 → 1) on enter.
- Carousel: continuous slow loop; **pauses on hover**, hovered card grows slightly and shows details; drag/swipe on touch.
- Cards: video cards play on hover (desktop) / when in view (mobile), muted.
- Page transitions: short fade + slide of content, logo stays fixed.
- Always respects `prefers-reduced-motion` (static, no autoplay loop).
- No WebGL, no cursor followers, no scroll-jacking.

### Voice
Short, confident, a little witty. Sentence case for body (the current all-caps paragraphs are hard to read); uppercase reserved for display type and labels. Example hero line direction: *"It started with a trailer on a beach. Now it's 40+ places people queue for."*

---

## 3. Sitemap

```
/                      Home
/about                 About (story, the Independent way, numbers, timeline)
/leadership            Leadership
/brands                Brands index
/brands/[slug]         Brand detail (×7)
/locations             Locations (filter by country, city, brand)
/careers               Careers
/contact               Contact (enquiry routing)
/privacy, /terms       Legal
```

Future (built for, not launched): `/ar/...` Arabic mirror of every route.

Main nav: **Brands · About · Locations · Contact** (Leadership and Careers under About and in the footer).

---

## 4. Page-by-page sections

### Home
1. **Header**: black logo left; nav right; "Partner with us" button. Becomes compact on scroll, inverts over the hero.
2. **Hero**: witty one-liner in display type + a full-bleed looping video/photo montage across the brands. Small mono line: "UAE · KSA · GCC".
3. **Numbers strip**: 40+ branches · 7 brands · 15+ years · 3 countries. Count-up on enter.
4. **Brand carousel (Auge)**: looping row of brand cards (photo + logo). Hover pauses the loop and reveals: brand name, cuisine/category, branch count, countries, "View brand →".
5. **The Independent way**: short story block (SALT trailer origin → group), one image, link to About.
6. **Moments feed (Bruno cards)**: masonry of mixed cards: new openings, signature dishes, pop-ups, press mentions, awards, short videos. Each card: media, small title, one line, optional link. Managed in CMS.
7. **Partner CTA**: "Have a space? Let's build something there." → Contact with "Partnership / leasing" preselected.
8. **Footer**: black block, logo (cream), nav, brand list, countries, socials, legal.

### About
1. Intro headline + paragraph (who we are).
2. Origin story: 2014 Kite Beach trailer, with archive photo.
3. Timeline: key openings/expansions by year (horizontal on desktop, vertical on mobile).
4. The Independent way: 3–4 principles (e.g. Imagination, Creativity, Innovation, Vision from the current site).
5. Numbers (reuse strip).
6. Leadership teaser → /leadership. Careers teaser → /careers.

### Leadership (Keypass grid)
- Intro line.
- Uniform 4:5 portrait grid: photo, NAME (display, uppercase), role (mono). Click/tap opens a side panel with a short bio and LinkedIn.

### Brands index (Keypass grid)
- Headline + one line.
- Filter chips (mono): All · Home-grown · Franchise · UAE · KSA.
- Uniform 4:5 grid of brand cards: hero photo, brand logo/name, mono metadata (category · branches · countries). Hover: image swaps to a second photo and the card takes the brand's color.

### Brand detail (×7)
1. Brand hero: full-bleed photo/video, brand logo, one-line positioning.
2. Facts bar (mono): founded · category · branches · countries.
3. Story: 1–2 paragraphs.
4. Gallery (Bruno cards): masonry of dishes, interiors, people, short clips.
5. Locations for this brand (list + mini map) → link to /locations filtered.
6. Links: brand website, Instagram, delivery apps.
7. Partner CTA ("Bring {Brand} to your space") → Contact with brand + topic preselected.
8. Next brand → (loops through brands).

### Locations (Keypass layout)
- Filters: country, city, brand.
- Split view on desktop: list (dense rows: brand · branch name · area · city · hours/link to maps) + map (MapLibre, custom cream/black style). Mobile: list with a "Map" toggle.

### Careers
- Short culture intro + 3–4 photos.
- Open roles: list from CMS (title, brand, city, type) or embed/link to an external job board (to decide).
- General application link.

### Contact (enquiry routing)
- Step 1, pick a topic: **Partnership / leasing** · **Franchise** · **Press & media** · **Careers** · **Guest feedback** · **Other**.
- Step 2, fields: name, email, phone (with country code), company (for partnership/press), country (UAE / KSA / other GCC), brand (optional), message.
- Each topic (and optionally country) routes to its own inbox (mapping set in CMS).
- Spam protection with Cloudflare Turnstile instead of the current mobile-number verification (less friction; keep SMS only if the client needs it).
- Also shown: office addresses (Dubai, Riyadh — to confirm), general email, socials.

---

## 5. Content model (CMS)

| Type | Key fields |
|---|---|
| Brand | name, slug, logo (SVG), brand color, type (home-grown/franchise), category, founded, countries, short line, story, hero media, gallery, links |
| Location | brand ref, name, city, country, address, coordinates, hours, map link, opening date |
| Moment (home feed card) | media (image/video), title, line, link, size hint (S/M/L), date, brand ref (optional) |
| Person | name, role, photo, bio, LinkedIn, order |
| Job | title, brand ref, city, country, type, link/description, active |
| Enquiry route | topic, country, recipient emails |
| Site settings | numbers strip values, hero media, socials, office addresses |

Branch counts on cards come from Location records automatically, so numbers stay true.

---

## 6. Requirements
- **Languages:** English at launch, built Arabic/RTL-ready (locale routing, CSS logical properties, mirrored layouts, Arabic font slot, CMS fields localizable).
- **Accessibility:** WCAG 2.2 AA; contrast on cream checked; keyboard-usable carousel with pause control; captions/alt text required in CMS.
- **Performance:** LCP < 2.5s on 4G; videos as short, compressed MP4/WebM loops with poster images; images via CDN with responsive sizes.
- **SEO:** per-page meta, OG images per brand, `Organization` + `Restaurant` structured data, sitemap.xml.
- **Analytics:** GA4 or Plausible; track enquiry submits by topic.
- **Hosting:** Vercel; CMS: Sanity.

---

## 7. Assets needed (none available yet)

Plan for placeholders now, with this shot list for the real assets:
- Black + white SVG versions of the Independent logo (bilingual lockup + English-only).
- Logos (SVG) for all 7 brands, with brand colors.
- Per brand: 1 hero image, 1 short loop (5–10s), 8–12 gallery images (dishes, interiors, people), 1 exterior.
- Group: hero montage video (15–30s), origin-story archive photo(s), team/culture photos.
- Leadership portraits, same background and crop (4:5).
- Full location list (brand, address, city, country, coordinates).
- Confirmed numbers (branches, years, markets) and the brand list.

## 8. Open items to confirm
- Branch lists for brands other than SALT; categories and stories for Shalwa and Kumo.
- Which markets beyond UAE/KSA to show.
- Careers: in-house job list vs external job board.
- Enquiry inbox mapping per topic/country.
- Font licensing budget (free defaults vs premium alternatives).

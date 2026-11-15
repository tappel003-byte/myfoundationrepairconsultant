# MFRC — AI Agent Instructions

My Foundation Repair Consultant is a free educational resource, created by
the owners of TLS Foundations and SandiaGEO (and, for Arizona, Foundation
Repair Advocate) — disclosed sitewide in the footer. "Independent" was
retired as a headline claim: a disclosure elsewhere on the site doesn't
cure a false express claim, so don't describe MFRC as independent anywhere
on-page or in these instructions. What's actually true, and still worth
saying, is the editorial practice below.

## Rules (non-negotiable)

1. **No sales CTAs** on MFRC pages — no call now, no lead forms, no pop-ups
2. **The footer is the sanctioned sitewide disclosure** — it names TLS
   Foundations and SandiaGEO (and, on Arizona pages, Foundation Repair
   Advocate) on every page. `/investigate-further` and its Arizona
   counterpart may also reference them for referral purposes. Don't add
   operating-company links anywhere else beyond these.
3. **Tone:** calm, technical, accessible — anti-fear, anti-urgency
4. **Be honest** when repair is NOT needed
5. **Do not rewrite existing article copy** unless asked — change layout, not words
6. **Never leave broken internal links**

## Page families

Read `PAGE-FAMILIES.md` before changing layout. Families:

- Orientation pair: Start Here + How the Industry Has Changed
- Repair methods: micropiles is canonical; helical and later methods copy it
- Technical reference hubs: Foundation Types, Material Behavior, Common Signs
- Dictionary: its own layout
- Knowledge Center indexes: Educational Articles + Industry Articles (accordion rows)
- Knowledge Center articles: paper layout via `src/pages/[...slug].astro`
- Regional pair: New Mexico pages share one look; Arizona pages share that same look

## Adding content

1. Add HTML to `content/extracted/{slug}.html`
2. Add entry to `content/extracted/manifest.json`
3. Run `npm run check-links`

## Design tokens

- Chile red `#c4160d` — thin left edge on glance bar and topic box only
- Teal `#2d9499` — text links (matches MFRC letters)
- Banner gray `#6b6b6b`
- Fonts: Source Serif 4 body, Playfair Display headings
- Nav dropdowns hover open and close on mouse leave
- Footer is quiet — no manifesto, no extra nav

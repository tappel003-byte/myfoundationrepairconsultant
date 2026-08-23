# MFRC — AI Agent Instructions

My Foundation Repair Consultant is an **independent educational resource**. Not a contractor. Not a sales funnel.

## Rules (non-negotiable)

1. **No sales CTAs** on MFRC pages — no "call now", no lead forms, no pop-ups
2. **Only `/investigate-further`** may link to Sandia GEO (`sandiageo.com`) and TLS Foundations (`tlsfoundations.com`)
3. **Tone:** calm, technical, accessible — anti-fear, anti-urgency
4. **Be honest** when repair is NOT needed — this is the differentiator
5. **NM/AZ regional specificity** is the SEO moat — use real geological detail

## Adding content

1. Add HTML file to `content/extracted/{slug}.html`
2. Add entry to `content/extracted/manifest.json`:
   ```json
   {
     "url": "/all-articles/your-slug",
     "slug": "your-slug",
     "title": "Article Title — My Foundation Repair Consultant",
     "description": "Meta description for SEO.",
     "type": "article",
     "file": "your-slug.html"
   }
   ```
3. Run `npm run check-links` — must pass before commit
4. Hub pages with micropiles-style UI: set `"type": "hub-custom"` and use classes from `src/styles/mfrc.css`

## Page types

| type | template | example |
|------|----------|---------|
| `hub-custom` | Full micropiles UI (accordions, glance bar) | `/micropiles` |
| `page` | Standard content block | `/start-here` |
| `article` | Standard content block under `/all-articles/` | articles |

## Under construction

For planned articles not yet written, add stub HTML:
```html
<div class="content-block under-construction">
<h2>Title</h2>
<p><em>Under construction.</em> ...</p>
</div>
```
Set `"status": "under-construction"` in manifest. **Never leave broken internal links.**

## Commands

```bash
npm run dev          # local preview
npm run build        # production build + link check
npm run extract      # re-pull from Squarespace (if still live)
npm run check-links  # validate internal links
```

## Design

- Black and white editorial palette
- Red (`#8b0000`) **only** for MFRC logo mark in header
- Fonts: Source Serif 4 (body), Playfair Display (headings), DM Mono (nav/labels)
- Micropiles page is the **canonical hub template**

## Strategic context

See `/cursor/stores/self/mfrc-strategy-context.md` in the agent environment for full business strategy (three-brand model, uncola positioning, engineer sharing loop).

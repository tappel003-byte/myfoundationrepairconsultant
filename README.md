# My Foundation Repair Consultant (MFRC)

Independent foundation repair education — not a contractor, not a sales funnel.

Built as a static site (Astro) for GitHub + Cloudflare Pages. Content extracted from the Squarespace site and maintained as HTML/Markdown in `content/extracted/`.

## LOCKED — Micropiles

`src/pages/micropiles.astro` is the approved visual standard.
Do not edit that file, `src/components/hub/HubPageShell.astro`, or `content/extracted/micropiles.html` unless Tim names a specific miss on the live page.
Shared CSS in `src/styles/mfrc.css` can change every hub including Micropiles. Treat layout rules as frozen unless a change is scoped so Micropiles does not move.

## Quick start

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build (runs link checker first)
npm run preview  # preview production build
```

## Content workflow

1. Edit files in `content/extracted/` or run `npm run extract` to re-pull from Squarespace
2. Update `content/extracted/manifest.json` when adding new pages
3. `npm run check-links` — fails if internal links are broken
4. Push to GitHub → Cloudflare Pages auto-deploys

## Cloudflare Pages setup (when ready)

1. Push this repo to GitHub
2. Cloudflare Dashboard → Pages → Create project → Connect GitHub
3. Build command: `npm run build`
4. Output directory: `dist`
5. Node version: 22
6. Add custom domain: `myfoundationrepairconsultant.com`

## Structure

- `content/extracted/` — page HTML + manifest.json
- `src/styles/mfrc.css` — design system (micropiles template)
- `src/pages/[...slug].astro` — dynamic routes from manifest
- `scripts/extract-content.py` — pull content from live Squarespace
- `scripts/check-links.mjs` — CI link validation

## Strategic note

MFRC stays pure education. Only `/investigate-further` links to Sandia GEO and TLS Foundations.

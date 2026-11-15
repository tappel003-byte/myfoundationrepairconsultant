# Ownership disclosure & footer — to-do

Full reasoning, the AI-council stress-test findings, and the TLS/SandiaGEO/
FRA side of this live in `MFRC-ECOSYSTEM-TODO.md` in the TLS-Foundation
repo — that's the master doc. This file is the MFRC-specific slice of it,
for working in this repo without needing the other one attached.

Decided: disclose common ownership (TLS Foundations, SandiaGEO, Foundation
Repair Advocate) rather than leave it unstated. Stress-tested across six AI
responses from four different systems — unanimous verdict, disclose.

## To-do

- [ ] Retire "independent educational resource" as the blanket sitewide
      label (in `AGENTS.md` and anywhere it appears on-page). It's an
      express claim, and disclosing ownership elsewhere doesn't cure an
      express claim that's false. Replace with accurate language about
      actual editorial practice (no CTAs, no lead forms, will say when
      repair isn't needed) — don't use "independent" as the headline.
- [ ] Add ownership disclosure in three layers:
  1. A single "Ownership & Editorial Practices" page.
  2. A short plain-text ownership note near article bylines, linking to
     that page.
  3. A specific inline note beside any actual mention of TLS, SandiaGEO,
     or FRA.
- [ ] Build a sitewide footer (none exists today — `BaseLayout.astro` has
      no `<footer>` at all):
  - Plain text naming TLS Foundations + SandiaGEO — same everywhere,
    regardless of region. Hyperlinks not required; one internal link to
    the Ownership & Editorial Practices page is enough.
  - Region-specific part is only which provider to actually contact (NM →
    TLS/SandiaGEO, AZ → Foundation Repair Advocate).
  - Decide whether it shows on Knowledge Center articles (`isArticle`
    pages in `[...slug].astro`) or only hub/structural pages.
- [ ] Consider turning `/investigate-further` into a genuine options
      directory (your own companies, disclosed, plus real guidance on
      vetting other local providers) rather than just a referral list.
- [ ] Retiring `/investigate-further` and `/investigate-further-arizona`
      is optional now, not required (zero organic traffic either way). If
      retired: remove from `SiteHeader.astro` nav, remove from
      `BaseLayout.astro`'s `quotePages`, fix the 6 inbound links
      (`foundation-behavior-in-arizona.astro`,
      `foundation-behavior-in-new-mexico.astro`, `know-before-you-sign.astro`,
      `start-here.astro`, plus the two pages' own cross-links), run
      `npm run check-links`.
- [ ] Amend `AGENTS.md`'s rule #2 ("only `/investigate-further` may link to
      operating companies") once the footer exists — otherwise the new
      footer contradicts this file's own rules.
- [ ] Do not create a Google Business Profile for MFRC.

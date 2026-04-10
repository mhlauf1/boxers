# Current Milestone

## Milestone 7: Polish & Launch Prep (Phase 1)

### Status
Phase 1 complete — ready for review

### Goals (Phase 1 — Pre-Alexis)
- ~~**Accessibility:** Global focus-visible styles, skip-to-content link~~
- ~~**Nav & mobile menu:** aria-expanded, focus trap, keyboard navigation, active page highlighting~~
- ~~**SEO:** Multi-location structured data (3 LocalBusiness JSON-LD), BreadcrumbList on all pages~~
- ~~**Hero cleanup:** Dynamic alt text from Sanity, fix double space~~
- ~~**404 & error pages:** Visual redesign with mascot illustrations, matching design system~~

### What's Done

**Accessibility (globals.css, layout.tsx):**
- Universal `*:focus-visible` rule — terracotta outline, 2px offset (replaces forest-only focus styles)
- Skip-to-content link as first child of `<body>` (sr-only, visible on keyboard focus)
- `id="main-content"` added to `<main>` element

**Nav & Mobile Menu (Header.tsx):**
- `aria-expanded` + `aria-controls` on hamburger button
- `aria-expanded` + `aria-haspopup` on desktop Services dropdown button
- `role="dialog"` + `aria-modal` + `aria-label` on mobile panel
- Focus trap in mobile menu (Tab wrapping at boundaries, Escape to close)
- Keyboard navigation for desktop dropdown (Enter/Space toggle, Escape close, ArrowDown/ArrowUp between items)
- `role="menu"` on dropdown panel, `role="menuitem"` on dropdown links
- Active page highlighting — terracotta text on desktop, terracotta left border accent on mobile
- Dynamic aria-label on hamburger ("Open menu" / "Close menu")

**SEO — Multi-Location Structured Data (layout.tsx):**
- `buildLocationJsonLd()` generates JSON-LD for all 3 locations
- PAW-PLEX: uses existing `localBusiness` structured data (full address fields)
- BEC: gets own LocalBusiness entry from `settings.locations[]`
- Meds & Fixits: gets `@type: "VeterinaryClinic"` (based on slug)
- Each rendered as separate `<script type="application/ld+json">`

**SEO — BreadcrumbList (services/[slug]/page.tsx, [slug]/page.tsx):**
- Service pages: Home > Services > {title}
- Generic pages: Home > {title}
- Base URL: `https://boxersbedandbiscuits.com`

**Hero Cleanup (Hero.tsx):**
- Hero image alt text now uses `heroImage.alt || heading || 'Hero image'` instead of hardcoded "Hero image"
- Fixed double space in className (`text-center  mx-auto` → `text-center mx-auto`)
- Added `alt` to HeroProps type for heroImage

**404 & Error Pages (not-found.tsx, error.tsx):**
- Large faded "404" text as visual anchor
- Decorative dog illustrations (hero-left-dog.png, hero-right-image.png) at low opacity
- `bg-cream` background matching site identity
- Button styles matching Button.tsx variants (rounded-lg, proper padding/tracking)
- error.tsx: same visual treatment with Try Again (primary) + Back to Home (outline) buttons

**`npm run build` passes.**

### What's Remaining (Phase 2 — Post-Alexis + Final Polish)
- Lighthouse performance audit (target 90+ all categories)
- Cross-browser testing
- Mascot illustrations placed throughout remaining site sections
- Final content review with stakeholders
- Domain migration plan (Cloudflare DNS, Vercel deployment, SSL)
- Final review with Brian / Lori / Alexis before go-live
- M6 Phase 2 content (staff photos, vet details, FAQs, webcam IDs — waiting on Alexis 4/2)

### Files Modified
- `frontend/app/globals.css` — Universal focus-visible styles
- `frontend/app/layout.tsx` — Skip-to-content, multi-location JSON-LD
- `frontend/app/components/Header.tsx` — Accessibility, keyboard nav, active page, focus trap
- `frontend/app/components/sections/Hero.tsx` — Dynamic alt text, double space fix
- `frontend/app/not-found.tsx` — Visual redesign
- `frontend/app/error.tsx` — Visual redesign
- `frontend/app/services/[slug]/page.tsx` — BreadcrumbList JSON-LD
- `frontend/app/[slug]/page.tsx` — BreadcrumbList JSON-LD

### Definition of Done (Phase 1)
- ~~Skip-to-content link works via keyboard~~
- ~~Focus rings visible on all interactive elements~~
- ~~Mobile menu traps focus and responds to Escape~~
- ~~Desktop dropdown navigable via keyboard~~
- ~~Active page highlighted in nav~~
- ~~3 LocalBusiness JSON-LD blocks in page source~~
- ~~BreadcrumbList on service and generic pages~~
- ~~Hero alt text dynamic~~
- ~~404 page matches site design~~
- ~~`npm run build` passes~~

### History
- 2026-04-10: Homepage enrichment spotlights added. Two new `splitContent` blocks inserted after Vet Spotlight: (1) **BEC Spotlight** — sand bg, image left, links to `/services/enrichment`, positions the Boxers Enrichment Center as a sub-brand alongside the Vet Clinic. (2) **Enrichment Programs** — cream bg, image right, links to `/services/daycare`, highlights the structured play and guided enrichment woven into regular daycare/boarding. Also published the previously draft-only `service-enrichment` doc (M4 drift — it had been seeded but never published, was blocking reference validation). Content-only change via Sanity MCP, no code touched. Homepage now has 13 pageBuilder blocks. Branch: `feature/homepage-enrichment-spotlights`. Build passes.
- 2026-03-29: M7 Phase 1 complete. Accessibility (focus styles, skip-to-content), nav polish (aria attrs, focus trap, keyboard nav, active page), SEO (multi-location JSON-LD with VeterinaryClinic type, BreadcrumbList), Hero cleanup (dynamic alt), 404/error page redesign. Build passes.

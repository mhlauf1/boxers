# Current Milestone

## Milestone 4: New Service Pages

### Status
Complete — ready for review

### Goals
- ~~Enrichment Center (BEC) page: Hero with BEC branding, enrichment vs. daycare explanation, pricing section ($45/day, $65/night, packages, New Client Intro offer), BEC location info, CTA~~
- ~~Vet Clinic (Meds & Fixits) page: Hero with Meds & Fixits branding, location info (Suite A, different phone/hours/email), pharmacy link, scaffolded with available content~~
- ~~Training page: Scaffolded with [PLACEHOLDER] content (waiting on Alexis), hero + basic structure~~

### What's Done

**Enrichment Center (BEC) Page — 5 sections:**
1. HeroSplit — "Boxers Enrichment Center" eyebrow, "A Premium, Individualized Experience" heading, BEC description from intake, Book Now + View Pricing CTAs
2. FeatureCards (6 features, dark mode) — Private Play Sessions, Guided Enrichment, Personalized Approach, Safe & Supportive, Separate Facility (4474 Braun Rd), New Client Intro Offer
3. PricingTable — Enrichment Daycare ($45/day, highlighted) and Enrichment Boarding ($65/night) as side-by-side tiers with feature lists and Book Now CTAs
4. PricingList — BEC packages (10-visit $390, 25-visit $900, 40-visit $1,325) + New Client Intro offer, 2-column layout, sand background
5. CtaBanner — "Ready to Experience Enrichment?" + Book Now CTA

**Vet Clinic (Meds & Fixits) Page — 4 sections:**
1. HeroSplit — "Boxers Meds & Fixits" eyebrow, "Veterinary Care Under One Roof" heading, location/description, Call 740-525-3333 + Online Pharmacy CTAs
2. FeatureCards (6 features, dark mode) — On-Site Clinic, Core Vaccinations, Routine Exams, Online Pharmacy, Convenient Hours, Integrated Care
3. SplitContent — "Visit Meds & Fixits" with full contact info (address, phone, fax, email, hours), Online Pharmacy link, sand background
4. CtaBanner — "Schedule a Visit" + Call CTA

**Training Page — 2 sections (scaffolded):**
1. HeroSplit — "Training" eyebrow, "Professional Dog Training" heading, [PLACEHOLDER] body noting content pending from Alexis, Book Now + Call CTAs
2. CtaBanner — "Interested in Training?" + Contact Us CTA

**All pages also received:**
- `heading` field for page detail display
- `tabCta` field for ServiceTabs homepage component
- Updated `shortDescription` (vet clinic and training had placeholders updated)

**All content published to Sanity production dataset.**
**`npm run build` passes.**
**No code changes needed — all content delivered via Sanity page builder blocks.**

### What's Remaining
- Commit context doc updates and push to `feature/new-services` branch
- Visual review in dev server
- Merge to main

### Notes
- BEC pricing uses static pricingTable + pricingList blocks (not interactive calculator). Interactive BEC calculator deferred to M5 pricing page.
- No new Sanity schema types were needed — all sections use existing block types (heroSplit, featureCards, pricingTable, pricingList, splitContent, ctaBanner).
- Images not yet added — components render gracefully without them.
- Training page is minimal scaffolding — content blocked on Alexis Foster (available 4/2).
- Vet clinic service details still pending — feature cards use available info + reasonable inferences from the on-site clinic model.

### Files Modified
- `context/current-milestone.md` — updated to M4
- `context/milestones.md` — M3 added to completed, M4 status updated
- `context/sanity-schema.md` — updated with BEC pricing notes

### Definition of Done
- ~~BEC page fully built with all available content and pricing~~
- ~~Vet Clinic page built with available info, clear placeholders for missing content~~
- ~~Training page scaffolded with placeholder blocks~~
- ~~All pages responsive~~
- ~~`npm run build` passes~~

### History
- 2026-03-26: BEC enrichment page seeded (5 sections: hero, features, pricing table, packages list, CTA). Vet clinic page seeded (4 sections: hero, features, contact info, CTA). Training page scaffolded (2 sections: hero, CTA). All published. Build passes.

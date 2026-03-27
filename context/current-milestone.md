# Current Milestone

## Milestone 3: Core Pages — Homepage & Core Services

### Status
Complete — ready for review

### Goals
- ~~Homepage: Hero, services tabs, stats bar, photo strip, BEC spotlight, Why Boxers differentiators, Vet Clinic spotlight, webcam section, testimonials, CTA banner~~
- ~~Daycare page: Hero, features grid, pricing calculator, CTA~~
- ~~Boarding page: Hero, features grid, pricing calculator, CTA~~
- ~~Grooming page: Hero, features grid, pricing calculator, CTA~~
- ~~Footer: Three-location contact block with hours/phone/email per location, social links (including YouTube)~~
- ~~Pricing data rewrite: Replace Hound Around rates with Boxers pricing model~~
- ~~All pages responsive~~

### What's Done

**Pricing Data Rewrite:**
- Rewrote `pricingData.ts` with Boxers pricing model:
  - Daycare: $39/day flat, 50% off additional dogs, packages 10/25/40 visits with expiration dates
  - Boarding: $59/night flat, 50% off additional dogs, no add-ons
  - Grooming: Exit baths by size (S $29, M $39, L $59, XL $69), 4 add-ons (nail trim $19, brush out $25, ear cleaning $15, anal glands $25)
- Updated `DaycareCalculator.tsx` — removed half-day option, new package options with expiration labels
- Updated `BoardingCalculator.tsx` — removed add-ons, simplified to dogs + nights
- Updated `GroomingCalculator.tsx` — exit baths by size + 4 add-ons, no mode toggle
- Updated `CalculatorInputs.tsx` — removed ModeToggle, removed HairType, cleaned up imports
- Fixed hardcoded Hound Around phone number (651-788-9797 → 740-423-7777) in ContactNotice

**Footer Three-Location Redesign:**
- Replaced single `contactInfo` column with `locations[]` block showing all three locations
- Each location card: name, address, phone (clickable), email (clickable), formatted hours
- Added YouTube to social links (SVG icon)
- Updated `layout.tsx` to pass `locations` prop instead of `contactInfo`

**Homepage Content (10 sections seeded):**
1. Hero — "Elevating Pet Care to a Higher Standard" + Book Now / View Pricing CTAs + trust line
2. ServiceTabs — references Daycare, Boarding, Grooming services
3. StatsBar — 2 Locations, 6+ Services, Live Webcams, Full-Service Pet Care Center
4. ImageRow — placeholder (images to be added via Studio)
5. SplitContent (BEC Spotlight) — enrichment center description, Learn More CTA → /services/enrichment
6. FeatureCards (Why Boxers) — 5 differentiators from intake with MDI icons, dark mode
7. SplitContent (Vet Spotlight) — Meds & Fixits description, Learn More CTA → /services/vet-clinic
8. WebcamPreview — "Peace of Mind" / "Live Webcams"
9. Testimonials — 4 reviews from intake form
10. CtaBanner — "Ready to Get Started?" + Book Now CTA

**Service Pages (3 pages seeded):**
- Each with: HeroSplit, FeatureCards (6 features each), PricingCalculator (single mode), CtaBanner
- Added `tabCta` and `heading` to all 3 core services for ServiceTabs component
- Daycare: "Structured Play & Purposeful Enrichment"
- Boarding: "Comfort, Care & Consistency Around the Clock"
- Grooming: "Patient, Personalized Grooming Care"

**All content published to Sanity production dataset.**
**`npm run build` passes.**
**No Hound Around references remaining in codebase.**

### What's Remaining
- Commit and push to `feature/core-pages` branch
- Visual review in dev server
- Merge to main

### Notes
- Images not yet added to Sanity — all image fields empty. Components render gracefully without images. Upload via Sanity Studio when photos are available.
- `yearEstablished` still null — waiting on Lori.
- OG image still not uploaded.
- Compact navbar logo variant still pending — flagged for Alexis (available 4/2).
- Testimonial author names still "Boxers Customer" — waiting on real names from Alexis.
- No new Sanity schema types were needed — all homepage sections use existing block types.

### Files Modified
- `frontend/app/data/pricingData.ts` — full rewrite with Boxers pricing
- `frontend/app/components/pricing/DaycareCalculator.tsx` — simplified for Boxers model
- `frontend/app/components/pricing/BoardingCalculator.tsx` — removed add-ons
- `frontend/app/components/pricing/GroomingCalculator.tsx` — exit baths + 4 add-ons
- `frontend/app/components/pricing/CalculatorInputs.tsx` — removed ModeToggle, HairType
- `frontend/app/components/Footer.tsx` — three-location layout + YouTube social
- `frontend/app/layout.tsx` — pass locations to Footer

### Definition of Done
- ~~Homepage fully built with all sections including BEC and Vet spotlights~~
- ~~Three core service pages populated with intake form content~~
- ~~Pricing calculators functional with Boxers rates~~
- ~~Footer displays all three location contact blocks~~
- ~~Mobile responsive~~
- ~~`npm run build` passes~~

### History
- 2026-03-26: Pricing data rewritten, calculators updated. Footer redesigned for 3 locations. Homepage seeded with 10 sections. Daycare, Boarding, Grooming service pages seeded with 4 sections each. All published. Build passes.

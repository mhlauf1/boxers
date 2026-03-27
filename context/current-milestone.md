# Current Milestone

## Milestone 2: Sanity Schema & Content Seeding

### Status
Complete — pending commit

### Goals
- ~~Evaluate Hound Around schemas for Boxers-specific additions~~
- ~~Extend settings schema with `locations` array for multi-location support~~
- ~~Add `youtube` to social links schema~~
- ~~Seed site settings (title, tagline, contact, locations, social, CTA, footer, localBusiness)~~
- ~~Seed 4 testimonials from intake form~~
- ~~Seed 6 service documents (daycare, boarding, grooming, enrichment, vet-clinic, training)~~
- ~~Seed 5 page documents (homepage, pricing, petcams, our-staff, employment)~~
- ~~Configure nav items with page references and services dropdown~~
- ~~Configure footer columns (Services + Quick Links) with document references~~
- ~~Update settingsQuery to fetch locations~~
- ~~Verify all GROQ queries return correct data~~
- ~~`npm run build` passes~~

### What's Done
- **Schema changes**: Added `locations[]` array to settings singleton (name, slug, address, phone, fax, email, hours, logo per location). Added `youtube` URL to `socialLinks`. Schema deployed to Sanity cloud.
- **Settings seeded** (`siteSettings`): Title, tagline, primary contactInfo (PAW-PLEX), 3 locations with full contact/hours, social links (Facebook, Instagram, YouTube), CTA button (Book Now → Gingr portal), footer tagline/text/link, localBusiness structured data (Kennel type, PAW-PLEX address/hours)
- **Nav items**: Services (auto-populates dropdown from servicesNavQuery), Pricing (→ page ref), Petcams (→ page ref), Our Staff (→ page ref)
- **Footer columns**: "Services" (6 href links to service pages), "Quick Links" (Pricing, Petcams, Our Staff, Employment as page refs)
- **4 testimonials** seeded with stable IDs (`testimonial-1` through `testimonial-4`)
- **6 services** seeded: Daycare, Boarding, Grooming, Enrichment (with descriptions from intake), Vet Clinic & Training (with [PLACEHOLDER] descriptions)
- **5 pages** seeded: Homepage, Pricing, Petcams, Our Staff, Employment (empty pageBuilder arrays — content blocks built in M3-M5)
- **GROQ query updated**: `settingsQuery` now fetches `locations[]` with logo expansion
- **All documents published** to production dataset
- **`npm run build` passes**

### What's Remaining
- Commit and push to `content/sanity-seed` branch
- Verify Vercel preview deployment

### Notes
- Node 22.12.0 required for `sanity schema deploy` (v20.19.0 was too old). Installed via nvm.
- Testimonials have no real author names — "Boxers Customer" used for all 4. Flag for Alexis to provide real names.
- Service pageBuilder arrays are empty — content blocks will be built in Milestones 3 and 4.
- Page pageBuilder arrays are empty — content blocks will be built in Milestones 3-5.
- `yearEstablished` left null — waiting on Lori.
- OG image not yet uploaded — no source image available.
- Compact navbar logo variant still pending — flagged for Alexis (available 4/2).
- The `price-data/*.csv` files and `pricingData.ts` still contain Hound Around pricing rates — full rewrite in Milestone 3.

### Files Modified
- `studio/src/schemaTypes/singletons/settings.tsx` — added `locations[]` + `youtube` social
- `frontend/sanity/lib/queries.ts` — added `locations` to `settingsQuery`

### Definition of Done
- ~~Settings schema extended for multi-location support~~
- ~~All "have now" content seeded in Sanity~~
- ~~Nav items configured with correct page references~~
- ~~Footer columns configured with service and page links~~
- ~~GROQ queries return correct data~~
- ~~`npm run build` passes~~

### History
- 2026-03-26: Schema extended (locations array, youtube social). All content seeded: settings with 3 locations, 4 testimonials, 6 services, 5 pages. Nav and footer configured with document references. All documents published. Build passes.

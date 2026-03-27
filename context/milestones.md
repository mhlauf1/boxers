# Milestones

## Overview

The Boxers website is built in milestones, not features. Each milestone represents a meaningful, deployable chunk of work. The site should be viewable on Vercel after every milestone.

**Target launch: April 13, 2026 (midnight)**

---

## Milestone 1: Foundation & Brand System

**Status:** Complete
**Branch:** `chore/foundation`

### Goals
- Strip all Hound Around-specific content, images, and references from the cloned codebase
- Implement the Boxers brand color system (orange, green, gold, cream palette from logos)
- Remove the three-theme toggle system from HAFH/Hound Around — Boxers uses a single brand identity
- Select and load font pairing (heading + body fonts that complement the mascot brand)
- Add the three mascot logos to `/public/illustrations/` and set up compact navbar logo variant
- Update all meta tags, site title, favicon, OG images for Boxers
- Update `.env` / `.env.example` with Boxers-specific values
- Set up new Sanity project/dataset and connect it
- Verify clean Vercel deployment

### What Was Done
- Audited entire codebase — found 16 files with hardcoded Hound Around strings, all replaced
- No HAFH multi-theme system existed (clean single-theme codebase)
- Brand colors: orange #E8872D, dark green #1B5E20, gold #D4A24E, cream #FAF6EF, sand #F0EBE3
- Fonts: Playfair Display (400 weight) headings + Rubik body
- Three mascot logos added, Hound Around illustrations removed
- Favicon paw print updated to brand orange
- Removed: vestigial tailwind.config.ts, content-guide.md, pricing-calculator.md
- Sanity project hw1f15qc connected with env files for both workspaces
- Build passes, dev server runs

### Definition of Done
- Site deploys to Vercel with no Hound Around references anywhere
- Brand colors render correctly across all existing components
- All pages render without errors (content can be placeholder)
- Mascot logos load and display at appropriate sizes
- No theme toggle widget or multi-theme CSS — single brand only

---

## Milestone 2: Sanity Schema & Content Seeding

**Status:** Complete
**Branch:** `content/sanity-seed`

### Goals
- Evaluate Hound Around schemas for Boxers-specific additions (multi-location contact info, membership pricing, enrichment center, vet clinic, employment)
- Seed all "have now" content into Sanity:
  - Site settings (title, tagline, nav items, CTA, footer, contact info for all three locations, social links)
  - All pricing data (daycare, boarding, BEC, packages with expirations, memberships, grooming, add-ons)
  - Service descriptions (daycare, boarding, grooming, enrichment)
  - Facility highlights (5 differentiators)
  - Testimonials (4 provided)
  - Booking info (Gingr portal URL)
- Upload mascot logos and available facility photos to Sanity media library
- Verify all GROQ queries return correct data

### What Was Done
- Extended settings schema with `locations[]` array (name, slug, address, phone, fax, email, hours, logo per location)
- Added `youtube` URL to `socialLinks` schema
- Seeded settings singleton with all brand info, 3 locations with full contact/hours, social links, CTA, footer config, localBusiness structured data
- Seeded 4 testimonials, 6 services (daycare, boarding, grooming, enrichment, vet-clinic, training), 5 pages (homepage, pricing, petcams, our-staff, employment)
- Configured nav items with page references and auto-populating Services dropdown
- Configured footer columns (Services + Quick Links) with document references
- Updated settingsQuery to fetch locations
- All documents published to production dataset
- Pricing data seeding deferred to Milestone 3 (hardcoded in pricingData.ts, not Sanity)
- Logo/photo upload to Sanity media library deferred to Milestone 3 (when building page sections)

### Definition of Done
- ~~Sanity Studio loads with all seeded content~~
- ~~All content renders on the site through GROQ queries~~
- No hardcoded content in components — everything from Sanity (pricing data is the exception — handled in M3)

---

## Milestone 3: Core Pages — Homepage & Core Services

**Status:** Not Started
**Branch:** `feature/core-pages`

### Goals
- **Homepage:** Hero, services tabs (Daycare/Boarding/Grooming), stats bar, photo strip, BEC spotlight (NEW), Why Boxers differentiators, Vet Clinic spotlight (NEW), webcam section, testimonials, CTA banner
- **Daycare page:** Hero, features grid, pricing calculator (adapted for Boxers rates + packages), CTA
- **Boarding page:** Hero, features grid, pricing calculator, CTA
- **Grooming page:** Hero, service menu, pricing by size, add-ons list, CTA
- **Footer:** Three-location contact block with hours/phone/email per location, social links, Embark line
- **Pricing data rewrite:** Replace Hound Around rates in `pricingData.ts` with Boxers pricing model
- All pages responsive across desktop, tablet, mobile

### Definition of Done
- Homepage fully built with all sections including new BEC and Vet spotlights
- Three core service pages populated with intake form content
- Pricing calculators functional with Boxers rates
- Footer displays all three location contact blocks
- Mobile responsive
- `npm run build` passes

---

## Milestone 4: New Service Pages

**Status:** Not Started
**Branch:** `feature/new-services`

### Goals
- **Enrichment Center (BEC) page:** Hero with BEC mascot, enrichment vs. daycare explanation, pricing section ($45/day, $65/night, packages, New Client Intro offer), BEC location info (4474 Braun Rd, hours), CTA
- **Vet Clinic (Meds & Fixits) page:** Hero with Meds & Fixits mascot, location info (Suite A, different phone/hours/email), pharmacy link, scaffolded with `[PLACEHOLDER]` for service details (waiting on Alexis)
- **Training page:** Scaffolded with `[PLACEHOLDER]` content (waiting on Alexis), hero + basic structure

### Definition of Done
- BEC page fully built with all available content and pricing
- Vet Clinic page built with available info, clear placeholders for missing content
- Training page scaffolded with placeholder blocks
- All pages responsive
- `npm run build` passes

---

## Milestone 5: Supporting Pages

**Status:** Not Started
**Branch:** `feature/supporting-pages`

### Goals
- **Pricing page:** Comprehensive pricing layout — tabbed or segmented: PAW-PLEX (daycare + boarding + packages), BEC (enrichment daycare + boarding + packages + New Client Intro), Memberships (Play + Premier tiers with feature comparison), Grooming (exit baths by size + add-ons)
- **Petcams page:** Mirror Hound Around's webcams page pattern, scaffolded for webcam embeds
- **Our Staff page:** Team grid with photos, names, roles — scaffolded with available photos, `[PLACEHOLDER]` for missing bios
- **Employment page:** Description of working at Boxers, contact CTA (BoxersGM1@outlook.com)

### Definition of Done
- Pricing page displays all service pricing in an organized, scannable layout
- Petcams page scaffolded
- Our Staff page scaffolded with available photos
- Employment page built
- All pages responsive
- `npm run build` passes

---

## Milestone 6: Content Finalization

**Status:** Not Started
**Branch:** `content/finalize`

### Goals
- Fill content gaps from Alexis Foster (available starting 4/2):
  - Training page content
  - Vet clinic service details
  - Our Staff bios and any additional team photos
  - Service-specific FAQs for each service page
  - Daily schedule timelines for daycare and boarding
  - Vaccination / health requirements
  - Any additional facility photos
- Add FAQ accordions to service pages once content is received
- Add "How it works" timeline sections to daycare and boarding once daily schedules are provided
- Fill in any remaining `[PLACEHOLDER]` markers
- Embed YouTube videos where appropriate

### Definition of Done
- All `[PLACEHOLDER]` markers replaced with real content (or confirmed as not needed)
- FAQ sections populated
- Timeline sections added to service pages
- All content reviewed for accuracy

---

## Milestone 7: Polish & Launch Prep

**Status:** Not Started
**Branch:** `feature/polish`

### Goals
- SEO optimization (meta tags, structured data, sitemap.xml, robots.txt, LocalBusiness schema for all three locations)
- Performance audit (Lighthouse 90+ all categories)
- Accessibility audit (WCAG AA compliance)
- Cross-browser testing
- Custom 404 page
- Mascot illustrations and decorative elements placed throughout site
- Final content review with stakeholder approval
- Nav finalization (services dropdown, top-level links, Gingr CTA, mobile menu)
- Domain migration plan (Cloudflare DNS, Vercel deployment, SSL)
- Final review with Brian / Lori / Alexis before go-live

### Definition of Done
- Lighthouse 90+ across all categories
- All content approved by stakeholders
- DNS cutover plan documented and ready
- No `[PLACEHOLDER]` markers remaining
- Site ready for midnight April 13 launch

---

## Completed Milestones

- **Milestone 1: Foundation & Brand System** — 2026-03-26. Codebase stripped of Hound Around content, brand colors/fonts implemented, mascot logos added, Sanity project connected.
- **Milestone 2: Sanity Schema & Content Seeding** — 2026-03-26. Settings schema extended for multi-location, all content seeded (settings, 4 testimonials, 6 services, 5 pages), nav/footer configured.

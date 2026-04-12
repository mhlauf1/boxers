# Sanity Schema Reference

> **This file is a living document.** Update it whenever the Sanity schema changes so Claude Code always has an accurate picture of the content model.

## Status

Connected to Boxers Sanity project. Schema deployed to cloud. Extended with `locations[]` array for multi-location support and `youtube` social link. All content seeded (settings, 4 testimonials, 6 services, 5 pages).

## Sanity Project Details

- **Project ID:** `hw1f15qc`
- **Dataset:** `production`
- **Studio URL:** `http://localhost:3333` (dev) / embedded at `/studio` in frontend
- **API version:** `2025-09-25`

## Architecture

This is a **page builder** architecture. Pages and services have a `pageBuilder` array field that accepts 40+ block types. There are no standalone `pricingTier` or `faq` documents — pricing, FAQs, team members, and feature cards are all inline arrays within pageBuilder blocks.

The only standalone reference documents are `testimonial` and `webcam`.

## Document Types

### `settings` (singleton)
Global site config: title, tagline, logo, nav items, CTA button, footer columns, contact info, **locations array**, social links (including YouTube), business hours, SEO (OG image, favicon, GA4, GTM, GSC), local business structured data.

**`locations` field (added for Boxers):** Array of location objects, each with: `name` (string, required), `slug` (string), `address` (text), `phone`, `fax`, `email`, `hours` (array of `{days, open, close}`), `logo` (image with alt). Currently seeded with 3 entries: PAW-PLEX, BEC, Meds & Fixits. Used for the three-location footer and per-location structured data.

**`socialLinks`** now includes `youtube` (url) alongside facebook, instagram, google.

### `page`
Generic pages (homepage, pricing, petcams, our-staff, employment). Fields: name, slug, seo, pageBuilder (44 block types).

### `service`
Service detail pages (daycare, boarding, grooming, enrichment, vet-clinic, training). Fields: title, slug, sticker, shortDescription, tabImage, tabCta, heading, seo, pageBuilder (37 block types).

**Boxers note:** Enrichment, vet-clinic, and training are new service types not in Hound Around. Location-specific contact info (BEC address/hours, Meds & Fixits phone/hours) is stored in `settings.locations` and can be queried by slug — no additional fields needed on the `service` schema.

### `testimonial`
Customer reviews. Fields: quote, authorName, authorLabel, rating (1-5, default 5).

### `webcam`
Live webcam config. Fields: name, cameraId, group (indoor/outdoor), sortOrder, enabled.

## Key Object Types (PageBuilder Blocks)

- `hero` / `heroSplit` / `heroBanner` / `heroMinimal` — Hero sections
- `featureCards` / `featureGrid` / `featureList` — Feature displays
- `pricingTable` / `pricingList` / `pricingMatrix` / `pricingCalculator` / `pricingPageTabs` — Pricing
- `faqAccordion` — Inline Q&A (not standalone documents)
- `testimonials` — References `testimonial` documents
- `teamGrid` — Inline team members (name, role, bio, certifications, image)
- `serviceTabs` / `serviceCards` — Service displays (reference `service` documents)
- `contactForm` — Dynamic form builder
- `galleryGrid` / `galleryCarousel` / `galleryShowcase` / `galleryPage` — Gallery
- `processSteps` / `whatsIncluded` / `requirementsList` — Lists/timelines
- `splitContent` / `contentColumns` — Content layouts
- `callToAction` / `ctaBanner` / `ctaStrip` — CTAs
- `statsBar` — Stats counter
- `webcamPreview` / `webcamGrid` — Webcam displays
- `iconGrid` / `valuePillars` / `logoBar` — Misc
- `locationDetails` — Visit/contact card for one facility location. Takes a `locationSlug` and pulls address, phone, fax, email, and hours directly from `settings.locations[]` via a GROQ join (`"location": *[_type == "settings"][0].locations[slug == ^.locationSlug][0]`). Renders a structured info-card grid (address, hours, phone, email) plus auto-generated Call / Get Directions CTAs, an optional third external CTA, and a mascot panel beside it. Used on the Vet Clinic page; reusable for BEC or any future single-location spotlight. Fields: `eyebrow`, `heading`, `intro` (blockContentTextOnly), `locationSlug`, `mascotImage`, `mascotCaption`, `externalCtaLabel`, `externalCtaLink`, `backgroundColor`.

### Potential new block types for Boxers
- **`membershipComparison`** — Side-by-side comparison of Boxers Play vs. Boxers Premier membership tiers with feature lists and pricing. The current `pricingTable` or `pricingMatrix` may handle this, but evaluate whether a dedicated block type is cleaner
- **`employmentCta`** — Simple job listing / employment callout. Could also be handled with existing `ctaBanner` + `splitContent`

## Reusable Object Types

- `link` — Flexible link (internal page/service reference or external URL)
- `button` — Button with text + link
- `blockContent` — Rich text (Portable Text)
- `blockContentTextOnly` — Text-only rich text
- `seo` — Per-page SEO overrides (metaTitle, metaDescription, ogImage, noIndex)

## GROQ Query Patterns

All queries live in `frontend/sanity/lib/queries.ts`.

```groq
// Homepage
*[_type == 'page' && slug.current == 'homepage'][0]{ ... }

// Page by slug
*[_type == 'page' && slug.current == $slug][0]{ ... }

// Service by slug
*[_type == 'service' && slug.current == $slug][0]{ ... }

// Settings (singleton)
*[_type == 'settings'][0]{ ... }

// Services for nav
*[_type == 'service']{ title, "slug": slug.current }
```

## Pricing Calculator

The pricing calculator (`pricingCalculator` block type) has a `calculatorType` field (`daycare` | `boarding` | `grooming`) and supports `single` or `tabbed` display mode. **Actual pricing data is hardcoded in `frontend/app/data/pricingData.ts`**, not in Sanity. The Sanity block only configures which calculator to show and the CTA link.

**Boxers note:** The pricing data file was rewritten in Milestone 3 with Boxers rates:
- Daycare: $39/day flat (no half day), packages 10/25/40 visits with expiration dates, 50% off additional dogs
- Boarding: $59/night flat, 50% off additional dogs, no add-ons
- Grooming: exit baths by size (S $29, M $39, L $59, XL $69), 4 add-ons (nail trim $19, brush out $25, ear cleaning $15, anal glands $25)
- BEC pricing ($45/day, $65/night, packages) displayed on enrichment page via `pricingTable` + `pricingList` blocks (M4). Interactive BEC calculator and Memberships (Play $450/mo, Premier $599/mo) deferred to M5 pricing page

## Seeded Content (Milestones 2–6)

### Document IDs
- **Settings:** `siteSettings` (singleton)
- **Testimonials:** `testimonial-1` through `testimonial-4`
- **Services:** `service-daycare`, `service-boarding`, `service-grooming`, `service-enrichment`, `service-vet-clinic`, `service-training`
- **Pages:** `page-homepage`, `page-pricing`, `page-petcams`, `page-our-staff`, `page-employment`

### What's seeded
- **Settings:** title, tagline, contactInfo, 3 locations with hours, socialLinks (incl YouTube), ctaButton, footerTagline/Text/TextLink, footerColumns (Services + Quick Links), navItems (4 items), localBusiness structured data
- **Testimonials:** 4 quotes from intake form (author: "Boxers Customer" — real names TBD)
- **Homepage (M3, updated M6, M7.2):** 13 pageBuilder blocks — heroMarquee, campusOverview, serviceTabsSidebar, Vet Spotlight (splitContent, sand, image right), **BEC Spotlight** (splitContent, sand, image left — NEW M7.2), **Enrichment Programs** (splitContent, cream, image right — NEW M7.2), Why Boxers (featureCards), statsBar ("Since 2011"), galleryCarousel, testimonials, spacer, ctaBanner, spacer
- **Daycare (M3):** HeroSplit, FeatureCards (6), PricingCalculator (daycare, single mode), CtaBanner
- **Boarding (M3):** HeroSplit, FeatureCards (6), PricingCalculator (boarding, single mode), CtaBanner
- **Grooming (M3):** HeroSplit, FeatureCards (6), PricingCalculator (grooming, single mode), CtaBanner
- **Enrichment/BEC (M4):** HeroSplit, FeatureCards (6), PricingTable ($45/day + $65/night tiers), PricingList (3 packages + New Client Intro), CtaBanner
- **Vet Clinic (M4):** HeroSplit (call + pharmacy CTAs), FeatureCards (6), SplitContent (contact info), CtaBanner
- **Training (M4, updated M6):** HeroSplit (Amanda Ingraham / Band of Canines content), FeatureCards (6 training programs — NEW M6), CtaBanner
- **Pricing (M5):** HeroMinimal, PricingPageTabs (PAW-PLEX 3-tab: daycare tiers + boarding tier + grooming matrix, all with calculators), PricingTable (BEC rates), PricingList (BEC packages, 2-col sand), PricingTable (Memberships Play vs Premier), CtaBanner
- **Employment (M5, updated M6):** HeroMinimal, SplitContent (real benefits: competitive pay, medical/dental/vision, discounted pet services, positions), CtaBanner (mailto CTA)
- **Our Staff (M5, updated M6):** HeroMinimal, TeamGrid (3 real: Lori Shultz GM, Alexis Foster Marketing, Haley Gates Reception + 3 placeholder roles), CtaBanner (link to employment)
- **Petcams (M5):** HeroMinimal, WebcamGrid, CtaBanner
- **Webcams:** 4 placeholder documents (2 indoor, 2 outdoor), all `enabled: false` — real camera IDs needed from facility team

## Notes

- Keep schemas structurally aligned with Hound Around for future multi-site template extraction
- Don't add fields you don't need yet — only add what the current content requires
- When adding Boxers-specific schema types, document them clearly so they can be evaluated for the shared template
- Schema deployed to cloud via `npx sanity@latest schema deploy` from `studio/` directory (requires Node >=20.19.1 or >=22.12)
- The `locations[]` field in settings is the Boxers-specific addition — a generic pattern any Embark site can use (single-location sites have one entry)

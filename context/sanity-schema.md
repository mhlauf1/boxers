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

### Potential new block types for Boxers
- **`membershipComparison`** — Side-by-side comparison of Boxers Play vs. Boxers Premier membership tiers with feature lists and pricing. The current `pricingTable` or `pricingMatrix` may handle this, but evaluate whether a dedicated block type is cleaner
- **`locationSpotlight`** — A section block for the BEC and Vet Clinic homepage spotlights: mascot logo, description, location-specific contact info, CTA. Could be built with existing `splitContent` or may warrant its own type
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

**Boxers note:** The pricing data file currently contains Hound Around's rates and will need a full rewrite in Milestone 3:
- Daycare: $39/day flat (no half day), packages 10/25/40 visits with expiration dates
- Boarding: $59/night flat, additional dogs 50% off
- BEC: $45/day enrichment daycare, $65/night enrichment boarding, own packages
- Memberships: Play $450/mo, Premier $599/mo with feature lists
- Grooming: exit baths priced by size (Small/Medium/Large/XL), add-ons (nail trim $19, brush out $25, ear cleaning $15, anal glands $25)
- Multi-dog discounts: 50% off additional dogs (daycare/boarding), 20% off memberships

## Seeded Content (Milestone 2)

### Document IDs
- **Settings:** `siteSettings` (singleton)
- **Testimonials:** `testimonial-1` through `testimonial-4`
- **Services:** `service-daycare`, `service-boarding`, `service-grooming`, `service-enrichment`, `service-vet-clinic`, `service-training`
- **Pages:** `page-homepage`, `page-pricing`, `page-petcams`, `page-our-staff`, `page-employment`

### What's seeded
- Settings: title, tagline, contactInfo, 3 locations with hours, socialLinks, ctaButton, footerTagline/Text/TextLink, footerColumns (Services + Quick Links), navItems (4 items), localBusiness structured data
- Testimonials: 4 quotes from intake form (author: "Boxers Customer" — real names TBD)
- Services: 6 documents with titles, slugs, shortDescriptions (enrichment has full description, vet-clinic and training have [PLACEHOLDER])
- Pages: 5 documents with names and slugs (empty pageBuilder arrays — content blocks in M3-M5)

## Notes

- Keep schemas structurally aligned with Hound Around for future multi-site template extraction
- Don't add fields you don't need yet — only add what the current content requires
- When adding Boxers-specific schema types, document them clearly so they can be evaluated for the shared template
- Schema deployed to cloud via `npx sanity@latest schema deploy` from `studio/` directory (requires Node >=20.19.1 or >=22.12)
- The `locations[]` field in settings is the Boxers-specific addition — a generic pattern any Embark site can use (single-location sites have one entry)

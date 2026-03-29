# Project Overview

## What This Is

This is the website for **Boxers Bed & Biscuits**, a full-service pet care campus located at 1301 Washington Blvd., Belpre, OH 45714. The site lives at **boxersbedandbiscuits.com**.

Boxers is unique in the Embark portfolio because it operates as **three businesses under one roof**, each with its own branding and mascot character:

1. **Boxers Bed & Biscuits (PAW-PLEX)** — Main facility: daycare, boarding, grooming, training
2. **Boxers Enrichment Center (BEC)** — Separate location at 4474 Braun Rd: private play, guided enrichment (formerly "The Brat Pack," currently being rebranded)
3. **Boxers Meds & Fixits** — Veterinary clinic at 1301 Washington Blvd., Suite A

All three share one website but have distinct contact info, hours, phone numbers, and email addresses.

Boxers Bed & Biscuits is one of ~10 facilities in the **Embark Pet Services** portfolio, a pet care roll-up platform operated by **Cadence Private Capital**. Lauf Studio (lauf.co) owns the design system, tech stack, and infrastructure for all Embark portfolio websites.

## Repository Origin

**This repo was cloned from the Hound Around Resort codebase** (`mhlauf1/hound-3` on GitHub), the first Embark site we built and the design/technical reference for all future builds. The git history was wiped for a clean start — this is its own repo (`mhlauf1/boxers-bed-biscuits`), not a GitHub fork.

### How this repo was created

```bash
git clone https://github.com/mhlauf1/hound-3.git boxers-bed-biscuits
cd boxers-bed-biscuits
rm -rf .git
git init
git add .
git commit -m "Initial commit from Hound Around design system"
git remote add origin https://github.com/mhlauf1/boxers-bed-biscuits.git
git branch -M main
git push -u origin main
```

### What this means in practice

**Right now, this repo IS the Hound Around website.** Every page, every component, every meta tag, every image, every piece of copy, every pricing calculator, every Sanity connection, every env var — all of it is Hound Around's. This is not a blank slate with some leftover references. This is a fully built, fully populated Hound Around site that needs to be completely gutted of all Hound Around content and rebuilt as Boxers.

What we **gut and replace** (the content/brand layer):
- All user-facing copy, headlines, descriptions, page titles
- All meta tags, OG images, favicons, structured data
- All images, image alt text, and illustration assets
- All pricing data (hardcoded in data files, not Sanity)
- All contact info (phone numbers, emails, addresses, hours)
- The Sanity project connection (new project/dataset for Boxers)
- The color palette and font pairing
- Any multi-theme system (toggle widget, multiple CSS theme sets, theme switching logic) — Boxers uses one brand identity
- Nav structure (6 services instead of 3, different top-level links)
- Footer (three-location contact block instead of one)
- `.env` values, API keys, project IDs
- Any HAFH (Home Away From Home) references if the clone came through that fork

What we **keep and adapt** (the engineering layer):
- Component architecture and file organization
- Sanity schema patterns and GROQ query structure
- Page builder block system
- Layout systems and responsive patterns
- Animation patterns (Framer Motion)
- Next.js app router structure and data fetching patterns
- Build tooling and deployment config (adapted for Boxers)

- Boxers has significantly more pages and content complexity than Hound Around due to the three sub-brands, richer pricing model, and additional service offerings (enrichment, vet clinic, training, staff, employment)
- The Sanity schemas are copied from Hound Around and will likely need additions (enrichment center, vet clinic, employment page, memberships) but should stay structurally aligned for future multi-site template extraction

### Critical rules for this repo

- **Never reference Hound Around in user-facing content.** No leftover copy, image alt text, meta tags, or comments mentioning Hound Around, Cottage Grove, or any Hound Around-specific details
- **Never hardcode Hound Around URLs, Sanity project IDs, or API keys.** All environment-specific values must come from `.env`
- **Preserve component architecture.** When modifying a component, keep the same prop interface and data-fetching pattern unless there is a clear reason to change it. These patterns will become a shared template
- **Document any structural divergence.** If Boxers requires a component or page pattern that Hound Around doesn't have (e.g., BEC spotlight, vet clinic page, membership tiers, employment page), note it clearly so it can be backported to the template later

## The Embark Network Context

Boxers is the **second full site build** in the Embark portfolio (after Hound Around). Decisions made here directly impact future builds:

- **Barks & Rec** (Hastings, MN) — future
- **Kingdom Canine** (Pacific, MO) — future
- **Wags Stay N Play** (Moorhead, MN) — in queue
- **Canine Country Club** (West Des Moines, IA) — migration only, no rebuild
- **Home Away From Home** (Fargo, ND) — paused, resuming after Boxers ships
- **Rio Grooming School & Salon** (Hastings, MN) — future

The long-term goal is extracting a shared Embark site template where each location is a config layer (design tokens + CMS content) on top of a common component library. Boxers is a critical data point because it's the most complex facility in the portfolio — if the template can handle Boxers, it can handle anything.

## Tech Stack

| Category | Choice |
|----------|--------|
| Framework | Next.js (React 19) |
| Language | TypeScript |
| CMS | Sanity.io |
| Hosting | Vercel |
| DNS | Cloudflare (migration pending) |
| CSS | Tailwind CSS v4 |
| Animations | Framer Motion |
| Fonts | Google Fonts |
| Current hosting | Wix (managed by Biztec — being replaced) |

## Design System

Unlike HAFH (which had three selectable themes during development), Boxers has **established brand identity** from their mascot logo system. The design direction is: **clean, modern layout with mascot-driven personality** — the Hound Around template gives us the professional bones, and the Boxers mascots bring the character.

### Brand Identity

Boxers has three mascot logos — the same boxer dog character in different outfits:

1. **Boxers Bed & Biscuits** — Tuxedo-wearing boxer dog. Tagline: "A Fine Hotel and Spa for Dogs and Cats"
2. **Boxers Enrichment Center** — Orange hoodie & cargo shorts boxer dog (casual, active energy)
3. **Boxers Meds & Fixits** — Lab coat & stethoscope boxer dog. Tagline: "A Veterinary Service for Dogs & Cats"

All three logos share the same illustration style and typography treatment (orange "Boxers" wordmark with paw print in the 'o', green ribbon banner below).

### Color Palette (derived from brand logos)

| Token | Color | Usage |
|-------|-------|-------|
| Primary | Orange (~#E8872D) | Headings, CTAs, primary buttons — from the "Boxers" wordmark |
| Secondary | Dark green (~#1B5E20) | Accents, ribbon banners, secondary elements |
| Accent | Gold/yellow (~#D4A24E) | Stars, highlights, decorative accents |
| Surface | Cream/warm white (~#FAF6EF) | Page backgrounds |
| Surface Alt | Light warm gray (~#F0EBE3) | Card backgrounds, alternating sections |
| Text | Dark charcoal (~#2A2520) | Body text |
| Text Muted | Warm gray (~#6B6560) | Secondary text, captions |

These values should be refined when implementation begins — pull exact values from the logo files. The key principle is that the palette comes from the existing brand, not a new invention.

### Typography

- **Headings:** A bold, warm font that complements the logo's energy without competing with it. Consider Plus Jakarta Sans (bold weights), Outfit, or similar — nothing too editorial (that was Hound Around's vibe), nothing too playful (the logos handle that)
- **Body:** Clean, readable sans-serif. Inter, DM Sans, or similar
- Font pairing should feel professional but approachable — matching the "split the difference" design direction

### Logo Usage

The full mascot + wordmark logos are complex and won't work in the navbar at standard sizes. We need:
- **Navbar:** Compact version — either the wordmark only (no character) or the character head as an icon. The main B&B logo is the default; BEC and Meds & Fixits logos appear on their respective pages
- **Hero / Page headers:** Full mascot + wordmark can be used at larger sizes
- **Footer:** Wordmark version
- **Favicon:** Paw print from the 'o' in "Boxers" or the character head

If compact logo versions don't exist, flag it as a need for the facility team (Alexis Foster, marketing director).

### Illustration System

The three mascot characters can serve as the illustration/sticker system throughout the site (similar to Hound Around's sticker badges). Each sub-brand's mascot appears on its relevant pages and sections. Additional illustrative elements (paw prints, bones, tennis balls from the logo details) can be used as decorative accents.

## Site Structure

```
boxersbedandbiscuits.com/
├── / (Homepage)
├── /services/
│   ├── /daycare
│   ├── /boarding
│   ├── /grooming
│   ├── /enrichment (Boxers Enrichment Center)
│   ├── /vet-clinic (Boxers Meds & Fixits)
│   └── /training
├── /pricing
├── /petcams
├── /our-staff
└── /employment
```

External link in nav: **Gingr Portal** → https://boxersbedandbiscuits.portal.gingrapp.com/secure/home

### Nav Structure

- **Services dropdown:** Daycare · Boarding · Grooming · Enrichment Center · Vet Clinic · Training
- **Top-level:** Pricing · Petcams · Our Staff · Careers
- **CTA button:** Book Now (→ Gingr portal)

### Homepage Sections (top to bottom)

The homepage follows the Hound Around pattern but adapted for Boxers' multi-service positioning:

1. **Hero** — Headline, subtext selling the all-in-one angle, CTA pair (Book Now → Gingr + View Pricing), main B&B mascot/logo, social proof line if available
2. **Services tabs (Core Three)** — Same tabbed component as Hound Around with Daycare, Boarding, Grooming. Each tab shows description, image, link to detail page. We keep this to three because six tabs breaks the component
3. **Stats bar** — Adapted for Boxers: e.g., X Years, 2 Locations, 6+ Services, Live Webcams
4. **Photo strip** — Horizontal scroll of facility photos (plenty provided in intake form)
5. **BEC Spotlight** — NEW section. Enrichment Center gets its own homepage moment: BEC mascot/logo, short pitch on private play and individualized enrichment, CTA to BEC page. Supports the rebrand rollout
6. **Why Boxers / Differentiators** — Same pattern as Hound Around's "Suites, not kennels" section. Five feature blocks from intake form: certified team, all-inclusive programming, live webcams, state-of-the-art facilities, full-service center
7. **Vet Clinic Spotlight** — NEW section. Meds & Fixits mascot, short description, CTA. Positioned as a major trust differentiator — most pet care facilities can't offer on-site veterinary
8. **Webcam section** — "Peace of mind" angle, same as Hound Around. They have live webcams
9. **Testimonials** — Four reviews from intake form
10. **CTA banner** — Book via Gingr
11. **Footer** — Three-location contact block (PAW-PLEX hours/phone/email, BEC hours/phone/email, Meds & Fixits hours/phone/email), social links (Facebook, YouTube, Instagram), Embark family line, Lauf credit

### Service Page Pattern (Daycare, Boarding, Grooming)

Inherited from Hound Around, each core service page follows:

1. **Hero** — Service label, headline, description, CTAs (Book Now + View Pricing), hero image
2. **Features grid** — Icon cards highlighting key selling points (6 cards on Hound Around, adapt as needed)
3. **Pricing calculator** — Interactive, pulls rates from data file. Boxers has different pricing structure than Hound Around (packages with expiration dates, multi-dog discounts)
4. **"How it works" timeline** — Step-by-step day walkthrough (content needed from facility team / Alexis)
5. **FAQ accordion** — Pulls from Sanity (content needed — intake form doesn't include service-specific FAQs)
6. **CTA banner** — Book via Gingr

### New Page Types (not in Hound Around)

**Enrichment Center (BEC) page:**
- Own hero with BEC mascot/logo
- Explains what enrichment means vs. standard daycare (private play, guided enrichment, individualized attention)
- Own pricing section ($45/day enrichment daycare, $65/night enrichment boarding, packages, New Client Intro offer)
- References separate physical location (4474 Braun Rd) with own hours
- This is a key page for the launch — the BEC rebrand is driving the April 13th timeline

**Vet Clinic (Meds & Fixits) page:**
- Own hero with Meds & Fixits mascot/logo
- Different contact info: 740-525-3333, boxersmedsandfixits@gmail.com
- Different hours: Mon-Fri 8am-6pm (no weekends listed)
- Links to Covetrus pharmacy: https://boxersmedsandfixits.covetruspharmacy.com/
- Content is sparse from intake form — will need Alexis to fill gaps on services offered

**Training page:**
- Listed in current site nav but NOT mentioned in intake form
- Content blocked until Alexis provides details
- Scaffold with placeholder content

**Petcams page:**
- Mirror Hound Around's webcams page pattern
- Current site has a petcams page: https://www.boxersbedandbiscuits.com/petcams

**Our Staff page:**
- Team photos available from intake form (staff in blue scrubs, vet team in teal/blue)
- Key personnel: Lori Shultz (Facility Manager), Alexis Foster (Marketing Director)
- Layout: team grid with photos, names, roles

**Employment page:**
- Current site has an employment page
- Likely a simple layout: description of working at Boxers + contact CTA (BoxersGM1@outlook.com)
- Content needed from facility team

### Pricing Page

This is the most complex page on the site — significantly more involved than Hound Around's pricing. Boxers has:

**Daycare & Boarding (PAW-PLEX):**
- Daycare: $39/day
- Boarding: $59/night
- Additional dogs: 50% off
- Daycare packages: 10 visits ($350, 2mo exp), 25 visits ($800, 4mo exp), 40 visits ($1,200, 6mo exp)

**Enrichment Center (BEC):**
- Enrichment Daycare: $45/day
- Enrichment Boarding: $65/night
- Packages: 10 visits ($390), 25 visits ($900), 40 visits ($1,325)
- New Client Intro: Daycare pricing for first 30 days or first package

**Memberships (good for PAW-PLEX or BEC):**
- Boxers Play — $450/month: Unlimited daycare Mon-Sat, 1 free exit bath/month, 15% off grooming add-ons
- Boxers Premier — $599/month: Everything in Play + 30 boarding nights/year, additional boarding at $39/night, 2 vet exams + core vaccinations, priority booking, 15% off ALL grooming
- Additional dogs: 20% discount on memberships

**Grooming & Add-Ons:**
- Exit baths by size: Small $29, Medium $39, Large $59, XL $69
- Add-ons: Nail trim $19, Brush out $25, Ear cleaning $15, Anal glands $25

Likely needs a tabbed or segmented layout to organize all of this without overwhelming the user. Consider: PAW-PLEX tab | BEC tab | Memberships tab | Grooming tab.

## Content Status

### Have now (from intake form)
- All pricing data (daycare, boarding, BEC, packages, memberships, grooming, add-ons)
- Three mascot logos (B&B, BEC, Meds & Fixits) — full character + wordmark PNGs
- Homepage hero copy (headline options + intro paragraph)
- Service descriptions (daycare, boarding, grooming, enrichment)
- Five facility differentiators with descriptions
- Four testimonials
- Contact info for all three locations (addresses, phones, faxes, emails, hours)
- Service area: Belpre, Parkersburg, Vienna, and the surrounding Mid-Ohio Valley
- ~15 facility photos (staff, dogs playing, grooming, outdoor areas, pool, vet clinic, agility)
- Two YouTube video links (TV commercial + another)
- Vital links (Gingr portal, pharmacy, training page, petcams, PDFs)
- Social media: Facebook, YouTube, Instagram

### Waiting on facility team (Alexis Foster — Marketing Director)
- Domain/hosting info (who controls boxersbedandbiscuits.com — Biztec? Wix? Someone else?)
- ~~Year opened~~ → **2011** (confirmed via public sources)
- Compact/simplified logo versions for navbar use
- ~~Training page content~~ → **Filled** (Amanda Ingraham / Band of Canines from current site)
- Vet clinic service details (what procedures/services are offered)
- ~~Employment page content~~ → **Filled** (benefits from Indeed/current site)
- ~~Our Staff page content~~ → **Partially filled** (3 of 6 names from public sources; 3 remaining + all bios/photos still needed)
- Daily schedule timelines for daycare and boarding
- Service-specific FAQs
- Additional photos as needed
- Webcam/petcam embed details
- Vaccination and health requirements for new clients
- Cancellation policies
- Google Business Profile info / review ratings

### Content contacts
- **Alexis Foster** — Marketing Director — 304-917-1734 — fosteralexis00@gmail.com / boxermarketing@outlook.com — Primary content contact. Next marketing day is 4/2. Can also be reached on K9 caregiver shifts
- **Lori Shultz** — Facility Manager / GM — BoxersGM1@outlook.com — Operational questions
- **Brian** — VP of Operations, Embark — Project sponsor, handling pricing rollout

## Facility Quick Reference

### Boxers Bed & Biscuits — PAW-PLEX (Main Facility)
- **Address:** 1301 Washington Blvd., Belpre, OH 45714
- **Phone:** 740-423-7777
- **Fax:** 740-423-7779
- **Email (general):** angela@boxersbedandbiscuits.com
- **Email (GM):** BoxersGM1@outlook.com (Lori Shultz)
- **Email (marketing):** boxermarketing@outlook.com
- **Hours:** Mon-Fri 7am-7pm, Sat (& holidays) 8am-7pm, Sun 4pm-7pm ONLY

### Boxers Enrichment Center (BEC)
- **Address:** 4474 Braun Rd., Belpre, OH 45714
- **Phone:** 740-423-7777 (same as PAW-PLEX)
- **Fax:** 740-423-7779
- **Email:** angela@boxersbedandbiscuits.com (same reception)
- **Hours:** Mon-Fri 8am-7pm, Sat (& holidays) 8am-7pm, Sun 4pm-7pm ONLY

### Boxers Meds & Fixits — Veterinary Clinic
- **Address:** 1301 Washington Blvd., Suite A, Belpre, OH 45714
- **Phone:** 740-525-3333
- **Fax:** 740-860-3517
- **Email:** boxersmedsandfixits@gmail.com
- **Hours:** Mon-Fri 8am-6pm
- **Pharmacy:** https://boxersmedsandfixits.covetruspharmacy.com/

### General
- **Year opened:** 2011 (founded by Angela Beck; current 48,000+ sqft facility at Washington Blvd since 2018)
- **Service area:** Belpre, Parkersburg, Vienna, and the surrounding Mid-Ohio Valley communities
- **Booking platform:** Gingr — https://boxersbedandbiscuits.portal.gingrapp.com/secure/home
- **Services:** Daycare, boarding (dogs & cats), grooming, enrichment/private play, veterinary, training
- **Social:** Facebook (boxermamashouse), Instagram (boxersbedandbiscuits), YouTube

## Timeline

- **Target launch:** April 13, 2026 (midnight)
- **Pricing rollout + BEC rebrand** are driving the deadline — Brian needs updated pricing and the new "Boxers Enrichment Center" branding live by this date
- **Alexis Foster** (marketing director) returns to marketing duties on 4/2 — 11 days before launch. Build what we can from the intake form and existing site content, finalize with her when she's available
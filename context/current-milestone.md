# Current Milestone

## Fix: True 404 Responses for Dynamic Routes

### Status
Complete — ready for review

### Goal
- Return the shared Next.js not-found page with an HTTP 404 response when a Sanity page or service slug does not exist.

### Files
- `frontend/app/[slug]/page.tsx`
- `frontend/app/services/[slug]/page.tsx`

### Verification
- `npm run type-check` passes.
- Focused ESLint passes for both modified routes.
- `npm run build` passes.
- Local production responses verified: unknown page `404`, unknown service `404`, known page `200`, known service `200`.

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
- 2026-07-24: Fixed soft 404 responses on CMS-backed dynamic routes (branch `fix/true-404-responses`). Unknown generic-page and service slugs now call Next.js `notFound()` during metadata generation and rendering, so the shared branded not-found page returns HTTP 404 instead of HTTP 200. Type-check, focused lint, and production build pass; local production checks confirm unknown page/service routes return 404 while known routes remain 200.
- 2026-07-24: SEO crawl-audit fixes (branch `fix/seo-crawl-fixes`). Simulated a Googlebot crawl of the live site; content is fully server-rendered and indexable, but the crawl surfaced 8 issues, all fixed. **Code:** (1) `/homepage` was a live duplicate of `/` with its own canonical and sitemap entry — added permanent redirect `/homepage` → `/` in `next.config.ts` and excluded the `homepage` slug from `sitemap.ts` (also excluded `enrichment`, which 308s to daycare but was still listed). (2) `robots.ts` sitemap URL now uses the canonical www host. (3) `layout.tsx` metadataBase now falls back to `https://www.boxersbedandbiscuits.com` (Sanity `ogImage.metadataBase` is unset), making canonicals and og URLs absolute. (4) Homepage `/` title was missing the brand suffix — Next.js `title.template` only applies to child segments, and `app/page.tsx` is the same segment as the root layout, so the suffix is now appended explicitly (settings title fetched alongside homepage). (5) All three page routes now emit `og:url` plus a settings-level og:image fallback (page `openGraph` replaces the layout's wholesale, so the fallback image must be included). (6) Breadcrumb JSON-LD base URLs switched to www. (7) `/contact` and `/gallery` had no `<h1>` — PageBuilder now flags the first non-spacer block via `isFirstContent`, and ContactForm/GalleryGrid promote their heading to `<h1>` when leading a page (h2 elsewhere, e.g. employment). (8) The entire contactForm section was invisible to crawlers: `useSearchParams()` bailed the whole Suspense boundary out of static prerender — replaced with `window.location.search` in the mount effect, so the contact and employment forms now appear in server HTML. **Sanity (published):** contact/gallery metaTitles had the brand name baked in, producing "… | Boxers Bed & Biscuits | Boxers Bed & Biscuits" — stripped to "Contact Us" / "Gallery"; vet-contact and vet-staff had no seo object — added metaTitle + metaDescription (factual, from known contact info); homepage BEC spotlight CTA pointed at the removed `service-enrichment` page reference (a redirect hop) — repointed to `/services/daycare` as an href. Build passes; all fixes verified against a local production server. Lint has 111 pre-existing errors, unchanged by this work.
- 2026-07-22 (later): Contact form spam protection ported from wags-stay-n-play: Google reCAPTCHA v3 (invisible). `ContactForm.tsx` loads the script on mount and sends a `recaptchaToken` with submissions; `/api/contact` verifies it against Google siteverify (min score 0.5) before sending email. No new npm deps. Fails open if `RECAPTCHA_SECRET_KEY` is unset or Google is unreachable, so misconfiguration never drops real leads. Applies to both forms sharing the component (contact + employment application). Env vars: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET_KEY` (documented in `.env.example`; need to be created in the Google reCAPTCHA admin console for boxersbedandbiscuits.com and added in Vercel). Same branch: `feature/contact-thank-you-page`.
- 2026-07-22: Contact form thank-you page (client request, rolled out across Embark sites; wags-stay-n-play was the pilot, this follows its flow). New Sanity page `page-thank-you` at `/thank-you` (heroMinimal + ctaBanner "Back to Home", noIndex so it's excluded from search + sitemap). `ContactForm.tsx` now redirects via `router.push('/thank-you')` on successful submit instead of rendering the inline success card; the client-side navigation fires the existing `virtual_page_view` GTM/CTM event, making submissions trackable as conversions. Both forms share the component, so the contact form AND the employment application land on the same generic "Thank You for Your Submission" page. **Template divergence note:** `successMessage` remains in the contactForm schema but is no longer rendered. reCAPTCHA v3 (bundled in the wags version of this change) intentionally NOT ported here yet. Branch: `feature/contact-thank-you-page`.
- 2026-06-09: Lori's round-3 pricing feedback. **Boarding estimator discount clarity** — Lori reported the "Estimate Your Cost" boarding calculator (both PAW-PLEX and BEC) didn't reflect the 50%-off-second-dog discount. Investigation: the math was already correct and deployed (`calculateBoardingPerDog` halves the rate for every dog after the first), but it wasn't visually obvious — the additional-dog line read `@ $29.5/night (50% off)` (ugly decimal) and the discount lived only in a small note. Fix (code): `calculateBoardingPerDog` now also returns `savings` (sum of the half-rate amounts) and the additional-dog line label drops the raw half-rate, reading `Dog 2 — N nights · 50% off`; `BoardingCalculator` passes `savings` + `savingsLabel="Multi-dog discount"` to the existing `PriceOutputCard` green savings box. So adding a 2nd dog now shows a prominent "Multi-dog discount: $30" (PAW-PLEX) / "$33" (BEC) box. Verified math in isolation (PAW-PLEX 2 dogs/1 night = $89/$30 saved; BEC = $98/$33 saved; single dog = no box). Also improves the `/services/boarding` estimator (shared component). Daycare left unchanged (no additional-dog discount, per Lori). **Membership disclaimer** — removed the misleading final sentence "Additional dogs receive 50% off boarding and 20% off memberships" from the `tableData.description` on the Monthly Membership Plans section in both the daycare and boarding tabs of the `pricingPageTabs` block on `page-pricing` (kept the first two sentences; each membership card already lists "20% off for additional dogs" on its own). Content via Sanity MCP, published. Branch: `fix/boarding-discount-clarity-and-membership-copy`. Build passes. Lori indicated no further changes after these.
- 2026-05-02 (later): Petcams page tutorial added. Compared the live page against a Wayback snapshot of the old Wix petcams page (Mar 2026) and confirmed the LTS Connect step-by-step text was already complete and identical — what was missing was the "Watch this Video Tutorial for Help!" popup the old page had. That tutorial is publicly hosted on Boxers' YouTube channel as **"How to Install and Use Boxers Bed and Biscuits Live Cameras!"** (`Up14E2O8W9A`, May 2024). Added a new `videoSection` block to `page-petcams` immediately after the LTS Connect setup splitContent (eyebrow "Need a Hand?", heading "Watch the Setup Walkthrough", sand background, full layout). Also added a "Text Us" CTA button (sms:740-423-7777) to the BEC Photo Updates splitContent block — old Wix had this as an orange "Click to Text Us" button and we'd consolidated it into body text. Body copy lightly revised on the BEC block (em-dash → comma per writing-style rule; second body block reframed as "Prefer to call? Reach us at..." so the button is the primary text-us action). Block order: hero → LTS setup → tutorial video → BEC photo updates (with Text Us button) → webcamGrid → spacer → download-app ctaBanner → spacer. Build passes.
- 2026-05-02: Lori's round-2 feedback. **Header "Contact Us" CTA** now correctly mailtos `angela@boxersbedandbiscuits.com` — `siteSettings.ctaButton.link` was misconfigured (linkType "page" with a dangling page reference + a Gingr href that wasn't being used). Patched to `linkType: "href"`, `href: "mailto:angela@..."`, dropped the page ref. **Employment form sidebar email** swapped from `BoxersGM1@outlook.com` to `angela@boxersbedandbiscuits.com` on the contactForm block in `page-employment` (cosmetic — this is the "rather email us?" mailto next to the form, NOT the form submission destination). **Form submission destination** also routed to angela: Mike updated `CONTACT_FORM_TO_EMAIL` on Vercel to `angela@boxersbedandbiscuits.com` (Lori sets up forwarding from Angela's mailbox to her own GM email if she wants notifications). **BEC tour video** swapped from `tCnP6JqD1ec` (Brat Pack-era) to `VVasO_UjsGM` ("Brat Pack Tour 2023") on the videoSection block in `service-enrichment` — picked the older Jan 2023 walkthrough as a working stand-in; Mike confirming with Lori in the next round. Build passes. Items still blocked: old-Wix petcams step-by-step (Vercel cutover already happened so the old page isn't reachable; need a Wayback snapshot or a screenshot from Lori); three Wix PDFs (Lori didn't recognize the reference — Mike circling back).
- 2026-04-29 (latest): Grooming page Book Now CTAs swapped to Contact Us mailto (both HeroSplit primaryCta and the pricing-calculator ctaText/ctaLink). Client confirmed the truncated note: groomers schedule their own appointments, so Gingr is a dead end for grooming the same as it is for training. Two other Gingr-pointing CTAs remain on grooming page ("Start New Client Process" ctaStrip and "Schedule Orientation" ctaBanner) — left intact since their labels suggest account setup rather than grooming booking. Flagged for client confirmation.
- 2026-04-29 (later): Embedded existing facility tour videos. Discovered both YouTube links from the intake form's "Vital Links" section are actually facility tours (intake had labeled them "TV commercial?"). Added two `videoSection` blocks: PAW-PLEX tour ("Boxers Bed and Biscuits Facility Tour", `youtu.be/a9HDIKBTgww`) inserted on homepage between galleryCarousel and testimonials; BEC tour ("Boxers Brat Pack Tour", `youtu.be/tCnP6JqD1ec`) appended on enrichment page. Resolved item 4 (virtual tour) without needing new footage — only caveat is the BEC tour was filmed under the old "Brat Pack" branding pre-rebrand and may want re-shooting eventually. Petcams item resolved separately: confirmed the new site already contains the LTS Connect setup steps (alias, IP, port, credentials) the client thought were missing — no edit required, just need to confirm with client they're looking at the new site, not the old Wix one. Build passes.
- 2026-04-29: Client-feedback content updates (post-Phase-1, pre-launch). Training page rewritten in Sanity: Amanda Ingraham phrasing corrected (no longer reads as the military rank "Army Master Trainer"); 6 featureCards replaced with the actual class ladder (Puppy → Basic → Intermediate → Advanced → Elite → Silver Obedience), each with prerequisite/age info; "Senior Dog Programs" renamed to "Silver Obedience" with corrected description (relaxed-pace class for older owners, not elderly dogs); both Book Now CTAs swapped to "Contact Us" mailto (Gingr does not support training self-signup); shortDescription rewritten to match. Employment page rebuilt: dead-end "Email Us" ctaStrip removed and replaced with a real `contactForm` block configured as an application questionnaire (name, email, phone, areas of interest, availability, past employment, message) routing to `BoxersGM1@outlook.com`; SplitContent body updated to point at the form. Code: added `pastEmployment`, `areasOfInterest`, `availability` to the fieldLabels map in `frontend/app/api/contact/route.ts:25-35` so submission emails render readable labels; documented SMTP env vars in `frontend/.env.example` (previously missing — only Sanity vars were listed). Branch: `content/client-feedback-updates`. Build passes. Items still blocked on the client: pet-camera how-to video URL, virtual tour video, grooming Book Now confirmation, header CTA decision (button currently labeled "Contact Us" but linking to Gingr).
- 2026-04-10: Homepage enrichment spotlights added. Two new `splitContent` blocks inserted after Vet Spotlight: (1) **BEC Spotlight** — sand bg, image left, links to `/services/enrichment`, positions the Boxers Enrichment Center as a sub-brand alongside the Vet Clinic. (2) **Enrichment Programs** — cream bg, image right, links to `/services/daycare`, highlights the structured play and guided enrichment woven into regular daycare/boarding. Also published the previously draft-only `service-enrichment` doc (M4 drift — it had been seeded but never published, was blocking reference validation). Content-only change via Sanity MCP, no code touched. Homepage now has 13 pageBuilder blocks. Branch: `feature/homepage-enrichment-spotlights`. Build passes.
- 2026-03-29: M7 Phase 1 complete. Accessibility (focus styles, skip-to-content), nav polish (aria attrs, focus trap, keyboard nav, active page), SEO (multi-location JSON-LD with VeterinaryClinic type, BreadcrumbList), Hero cleanup (dynamic alt), 404/error page redesign. Build passes.

# Boxers Bed & Biscuits — Sanity CMS Audit

> **SNAPSHOT — captured July 2026.** This audit reflects the codebase and dataset at the time it was written and is NOT kept up to date. Verify any finding against the current code before acting on it.

Audit date: 2026-07-10  
Model: GPT-5  
Dataset: configured `production` dataset, queried read-only

## Executive inventory

The implementation registers five document types (`settings`, `page`, `service`, `testimonial`, `webcam`) and 51 reusable object/array types, including three distinct Portable Text configurations. The production snapshot contains 25 documents: 9 pages, 6 services, 1 settings singleton, 5 testimonials, and 4 webcams. Across pages and services there are 95 page-builder blocks and 24 live block types; 18 registered page-builder types have zero production usage. Evidence: `studio/src/schemaTypes/index.ts`, `sanity.schema.json`, `studio/src/schemaTypes/documents/page.ts`, `studio/src/schemaTypes/documents/service.ts`, and the read-only production GROQ snapshot captured 2026-07-10.

The machine-readable exhaustive field/type inventory, verbatim GROQ strings, live counts, field-presence counts, and risks are in `cms-audit/schema-inventory.json`.

## Phase 0 — clone parent determination

**Determined parent: Hound Around Resort (`houndaround/main-3`), high confidence.**

Mechanical evidence:

- Root commit `532cfb0` is named `Initial commit from Hound Around design system`; `context/project-overview.md:19-31` records the exact clean-history clone procedure from `mhlauf1/hound-3`.
- SHA-256 comparison across common `studio/src/schemaTypes` and `frontend/app/components` paths finds 70/117 (59.8%) Boxers↔Hound files byte-identical versus 70/121 (57.9%) Boxers↔HAFH. Schema-only results are 37/52 (71.2%) versus 37/54 (68.5%).
- HAFH's `frontend/app/components/sections/HeroMarquee.tsx:92,259` contains Boxers alt fallbacks and is byte-identical to Boxers' current file. This is real Boxers→HAFH contamination/shared-code evidence, but it is evidence about downstream sharing, not Boxers' origin.
- Completed inventories were mechanically read from `/Users/michaellaufersweiler/Desktop/lauf/dev/client-websites/houndaround/main-3/cms-audit/schema-inventory.json` and `/Users/michaellaufersweiler/Desktop/lauf/dev/client-websites/home-away-fargo/cms-audit/schema-inventory.json`. Both paths resolve to the active completed local checkouts. The prompt-specified copies at `cms-audit/reference/` were **NOT FOUND**.

## Phase 1 — Sanity topology

The production project ID is `hw1f15qc`, dataset `production`, API version fallback `2025-09-25` (`frontend/sanity/lib/api.ts`). Studio exists both as a standalone workspace (`studio/sanity.config.ts`) and embedded under `/studio` (`frontend/app/studio/[[...tool]]/page.tsx`, `frontend/sanity.config.ts`). The frontend uses `next-sanity` live fetching with stega enabled (`frontend/sanity/lib/client.ts`, `frontend/sanity/lib/live.ts`).

Environment-variable names are inventoried without secret values in the JSON. A read token is configured locally (`frontend/.env.local`, `frontend/sanity/lib/token.ts`); its value is intentionally excluded.

## Phase 2 — documents and settings

- `page`: `name`, required `slug`, `seo`, `pageBuilder`; 9 live documents (`studio/src/schemaTypes/documents/page.ts`).
- `service`: title/slug/tab presentation fields, `seo`, `pageBuilder`; 6 live documents (`studio/src/schemaTypes/documents/service.ts`).
- `testimonial`: quote, author identity/label, rating; 5 live documents (`studio/src/schemaTypes/documents/testimonial.ts`).
- `webcam`: name, camera ID, group, sort order, enabled; 4 live documents (`studio/src/schemaTypes/documents/webcam.ts`).
- `settings`: singleton structure plus initial-value template; 1 live document (`studio/src/schemaTypes/singletons/settings.tsx`, `studio/src/structure/index.ts`, `studio/src/lib/initialValues.ts`).

Boxers-specific sub-site/location modeling is a shared `settings.locations[]` collection plus `locationDetails.locationSlug`; the query injects the matching location object. Pages and services are not tenant- or location-scoped (`studio/src/schemaTypes/objects/locationDetails.ts`, `frontend/sanity/lib/queries.ts`, `frontend/app/components/sections/LocationDetails.tsx`).

## Phase 3 — Portable Text

`blockContent` allows normal Sanity blocks, a custom `link` annotation, and inline images with hotspot (`studio/src/schemaTypes/objects/blockContent.tsx`). `blockContentTextOnly` allows block members only (`studio/src/schemaTypes/objects/blockContentTextOnly.tsx`). `settings.description` is a separately inlined, highly restricted PT array with no styles/lists/decorators and the same conceptual link annotation (`studio/src/schemaTypes/singletons/settings.tsx:20-100`).

The renderer supports block styles, lists, links, and image blocks through `@portabletext/react`; internal page references arrive post-projection as slug plus target type (`frontend/app/components/PortableText.tsx`, `frontend/sanity/lib/queries.ts`, `frontend/sanity/lib/utils.ts`). Observed production PT details and counts are in `portableTextConfigs` and `dataset_snapshot.portableTextObserved` in the JSON.

## Phase 4 — GROQ and projection

All eight exported GROQ queries are captured verbatim in `schema-inventory.json`: `settingsQuery`, `getPageQuery`, `homepageQuery`, `sitemapData`, `pagesSlugs`, `getServiceQuery`, `serviceSlugs`, and `servicesNavQuery` (`frontend/sanity/lib/queries.ts`). The reusable projection dereferences page/service links, service-tab references, testimonial references, and query-injects settings locations and enabled webcams. Image asset metadata is generally **not** dereferenced; the sole direct asset URL projection is `favicon.asset->url`.

The exact post-projection adapter contract is Deliverable 3, `cms-audit/render-contract.md`.

## Phase 5 — schema drift by mechanical diff

Against Hound Around, Boxers adds schema/component families for `heroMarquee`, `serviceTabsSidebar`, `spacer`, `campusOverview`, and `locationDetails`; it also changes page/service member lists and multiple existing schemas. Against HAFH, Boxers adds `campusOverview`, `serviceTabsSidebar`, and `locationDetails`, while HAFH alone has `expandingCardsRow`. These are `diff -rq` results over the respective `studio/src/schemaTypes` trees, not visual comparison.

There are 70 byte-identical files in each comparison set, but Hound has fewer comparison paths and therefore the higher exact-match rate. Individual matching/diverging claims should be read from the path-level evidence represented by those mechanical results; no lineage claim here is based on memory.

Verification spot-check: `studio/src/schemaTypes/objects/hero.ts` and `/Users/michaellaufersweiler/Desktop/lauf/dev/client-websites/houndaround/main-3/studio/src/schemaTypes/objects/hero.ts` have the same SHA-256 digest (`8d648f61590f209bf29c828f9eec3d108e839bea50d9badcb66bace3be91d39f`) and an empty unified diff. This confirms one concrete “identical to Hound Around” type mechanically.

## Phase 6 — production usage, dead weight, and risks

Live block counts are exhaustive in `dataset_snapshot.blockUsage`. The 24 live block types are: `campusOverview`, `contactForm`, `contentColumns`, `ctaBanner`, `ctaStrip`, `featureCards`, `galleryCarousel`, `galleryGrid`, `heroMarquee`, `heroMinimal`, `heroSplit`, `locationDetails`, `pricingCalculator`, `pricingList`, `pricingPageTabs`, `pricingTable`, `requirementsList`, `serviceTabsSidebar`, `spacer`, `splitContent`, `teamGrid`, `testimonials`, `videoSection`, and `webcamGrid`.

The 18 dead page-builder types are: `callToAction`, `infoSection`, `hero`, `imageRow`, `serviceTabs`, `statsBar`, `webcamPreview`, `faqAccordion`, `serviceCards`, `featureList`, `processSteps`, `iconGrid`, `fullWidthMedia`, `logoBar`, `pricingMatrix`, `policyNotes`, `featureGrid`, and `whatsIncluded`. Evidence: registered arrays in `studio/src/schemaTypes/documents/page.ts` and `service.ts`, compared mechanically with production `_type` counts.

### Cross-contamination sweep

The entire repository and production snapshot were searched case-insensitively for Hound Around, Home Away From Home/HAFH, Kingdom Canine, Wags, Riverside, Rio, Embark, known locations, domains, and phone patterns.

- Hound Around and HAFH hits are confined to history/project instructions (`CHANGELOG.md`, `context/*.md`, `AGENTS.md`, `CLAUDE.md`); none were found in frontend runtime strings, Studio defaults, or production content. Severity: none.
- Kingdom Canine, Wags, Riverside, and Rio hits are confined to portfolio planning in `context/project-overview.md:72-81`. Severity: none.
- Embark occurs intentionally in documentation and Studio help text (`studio/src/schemaTypes/objects/splitContent.ts:40`, `studio/src/schemaTypes/singletons/settings.tsx:291-297`). It could surface only when an editor deliberately authors matching content. Severity: informational.
- Boxers' own `740-423-7777` is hardcoded in `frontend/app/components/pricing/CalculatorInputs.tsx:253`, while contact values also exist in settings. This is not foreign-brand contamination, but it is a migration synchronization risk. Severity: informational.
- No foreign domain, phone number, address, image asset reference, fallback, alt text, metadata, or config was found in runtime code or production data. `NOT FOUND` is recorded rather than inferred.

Each grouped hit class is represented as a separate `riskFlags` entry in the JSON with evidence paths and user-surface severity.

## Audit limitations

- The original standard prompt embedded in the supplied attachment contains an application-generated collapsed segment. The two completed inventories establish the expected JSON shape; all requested additions are present.
- Dataset facts are a point-in-time production snapshot from 2026-07-10.
- Generated `sanity.schema.json` supplies exhaustive field names, generated types, and requiredness. Dynamic validation/hidden callbacks, previews, initial values, and UI groups remain source-code evidence in `studio/src/schemaTypes/**`; they are not guessed when the generated schema cannot serialize them.

## Completion checklist

- Every registered current schema type and generated field is present in `schema-inventory.json`.
- Every exported GROQ query is captured verbatim.
- Production document and block counts are exhaustive for the snapshot.
- Parent determination is mechanical and recorded at top-level `cloneParent`.
- Drift claims are based on file diffs/hashes.
- Cross-contamination includes repo and production-data sweeps.
- JSON validates; `NOT FOUND`/`UNCERTAIN` are used where evidence is unavailable.

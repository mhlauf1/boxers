# Boxers Bed & Biscuits — Render Contract

Snapshot: production dataset, read-only, 2026-07-10. Source projection: `frontend/sanity/lib/queries.ts`. Renderer dispatch: `frontend/app/components/BlockRenderer.tsx`. `NOT FOUND` is used where the code does not establish a contract.

## 1. Routing map

| Route | File | Data/query | Mapping and special behavior |
|---|---|---|---|
| `/` | `frontend/app/page.tsx` | `homepageQuery` | Fixed lookup `_type=="page" && slug.current=="homepage"`; `generateMetadata` repeats query with `stega:false`; renders `PageBuilder`. |
| `/[slug]` | `frontend/app/[slug]/page.tsx` | `getPageQuery`, `pagesSlugs` | `$slug` matches `page.slug.current`; `generateStaticParams` uses published perspective and no stega; missing docs render inline not-found copy (does not call `notFound()`). Live slugs: `contact`, `employment`, `gallery`, `our-staff`, `petcams`, `pricing`, `vet-contact`, `vet-staff`, plus `homepage` (also statically enumerated although `/` is special). |
| `/services/[slug]` | `frontend/app/services/[slug]/page.tsx` | `getServiceQuery`, `serviceSlugs` | `$slug` matches `service.slug.current`; published/no-stega static params; renders `PageBuilder`. Live: `boarding`, `daycare`, `enrichment`, `grooming`, `training`, `vet-clinic`. |
| `/studio/[[...tool]]` | `frontend/app/studio/[[...tool]]/page.tsx` | No GROQ route query | Embedded Sanity Studio, catch-all tool path. |
| `/api/draft-mode/enable` | `frontend/app/api/draft-mode/enable/route.ts` | Sanity preview helper | Enables draft mode/edit intent; not page-builder. |
| `/api/contact` | `frontend/app/api/contact/route.ts` | No GROQ | Contact-form POST endpoint; not page-builder. |
| `/api/webcam-auth` | `frontend/app/api/webcam-auth/route.ts` | No GROQ | Webcam authentication endpoint; not page-builder. |
| metadata endpoints | `frontend/app/robots.ts`, `frontend/app/sitemap.ts`, `frontend/app/icon.svg` | `sitemapData` for sitemap only | robots is static code; sitemap projects slugs/types/update/noIndex; icon is a file route. |
| framework fallbacks | `frontend/app/not-found.tsx`, `frontend/app/error.tsx` | No GROQ | Custom 404 and error UI, outside page-builder. |

## 2. Projection delta

### Common resolved primitives

```ts
type RawImage = {asset?: {_ref: string; _type: "reference"}; crop?: object; hotspot?: object; alt?: string; caption?: string}
type DereferencedLink = { _type?: "link"; linkType?: "href"|"page"; href?: string; page?: string|null; pageType?: "page"|"service"|null; queryString?: string; openInNewTab?: boolean }
type Button = { _type?: "button"; buttonText?: string; link?: DereferencedLink }
type PT = PortableTextBlock[] // markDefs link.page reference is replaced by target slug and pageType is added
```

Page-builder images remain raw Sanity image objects: the query does **not** expand asset `url`, `metadata.lqip`, or `metadata.dimensions`. Components pass them to `SanityImage`/`urlForImage` (`frontend/app/components/SanityImage.tsx`, `frontend/sanity/lib/image.ts`). Only settings favicon is asset-dereferenced to a URL (`frontend/sanity/lib/queries.ts`).

### Per-query changes

- `settingsQuery`: spreads stored settings, resolves nested links in `navItems`, children, header CTA, footer columns, and footer bottom links; injects `faviconUrl: favicon.asset->url`; otherwise passes logo/location images raw. `frontend/sanity/lib/queries.ts:17-53`.
- `getPageQuery` / `homepageQuery`: project top-level `_id,_type,name,slug,seo,pageBuilder`; the latter hardcodes `homepage`. `getServiceQuery` substitutes `title,heading,shortDescription`.
- Link-bearing blocks: `callToAction.button`; hero/heroMarquee/heroSplit primary+secondary CTAs; heroBanner primary CTA; featureCards/ctaBanner/processSteps/fullWidthMedia/ctaStrip/featureGrid CTA; serviceCards cards[].cta; pricingTable categories[].tiers[].cta; pricingCalculator/pricingPageTabs ctaLink; splitContent/requirementsList nested link.link. Every link replaces `page->{_ref}` with `page->slug.current` and adds `pageType: page->_type`.
- PT-bearing blocks: infoSection.content, faqAccordion.faqs[].answer, contactForm.description, featureList.features[].body, and contentColumns.columns[].body resolve link markDefs identically.
- `serviceTabs` and `serviceTabsSidebar`: reference arrays become service objects `{_id,title,slug,sticker{asset,alt},shortDescription,tabImage{asset,crop,hotspot,alt},tabCta:Button}`.
- `testimonials`: references become `{_id,quote,authorName,authorLabel,rating}`.
- `locationDetails`: adds computed `location` from settings.locations where `slug == locationSlug`.
- `webcamGrid`: adds computed `webcams` from enabled webcam documents ordered group/sortOrder, with `{_id,name,cameraId,group,sortOrder}`.
- `sitemapData`: renames `slug.current` to scalar `slug` and `seo.noIndex` to `noIndex`. `pagesSlugs`/`serviceSlugs` return only scalar slug. `servicesNavQuery` returns `_id,title,slug.current` renamed to scalar `slug`.

### Representative before/after

```jsonc
// stored page excerpt
{"_type":"page","slug":{"_type":"slug","current":"homepage"},"pageBuilder":[{"_type":"serviceTabsSidebar","tabs":[{"_type":"reference","_ref":"service-id"}]}]}
// received by PageBuilder/ServiceTabsSidebar
{"_id":"…","_type":"page","name":"Homepage","slug":{"_type":"slug","current":"homepage"},"seo":{ /* pass-through */ },"pageBuilder":[{"_type":"serviceTabsSidebar","tabs":[{"_id":"service-id","title":"…","slug":{"current":"…"},"sticker":{"asset":{"_ref":"…"},"alt":"…"},"shortDescription":"…","tabImage":{"asset":{"_ref":"…"},"crop":{},"hotspot":{},"alt":"…"},"tabCta":{"buttonText":"…","link":{"linkType":"page","page":"target-slug","pageType":"service"}}}]}]}
```

## 3. Block props contract (24 live types)

Every component receives `{block, index:number, pageId:string, pageType:string}`. `pageId/pageType` feed visual-editing attributes; `index` affects loading/animation in some blocks (`frontend/app/components/BlockRenderer.tsx`, `PageBuilder.tsx`). The table is the exact union of keys observed live after applying the documented projection. `n/N` means present and non-null on n of N blocks; lower than N is optional in practice. Nested objects are summarized from actual values.

| Block → component | N | Resolved `block` fields and live presence |
|---|---:|---|
| `campusOverview` → `sections/CampusOverview.tsx` | 3 | `bottomImage`: {alt:string} (1/3)<br>`cards`: array<{cta:object, description:string, features:array<string>, heading:string, image:object}> \| array<{cta:object, description:string, features:array<string>, heading:string}> (3/3)<br>`eyebrow`: string (2/3)<br>`heading`: string (3/3) |
| `contactForm` → `sections/ContactForm.tsx` | 2 | `address`: string (2/2)<br>`description`: array<{children:array<object>, markDefs:array<unknown> (empty live), style:string}> (2/2)<br>`email`: string (2/2)<br>`eyebrow`: string (2/2)<br>`formFields`: array<{fieldName:string, label:string, options:array<string>, required:boolean, type:string}\|{fieldName:string, label:string, required:boolean, type:string}> (2/2)<br>`heading`: string (2/2)<br>`nextSteps`: array<{description:string, title:string}> (1/2)<br>`phone`: string (2/2)<br>`recipientEmail`: string (1/2)<br>`showMap`: boolean (1/2)<br>`submitButtonText`: string (2/2)<br>`successMessage`: string (2/2) |
| `contentColumns` → `sections/ContentColumns.tsx` | 1 | `backgroundColor`: string (1/1)<br>`columns`: array<{body:array<object>, cta:null, heading:string}> (1/1)<br>`eyebrow`: string (1/1)<br>`heading`: string (1/1)<br>`layout`: number (1/1) |
| `ctaBanner` → `sections/CtaBanner.tsx` | 8 | `backgroundImage`: {alt:string, asset:reference{_ref:string,_type:string}} \| {asset:reference{_ref:string,_type:string}} (8/8)<br>`cta`: {buttonText:string, link:{href:string, linkType:string, openInNewTab:boolean, page:null, pageType:null}, text:string} \| {buttonText:string, link:{href:string, linkType:string, openInNewTab:boolean, page:null, pageType:null}} \| {buttonText:string, link:{linkType:string, openInNewTab:boolean, page:string, pageType:string}} (8/8)<br>`description`: string (5/8)<br>`heading`: string (8/8)<br>`ratingText`: string (6/8)<br>`showRating`: boolean (7/8)<br>`sideImage`: {alt:string} (1/8)<br>`stickerImage`: {alt:string, asset:reference{_ref:string,_type:string}} \| {asset:reference{_ref:string,_type:string}} (8/8)<br>`textAlign`: string (8/8) |
| `ctaStrip` → `sections/CtaStrip.tsx` | 5 | `backgroundColor`: string (5/5)<br>`cta`: {buttonText:string, link:{href:string, linkType:string, openInNewTab:boolean, page:null, pageType:null}} \| {buttonText:string, link:{href:string, linkType:string, page:null, pageType:null}} \| {buttonText:string, link:{linkType:string, openInNewTab:boolean, page:string, pageType:string}} (5/5)<br>`heading`: string (5/5)<br>`subtext`: string (3/5) |
| `featureCards` → `sections/FeatureCards.tsx` | 7 | `cta`: null/unknown (0/7)<br>`darkMode`: boolean (6/7)<br>`features`: array<{description:string, icon:string, title:string}> (7/7)<br>`heading`: string (7/7)<br>`stickerLeft`: {alt:string, asset:reference{_ref:string,_type:string}} (1/7)<br>`stickerRight`: {alt:string, asset:reference{_ref:string,_type:string}} (1/7)<br>`subheading`: string (2/7) |
| `galleryCarousel` → `sections/GalleryCarousel.tsx` | 1 | `backgroundColor`: string (1/1)<br>`enableLightbox`: boolean (1/1)<br>`images`: array<{alt:string, asset:reference{_ref:string,_type:string}}> (1/1) |
| `galleryGrid` → `sections/GalleryGrid.tsx` | 1 | `backgroundColor`: string (1/1)<br>`columns`: number (1/1)<br>`displayStyle`: string (1/1)<br>`enableLightbox`: boolean (1/1)<br>`heading`: string (1/1)<br>`images`: array<{alt:string, asset:reference{_ref:string,_type:string}, wide:boolean}\|{alt:string, asset:reference{_ref:string,_type:string}}> (1/1) |
| `heroMarquee` → `sections/HeroMarquee.tsx` | 1 | `bubbleText`: string (1/1)<br>`eyebrow`: string (1/1)<br>`heading`: string (1/1)<br>`headingAccent`: string (1/1)<br>`marqueeImages`: array<{alt:string, asset:reference{_ref:string,_type:string}}> (1/1)<br>`primaryCta`: {buttonText:string, link:{linkType:string, openInNewTab:boolean, page:string, pageType:string}} (1/1)<br>`reviewRating`: number (1/1)<br>`reviewText`: string (1/1)<br>`secondaryCta`: {buttonText:string, link:{linkType:string, page:string, pageType:string}} (1/1)<br>`subtext`: string (1/1)<br>`trustLine`: string (1/1) |
| `heroMinimal` → `sections/HeroMinimal.tsx` | 6 | `backgroundColor`: string (6/6)<br>`eyebrow`: string (6/6)<br>`heading`: string (6/6)<br>`headingAccent`: string (3/6)<br>`subtext`: string (4/6) |
| `heroSplit` → `sections/HeroSplit.tsx` | 6 | `backgroundColor`: string (6/6)<br>`body`: string (6/6)<br>`eyebrow`: string (6/6)<br>`heading`: string (6/6)<br>`image`: {alt:string, asset:reference{_ref:string,_type:string}} \| {asset:reference{_ref:string,_type:string}} (6/6)<br>`imagePosition`: string (6/6)<br>`primaryCta`: {buttonText:string, link:{href:string, linkType:string, openInNewTab:boolean, page:null, pageType:null}} (6/6)<br>`secondaryCta`: {buttonText:string, link:{href:string, linkType:string, openInNewTab:boolean, page:null, pageType:null}} \| {buttonText:string, link:{linkType:string, page:string, pageType:string}} (4/6)<br>`stickerImage`: {alt:string, asset:reference{_ref:string,_type:string}} \| {asset:reference{_ref:string,_type:string}} (6/6) |
| `locationDetails` → `sections/LocationDetails.tsx` | 1 | `backgroundColor`: string (1/1)<br>`externalCtaLabel`: string (1/1)<br>`externalCtaLink`: string (1/1)<br>`eyebrow`: string (1/1)<br>`heading`: string (1/1)<br>`intro`: array<{children:array<object>, markDefs:array<unknown> (empty live), style:string}> (1/1)<br>`location`: {address:string, email:string, fax:string, hours:array<object>, name:string, phone:string, slug:string} (1/1)<br>`locationSlug`: string (1/1)<br>`mascotCaption`: string (1/1)<br>`mascotImage`: {alt:string, asset:reference{_ref:string,_type:string}} (1/1) |
| `pricingCalculator` → `sections/PricingCalculator.tsx` | 3 | `calculatorType`: string (3/3)<br>`ctaLink`: {href:string, linkType:string, openInNewTab:boolean, page:null, pageType:null} (3/3)<br>`ctaText`: string (3/3)<br>`displayMode`: string (3/3)<br>`eyebrow`: string (3/3)<br>`heading`: string (3/3)<br>`subheading`: string (3/3) |
| `pricingList` → `sections/PricingList.tsx` | 3 | `backgroundColor`: string (3/3)<br>`columns`: number (3/3)<br>`description`: string (3/3)<br>`eyebrow`: string (3/3)<br>`heading`: string (3/3)<br>`items`: array<{note:string, price:string, service:string}> \| array<{price:string, service:string}> (3/3) |
| `pricingPageTabs` → `sections/PricingPageTabs.tsx` | 1 | `ctaLink`: {href:string, linkType:string, openInNewTab:boolean, page:string, pageType:string} (1/1)<br>`ctaText`: string (1/1)<br>`defaultTab`: string (1/1)<br>`description`: string (1/1)<br>`eyebrow`: string (1/1)<br>`heading`: string (1/1)<br>`services`: array<{sections:array<object>, serviceKey:string}> (1/1)<br>`taxNote`: string (1/1) |
| `pricingTable` → `sections/PricingTable.tsx` | 2 | `categories`: array<{categoryName:string, tiers:array<object>}> (2/2)<br>`description`: string (2/2)<br>`eyebrow`: string (2/2)<br>`heading`: string (2/2) |
| `requirementsList` → `sections/RequirementsList.tsx` | 3 | `backgroundColor`: string (3/3)<br>`description`: string (3/3)<br>`eyebrow`: string (3/3)<br>`heading`: string (3/3)<br>`image`: {alt:string, asset:reference{_ref:string,_type:string}} (2/3)<br>`items`: array<{text:string}> (3/3)<br>`link`: {label:string, link:{href:string, linkType:string, openInNewTab:boolean, page:null, pageType:null}} (2/3) |
| `serviceTabsSidebar` → `sections/ServiceTabsSidebar.tsx` | 1 | `eyebrow`: string (1/1)<br>`heading`: string (1/1)<br>`tabs`: array<{shortDescription:string, slug:object, sticker:null, tabCta:object, tabImage:object, title:string}> (1/1) |
| `spacer` → `sections/Spacer.tsx` | 24 | `size`: string (24/24) |
| `splitContent` → `sections/SplitContent.tsx` | 8 | `backgroundColor`: string (8/8)<br>`badge`: {alt:string, asset:reference{_ref:string,_type:string}} (1/8)<br>`body`: array<{children:array<object>, level:number, listItem:string, markDefs:array<unknown> (empty live), style:string}\|{children:array<object>, markDefs:array<unknown> (empty live), style:string}> \| array<{children:array<object>, markDefs:array<unknown> (empty live), style:string}> (8/8)<br>`eyebrow`: string (7/8)<br>`heading`: string (8/8)<br>`image`: {alt:string, asset:reference{_ref:string,_type:string}} \| {asset:reference{_ref:string,_type:string}} (8/8)<br>`imagePosition`: string (6/8)<br>`link`: {label:string, link:{href:string, linkType:string, openInNewTab:boolean, page:null, pageType:null}} \| {label:string, link:{linkType:string, page:string, pageType:string}} (5/8)<br>`primaryCta`: {buttonText:string, link:{href:string, linkType:string}} (1/8)<br>`stickerImage`: {asset:reference{_ref:string,_type:string}} (2/8) |
| `teamGrid` → `sections/TeamGrid.tsx` | 3 | `eyebrow`: string (3/3)<br>`heading`: string (3/3)<br>`members`: array<{bio:string, image:object, name:string, role:string}\|{image:object, name:string, role:string}> \| array<{image:object, name:string, role:string}> (3/3) |
| `testimonials` → `sections/Testimonials.tsx` | 1 | `googleRating`: string (1/1)<br>`googleReviewCount`: number (1/1)<br>`googleReviewsUrl`: string (1/1)<br>`heading`: string (1/1)<br>`icon`: {alt:string, asset:reference{_ref:string,_type:string}} (1/1)<br>`reviews`: array<{authorLabel:null, authorName:string, quote:string, rating:number}\|{authorLabel:string, authorName:string, quote:string, rating:number}> (1/1) |
| `videoSection` → `sections/VideoSection.tsx` | 3 | `backgroundColor`: string (3/3)<br>`description`: string (3/3)<br>`eyebrow`: string (3/3)<br>`heading`: string (3/3)<br>`layout`: string (3/3)<br>`videoUrl`: string (3/3) |
| `webcamGrid` → `sections/WebcamGrid.tsx` | 1 | `heading`: string (1/1)<br>`showGroupHeaders`: boolean (1/1)<br>`subtext`: string (1/1)<br>`trustMessage`: string (1/1)<br>`webcams`: array<unknown> (empty live) (1/1) |

Dead blocks intentionally omitted per contract request: callToAction, infoSection, hero, imageRow, serviceTabs, statsBar, webcamPreview, faqAccordion, serviceCards, featureList, processSteps, iconGrid, fullWidthMedia, logoBar, pricingMatrix, policyNotes, featureGrid, whatsIncluded. Evidence: production `_type` count 0 on 2026-07-10 versus registration in the page/service schemas.

## 4. Preview/editing coupling inventory

Infrastructure and fetch coupling:

- `frontend/sanity/lib/live.ts`: `defineLive` creates `sanityFetch` and `SanityLive`.
- `frontend/sanity/lib/client.ts`: stega Studio URL configuration.
- `frontend/sanity/lib/utils.ts`: `dataAttr`/`createDataAttribute`; also link and OG helpers.
- `frontend/app/layout.tsx`: `draftMode`, `VisualEditing`, `SanityLive`, toast, and live settings/services fetches.
- `frontend/app/components/PageBuilder.tsx`: `useOptimistic` from `next-sanity/hooks` and data attributes.
- `frontend/app/components/BlockRenderer.tsx`: per-block `data-sanity` attributes.
- `frontend/app/components/DraftModeToast.tsx`, `frontend/app/actions.ts`, `frontend/app/api/draft-mode/enable/route.ts`, `frontend/app/client-utils.ts`: draft/live support.
- `sanityFetch` route callers: `frontend/app/page.tsx`, `[slug]/page.tsx`, `services/[slug]/page.tsx`, `sitemap.ts`, and `layout.tsx`.
- Embedded Studio/typegen coupling: `frontend/app/studio/[[...tool]]/{page,layout}.tsx`, `frontend/sanity.config.ts`, `frontend/sanity.cli.ts`.

`stegaClean` callers (exhaustive grep): `Cta.tsx`; and sections `ContactForm`, `ContentColumns`, `CtaStrip`, `FeatureGrid`, `FeatureList`, `FullWidthMedia`, `GalleryCarousel`, `GalleryGrid`, `GalleryPage`, `GalleryShowcase`, `HeroBanner`, `HeroMinimal`, `HeroSplit`, `IconGrid`, `LocationDetails`, `LogoBar`, `PolicyNotes`, `PricingList`, `PricingMatrix`, `PricingTable`, `ProcessSteps`, `RequirementsList`, `ServiceCards`, `SplitContent`, `ValuePillars`, `VideoSection`, `WhatsIncluded`. Evidence: imports in the named files. `NOT FOUND`: other preview/editing mechanisms.

## 5. Shared shell data

`frontend/app/layout.tsx` performs `settingsQuery` and `servicesNavQuery` concurrently on each layout render; `generateMetadata` separately performs `settingsQuery` with stega disabled.

- Metadata consumes settings `title`, PT `description`, `ogImage`, computed `faviconUrl`, and `googleSiteVerification`.
- Script/runtime shell consumes `ga4MeasurementId`, `gtmId`, and `ctmScriptUrl`.
- JSON-LD consumes `localBusiness`, `locations`, `socialLinks`, `title`, `logo`, and `ogImage.metadataBase` (the latter is **NOT FOUND** in the schema/query as a projected image field; code therefore normally receives no such field).
- Header receives resolved `navItems`, `ctaButton`, and raw `logo`. Layout replaces the `Services` children with `servicesNavQuery` results (excluding vet-clinic/enrichment) and replaces `Vet Clinic` children with three hardcoded href entries.
- Footer receives `footerTagline`, resolved `footerColumns`, `locations`, `footerText`, `footerTextLink`, resolved `footerBottomLinks`, raw `logo`, `socialLinks`, and `footerSticker` (`frontend/app/components/Footer.tsx`).
- Settings projection includes `contactInfo` and `yearEstablished`, but layout does not pass either to Header/Footer; current shared-shell consumption is **NOT FOUND** outside metadata/JSON-LD for those fields.



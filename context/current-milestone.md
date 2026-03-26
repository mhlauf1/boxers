# Current Milestone

## Milestone 1: Foundation & Brand System

### Status
Nearly Complete — pending commit and deploy verification

### Goals
- ~~Strip all Hound Around-specific content, images, and references from the cloned codebase~~
- ~~Implement the Boxers brand color system (orange, green, gold, cream palette derived from mascot logos)~~
- ~~Remove the three-theme toggle system~~ (none existed — confirmed clean)
- ~~Select and load font pairing for headings and body text~~
- ~~Add the three mascot logos to `/public/illustrations/`~~
- Determine compact navbar logo variant (wordmark only, character head, or flag for Alexis to provide)
- ~~Update all meta tags, site title, favicon, OG images for Boxers Bed & Biscuits~~
- ~~Update `.env` / `.env.example` with Boxers-specific values~~
- ~~Set up new Sanity project/dataset and connect it~~
- Verify clean Vercel deployment with brand colors rendering correctly

### What's Done
- **16 files** with hardcoded Hound Around strings found and replaced (package.json, both sanity configs, layout.tsx, page.tsx, Header, Footer, TextLogo, CalculatorInputs, WebcamGrid, contact API route, webcam auth route, robots.ts, settings schema)
- **Brand colors** implemented in globals.css: orange #E8872D (primary/CTAs), dark green #1B5E20 (forest/dark sections), gold #D4A24E (accents), cream #FAF6EF (bg), sand #F0EBE3 (alt sections)
- **Fonts** loaded: Playfair Display (400 weight, lightest available) for headings + Rubik for all body/UI text
- **Mascot logos** (B&B tuxedo, BEC hoodie, Meds & Fixits lab coat) copied to `public/illustrations/`
- **Favicon** paw print updated to brand orange #E8872D
- **Hound Around illustrations** removed from `public/illustrations/`
- **Vestigial files removed**: `tailwind.config.ts` (v3 config), `content-guide.md`, `pricing-calculator.md`
- **Sanity project** connected: project ID `hw1f15qc`, dataset `production`, env files set for both frontend and studio workspaces
- **`npm run build` passes** — all pages compile and render without errors
- **`npm run dev` runs** — both frontend and studio start successfully

### What's Remaining
- Commit and push to `chore/foundation` branch
- Verify Vercel preview deployment renders correctly
- Compact navbar logo variant — flagged as dependency for Alexis Foster (marketing director, available 4/2)
- OG image — needs to be created/uploaded to Sanity (no source image yet)

### Notes
- No HAFH multi-theme system existed in the codebase — the clone was directly from Hound Around's single-theme setup
- Playfair Display's lightest weight is 400 (not 300) — still elegant, not heavy
- The `price-data/*.csv` files still contain Hound Around pricing rates — these will be fully replaced when the pricing calculator is rewritten in Milestone 3
- The hardcoded pricing in `frontend/app/data/pricingData.ts` is still Hound Around's rates — full rewrite in Milestone 3

### Definition of Done
- ~~Site deploys to Vercel with zero references to Hound Around or HAFH~~ (code clean, deploy pending)
- ~~Brand colors render correctly across all components~~
- ~~All pages render without errors (content can be placeholder)~~
- ~~Mascot logos load and display~~
- ~~No theme toggle widget or multi-theme CSS remains~~
- ~~`npm run build` passes~~

### History
- 2026-03-26: Full codebase audit completed. All 16 Hound Around string references identified and replaced. Brand color system implemented. Playfair Display + Rubik fonts loaded. Three mascot logos added. Favicon updated. Sanity project connected. Hound Around docs removed. Build passes. Dev server runs.

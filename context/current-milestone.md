# Current Milestone

## Milestone 6: Content Finalization (Phase 1)

### Status
Complete — ready for review

### Goals
- ~~**Training page:** Replace placeholder content with real trainer info (Amanda Ingraham / Band of Canines) and add featureCards block~~
- ~~**Employment page:** Replace placeholder with real benefits (medical/dental/vision, discounted pet services, positions)~~
- ~~**Staff page:** Update placeholder names with Lori Shultz (GM), Haley Gates (Reception Manager), add bios~~
- ~~**Homepage stats bar:** Add "Since 2011" stat~~
- ~~**Homepage history section:** New "Our Story" splitContent block with founding story~~

### What's Done

**Training Page (`service-training`) — 3 sections:**
1. HeroSplit — real body text about Amanda Ingraham, Band of Canines, retired U.S. Army master trainer, classes for puppies to seniors
2. FeatureCards (NEW) — 6 cards: Puppy Classes, Basic Obedience, Advanced Training, Senior Dog Programs, Military-Grade Expertise, Confidence Building
3. CtaBanner — "Interested in Training?" + Contact Us CTA

**Employment Page (`page-employment`) — updated:**
- SplitContent placeholder replaced with real benefits: competitive pay, medical/dental/vision after 90-day probation, discounted pet services, open positions (receptionists, groomers, bathers, caregivers)

**Staff Page (`page-our-staff`) — updated:**
- Lori Shultz — General Manager (with bio)
- Alexis Foster — Marketing Director (with bio)
- Haley Gates — Reception Manager (with bio, role updated from Lead Groomer)
- 3 remaining placeholders: Daycare Supervisor, Enrichment Specialist, Veterinary Staff (names pending Alexis)

**Homepage (`page-homepage`) — updated:**
- StatsBar: Added "Serving Pets Since: 2011" as first stat, removed "Full-Service" stat to keep 4 items
- New "Our Story" splitContent block inserted between "Why Boxers" featureCards and "Meds & Fixits" vet spotlight
  - Founded 2011 in converted home (20 suites)
  - Moved to converted church (2014)
  - Expanded to 48,000+ sq ft facility (2018, former Lee Middleton Doll factory)
  - 2 locations, 175 suites, 160+ dog capacity
  - SBA Spark Award recipient

**All content published to Sanity production dataset.**
**`npm run build` passes.**
**No frontend code changes — all content delivered via Sanity page builder blocks.**

### What's Remaining (Still Waiting on Alexis Foster / Facility Team)
- 3 staff member names + bios (Daycare Supervisor, Enrichment Specialist, Veterinary Staff)
- Staff photos for all team members
- Vet clinic service details (what procedures/services are offered)
- Service-specific FAQs for each service page
- Daily schedule timelines for daycare and boarding
- Vaccination/health requirements
- Training pricing (if any)
- Webcam camera IDs (4 placeholder docs exist, all disabled)
- Additional facility photos

### Notes
- Training content sourced from current Boxers website and public sources (Amanda Ingraham / Band of Canines)
- Employment benefits sourced from Indeed.com listings and current website
- Year founded (2011) confirmed via PetVet Sales profile and news articles
- Facility history (home → church → 48k sqft) sourced from News and Sentinel article (May 2018)
- Haley Gates found via LinkedIn — confirmed Reception Manager
- No new Sanity schema types needed
- History section tone is professional/community-rooted — does not reference original founder by name (business acquired by Embark/Cadence)

### Files Modified
- `context/current-milestone.md` — updated to M6
- `context/milestones.md` — M6 status updated
- `context/sanity-schema.md` — M6 notes added

### Definition of Done
- ~~Training page has real content (no PLACEHOLDER)~~
- ~~Employment page has real benefits/positions (no PLACEHOLDER)~~
- ~~Staff page has 3 real names with bios~~
- ~~Homepage has "Since 2011" stat~~
- ~~Homepage has founding story section~~
- ~~All content published~~
- ~~`npm run build` passes~~

### History
- 2026-03-26: Training page updated (hero body + shortDescription + heading filled, featureCards added with 6 training program cards). Employment page placeholder replaced with real benefits/positions. Staff page updated with Lori Shultz, Alexis Foster (bio added), Haley Gates (new, Reception Manager). Homepage statsBar updated with "Since 2011", new "Our Story" splitContent section added. All published. Build passes.

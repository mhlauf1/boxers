# Boxers Site Revamp — Stakeholder Feedback Round 1

Read all @context/ files first if you haven't already. Then read this carefully.

---

## What Happened

We shipped an MVP preview (https://boxers-frontend.vercel.app/) of the Boxers site to the Embark team. The MVP was built entirely from the intake form and logo assets provided by Brian (VP of Operations). The team came back with significant directional changes. Below are the exact emails received, followed by a breakdown of what needs to change.

---

## Raw Emails

### From Peter Mark (Principal / Decision-Maker):

Thanks, Michael. The three things that stand out at first blush are below. For your context, the vet clinic and pet hotel are about 50/50 in the business – but the vet clinic came second in terms of external focus, so it is somewhat marketed as an afterthought. We want to change that going forward and make the marketing more like 60% pet resort, 40% vet clinic.

1. Color scheme
   1. @Brian Remo @Lori Shultz please loop Alexis in
   2. Boxers is somewhat of a hodge podge in terms of branding colors right now
   3. I think we should lean into Blue, since that is the color of our scrubs and kennels – maybe like a "cobalt"

2. Main Landing: we want to lean into the pet hotel and the vet clinic equally here
   1. Can we find a way to have the snip below:
      i. Integrate hero image(s), and be 50/50 Pet Resort and Veterinary
      ii. If we don't want to do a 50/50 split – we should lean into language like "Comprehensive Pet Care Campus" or something like that that would highlight both halfs of the business

3. Veterinary
   1. I think we want vet to be more than just a services page
   2. Embark Team – please help me think through the below:
      i. Do we want to have a combined "Boxers" logo with the tuxedo dog on the left and the doctor dog on the right?
      ii. We could have one-core website, but a very clean redirect to the vet clinic at the top
      1. Vet Clinic Page would probably only need its own core services page and then it's own staff page

So, in summary (Embark team – weigh in)
1. Top left logo would be just a combined "Boxers" – Brian to provide an AI generated combined logo
2. The first landing page on the left would be a clear redirect to "Vet Clinic" (we should find a way to make this stand out more than the other landing page links)
   a. This would be a dropdown to the core vet landing page, our staff page, and dedicated contact page
3. Then you would have Services, Pricing, Our Staff, etc.

---

### From Lori Shultz (Facility Manager / GM):

Hi Michael,

I have CC'd Alexis so she will have the link to preview and give her thoughts as well.
I took a quick glance and just have a few remarks.

The landing page doesn't emphasize our logo or our company name (hidden in the top left-hand corner). Love the personal scrolling pics of the facility.

Under the boarding tab in services, there is a section that states "attentive overnight supervision and monitoring throughout the night". This isn't a service we provide and should be replaced with something else anywhere it appears on the site.

Some of the specific pics on each tab are not the greatest selection- grooming tab is off center, training should have the Band of Canines logo or pic instead of a stock pic, vet clinic is an old pic of some staff that do not work here anymore, and the careers page pic is just not very professional (we have a group pic in the yards on our SOP that would work better). – With this being said we can provide better options for you to replace these specific pics.

The grooming tab seems to concentrate more on services that daycare/boarding provides vs what the actual grooming shop is all about.

Obviously all the linked pages are not there yet but would assume the book now icon takes you to Gingr registration, and the cameras will be a link to install with instructions.
Also, lacking from all the pages are our requirements for the stay- vaccinations, temp test, and times of operations at the bottom of the pages is military time and should be standard.

---

### My reply to the team:

Hey team,
Thanks for the feedback. Just wanted to square away a few items before I start reworking things:
The MVP was built entirely from the intake form and logos Brian provided, that's what drove the color palette, site structure, and how each service is weighted. If the direction is shifting (vet clinic to 40% of the site, new color scheme, combined logo, dedicated vet section with its own pages), I'm fully on board to build whatever, but I need a few things locked in before I rebuild:
1. Color direction: Need a confirmed palette. Are we moving to blue, keeping orange/green from the logo?
2. Combined logo: Brian, when can I expect this?
3. Vet clinic content: Service descriptions, staff bios/photos, anything beyond the phone number and hours that were in the intake form.
4. Final call on site structure: Is the vet clinic getting its own landing page, staff page, and contact page as Peter described?

Lori, photo swaps and copy fixes are no problem, send replacements when you have them.

---

## What This Means — Action Breakdown

### Changes I can make RIGHT NOW (not blocked on anyone):

**1. Remove overnight supervision claims**
- Find and remove ALL references to "overnight supervision," "monitoring throughout the night," or any language that implies 24/7 overnight staffing
- Check: boarding page, homepage services section, any boarding-related copy across the entire site
- Replace with appropriate language that doesn't make that claim

**2. Fix military time → standard time**
- All hours displayed anywhere on the site should be standard format (7 AM, not 07:00 or 19:00)
- Check footer, contact sections, any page that displays hours of operation

**3. Fix grooming content**
- Lori says the grooming tab/page concentrates more on daycare/boarding services than actual grooming
- Review all grooming copy and make sure it's specifically about grooming services (baths, nail trims, full-service grooming, exit baths, add-ons)
- Reference the grooming descriptions from @context/intake-content.md

**4. Make logo/brand name more prominent on homepage**
- Lori says the logo feels hidden in the top left corner
- Make the brand more visible in the hero section — show full mascot wordmark prominently, not just a compact nav logo

**5. Restructure homepage hero for "pet care campus" positioning**
- Current hero treats Boxers as primarily a daycare/boarding facility
- Needs to communicate the full scope: pet resort + vet clinic + enrichment — everything under one roof
- Consider language like "Comprehensive Pet Care Campus" or similar umbrella framing
- Hero should represent both halves of the business (resort and veterinary)
- We can start this structural work now even without final color palette

**6. Restructure nav for vet clinic prominence**
- Peter wants "Vet Clinic" as a top-level nav item, NOT nested inside Services
- It should be the FIRST nav item and visually stand out from the others
- Vet Clinic dropdown should include: vet landing page, vet staff page, vet contact page
- The rest of the nav follows: Services (daycare, boarding, grooming, enrichment, training), Pricing, Our Staff, etc.

**7. Scaffold vet clinic sub-pages**
- Vet Staff page — separate from the main Our Staff page
- Vet Contact page — dedicated contact page with vet-specific phone (740-525-3333), email (boxersmedsandfixits@gmail.com), hours (Mon-Fri 8am-6pm)
- These can be scaffolded with placeholder content now

**8. Book Now → Gingr**
- Make sure all "Book Now" CTAs link to: https://boxersbedandbiscuits.portal.gingrapp.com/secure/home

**9. Add requirements info**
- Lori flagged that vaccination requirements, temperament test info, and stay requirements are missing
- This content hasn't been provided yet — scaffold a "Requirements" or "New Clients" section/page with [PLACEHOLDER] markers

### Changes that are BLOCKED (waiting on team):

**1. Color palette** — BLOCKED on team confirming blue/cobalt direction vs. keeping orange/green. Do NOT change colors until this is confirmed. Alexis is being looped in.

**2. Combined logo** — BLOCKED on Brian providing an AI-generated combined logo (tuxedo dog + doctor dog). Current logos stay until the new one arrives.

**3. Photo replacements** — BLOCKED on Lori/Alexis sending better photos for:
- Grooming tab (current is off-center)
- Training tab (needs Band of Canines logo/photo, not stock)
- Vet clinic (current shows former staff)
- Careers/employment (needs the group yard photo from their SOP)

**4. Vet clinic service content** — BLOCKED on team providing actual vet service descriptions, specialties, procedures offered, appointment process, etc.

**5. Vet staff bios/photos** — BLOCKED on team providing vet-specific team member info

### Updated site structure based on Peter's feedback:

**Nav (left to right):**
1. Logo (combined "Boxers" — waiting on Brian)
2. **Vet Clinic** (visually prominent, dropdown): Vet Services, Vet Staff, Vet Contact
3. Services (dropdown): Daycare, Boarding, Grooming, Enrichment Center, Training
4. Pricing
5. Our Staff
6. Petcams
7. CTA: Book Now → Gingr

**Pages (updated from original sitemap):**
1. Homepage — repositioned as "Comprehensive Pet Care Campus"
2. Daycare
3. Boarding
4. Grooming
5. Enrichment Center (BEC)
6. Vet Clinic landing page (elevated, not just a services page)
7. Vet Staff page — NEW
8. Vet Contact page — NEW
9. Training
10. Pricing
11. Petcams
12. Our Staff (resort/main facility staff)
13. Employment
14. Gingr Portal (external nav link)

That's 13 pages + 1 external link, up from the original 11 + 1.

---

## Priority Order

Start with what's unblocked. Work through items 1-9 from the "can do now" list in this order:

1. Remove overnight supervision copy (quick, critical — it's inaccurate)
2. Fix military time to standard time (quick)
3. Restructure nav (Vet Clinic as first prominent item with dropdown)
4. Restructure homepage hero (campus positioning, both halves of business)
5. Make logo more prominent on homepage
6. Fix grooming content
7. Scaffold vet staff and vet contact pages
8. Wire up Book Now → Gingr links
9. Add requirements placeholder sections

Do NOT touch the color palette. Do NOT swap photos (we're waiting on replacements). Present a plan for items 3 and 4 before implementing — those are structural changes and I want to review the approach.

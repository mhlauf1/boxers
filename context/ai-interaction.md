# AI Interaction Guidelines

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features or pages not discussed in the project plan
- Never delete files without clarification
- If a component exists from the Hound Around codebase, modify it — don't rewrite from scratch unless structurally necessary

## Workflow

This is the workflow for every milestone, feature, or fix:

1. **Document** — Update @context/current-milestone.md with what we're working on
2. **Branch** — Create new branch for the work
3. **Implement** — Build what's documented in current-milestone.md
4. **Test** — Verify it works in the browser. Run `npm run build` and fix any errors
5. **Iterate** — Iterate and change things if needed
6. **Commit** — Only after build passes and everything works
7. **Merge** — Merge to main
8. **Delete branch** — Delete branch after merge
9. **Deploy** — Verify Vercel preview deployment looks correct
10. **Update** — Mark as completed in @context/current-milestone.md and add to history in @context/milestones.md

Do NOT commit without permission and until the build passes. If build fails, fix the issues first.

## Branching

Create a new branch for every milestone or significant change.

- Features: `feature/[name]` (e.g., `feature/bec-page`, `feature/pricing-page`)
- Fixes: `fix/[name]` (e.g., `fix/mobile-nav-overflow`)
- Content: `content/[name]` (e.g., `content/seed-pricing-data`)
- Chore: `chore/[name]` (e.g., `chore/remove-hound-around-refs`)

Ask to delete the branch once merged.

## Commits

- Ask before committing (don't auto-commit)
- Use conventional commit messages (`feat:`, `fix:`, `chore:`, `content:`, `style:`, etc.)
- Keep commits focused (one feature/fix per commit)
- **Never put "Generated With Claude" or any AI attribution in commit messages**

## Codebase Origin Rules

This repo was cloned from the Hound Around Resort codebase (`mhlauf1/hound-3`) with a clean git history. It is its own independent repo (`mhlauf1/boxers-bed-biscuits`), not a GitHub fork. **At clone time, every file in this repo is Hound Around's — every page, every component, every image, every string of text, every env var. The first job is a complete gut of all Hound Around (and any HAFH) content.** Follow these rules strictly:

### Do
- Reuse existing component structures and patterns
- Modify components to fit Boxers' needs (more services, multi-location contact, memberships, etc.)
- Add new components alongside existing ones when Boxers needs something Hound Around doesn't have (BEC spotlight, vet clinic page, employment page, membership pricing)
- Keep the same Sanity query patterns and data-fetching approach
- Document any structural changes so they can inform the future Embark site template

### Don't
- Leave any Hound Around-specific content (copy, images, alt text, meta tags, comments, URLs)
- Change a working component pattern just because you'd do it differently — consistency across sites matters
- Rename files/components without a clear reason — the Hound Around naming conventions are the standard
- Modify the Sanity schema structure unless the content genuinely requires it

### When you find Hound Around or HAFH content (and you will — it's everywhere)
- Replace it with the Boxers equivalent from @context/project-overview.md or @context/intake-content.md
- If Boxers content doesn't exist yet for that field, use a clear placeholder: `[PLACEHOLDER: Training page description]`
- Never leave a Hound Around or HAFH reference as a placeholder — always swap to either real Boxers content or an explicit `[PLACEHOLDER]` marker
- Search for all of these: "Hound Around," "Cottage Grove," "651-788-9797," "Home Away From Home," "HAFH," "Fargo," "hafhfacility," "homeawayfargo," "houndaroundresort," "hound-3," and any other location-specific content that isn't Boxers

## Multi-Location Awareness

Boxers operates three sub-brands under one website. Components that display contact info, hours, or location details must account for this:

- **PAW-PLEX** — main facility, default contact info
- **BEC** — separate address, same phone, slightly different hours
- **Meds & Fixits** — same address different suite, different phone, different hours, different email

The footer needs all three. Service pages should show the relevant location's info. The nav CTA (Book Now) always goes to the Gingr portal.

## Design Direction

Clean, modern layout (from Hound Around's bones) with mascot-driven personality (from Boxers' brand). The design is NOT three selectable themes like HAFH — Boxers has one established brand identity derived from their logo system.

- Use the brand color palette (orange, green, gold, cream) defined in @context/project-overview.md
- The three mascot logos are the personality layer — use them on relevant pages and sections
- Don't make the site feel like a kids' brand — the mascots are fun but the layout stays professional and clean
- When in doubt about design direction, reference https://houndaroundresort.com/ for layout patterns and adapt the visual identity for Boxers

## Sanity Content Rules

- All user-facing text comes from Sanity — not hardcoded in components
- When Sanity content is missing, render gracefully (hide the section or show nothing) — never crash
- When seeding Sanity content, use the exact data from @context/intake-content.md (pricing, hours, descriptions) — don't paraphrase or embellish
- Keep GROQ queries in the central queries file, not scattered across components

## When Stuck

- If something isn't working after 2-3 attempts, stop and explain the issue
- Don't keep trying random fixes
- Ask for clarification if requirements are unclear
- If a Hound Around pattern doesn't make sense for Boxers, explain why before changing it

## Code Changes

- Make minimal changes to accomplish the task
- Don't refactor unrelated code unless asked
- Don't add "nice to have" features
- Preserve existing patterns from the Hound Around codebase
- When modifying a shared component, consider how the change would affect other Embark sites

## What Not To Do

- Don't add pages or sections not in the sitemap (@context/project-overview.md)
- Don't install new dependencies without asking — especially for things the existing stack already handles
- Don't change the Vercel, Cloudflare, or Sanity configuration without explicit instruction
- Don't create mock/dummy images — use placeholder divs with appropriate aspect ratios and a muted background
- Don't write Sanity migration scripts unless asked — content seeding is done manually or through Studio
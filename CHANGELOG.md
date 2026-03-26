# Changelog

All notable changes to the Boxers Bed & Biscuits website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added
- Boxers brand color system (orange #E8872D, dark green #1B5E20, gold #D4A24E, cream #FAF6EF)
- Playfair Display (thin/300 weight) + Rubik font pairing
- Three mascot logos (B&B tuxedo, BEC hoodie, Meds & Fixits lab coat) in public/illustrations/
- Paw print favicon in brand orange (#E8872D)
- Connected to new Boxers Sanity project (hw1f15qc)

### Removed
- All Hound Around Resort references, images, copy, and branding
- Hound Around line-art dog illustrations
- Vestigial Tailwind v3 config file (tailwind.config.ts)
- Hound Around content guide and pricing calculator spec

### Changed
- Package name from hound-3 to boxers-bed-biscuits
- All hardcoded strings: site title, alt text, footer copy, contact email, phone numbers, robots.txt sitemap URL
- Color palette: forest green #2D4A3E → dark green #1B5E20, terracotta #C4704B → brand orange #E8872D
- Fonts: Bricolage Grotesque + Poppins → Playfair Display + Rubik
- Heading weight: 600 → 300 (thin Playfair Display)
- Sanity Studio title updated in both frontend and studio configs
- Webcam auth HMAC secret updated

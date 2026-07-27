// Canonical production origin. The apex domain redirects to www,
// so all absolute URLs (sitemap, canonicals, structured data) must use www.
export const SITE_URL = 'https://www.boxersbedandbiscuits.com'

// PAW-PLEX main line, single source for the pricing calculators' contact CTAs.
// Keep formatted and href digits derived from the same value so CallTrackingMetrics
// can match and swap both the visible number and the tel: link.
export const FACILITY_PHONE_DISPLAY = '740-423-7777'
export const FACILITY_PHONE_HREF = `tel:${FACILITY_PHONE_DISPLAY.replace(/\D/g, '')}`

// ─── Shared ─────────────────────────────────────────────────
export type LineItem = {label: string; amount: number}

// ─── Daycare ────────────────────────────────────────────────
export type DaycarePackage = 'single' | '10-visit' | '25-visit' | '40-visit'

const DAYCARE_RATE = 39
const DAYCARE_ADDITIONAL_RATE = 19.5 // 50% off

const daycarePackages: Record<DaycarePackage, {visits: number | null; price: number | null; expiration: string | null}> = {
  single: {visits: null, price: null, expiration: null},
  '10-visit': {visits: 10, price: 350, expiration: '2 months'},
  '25-visit': {visits: 25, price: 800, expiration: '4 months'},
  '40-visit': {visits: 40, price: 1200, expiration: '6 months'},
}

export const daycarePackageOptions = Object.entries(daycarePackages).map(([key, val]) => ({
  id: key as DaycarePackage,
  label: val.visits ? `${val.visits}-Visit Package` : 'Single Days',
  detail: val.price ? `$${val.price}` : `$${DAYCARE_RATE}/day`,
  expiration: val.expiration,
}))

export type DaycareDogConfig = {
  id: string
  pkg: DaycarePackage
  days: number // only used when pkg === 'single'
}

export type DaycareResult = {
  total: number
  lineItems: LineItem[]
  savings: number | null
  perDayRate: number
}

export function calculateDaycarePerDog(input: {dogs: DaycareDogConfig[]}): DaycareResult {
  const {dogs} = input
  const lineItems: LineItem[] = []
  let total = 0
  let totalSavings = 0
  let hasSavings = false

  for (let i = 0; i < dogs.length; i++) {
    const dog = dogs[i]
    const isAdditional = i > 0
    const pkg = daycarePackages[dog.pkg]

    if (pkg.price !== null && pkg.visits !== null) {
      // Package pricing — flat price, additional dogs get 50% off the per-visit rate
      const perVisit = pkg.price / pkg.visits
      const cost = isAdditional ? Math.round(pkg.price * 0.5 * 100) / 100 : pkg.price
      const dogLabel = dogs.length > 1 ? `Dog ${i + 1}` : 'Your dog'
      lineItems.push({
        label: `${dogLabel} — ${pkg.visits}-Visit Pkg${isAdditional ? ' (50% off)' : ''}`,
        amount: cost,
      })
      total += cost

      // Savings vs. single-day rate
      const singleCost = (isAdditional ? DAYCARE_ADDITIONAL_RATE : DAYCARE_RATE) * pkg.visits
      totalSavings += singleCost - cost
      hasSavings = true
    } else {
      // Single-day pricing
      const rate = isAdditional ? DAYCARE_ADDITIONAL_RATE : DAYCARE_RATE
      const numDays = dog.days
      const cost = rate * numDays
      const dogLabel = dogs.length > 1 ? `Dog ${i + 1}` : 'Your dog'
      lineItems.push({
        label: `${dogLabel} — ${numDays} day${numDays > 1 ? 's' : ''} @ $${rate}/day${isAdditional ? ' (50% off)' : ''}`,
        amount: cost,
      })
      total += cost
    }
  }

  return {total, lineItems, savings: hasSavings ? totalSavings : null, perDayRate: DAYCARE_RATE}
}

// ─── Boarding ───────────────────────────────────────────────
const BOARDING_RATE = 59
const BOARDING_ADDITIONAL_RATE = 29.5 // 50% off

export type BoardingDogConfig = {
  id: string
  nights: number
}

export type BoardingResult = {
  total: number
  lineItems: LineItem[]
  nightlyRate: number
  includes: string[]
}

export function calculateBoardingPerDog(input: {dogs: BoardingDogConfig[]}): BoardingResult {
  const {dogs} = input
  const lineItems: LineItem[] = []
  let total = 0

  for (let i = 0; i < dogs.length; i++) {
    const dog = dogs[i]
    const isAdditional = i > 0
    const rate = isAdditional ? BOARDING_ADDITIONAL_RATE : BOARDING_RATE
    const cost = rate * dog.nights

    const dogLabel = dogs.length > 1 ? `Dog ${i + 1}` : 'Your dog'
    lineItems.push({
      label: `${dogLabel} — ${dog.nights} night${dog.nights > 1 ? 's' : ''} @ $${rate}/night${isAdditional ? ' (50% off)' : ''}`,
      amount: cost,
    })
    total += cost
  }

  return {
    total,
    lineItems,
    nightlyRate: BOARDING_RATE,
    includes: ['Structured play & enrichment', 'Supervised group activities', 'Feeding (your food)', 'Clean, secure accommodations'],
  }
}

// ─── Grooming ───────────────────────────────────────────────
export type DogSize = 's' | 'm' | 'l' | 'xl'

export type GroomingAddOn = 'nailTrim' | 'brushOut' | 'earCleaning' | 'analGlands'

const exitBathRates: Record<DogSize, number> = {
  s: 29,
  m: 39,
  l: 59,
  xl: 69,
}

const groomingAddOns: Record<GroomingAddOn, {label: string; price: number}> = {
  nailTrim: {label: 'Nail Trim', price: 19},
  brushOut: {label: 'Brush Out', price: 25},
  earCleaning: {label: 'Ear Cleaning', price: 15},
  analGlands: {label: 'Anal Glands', price: 25},
}

export const groomingAddOnOptions = Object.entries(groomingAddOns).map(([key, val]) => ({
  id: key as GroomingAddOn,
  label: val.label,
  price: val.price,
}))

export const sizeLabels: Record<DogSize, string> = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'XL',
}

export type DogConfig = {id: string; size: DogSize}

export type GroomingResult = {
  total: number
  lineItems: LineItem[]
}

export function calculateGrooming(input: {
  dogs: DogConfig[]
  selectedAddOns: GroomingAddOn[]
}): GroomingResult {
  const {dogs, selectedAddOns} = input
  const lineItems: LineItem[] = []
  let total = 0

  // Exit bath pricing by size
  for (let i = 0; i < dogs.length; i++) {
    const dog = dogs[i]
    const price = exitBathRates[dog.size]
    total += price
    const dogLabel = dogs.length > 1 ? `Dog ${i + 1} (${sizeLabels[dog.size]})` : `Exit Bath (${sizeLabels[dog.size]})`
    lineItems.push({label: dogLabel, amount: price})
  }

  // Add-ons (per dog)
  for (const addOn of selectedAddOns) {
    const info = groomingAddOns[addOn]
    const cost = info.price * dogs.length
    total += cost
    lineItems.push({
      label: dogs.length > 1 ? `${info.label} x ${dogs.length}` : info.label,
      amount: cost,
    })
  }

  return {total, lineItems}
}

#!/usr/bin/env node
// One-off script to apply Brian's 2026-04-10 feedback to Sanity content.
// Reads auth token from ~/.config/sanity/config.json so no env var needed.

import { createClient } from '@sanity/client'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const cfg = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.config/sanity/config.json'), 'utf8'))
const token = cfg.authToken
if (!token) throw new Error('No auth token in ~/.config/sanity/config.json')

const client = createClient({
  projectId: 'hw1f15qc',
  dataset: 'production',
  apiVersion: '2025-09-25',
  token,
  useCdn: false,
})

const GINGR = 'https://boxersbedandbiscuits.portal.gingrapp.com/secure/home'

// Helper: for a "Book Now" style link that has linkType:"page" but an href Gingr URL OR
// a page ref pointing at homepage, coerce it to a proper href link.
function fixBookLink(docId, path) {
  return client
    .patch(docId)
    .set({ [`${path}.linkType`]: 'href', [`${path}.href`]: GINGR, [`${path}.openInNewTab`]: true })
    .unset([`${path}.page`])
}

const ops = []

// ========== BOARDING (remaining) ==========
// pricingTable Standard Boarding tier — swap feature + add 50% off
ops.push(
  client.patch('service-boarding').set({
    'pageBuilder[_key=="2837275433a8"].categories[_key=="44e56744c749"].tiers[_key=="da1fe92369bf"].features': [
      'Comfortable, secure environment',
      'Clean, secure accommodations',
      'Consistent daily routine',
      'Group or Private Play Included',
      '50% off for additional dogs',
    ],
  })
)
// pricingTable Enrichment Boarding tier — add 50% off
ops.push(
  client.patch('service-boarding').set({
    'pageBuilder[_key=="2837275433a8"].categories[_key=="44e56744c749"].tiers[_key=="c13eb57557cb"].features': [
      'Private play sessions',
      'Guided enrichment activities',
      'Individualized daily programming',
      'All standard boarding benefits',
      '50% off for additional dogs',
    ],
  })
)
// Boarding ctaBanner cta — currently "Schedule a Tour" → homepage. Change to Book Now → Gingr.
ops.push(
  client
    .patch('service-boarding')
    .set({
      'pageBuilder[_key=="c85427e913fc"].cta.buttonText': 'Book Now',
      'pageBuilder[_key=="c85427e913fc"].cta.link.linkType': 'href',
      'pageBuilder[_key=="c85427e913fc"].cta.link.href': GINGR,
      'pageBuilder[_key=="c85427e913fc"].cta.link.openInNewTab': true,
    })
    .unset(['pageBuilder[_key=="c85427e913fc"].cta.link.page'])
)

// ========== DAYCARE ==========
// Fix heroSplit Book Now link (had linkType:page + href + page ref)
ops.push(fixBookLink('service-daycare', 'pageBuilder[_key=="e7d1c81d6394"].primaryCta.link'))
// Change ctaBanner heading (the "Drop Off the Guilt" line)
ops.push(
  client.patch('service-daycare').set({
    'pageBuilder[_key=="22a7367e3a8c"].heading': 'Confidence for you. The best day for them.',
  })
)
// Fix ctaBanner Book Now link (page ref only → homepage)
ops.push(fixBookLink('service-daycare', 'pageBuilder[_key=="22a7367e3a8c"].cta.link'))

// ========== GROOMING ==========
// Fix heroSplit Book Now link
ops.push(fixBookLink('service-grooming', 'pageBuilder[_key=="07f3d81f44c0"].primaryCta.link'))
// Remove heroSplit secondaryCta entirely (Brian: "View more details link is messed up", "less is more")
ops.push(client.patch('service-grooming').unset(['pageBuilder[_key=="07f3d81f44c0"].secondaryCta']))
// Move "coat density" footnote out of Small Dogs description (full grooming category)
ops.push(
  client.patch('service-grooming').unset([
    'pageBuilder[_key=="b4832441134b"].categories[_key=="1e4bffd12c0a"].tiers[_key=="5910376094c9"].description',
  ])
)
// Note: Full grooming footnote already exists on the pricingTable as `footnotes` field per earlier audit:
//   "footnotes": ["Full grooming pricing determined by coat density, coat condition, and grooming time"]
// So moving OUT of Small Dogs description is the fix — the footnote is already where Brian wants it.

// ctaStrip "Give Them the Care They Deserve" — fix broken link
ops.push(fixBookLink('service-grooming', 'pageBuilder[_key=="9591d2df46e0"].cta.link'))
// ctaBanner: change the "Drop Off the Guilt" bottom bubble per Brian's spa copy
ops.push(
  client.patch('service-grooming').set({
    'pageBuilder[_key=="11c081b16284"].heading': 'Your best friend deserves a spa day.',
    'pageBuilder[_key=="11c081b16284"].description':
      'Professional grooming that delivers comfort, care, and confidence.',
  })
)
// Fix ctaBanner Book Now link
ops.push(fixBookLink('service-grooming', 'pageBuilder[_key=="11c081b16284"].cta.link'))

// ========== TRAINING ==========
// Fix heroSplit Book Now link
ops.push(fixBookLink('service-training', 'pageBuilder[_key=="5711020d9a84"].primaryCta.link'))
// Remove heroSplit secondaryCta (View Pricing → daycare pricing bug)
ops.push(client.patch('service-training').unset(['pageBuilder[_key=="5711020d9a84"].secondaryCta']))
// Append pricing note to body (Brian: "ask one of our Pet Care Professionals for pricing")
ops.push(
  client.patch('service-training').set({
    'pageBuilder[_key=="5711020d9a84"].body':
      "Our training program is led by Amanda Ingraham, owner of Band of Canines and retired U.S. Army master trainer. With years of professional experience, Amanda and her team are committed to helping dog owners reach their basic obedience or advanced training goals. We offer classes for all ages, from puppies to seniors, covering everything from basic commands like 'sit' to advanced skills like 'search.' Whether you're starting fresh with a new puppy or looking to refine your dog's skills, our training programs are designed to build confidence, strengthen the bond between you and your pet, and set your dog up for success. Ask one of our Pet Care Professionals for pricing and scheduling information.",
  })
)
// Rename "Military-Grade Expertise" feature card (no em-dash per user rule)
ops.push(
  client.patch('service-training').set({
    'pageBuilder[_key=="e2dbd28e5112"].features[_key=="0fd281e3e060"].title': 'Precision Training. Real Results.',
  })
)
// Fix ctaBanner Book Now link
ops.push(fixBookLink('service-training', 'pageBuilder[_key=="b04560382c49"].cta.link'))

// ========== VET CLINIC ==========
// Fix heroSplit Book Now link
ops.push(fixBookLink('service-vet-clinic', 'pageBuilder[_key=="676698c9ca1c"].primaryCta.link'))

// ========== ENRICHMENT ==========
// Fix heroSplit Book Now link
ops.push(fixBookLink('service-enrichment', 'pageBuilder[_key=="6ef65108678b"].primaryCta.link'))
// Fix ctaStrip link
ops.push(fixBookLink('service-enrichment', 'pageBuilder[_key=="1c4d23a29cdb"].cta.link'))

// ========== PRICING PAGE ==========
// Add discount clarification footnote to the Monthly Membership Plans table
ops.push(
  client.patch('page-pricing').set({
    'pageBuilder[_key=="d993e7ee495b"].footnotes': [
      'Additional dogs receive 50% off boarding and 20% off memberships. Single-day daycare and daycare packages are full price per dog.',
    ],
  })
)
// Fix pricing page ctaBanner Book Now link
ops.push(fixBookLink('page-pricing', 'pageBuilder[_key=="61b2e2c0fc25"].cta.link'))

// ========== OUR STAFF ==========
// Reorder + retitle per Brian's 2x5 spec.
// Current keys (from earlier audit):
//   60981e473aa9 Johnathan Painter (was "Reception Manager")
//   6deb891e25c0 Lori Shultz (General Manager)
//   458241e075b0 Cassandra Bonnette (was "Brat Pack Manager")
//   03732998b2fc Jessica Davis (was "Paw-Plex Manager")
//   05e5d3bbf550 Alexis Foster (Marketing Manager)
//   73e6a1e626c3 Kacey Kilkenny (Vet Clinic Manager)
//   1f7e9a9315a2 Trey Stephens (was "Employee Training Manager")
//   3de50c507c2a Meghan Mcoll (was "Cleaning Manager")
//   cf336df8cd7f Jeannie Hartford (was "Paw-Plex Asstistant Manager")
//   9e4987f3c952 Jamie Schmitt (was "All-Services Liaison")
// Brian's order (2x5, left to right, top to bottom):
//   Row 1: Lori, Jessica, Cassandra, Kacey, Alexis
//   Row 2: Meghan, Johnathan, Trey, Jeannie, Jamie
// Strategy: update each member's role first, then fetch the current members array
// (to preserve image refs etc.) and reorder by setting the whole array.
ops.push(
  client
    .patch('page-our-staff')
    .set({
      'pageBuilder[_key=="1fee4508118a"].members[_key=="6deb891e25c0"].role': 'General Manager',
      'pageBuilder[_key=="1fee4508118a"].members[_key=="03732998b2fc"].role': 'Pet Care Manager',
      'pageBuilder[_key=="1fee4508118a"].members[_key=="458241e075b0"].role': 'Enrichment Manager',
      'pageBuilder[_key=="1fee4508118a"].members[_key=="73e6a1e626c3"].role': 'Vet Clinic Manager',
      'pageBuilder[_key=="1fee4508118a"].members[_key=="05e5d3bbf550"].role': 'Marketing Manager',
      'pageBuilder[_key=="1fee4508118a"].members[_key=="3de50c507c2a"].role': 'Sanitation Manager',
      'pageBuilder[_key=="1fee4508118a"].members[_key=="60981e473aa9"].role': 'Client Experience Manager',
      'pageBuilder[_key=="1fee4508118a"].members[_key=="1f7e9a9315a2"].role': 'Team Development Manager',
      'pageBuilder[_key=="1fee4508118a"].members[_key=="cf336df8cd7f"].role': 'Assistant Manager',
      'pageBuilder[_key=="1fee4508118a"].members[_key=="9e4987f3c952"].role': 'Assistant Manager',
    })
    .set({
      // Also fix the "Mcoll" typo → "McColl" is the likely correct spelling but we don't know,
      // so leave names alone unless Mike confirms.
    })
)

// Reorder: fetch the current members, reorder by key, then set the whole array.
// Order: Lori, Jessica, Cassandra, Kacey, Alexis, Meghan, Johnathan, Trey, Jeannie, Jamie
const STAFF_ORDER = [
  '6deb891e25c0', // Lori
  '03732998b2fc', // Jessica
  '458241e075b0', // Cassandra
  '73e6a1e626c3', // Kacey
  '05e5d3bbf550', // Alexis
  '3de50c507c2a', // Meghan
  '60981e473aa9', // Johnathan
  '1f7e9a9315a2', // Trey
  'cf336df8cd7f', // Jeannie
  '9e4987f3c952', // Jamie
]

async function reorderStaff() {
  const doc = await client.getDocument('page-our-staff')
  const block = doc.pageBuilder.find((b) => b._key === '1fee4508118a')
  if (!block) throw new Error('Team block not found')
  const byKey = new Map(block.members.map((m) => [m._key, m]))
  const reordered = STAFF_ORDER.map((k) => {
    const m = byKey.get(k)
    if (!m) throw new Error(`Missing member key ${k}`)
    return m
  })
  // Apply updated roles to the in-memory copy before writing (belt and suspenders)
  const ROLES = {
    '6deb891e25c0': 'General Manager',
    '03732998b2fc': 'Pet Care Manager',
    '458241e075b0': 'Enrichment Manager',
    '73e6a1e626c3': 'Vet Clinic Manager',
    '05e5d3bbf550': 'Marketing Manager',
    '3de50c507c2a': 'Sanitation Manager',
    '60981e473aa9': 'Client Experience Manager',
    '1f7e9a9315a2': 'Team Development Manager',
    cf336df8cd7f: 'Assistant Manager',
    '9e4987f3c952': 'Assistant Manager',
  }
  for (const m of reordered) m.role = ROLES[m._key] || m.role
  return client
    .patch('page-our-staff')
    .set({ 'pageBuilder[_key=="1fee4508118a"].members': reordered })
}

// ========== VET STAFF ==========
// Update placeholder teamMembers to real ones. Jaynie's full name + photo is TBD.
// Replacing 3 placeholders with 2 real members (names per Brian's mention; photos blank for Mike to add in Studio).
async function updateVetStaff() {
  const doc = await client.getDocument('7f6abcb2-82e3-4753-86dd-100da5514af4')
  const block = doc.pageBuilder.find((b) => b._type === 'teamGrid')
  if (!block) throw new Error('Vet team block not found')
  const newMembers = [
    {
      _key: 'vet-jaynie',
      _type: 'teamMember',
      name: 'Dr. Jaynie',
      role: 'Veterinarian',
      bio: '[PLACEHOLDER: Full name, credentials, and bio to be added]',
    },
    {
      _key: 'vet-kacey',
      _type: 'teamMember',
      name: 'Kacey Kilkenny',
      role: 'Vet Clinic Manager',
      // Pull the existing Kacey photo ref from the Our Staff page.
    },
  ]
  // Try to pull Kacey's existing image from our-staff so we don't lose it
  const staffDoc = await client.getDocument('page-our-staff')
  const teamBlock = staffDoc.pageBuilder.find((b) => b._key === '1fee4508118a')
  const kaceyFromStaff = teamBlock?.members?.find((m) => m._key === '73e6a1e626c3')
  if (kaceyFromStaff?.image) newMembers[1].image = kaceyFromStaff.image

  // Also fix the ctaStrip broken /vet-contact link → use tel: link
  return client
    .patch('7f6abcb2-82e3-4753-86dd-100da5514af4')
    .set({
      [`pageBuilder[_key=="${block._key}"].members`]: newMembers,
      'pageBuilder[_key=="vs-cta-001"].cta.buttonText': 'Call 740-525-3333',
      'pageBuilder[_key=="vs-cta-001"].cta.link.href': 'tel:+17405253333',
      'pageBuilder[_key=="vs-cta-001"].cta.link.linkType': 'href',
    })
}

// ========== EXECUTE ==========
async function run() {
  console.log(`Running ${ops.length} direct patches + 2 async patches...`)

  // Direct patches: commit each sequentially (transactions don't like conflicting array ops in one go)
  for (let i = 0; i < ops.length; i++) {
    try {
      await ops[i].commit({ autoGenerateArrayKeys: true })
      console.log(`  ✓ patch ${i + 1}/${ops.length}`)
    } catch (e) {
      console.error(`  ✗ patch ${i + 1}/${ops.length}:`, e.message)
      throw e
    }
  }

  console.log('Reordering staff...')
  await (await reorderStaff()).commit({ autoGenerateArrayKeys: true })
  console.log('  ✓ staff reordered')

  console.log('Updating vet staff page...')
  await (await updateVetStaff()).commit({ autoGenerateArrayKeys: true })
  console.log('  ✓ vet staff updated')

  console.log('\nAll patches applied to drafts. Run publish step next.')
}

run().catch((e) => {
  console.error('FAILED:', e)
  process.exit(1)
})

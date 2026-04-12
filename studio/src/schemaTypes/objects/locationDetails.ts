import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const locationDetails = defineType({
  name: 'locationDetails',
  title: 'Location Details',
  type: 'object',
  icon: PinIcon,
  description:
    'Visit / contact card for one of the facility locations. Pulls address, phone, email, and hours from Settings → Locations by slug.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Optional badge text above the heading (e.g. "Our Veterinary Clinic")',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'blockContentTextOnly',
      description: 'Optional short intro (1–2 sentences). Contact info is pulled from Settings.',
    }),
    defineField({
      name: 'locationSlug',
      title: 'Location',
      type: 'string',
      description:
        'Must match a location slug in Settings → Locations (e.g. paw-plex, bec, meds-and-fixits).',
      options: {
        list: [
          {title: 'PAW-PLEX (Main Facility)', value: 'paw-plex'},
          {title: 'Boxers Enrichment Center', value: 'bec'},
          {title: 'Meds & Fixits (Vet Clinic)', value: 'meds-and-fixits'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mascotImage',
      title: 'Mascot Image',
      type: 'image',
      description: 'Sub-brand mascot illustration to display beside the contact card.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'mascotCaption',
      title: 'Mascot Caption',
      type: 'string',
      description: 'Optional tagline under the mascot (e.g. "A Veterinary Service for Dogs & Cats")',
    }),
    defineField({
      name: 'externalCtaLabel',
      title: 'External CTA Label',
      type: 'string',
      description: 'Optional third CTA (e.g. "Online Pharmacy"). Call and Directions buttons are automatic.',
    }),
    defineField({
      name: 'externalCtaLink',
      title: 'External CTA URL',
      type: 'url',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Cream', value: 'cream'},
          {title: 'Sand', value: 'sand'},
          {title: 'Forest', value: 'forest'},
        ],
        layout: 'radio',
      },
      initialValue: 'sand',
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'locationSlug'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Location Details',
        subtitle: subtitle ? `Location: ${subtitle}` : 'Location Details Section',
      }
    },
  },
})

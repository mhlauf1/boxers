import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const heroMarquee = defineType({
  name: 'heroMarquee',
  title: 'Hero Marquee',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heroLogo',
      title: 'Hero Logo',
      type: 'image',
      description: 'Optional large logo displayed prominently above the heading',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingAccent',
      title: 'Heading Accent',
      type: 'string',
      description: 'Second line of the heading displayed in a lighter color',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'button',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'button',
    }),
    defineField({
      name: 'reviewRating',
      title: 'Review Star Rating',
      type: 'number',
      description: 'Number of filled stars (1–5)',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'string',
      description: 'e.g. "200+ 5 Star Reviews"',
    }),
    defineField({
      name: 'trustLine',
      title: 'Trust Line',
      type: 'string',
    }),
    defineField({
      name: 'bubbleText',
      title: 'Bubble Text',
      type: 'string',
      description: 'Text displayed in the floating orange bubble badge (e.g. "All-inclusive care under one roof")',
    }),
    defineField({
      name: 'marqueeImages',
      title: 'Marquee Images',
      type: 'array',
      description: 'Images that scroll horizontally in an infinite loop',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe this image for accessibility',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(3).error('Add at least 3 images for a smooth marquee'),
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Hero Marquee', subtitle: 'Hero with scrolling images'}
    },
  },
})

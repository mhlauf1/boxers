import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const campusOverview = defineType({
  name: 'campusOverview',
  title: 'Campus Overview',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'cards',
      title: 'Campus Cards',
      type: 'array',
      validation: (Rule) => Rule.max(2),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Card Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'features',
              title: 'Feature Bullets',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'image',
              title: 'Card Image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'cta',
              title: 'CTA Button',
              type: 'button',
            }),
            defineField({
              name: 'icon',
              title: 'Icon Image',
              type: 'image',
              description: 'Small icon or mascot for the card header',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'heading'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Campus Overview', subtitle: '50/50 campus split'}
    },
  },
})

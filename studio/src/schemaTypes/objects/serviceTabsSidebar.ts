import {defineField, defineType} from 'sanity'
import {InlineIcon} from '@sanity/icons'

export const serviceTabsSidebar = defineType({
  name: 'serviceTabsSidebar',
  title: 'Service Tabs (Sidebar)',
  type: 'object',
  icon: InlineIcon,
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tabs',
      title: 'Service Tabs',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Service Tabs (Sidebar)', subtitle: 'Sidebar Tabbed Services'}
    },
  },
})

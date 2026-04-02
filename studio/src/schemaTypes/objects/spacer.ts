import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const spacer = defineType({
  name: 'spacer',
  title: 'Spacer',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small (32px)', value: 'sm'},
          {title: 'Medium (64px)', value: 'md'},
          {title: 'Large (96px)', value: 'lg'},
          {title: 'Extra Large (128px)', value: 'xl'},
        ],
        layout: 'radio',
      },
      initialValue: 'md',
    }),
  ],
  preview: {
    select: {size: 'size'},
    prepare({size}) {
      const labels: Record<string, string> = {
        sm: 'Small (32px)',
        md: 'Medium (64px)',
        lg: 'Large (96px)',
        xl: 'Extra Large (128px)',
      }
      return {title: `Spacer — ${labels[size] || 'Medium'}`}
    },
  },
})

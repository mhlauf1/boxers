import {FadeIn} from '@/app/components/ui/FadeIn'
import {stegaClean} from '@sanity/client/stega'
import Badge from '../ui/Badge'
import PricingTierCards from '@/app/components/pricing/PricingTierCards'

type PricingTableProps = {
  block: {
    eyebrow?: string
    heading?: string
    description?: string
    backgroundColor?: 'cream' | 'sand' | 'forest'
    categories?: Array<{
      _key: string
      categoryName?: string
      tiers?: Array<{
        _key: string
        name?: string
        price?: string
        description?: string
        features?: string[]
        highlighted?: boolean
        cta?: {buttonText?: string; link?: any}
      }>
    }>
  }
  index: number
  pageId: string
  pageType: string
}

const bgColors: Record<string, string> = {
  cream: 'bg-cream text-forest',
  sand: 'bg-sand text-forest',
  forest: 'bg-forest text-cream',
}

export default function PricingTable({block}: PricingTableProps) {
  const {eyebrow, heading, description, backgroundColor, categories} = block
  const bg = bgColors[stegaClean(backgroundColor) || 'cream'] || bgColors.cream
  const isDark = stegaClean(backgroundColor) === 'forest'

  return (
    <section className={bg}>
      <div className="px-4 md:px-24 py-16 lg:py-24">
        <FadeIn>
          <div className="text-center max-w-5xl mx-auto mb-12 lg:mb-16">
            {eyebrow && <Badge className="mb-3">{eyebrow}</Badge>}
            {heading && (
              <h2
                className={`text-[36px] md:text-[48px] lg:text-[56px] font-semibold tracking-tight leading-[105%] mb-4 ${isDark ? 'text-cream' : 'text-forest'}`}
              >
                {heading}
              </h2>
            )}
            {description && (
              <p
                className={`font-sans text-[16px] md:text-[18px] leading-[150%] ${isDark ? 'text-cream/80' : 'text-charcoal/80'}`}
              >
                {description}
              </p>
            )}
          </div>
        </FadeIn>

        <PricingTierCards categories={categories} isDark={isDark} />
      </div>
    </section>
  )
}

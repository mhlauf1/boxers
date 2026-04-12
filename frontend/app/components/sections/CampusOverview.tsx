import Badge from '@/app/components/ui/Badge'
import Image from '@/app/components/SanityImage'
import {FadeIn} from '@/app/components/ui/FadeIn'

type CampusCard = {
  _key: string
  heading?: string
  description?: string
  features?: string[]
  image?: {asset?: {_ref: string}; crop?: any; hotspot?: any; alt?: string}
  icon?: {asset?: {_ref: string}; alt?: string}
}

type CampusOverviewProps = {
  block: {
    eyebrow?: string
    heading?: string
    cards?: CampusCard[]
    bottomImage?: {asset?: {_ref: string}; alt?: string}
  }
  index: number
  pageId: string
  pageType: string
}

export default function CampusOverview({block}: CampusOverviewProps) {
  const {eyebrow, heading, cards, bottomImage} = block

  if (!cards || cards.length === 0) return null

  return (
    <section className="bg-cream">
      <div className="px-6 md:px-24 py-16 lg:py-24">
        {(eyebrow || heading) && (
          <FadeIn>
            <div className="text-center mb-10 lg:mb-14">
              {eyebrow && <Badge className="mb-4">{eyebrow}</Badge>}
              {heading && (
                <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold tracking-tight leading-[105%]">
                  {heading}
                </h2>
              )}
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {cards.map((card, i) => {
            const cardBg = i === 0 ? 'bg-sand' : 'bg-[#e4eaf2]'
            // If the first feature looks like a price ("$39/day", "$65/night"), lift it
            // out of the bullet list and render it prominently above the features.
            const firstFeature = card.features?.[0]
            const priceMatch = firstFeature?.match(/^\$[\d,]+(?:\.\d+)?\/\w+/)
            const price = priceMatch ? firstFeature : null
            const remainingFeatures = price ? card.features?.slice(1) : card.features
            return (
              <FadeIn key={card._key} delay={i * 0.1}>
                <div
                  className={`${cardBg} rounded-xl  px-6 py-10 md:p-8 lg:p-10 h-full flex flex-col`}
                >
                  {/* Card header with optional icon */}
                  <div className="flex items-center gap-3 pt-4 md:pt-0 mb-3">
                    {card.icon?.asset?._ref && (
                      <Image
                        id={card.icon.asset._ref}
                        alt={card.icon.alt || ''}
                        width={48}
                        className="w-10 h-10 object-contain"
                      />
                    )}
                    {card.heading && (
                      <h3 className="text-[24px] md:text-[28px] lg:text-4xl font-semibold tracking-tight leading-[110%]">
                        {card.heading}
                      </h3>
                    )}
                  </div>

                  {price && (
                    <div className="mb-4 font-sans text-[40px] md:text-[48px] lg:text-[56px] font-semibold tracking-tight leading-[100%] text-terracotta">
                      {price}
                    </div>
                  )}

                  {card.description && (
                    <p className="font-sans text-lg lg:text-[22px] text-text-muted leading-[150%] w-[95%] mb-5">
                      {card.description}
                    </p>
                  )}

                  {/* Feature bullets */}
                  {remainingFeatures && remainingFeatures.length > 0 && (
                    <ul className="space-y-2.5 mb-6">
                      {remainingFeatures.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <svg
                            className="w-5 h-5 text-terracotta shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M16.667 5L7.5 14.167 3.333 10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="font-sans text-lg lg:text-xl text-forest leading-[150%]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Card image */}
                  {card.image?.asset?._ref && (
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        id={card.image.asset._ref}
                        alt={card.image.alt || card.heading || 'Campus image'}
                        width={600}
                        crop={card.image.crop}
                        hotspot={card.image.hotspot}
                        className="w-full aspect-[16/9] object-cover"
                      />
                    </div>
                  )}
                </div>
              </FadeIn>
            )
          })}
        </div>

        {bottomImage?.asset?._ref && (
          <FadeIn>
            <div className="mt-12 lg:mt-16 flex justify-center">
              <Image
                id={bottomImage.asset._ref}
                alt={bottomImage.alt || ''}
                width={600}
                className="w-full max-w-80 h-auto object-contain"
              />
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

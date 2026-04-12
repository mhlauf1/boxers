import Button from '@/app/components/ui/Button'
import Image from '@/app/components/SanityImage'
import DecorativeCurve from '@/app/components/ui/DecorativeCurve'
import {FadeIn} from '@/app/components/ui/FadeIn'

type CtaBannerProps = {
  block: {
    heading?: string
    description?: string
    icon?: {asset?: {_ref: string}; alt?: string}
    stickerImage?: {asset?: {_ref: string}; alt?: string}
    backgroundImage?: {asset?: {_ref: string}; crop?: any; alt?: string}
    sideImage?: {asset?: {_ref: string}; crop?: any; alt?: string}
    textAlign?: 'left' | 'center'
    cta?: {buttonText?: string; link?: any}
    showRating?: boolean
    ratingText?: string
  }
  index: number
  pageId: string
  pageType: string
}

function RatingBar({ratingText}: {ratingText: string}) {
  return (
    <div className="flex items-center gap-1.5 mt-4">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} width="14" height="14" viewBox="0 0 14 14" fill="white">
            <path d="M7 1l1.9 3.8 4.1.7-3 2.9.7 4.2L7 10.5 3.3 12.6l.7-4.2-3-2.9 4.1-.7L7 1z" />
          </svg>
        ))}
      </div>
      <span className="font-sans text-[13px] text-white/80">{ratingText}</span>
    </div>
  )
}

export default function CtaBanner({block, index}: CtaBannerProps) {
  const isEarly = index <= 1
  const {
    heading,
    description,
    icon,
    stickerImage,
    backgroundImage,
    sideImage,
    textAlign,
    cta,
    showRating,
    ratingText,
  } = block
  const hasSideImage = !!sideImage?.asset?._ref

  if (hasSideImage) {
    return (
      <section className="bg-cream">
        <div className="relative overflow-hidden">
          {/* Background image if provided, otherwise forest */}
          {backgroundImage?.asset?._ref ? (
            <div className="absolute inset-0">
              <Image
                id={backgroundImage.asset._ref}
                alt={backgroundImage.alt || ''}
                width={1200}
                crop={backgroundImage.crop}
                mode="cover"
                className="w-full h-full object-cover"
                {...(isEarly && {loading: 'eager' as const, fetchPriority: 'high' as const})}
              />
              <div className="absolute inset-0 bg-forest/20" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-forest" />
          )}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Text side */}
            <div className="px-[8%]  lg:px-[10%] py-16 lg:py-24">
              {stickerImage?.asset?._ref && (
                <FadeIn>
                  <div className="bg-white rounded-full p-3 w-fit mb-6">
                    <Image
                      id={stickerImage.asset._ref}
                      alt={stickerImage.alt || ''}
                      width={200}
                      className="w-[40px] lg:w-[50px] aspect-square object-contain"
                    />
                  </div>
                </FadeIn>
              )}

              {icon?.asset?._ref && (
                <FadeIn>
                  <div className="mb-8">
                    <Image
                      id={icon.asset._ref}
                      alt={icon.alt || ''}
                      width={120}
                      className="w-[100px] lg:w-[120px] h-auto"
                    />
                  </div>
                </FadeIn>
              )}

              {heading && (
                <FadeIn delay={0.1}>
                  <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-semibold tracking-tight leading-[95%] text-white mb-4 max-w-xl">
                    {heading}
                  </h2>
                </FadeIn>
              )}

              {description && (
                <FadeIn delay={0.15}>
                  <p className="font-sans text-[16px] md:text-[18px] leading-[160%] text-white/80 max-w-lg mb-10">
                    {description}
                  </p>
                </FadeIn>
              )}

              {!description && heading && <div className="mb-6" />}

              <FadeIn className="w-full md:w-auto" delay={0.2}>
                {cta?.buttonText && (
                  <Button variant="primary" link={cta.link} className="w-full md:w-auto mb-4">
                    {cta.buttonText}
                  </Button>
                )}
              </FadeIn>

              {showRating && ratingText && (
                <FadeIn delay={0.3}>
                  <RatingBar ratingText={ratingText} />
                </FadeIn>
              )}
            </div>

            {/* Side image */}
            <FadeIn delay={0.15} direction="right">
              <div className="hidden lg:block h-full">
                <Image
                  id={sideImage.asset!._ref}
                  alt={sideImage.alt || heading || ''}
                  width={700}
                  crop={sideImage.crop}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream px-4 lg:px-8">
      <div
        className={`relative rounded-xl min-h-[60vh] md:min-h-[80vh] flex px-[6%] md:px-[10%] items-center overflow-hidden${textAlign === 'center' ? ' justify-center' : ''}`}
      >
        {/* Background image */}
        {backgroundImage?.asset?._ref && (
          <div className="absolute inset-0">
            <Image
              id={backgroundImage.asset._ref}
              alt={backgroundImage.alt || ''}
              width={1200}
              crop={backgroundImage.crop}
              mode="cover"
              className="w-full h-full object-cover"
              {...(isEarly && {loading: 'eager' as const, fetchPriority: 'high' as const})}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}

        {/* Fallback dark bg if no image */}
        {!backgroundImage?.asset?._ref && <div className="absolute inset-0 bg-forest" />}
        <div
          className={`relative flex flex-col z-10 py-16 lg:py-24${textAlign === 'center' ? ' items-center text-center' : ' text-start md:text-center'}`}
        >
          {stickerImage?.asset?._ref && (
            <FadeIn>
              <div className="bg-white rounded-full p-3 w-fit mb-6">
                <Image
                  id={stickerImage.asset._ref}
                  alt={stickerImage.alt || ''}
                  width={200}
                  className="w-[40px] lg:w-[50px] aspect-square object-contain"
                />
              </div>
            </FadeIn>
          )}

          {icon?.asset?._ref && (
            <FadeIn>
              <div className="mb-8">
                <Image
                  id={icon.asset._ref}
                  alt={icon.alt || ''}
                  width={120}
                  className="w-[100px] lg:w-[120px] h-auto mx-auto"
                />
              </div>
            </FadeIn>
          )}

          {heading && (
            <FadeIn delay={0.1}>
              <h2 className="text-[44px] tracking-tight font-semibold text-center md:text-[64px] lg:text-[72px] leading-[105%] text-white mb-4 max-w-3xl mx-auto">
                {heading}
              </h2>
            </FadeIn>
          )}

          {description && (
            <FadeIn delay={0.15}>
              <p className="font-sans text-[16px] md:text-[18px] leading-[160%] text-white/80 max-w-xl mx-auto mb-10">
                {description}
              </p>
            </FadeIn>
          )}

          {!description && heading && <div className="mb-6" />}

          <FadeIn className="w-full md:w-auto" delay={0.2}>
            {cta?.buttonText && (
              <Button variant="primary" link={cta.link} className="mb-4">
                {cta.buttonText}
              </Button>
            )}
          </FadeIn>

          {showRating && ratingText && (
            <FadeIn delay={0.3}>
              <div className="flex items-center justify-center gap-1.5 mt-4">
                <RatingBar ratingText={ratingText} />
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  )
}

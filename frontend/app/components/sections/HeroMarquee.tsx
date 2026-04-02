import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import Image from '@/app/components/SanityImage'
import {FadeIn} from '@/app/components/ui/FadeIn'

type MarqueeImage = {
  _key: string
  asset?: {_ref: string}
  crop?: any
  hotspot?: any
  alt?: string
}

type HeroMarqueeProps = {
  block: {
    eyebrow?: string
    heading?: string
    subtext?: string
    primaryCta?: {buttonText?: string; link?: any}
    secondaryCta?: {buttonText?: string; link?: any}
    reviewRating?: number
    reviewText?: string
    trustLine?: string
    bubbleText?: string
    marqueeImages?: MarqueeImage[]
  }
  index: number
  pageId: string
  pageType: string
}

export default function HeroMarquee({block, index}: HeroMarqueeProps) {
  const {
    eyebrow,
    heading,
    subtext,
    primaryCta,
    secondaryCta,
    reviewRating,
    reviewText,
    trustLine,
    bubbleText,
    marqueeImages,
  } = block

  const isFirst = index === 0
  const Wrap = isFirst
    ? ({
        children,
        className,
      }: {
        children: React.ReactNode
        className?: string
        delay?: number
        direction?: string
      }) => <div className={className}>{children}</div>
    : FadeIn

  const hasImages = marqueeImages && marqueeImages.length > 0

  return (
    <section className="relative pb-8 md:pb-0 pt-18 bg-cream overflow-x-clip">
      {/* Left dog illustration — aligned with heading */}
      <img
        src="/illustrations/hero-left-dog.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute left-[6%] xl:left-[8%] top-[28%] w-[70px] lg:w-[90px] pointer-events-none hidden lg:block"
      />

      {/* Right dog illustration — aligned with CTA area */}
      <img
        src="/illustrations/hero-right-dog.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute right-[6%] xl:right-[8%] top-[22%] w-[70px] lg:w-[90px] pointer-events-none hidden lg:block"
      />

      <div className="container relative z-10 pt-20 pb-4 lg:pt-[12vh] lg:pb-12">
        <div className="flex flex-col items-center text-center mx-auto">
          {eyebrow && (
            <Wrap>
              <Badge className="mb-5 md:mb-6">{eyebrow}</Badge>
            </Wrap>
          )}

          {heading && (
            <Wrap delay={0.1}>
              <h1 className="text-[48px] md:text-[56px] lg:text-[84px] leading-[104%] md:max-w-[18ch] tracking-tight font-medium mb-5">
                {heading}
              </h1>
            </Wrap>
          )}

          {subtext && (
            <Wrap delay={0.2}>
              <p className="font-sans md:text-base lg:text-lg text-text-muted leading-[150%] max-w-4xl mb-6">
                {subtext}
              </p>
            </Wrap>
          )}

          <Wrap delay={0.25}>
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-6">
              {[
                {label: 'Boarding', href: '/services/boarding'},
                {label: 'Daycare', href: '/services/daycare'},
                {label: 'Grooming', href: '/services/grooming'},
              ].map((service) => (
                <a
                  key={service.label}
                  href={service.href}
                  className="bg-forest text-white font-sans text-[13px] md:text-[14px] font-medium tracking-wide px-5 py-2.5 rounded-lg hover:bg-forest/90 transition-colors"
                >
                  {service.label}
                </a>
              ))}
            </div>
          </Wrap>

          <Wrap className="w-full md:w-auto" delay={0.35}>
            <div className="flex flex-col w-full md:flex-row items-center gap-2 md:gap-3 mb-3 md:mb-4">
              {primaryCta?.buttonText && (
                <Button variant="primary" link={primaryCta.link}>
                  {primaryCta.buttonText}
                </Button>
              )}
              {secondaryCta?.buttonText && (
                <Button variant="outline" link={secondaryCta.link}>
                  {secondaryCta.buttonText}
                </Button>
              )}
            </div>
          </Wrap>

          {reviewRating && (
            <Wrap delay={0.35}>
              <div className="flex flex-col mt-3 items-center gap-1">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({length: 5}).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < reviewRating ? 'text-terracotta' : 'text-terracotta/25'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {reviewText && <p className="font-sans text-sm text-text-muted">{reviewText}</p>}
                </div>
                {trustLine && <p className="font-sans text-xs text-text-muted">{trustLine}</p>}
              </div>
            </Wrap>
          )}
        </div>
      </div>

      {bubbleText && (
        <div
          className="relative mx-auto -mb-12 mt-4 md:mt-0 md:mb-0 md:absolute md:bottom-[500px] lg:bottom-[620px] md:right-8 lg:right-16 z-20 -rotate-[8deg] md:rotate-[8deg] shadow-xl rounded-full"
          aria-hidden="true"
        >
          <svg
            className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px]"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circle background */}
            <circle cx="100" cy="100" r="96" fill="var(--color-cream, #FAF6EF)" />
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke="var(--color-forest, #1B5E20)"
              strokeWidth="1.5"
            />
            {/* Arched text — top and bottom */}
            <defs>
              <path id="topArc" d="M 30,105 a 70,70 0 1,1 140,0" fill="none" />
              <path id="bottomArc" d="M 25,108 a 75,75 0 0,0 150,0" fill="none" />
            </defs>
            <text
              fill="var(--color-forest, #1B5E20)"
              fontSize="17"
              fontWeight="600"
              fontFamily="var(--font-heading)"
              letterSpacing="1"
            >
              <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                All-inclusive care
              </textPath>
            </text>
            <text
              fill="var(--color-forest, #1B5E20)"
              fontSize="17"
              fontWeight="600"
              fontFamily="var(--font-heading)"
              letterSpacing="2"
            >
              <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                under one roof
              </textPath>
            </text>
            {/* Paw icon centered */}
            <g transform="translate(37, 42) scale(1.3)" fill="var(--color-terracotta, #E8872D)">
              <ellipse cx="50" cy="62" rx="20" ry="17" />
              <ellipse cx="28" cy="40" rx="8" ry="10" transform="rotate(-10 28 40)" />
              <ellipse cx="44" cy="30" rx="7" ry="10" transform="rotate(-5 44 30)" />
              <ellipse cx="58" cy="30" rx="7" ry="10" transform="rotate(5 58 30)" />
              <ellipse cx="72" cy="40" rx="8" ry="10" transform="rotate(10 72 40)" />
            </g>
          </svg>
        </div>
      )}

      {hasImages && (
        <div className="mt-4 lg:mt-6 pb-4 lg:pb-12 overflow-hidden">
          <div
            className="flex gap-3 md:gap-4"
            style={{
              width: 'max-content',
              animation: 'marquee 120s linear infinite',
            }}
          >
            {[...marqueeImages, ...marqueeImages].map((img, i) =>
              img.asset?._ref ? (
                <div
                  key={`${img._key}-${i}`}
                  className="shrink-0 h-[400px] md:h-[540px] lg:h-[640px] w-[280px] md:w-[380px] lg:w-[440px] rounded-lg overflow-hidden"
                >
                  <Image
                    id={img.asset._ref}
                    alt={img.alt || 'Boxers facility'}
                    width={880}
                    crop={img.crop}
                    hotspot={img.hotspot}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 440px"
                    loading={isFirst ? 'eager' : 'lazy'}
                  />
                </div>
              ) : null,
            )}
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `,
        }}
      />
    </section>
  )
}

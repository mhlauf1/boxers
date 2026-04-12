import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from 'next-sanity'
import {Icon} from '@iconify/react'
import Image from '@/app/components/SanityImage'
import Badge from '@/app/components/ui/Badge'
import {FadeIn} from '@/app/components/ui/FadeIn'
import {stegaClean} from '@sanity/client/stega'
import {formatTime} from '@/sanity/lib/formatTime'

type LocationHours = {
  _key: string
  days?: string
  open?: string
  close?: string
}

type Location = {
  name?: string
  slug?: string
  address?: string
  phone?: string
  fax?: string
  email?: string
  hours?: LocationHours[]
}

type LocationDetailsProps = {
  block: {
    eyebrow?: string
    heading?: string
    intro?: PortableTextBlock[]
    locationSlug?: string
    location?: Location | null
    mascotImage?: {asset?: {_ref: string}; alt?: string}
    mascotCaption?: string
    externalCtaLabel?: string
    externalCtaLink?: string
    backgroundColor?: 'cream' | 'sand' | 'forest'
  }
  index: number
  pageId: string
  pageType: string
}

const bgColors: Record<
  string,
  {classes: string; isDark: boolean; panelClasses: string; dividerClasses: string}
> = {
  cream: {
    classes: 'bg-cream text-forest',
    isDark: false,
    panelClasses: 'bg-white border border-forest/10',
    dividerClasses: 'divide-forest/10',
  },
  sand: {
    classes: 'bg-sand text-forest',
    isDark: false,
    panelClasses: 'bg-cream border border-forest/10',
    dividerClasses: 'divide-forest/10',
  },
  forest: {
    classes: 'bg-forest text-cream',
    isDark: true,
    panelClasses: 'bg-black/20 border border-cream/15',
    dividerClasses: 'divide-cream/15',
  },
}

export default function LocationDetails({block}: LocationDetailsProps) {
  const {eyebrow, heading, intro, location, mascotImage, backgroundColor} = block

  if (!location) return null

  const {
    classes: bg,
    isDark,
    panelClasses,
    dividerClasses,
  } = bgColors[stegaClean(backgroundColor) || 'sand'] || bgColors.sand

  const telHref = location.phone ? `tel:${location.phone.replace(/\D/g, '')}` : null
  const mailHref = location.email ? `mailto:${location.email}` : null

  const iconClasses = isDark ? 'text-cream' : 'text-forest'
  const valueClasses = `font-sans text-[15px] leading-snug ${isDark ? 'text-cream' : 'text-forest'}`
  const linkClasses = `${valueClasses} hover:underline`

  type InfoItem = {key: string; icon: string; content: React.ReactNode}
  const items: InfoItem[] = []
  if (location.address) {
    items.push({
      key: 'address',
      icon: 'lucide:map-pin',
      content: <p className={`${valueClasses} whitespace-pre-line`}>{location.address}</p>,
    })
  }
  if (location.hours && location.hours.length > 0) {
    items.push({
      key: 'hours',
      icon: 'lucide:clock',
      content: (
        <div className="space-y-0.5">
          {location.hours.map((h) => (
            <p key={h._key} className={valueClasses}>
              <span className={valueClasses}>{h.days}:</span> {formatTime(h.open ?? '')} &ndash;{' '}
              {formatTime(h.close ?? '')}
            </p>
          ))}
        </div>
      ),
    })
  }
  if (location.phone) {
    items.push({
      key: 'phone',
      icon: 'lucide:phone',
      content: (
        <>
          {telHref ? (
            <a href={telHref} className={linkClasses}>
              {location.phone}
            </a>
          ) : (
            <p className={valueClasses}>{location.phone}</p>
          )}
          {location.fax && (
            <p className={`font-sans text-[13px] mt-1 ${isDark ? 'text-cream' : 'text-forest'}`}>
              Fax: {location.fax}
            </p>
          )}
        </>
      ),
    })
  }
  if (location.email) {
    items.push({
      key: 'email',
      icon: 'lucide:mail',
      content: mailHref ? (
        <a href={mailHref} className={`${linkClasses} break-all`}>
          {location.email}
        </a>
      ) : (
        <p className={`${valueClasses} break-all`}>{location.email}</p>
      ),
    })
  }

  return (
    <section className={bg}>
      <div className="px-6 md:px-24 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Text side */}
          <div>
            {eyebrow && (
              <FadeIn>
                <Badge className="mb-4">{eyebrow}</Badge>
              </FadeIn>
            )}

            {heading && (
              <FadeIn delay={eyebrow ? 0.1 : 0}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[105%] tracking-tight mb-6 md:max-w-[18ch]">
                  {heading}
                </h2>
              </FadeIn>
            )}

            {intro && intro.length > 0 && (
              <FadeIn delay={0.1}>
                <div
                  className={`font-sans text-[16px] lg:text-[18px] leading-[150%] opacity-80 mb-8 prose prose-p:mb-3 ${
                    isDark ? 'prose-invert' : ''
                  }`}
                >
                  <PortableText value={intro} />
                </div>
              </FadeIn>
            )}

            {/* Unified info panel */}
            <FadeIn delay={0.15}>
              <ul
                className={`rounded-2xl overflow-hidden divide-y ${panelClasses} ${dividerClasses}`}
              >
                {items.map((item) => (
                  <li key={item.key} className="flex items-start gap-4 px-6 py-5">
                    <Icon
                      icon={item.icon}
                      width={20}
                      className={`${iconClasses} mt-1 shrink-0`}
                    />
                    <div className="min-w-0 flex-1">{item.content}</div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Mascot side */}
          <div>
            {mascotImage?.asset?._ref && (
              <FadeIn delay={0.15}>
                <div className={`rounded-2xl flex flex-col items-center ${panelClasses}`}>
                  <Image
                    id={mascotImage.asset._ref}
                    alt={mascotImage.alt || location.name || 'Location mascot'}
                    width={500}
                    className="w-full h-auto rounded-2xl object-contain"
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from '@/app/components/SanityImage'
import {FadeIn} from '@/app/components/ui/FadeIn'
import Badge from '../ui/Badge'

type TeamGridProps = {
  block: {
    eyebrow?: string
    heading?: string
    members?: Array<{
      _key: string
      name?: string
      role?: string
      bio?: string
      certifications?: string
      image?: {asset?: {_ref: string}; crop?: any; hotspot?: any}
    }>
  }
  index: number
  pageId: string
  pageType: string
}

export default function TeamGrid({block}: TeamGridProps) {
  const {eyebrow, heading, members} = block

  return (
    <section className="bg-cream">
      <div className="px-6 md:px-24 py-16 lg:py-24">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            {eyebrow && <Badge className="mb-3">{eyebrow}</Badge>}
            {heading && (
              <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold tracking-tight leading-[105%] text-forest mb-4">
                {heading}
              </h2>
            )}
          </div>
        </FadeIn>

        {members && members.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10">
            {members.map((member, i) => (
              <FadeIn key={member._key} delay={0.1 * i}>
                <div className="text-center">
                  {member.image?.asset?._ref && (
                    <div className="mb-3 flex justify-center">
                      <div className="size-32 md:size-60 rounded-full overflow-hidden">
                        <Image
                          id={member.image.asset._ref}
                          alt={member.name || 'Team member'}
                          width={250}
                          crop={member.image.crop}
                          hotspot={member.image.hotspot}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {member.name && (
                    <h3 className="font-sans text-[16px] md:text-[20px] font-semibold text-forest mb-1">
                      {member.name}
                    </h3>
                  )}
                  {member.role && (
                    <p className="font-sans text-[12px] md:text-[14px] font-medium uppercase tracking-[0.08em] text-terracotta">
                      {member.role}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

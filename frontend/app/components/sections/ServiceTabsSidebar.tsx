'use client'

import {useState, useEffect} from 'react'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import Image from '@/app/components/SanityImage'
import {FadeIn} from '@/app/components/ui/FadeIn'

type ServiceTab = {
  _id: string
  title?: string
  slug?: {current?: string}
  sticker?: {asset?: {_ref: string}; alt?: string}
  shortDescription?: string
  tabImage?: {asset?: {_ref: string}; crop?: any; alt?: string}
  tabCta?: {buttonText?: string; link?: any}
}

type ServiceTabsSidebarProps = {
  block: {
    eyebrow?: string
    heading?: string
    tabs?: ServiceTab[]
  }
  index: number
  pageId: string
  pageType: string
}

export default function ServiceTabsSidebar({block}: ServiceTabsSidebarProps) {
  const {eyebrow, heading, tabs} = block
  const [activeTab, setActiveTab] = useState(0)
  const tabCount = tabs?.length ?? 0

  useEffect(() => {
    if (tabCount < 2) return
    const timer = setTimeout(() => {
      setActiveTab((t) => (t + 1) % tabCount)
    }, 7000)
    return () => clearTimeout(timer)
  }, [activeTab, tabCount])

  if (!tabs || tabs.length === 0) return null

  const activeService = tabs[activeTab]

  return (
    <section className="bg-cream p-4">
      <div className="px-6 md:px-24 rounded-lg  bg-forest py-[80px] lg:py-[120px]">
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16">
            {/* Sidebar tabs */}
            <div className="md:hidden block">
              <FadeIn>
                <div className="text-white ">
                  {eyebrow && <Badge className="mb-4 md:mb-6">{eyebrow}</Badge>}
                  {heading && (
                    <h2 className="text-[32px] tracking-tight font-semibold md:text-[48px] lg:text-[56px] leading-[105%] text-balance">
                      {heading}
                    </h2>
                  )}
                </div>
              </FadeIn>
            </div>
            <div className="lg:flex lg:flex-col text-white rounded-lg">
              <div className="hidden md:block">
                <FadeIn>
                  <div className="mb-8 lg:mb-10">
                    {eyebrow && <Badge className="mb-4 md:mb-6">{eyebrow}</Badge>}
                    {heading && (
                      <h2 className="text-[32px] tracking-tight font-semibold md:text-[48px] lg:text-[56px] leading-[105%] text-balance">
                        {heading}
                      </h2>
                    )}
                  </div>
                </FadeIn>
              </div>

              {/* Mobile: 2-col grid */}
              <div className="grid grid-cols-2 gap-2 lg:hidden">
                {tabs.map((tab, i) => (
                  <button
                    key={tab._id}
                    onClick={() => setActiveTab(i)}
                    className={`font-heading cursor-pointer tracking-tight transition-colors rounded-md py-3 px-4 text-[15px] md:text-[18px] text-left ${
                      i === activeTab
                        ? 'bg-white/15 text-white font-semibold'
                        : 'bg-white/5 text-white/40 hover:text-white/60'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              {/* Desktop: vertical list */}
              <div className="hidden lg:block">
                {tabs.map((tab, i) => (
                  <button
                    key={tab._id}
                    onClick={() => setActiveTab(i)}
                    className={`relative block w-full cursor-pointer text-left font-heading tracking-tight transition-colors py-5 text-[32px] ${
                      i === activeTab
                        ? 'text-white font-semibold'
                        : 'text-white/35 hover:text-white/50'
                    }`}
                  >
                    {tab.title}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] ${
                        i === activeTab ? 'bg-white animate-progress' : 'bg-white/10'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            {activeService && (
              <div key={activeTab} className="bg-sand rounded-lg p-6 md:p-8 animate-fade-in">
                {activeService.tabImage?.asset?._ref && (
                  <div className="mb-6">
                    <Image
                      id={activeService.tabImage.asset._ref}
                      alt={activeService.tabImage?.alt || activeService.title || 'Service image'}
                      width={700}
                      crop={activeService.tabImage.crop}
                      className="rounded-lg w-full object-cover aspect-[2/1]"
                    />
                  </div>
                )}
                {activeService.title && (
                  <h3 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold leading-[105%] tracking-tight mb-3">
                    {activeService.title}
                  </h3>
                )}
                {activeService.shortDescription && (
                  <p className="font-sans text-[16px] lg:text-[18px] text-text-muted leading-[160%] mb-6">
                    {activeService.shortDescription}
                  </p>
                )}
                {activeService.tabCta?.buttonText && (
                  <Button variant="primary" link={activeService.tabCta.link}>
                    {activeService.tabCta.buttonText}
                  </Button>
                )}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

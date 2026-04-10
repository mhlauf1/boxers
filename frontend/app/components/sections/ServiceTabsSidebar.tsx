'use client'

import {useState, useEffect, useRef} from 'react'
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
  const [isPaused, setIsPaused] = useState(false)
  const tabCount = tabs?.length ?? 0
  const DURATION = 7000
  const elapsedRef = useRef(0)
  const startTimeRef = useRef(0)
  const prevTabRef = useRef(activeTab)

  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      elapsedRef.current = 0
      prevTabRef.current = activeTab
    }
    if (tabCount < 2 || isPaused) return
    const remaining = DURATION - elapsedRef.current
    startTimeRef.current = Date.now()
    const timer = setTimeout(() => {
      elapsedRef.current = 0
      setActiveTab((t) => (t + 1) % tabCount)
    }, remaining)
    return () => {
      elapsedRef.current += Date.now() - startTimeRef.current
      clearTimeout(timer)
    }
  }, [activeTab, tabCount, isPaused])

  if (!tabs || tabs.length === 0) return null

  const activeService = tabs[activeTab]

  return (
    <section className="bg-cream p-2 md:p-4">
      <div className="px-4 md:px-24 rounded-lg  bg-forest py-[48px] lg:py-[120px]">
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] gap-8 lg:gap-16">
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
                    onMouseEnter={i === activeTab ? () => setIsPaused(true) : undefined}
                    onMouseLeave={i === activeTab ? () => setIsPaused(false) : undefined}
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
                    onMouseEnter={i === activeTab ? () => setIsPaused(true) : undefined}
                    onMouseLeave={i === activeTab ? () => setIsPaused(false) : undefined}
                    className={`relative block w-full cursor-pointer text-left font-heading tracking-tight transition-colors py-6  text-[32px] ${
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
                      style={
                        i === activeTab
                          ? {animationPlayState: isPaused ? 'paused' : 'running'}
                          : undefined
                      }
                    />
                  </button>
                ))}
                <p className="font-sans text-[14px] lg:text-base  mt-3 md:mt-6 text-neutral-300 leading-[160%] mb-6">
                  Hover to pause timer
                </p>
              </div>
            </div>

            {/* Tab content */}
            {activeService && (
              <div
                key={activeTab}
                className="bg-sand rounded-md md:rounded-lg p-4 md:p-8 animate-fade-in"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {activeService.tabImage?.asset?._ref && (
                  <div className="mb-6 relative">
                    <Image
                      id={activeService.tabImage.asset._ref}
                      alt={activeService.tabImage?.alt || activeService.title || 'Service image'}
                      width={700}
                      crop={activeService.tabImage.crop}
                      className="rounded-md md:rounded-lg w-full object-cover aspect-[6/4]"
                    />
                    <div className="absolute top-2 md:top-4 left-2 md:left-4">
                      {activeService.title && (
                        <div className="bg-white py-3 px-5 rounded-full">
                          <h3 className="text-[14px] md:text-[24px]  font-semibold leading-[105%] tracking-tight ">
                            {activeService.title}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeService.shortDescription && (
                  <p className="font-sans text-[16px] lg:text-xl font-medium text-text-muted leading-[160%] mb-6">
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

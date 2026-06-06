'use client'

import {useState, useEffect} from 'react'
import {FadeIn} from '@/app/components/ui/FadeIn'
import Badge from '@/app/components/ui/Badge'
import ServiceToggle from '@/app/components/pricing/ServiceToggle'
import PricingTierCards from '@/app/components/pricing/PricingTierCards'
import PricingMatrixDisplay from '@/app/components/pricing/PricingMatrixDisplay'
import DaycareCalculator from '@/app/components/pricing/DaycareCalculator'
import BoardingCalculator from '@/app/components/pricing/BoardingCalculator'
import GroomingCalculator from '@/app/components/pricing/GroomingCalculator'
import type {DereferencedLink} from '@/sanity/lib/types'

type ServiceType = 'daycare' | 'boarding' | 'grooming'

// Which estimator (if any) renders under a section. Daycare/Boarding have a
// PAW-PLEX and a BEC variant; membership sections use 'none'.
type CalculatorKey =
  | 'daycare'
  | 'daycare-bec'
  | 'boarding'
  | 'boarding-bec'
  | 'grooming'
  | 'none'

type TableData = {
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
    }>
  }>
  description?: string
}

type MatrixData = {
  description?: string
  tables?: Array<{
    _key: string
    tableName?: string
    tableDescription?: string
    columnHeaders?: string[]
    rows?: Array<{
      _key: string
      rowLabel?: string
      cells?: Array<{
        _key: string
        value?: string
        note?: string
      }>
    }>
  }>
  footnotes?: string[]
}

// One priced block within a tab (a facility's pricing, or memberships).
type PricingSection = {
  _key: string
  eyebrow?: string
  heading?: string
  pricingDisplay?: 'table' | 'matrix'
  tableData?: TableData
  matrixData?: MatrixData
  calculator?: CalculatorKey
}

type ServiceTab = {
  _key: string
  serviceKey?: ServiceType
  sections?: PricingSection[]
}

type PricingPageTabsProps = {
  block: {
    eyebrow?: string
    heading?: string
    description?: string
    defaultTab?: ServiceType
    services?: ServiceTab[]
    ctaText?: string
    ctaLink?: DereferencedLink
    taxNote?: string
  }
  index: number
  pageId: string
  pageType: string
}

const serviceQueryStrings: Record<ServiceType, string> = {
  daycare: '?service=Daycare',
  boarding: '?service=Boarding',
  grooming: '?service=Grooming',
}

export default function PricingPageTabs({block}: PricingPageTabsProps) {
  const {eyebrow, heading, description, defaultTab, services, ctaText, ctaLink, taxNote} = block

  const [activeTab, setActiveTab] = useState<ServiceType>(defaultTab || 'daycare')

  // Support URL hash deep linking
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as ServiceType
    if (hash && ['daycare', 'boarding', 'grooming'].includes(hash)) {
      setActiveTab(hash)
    }
  }, [])

  // Update hash on tab change
  const handleTabChange = (service: ServiceType) => {
    setActiveTab(service)
    window.history.replaceState(null, '', `#${service}`)
  }

  const activeService = services?.find((s) => s.serviceKey === activeTab)

  const resolvedCtaLink = ctaLink
    ? {...ctaLink, queryString: serviceQueryStrings[activeTab]}
    : undefined

  function renderCalculator(key?: CalculatorKey) {
    const props = {ctaText, ctaLink: resolvedCtaLink, taxNote}
    switch (key) {
      case 'daycare':
        return <DaycareCalculator {...props} facility="pawplex" />
      case 'daycare-bec':
        return <DaycareCalculator {...props} facility="bec" />
      case 'boarding':
        return <BoardingCalculator {...props} lockedType="pawplex" />
      case 'boarding-bec':
        return <BoardingCalculator {...props} lockedType="enrichment" />
      case 'grooming':
        return <GroomingCalculator {...props} />
      default:
        return null
    }
  }

  return (
    <section className="bg-cream">
      <div className="px-6 md:px-24 py-16 pt-16 lg:py-24">
        {/* Header */}
        <FadeIn immediate>
          <div className="text-center pt-10 max-w-4xl mx-auto mb-8 lg:mb-10">
            {eyebrow && <Badge className="mb-3">{eyebrow}</Badge>}
            {heading && (
              <h2 className="text-[36px] md:text-[58px] lg:text-[70px] font-semibold tracking-tight leading-[105%] text-forest mb-4">
                {heading}
              </h2>
            )}
            {description && (
              <p className="font-sans text-[16px] md:text-[18px] leading-[151%] text-charcoal/80">
                {description}
              </p>
            )}
          </div>
        </FadeIn>

        {/* Service Toggle */}
        <FadeIn delay={0.05}>
          <div className="flex justify-center mb-10 lg:mb-14">
            <ServiceToggle activeService={activeTab} onChange={handleTabChange} />
          </div>
        </FadeIn>

        {/* Sections for the active tab (facility pricing + estimators, memberships) */}
        <div key={activeTab} className="space-y-16 lg:space-y-20">
          {activeService?.sections?.map((section) => {
            const calculator = renderCalculator(section.calculator)
            return (
              <FadeIn key={section._key} delay={0.1} immediate>
                <div>
                  {/* Section header */}
                  {(section.eyebrow || section.heading) && (
                    <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
                      {section.eyebrow && <Badge className="mb-3">{section.eyebrow}</Badge>}
                      {section.heading && (
                        <h3 className="text-[28px] md:text-[40px] font-semibold tracking-tight leading-[110%] text-forest">
                          {section.heading}
                        </h3>
                      )}
                    </div>
                  )}

                  {/* Pricing boxes */}
                  <div className="mb-10">
                    {section.pricingDisplay === 'matrix' && section.matrixData ? (
                      <>
                        {section.matrixData.description && (
                          <p className="font-sans text-[14px] md:text-[16px] leading-[150%] text-charcoal/80 text-center max-w-2xl mx-auto mb-10">
                            {section.matrixData.description}
                          </p>
                        )}
                        <PricingMatrixDisplay
                          tables={section.matrixData.tables}
                          footnotes={section.matrixData.footnotes}
                        />
                      </>
                    ) : section.tableData ? (
                      <>
                        {section.tableData.description && (
                          <p className="font-sans text-[14px] md:text-[16px] leading-[150%] text-charcoal/80 text-center max-w-2xl mx-auto mb-10">
                            {section.tableData.description}
                          </p>
                        )}
                        <PricingTierCards categories={section.tableData.categories} />
                      </>
                    ) : null}
                  </div>

                  {/* Estimator */}
                  {calculator && (
                    <div className="bg-forest text-cream rounded-[48px] -mx-3 md:-mx-6 lg:-mx-12">
                      <div className="px-6 md:px-16 lg:px-24 py-14 lg:py-20">
                        <FadeIn>
                          <div className="max-w-2xl mb-8 lg:mb-10">
                            <Badge className="mb-3 !bg-forest-card !text-cream/80 !border-border-dark">
                              Pricing Calculator
                            </Badge>
                            <h3 className="text-[36px] md:text-[48px] font-semibold tracking-tight leading-[105%] text-cream mb-4">
                              Estimate Your Cost
                            </h3>
                          </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>{calculator}</FadeIn>
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

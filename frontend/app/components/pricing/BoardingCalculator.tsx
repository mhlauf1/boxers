'use client'

import {useState, useMemo, useCallback} from 'react'
import {NumberStepper, AddDogButton, ContactNotice} from './CalculatorInputs'
import PriceOutputCard from './PriceOutputCard'
import {calculateBoardingPerDog} from '@/app/data/pricingData'
import type {BoardingDogConfig, BoardingType} from '@/app/data/pricingData'
import type {DereferencedLink} from '@/sanity/lib/types'

type BoardingCalculatorProps = {
  ctaText?: string
  ctaLink?: DereferencedLink
  taxNote?: string
}

let dogIdCounter = 1

function createDog(): BoardingDogConfig {
  return {id: String(dogIdCounter++), nights: 1}
}

export default function BoardingCalculator({ctaText, ctaLink, taxNote}: BoardingCalculatorProps) {
  const [dogs, setDogs] = useState<BoardingDogConfig[]>(() => [createDog()])
  const [boardingType, setBoardingType] = useState<BoardingType>('pawplex')

  const handleUpdateDog = useCallback((index: number, updates: Partial<BoardingDogConfig>) => {
    setDogs((prev) => prev.map((d, i) => (i === index ? {...d, ...updates} : d)))
  }, [])

  const handleRemoveDog = useCallback((index: number) => {
    setDogs((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleAddDog = useCallback(() => {
    setDogs((prev) => {
      if (prev.length >= 3) return prev
      return [...prev, createDog()]
    })
  }, [])

  const result = useMemo(
    () => calculateBoardingPerDog({dogs, boardingType}),
    [dogs, boardingType],
  )

  if (dogs.length > 3) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        <div className="space-y-6">
          <ContactNotice />
        </div>
        <PriceOutputCard
          total={0}
          lineItems={[]}
          ctaText="Call Us"
          ctaLink={{_type: 'link', linkType: 'href', href: 'tel:7404237777'}}
          taxNote={taxNote}
          disabled
          disabledMessage="Please call for custom pricing for 4+ dogs."
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        {/* Boarding type toggle */}
        <div className="space-y-2">
          <span className="block text-cream/70 font-sans text-[13px] font-medium uppercase tracking-wider">
            Boarding Type
          </span>
          <div className="flex rounded-lg overflow-hidden border border-border-dark">
            <button
              type="button"
              onClick={() => setBoardingType('pawplex')}
              className={`flex-1 py-2.5 px-3 font-sans text-[13px] font-medium transition-colors ${
                boardingType === 'pawplex'
                  ? 'bg-terracotta text-cream'
                  : 'bg-forest-card text-cream/60 hover:text-cream/80'
              }`}
            >
              PAW-PLEX — $59/night
            </button>
            <button
              type="button"
              onClick={() => setBoardingType('enrichment')}
              className={`flex-1 py-2.5 px-3 font-sans text-[13px] font-medium transition-colors ${
                boardingType === 'enrichment'
                  ? 'bg-terracotta text-cream'
                  : 'bg-forest-card text-cream/60 hover:text-cream/80'
              }`}
            >
              Enrichment — $65/night
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <span className="block text-cream/70 font-sans text-[13px] font-medium uppercase tracking-wider">
            {dogs.length > 1 ? 'Your Dogs' : 'Your Dog'}
          </span>
          {dogs.map((dog, i) => (
            <BoardingDogCard
              key={dog.id}
              dog={dog}
              index={i}
              total={dogs.length}
              onUpdate={(updates) => handleUpdateDog(i, updates)}
              onRemove={() => handleRemoveDog(i)}
            />
          ))}
          {dogs.length < 3 && <AddDogButton onClick={handleAddDog} />}
        </div>
      </div>

      {/* Output */}
      <PriceOutputCard
        total={result.total}
        lineItems={result.lineItems}
        ctaText={ctaText}
        ctaLink={ctaLink}
        taxNote={taxNote}
        includes={result.includes}
      />
    </div>
  )
}

// ─── Boarding Dog Card ──────────────────────────────────────
type BoardingDogCardProps = {
  dog: BoardingDogConfig
  index: number
  total: number
  onUpdate: (updates: Partial<BoardingDogConfig>) => void
  onRemove: () => void
}

function BoardingDogCard({dog, index, total, onUpdate, onRemove}: BoardingDogCardProps) {
  return (
    <div className="bg-forest-card border border-border-dark rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[14px] font-medium text-cream">
          {total > 1 ? `Dog ${index + 1}` : 'Your Dog'}
        </span>
        {total > 1 && (
          <button
            type="button"
            onClick={onRemove}
            className="font-sans text-[12px] text-cream/40 hover:text-terracotta-light transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <NumberStepper
        label="Nights"
        value={dog.nights}
        min={1}
        max={30}
        onChange={(v) => onUpdate({nights: v})}
      />

    </div>
  )
}

'use client'

import {useState, useMemo, useCallback} from 'react'
import {DogCard, AddDogButton, CheckboxGroup, RadioGroup} from './CalculatorInputs'
import PriceOutputCard from './PriceOutputCard'
import {calculateGrooming, groomingAddOnOptions} from '@/app/data/pricingData'
import type {DogSize, GroomingAddOn, GroomingServiceType, DogConfig} from '@/app/data/pricingData'
import type {DereferencedLink} from '@/sanity/lib/types'

type GroomingCalculatorProps = {
  ctaText?: string
  ctaLink?: DereferencedLink
  taxNote?: string
}

let dogIdCounter = 1

function createDog(size: DogSize = 'm'): DogConfig {
  return {id: String(dogIdCounter++), size}
}

export default function GroomingCalculator({ctaText, ctaLink, taxNote}: GroomingCalculatorProps) {
  const [dogs, setDogs] = useState<DogConfig[]>(() => [createDog()])
  const [serviceType, setServiceType] = useState<GroomingServiceType>('exitBath')
  const [selectedAddOns, setSelectedAddOns] = useState<GroomingAddOn[]>([])

  const handleUpdateDog = useCallback((index: number, updated: DogConfig) => {
    setDogs((prev) => prev.map((d, i) => (i === index ? updated : d)))
  }, [])

  const handleRemoveDog = useCallback((index: number) => {
    setDogs((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleAddDog = useCallback(() => {
    setDogs((prev) => {
      if (prev.length >= 3) return prev
      return [...prev, createDog(prev[prev.length - 1].size)]
    })
  }, [])

  const result = useMemo(
    () => calculateGrooming({dogs, selectedAddOns, serviceType}),
    [dogs, selectedAddOns, serviceType],
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <RadioGroup
          label="Service Type"
          options={[
            {label: 'Full Grooming', value: 'fullGrooming', description: 'Starting at $70'},
            {label: 'Exit Bath', value: 'exitBath', description: 'Starting at $29'},
          ]}
          value={serviceType}
          onChange={(v) => setServiceType(v as GroomingServiceType)}
        />

        {/* Dog Cards */}
        <div className="space-y-3">
          <span className="block text-cream/70 font-sans text-[13px] font-medium uppercase tracking-wider">
            {dogs.length > 1 ? 'Your Dogs' : 'Your Dog'}
          </span>
          {dogs.map((dog, i) => (
            <DogCard
              key={dog.id}
              dog={dog}
              index={i}
              total={dogs.length}
              showHairType={false}
              availableSizes={(['s', 'm', 'l', 'xl'] as DogSize[])}
              onUpdate={(updated) => handleUpdateDog(i, updated)}
              onRemove={() => handleRemoveDog(i)}
            />
          ))}
          {dogs.length < 3 && <AddDogButton onClick={handleAddDog} />}
        </div>

        <CheckboxGroup
          label="Add-On Services"
          options={groomingAddOnOptions.map((a) => ({
            id: a.id,
            label: a.label,
            detail: `$${a.price}`,
          }))}
          selected={selectedAddOns}
          onChange={(selected) => setSelectedAddOns(selected as GroomingAddOn[])}
        />
      </div>

      {/* Output */}
      <PriceOutputCard
        total={result.total}
        lineItems={result.lineItems}
        ctaText={ctaText}
        ctaLink={ctaLink}
        taxNote={taxNote}
      />
    </div>
  )
}

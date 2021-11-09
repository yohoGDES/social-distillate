import { ParsePointer, ParseNewRelation } from './utilities/api'

export type Flavor = {
  key: string
  name: string
  value: number
}

export type TastingNotes = {
  color?: string
  nose?: string
  palate?: string
  finish?: string
  rating?: number
  value?: number
  conclusion?: string
  flavorProfile: Array<Flavor>
}

export type Beverage = {
  category: string
  type: string
  subType: string
  distillery: string
  brand: string
  proof: string
  numberOfBottles: string
  vintage: string
  bottled: string
  statedAge: string
  caskNumber: string
  retailPrice: string
  region: string
  cask: string
  colored: string
  chillFiltered: string
  singleCask: string
  caskStrength: string
  objectId: string
}

export type Rating = TastingNotes & {
  objectId: string
  createdBy: ParsePointer
  createdAt: Date
  updatedAt: Date
  beverage: ParsePointer
}

export type TastingDetails = {
  host: ParsePointer
  coHost: ParsePointer[]
  group: ParseNewRelation
  location: string
  date: Date
  blind: boolean
  revealBottleDetailsSequentially: boolean
  showProgressBar: boolean
  beverages: ParsePointer[]
  guests: ParsePointer[]
}

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
  flavorProfile?: Flavor[]
}

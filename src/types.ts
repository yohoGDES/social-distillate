export type Flavor = {
  key: string
  name: string
  value: number
}

export interface TastingNotes {
  color?: string
  nose?: string
  palate?: string
  finish?: string
  rating?: number
  value?: number
  conclusion?: string
  flavorProfile: Array<Flavor>
}

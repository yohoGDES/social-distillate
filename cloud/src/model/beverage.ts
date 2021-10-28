import Parse from 'parse'
import { BaseModel, BaseModelAttributes } from './base'

export enum BeverageCategories {
    beer = 'beer',
    spirit = 'spirit'
}

export type BeverageCategory = keyof typeof BeverageCategories

export interface Beverage extends BaseModelAttributes {
    name: string
    description: string
    country: string
    region: string
    category: BeverageCategory,
    type: string,
    spiritType?: string
    subType?: string

    oneLiner(): string
}

export interface BeverageModel extends Beverage {}
export class BeverageModel extends BaseModel<Beverage> {
    constructor(init?: Partial<BeverageModel>) {
        super('Beverage', init)
    }

    oneLiner() {
        return `${this.name} ${this.description}`
    }
}

// This can go in a service registration file or somewhere else but it informs
// Parse to use our custom object for returned beverages
Parse.Object.registerSubclass('Beverage', BeverageModel)

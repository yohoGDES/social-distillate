import Parse from 'parse'
import { BaseModel, expose } from './base'

export enum BeverageCategories {
    beer = 'beer',
    spirit = 'spirit'
}

export type BeverageCategory = keyof typeof BeverageCategories

// The main model interface to expose to the application
export interface BeverageModel {
    id: string
    name: string
    description: string
    country: string
    region: string
    category: BeverageCategory,
    type: string,
    updatedAt: Date
    createdAt: Date
    spiritType?: string
    subType?: string

    oneLiner(): string
}

// Declaration merging happens so the properties show up on the class
// Also extending the Base which sets up Parse.Object
export class BeverageModel extends BaseModel<BeverageModel> {
    constructor(init?: Partial<BeverageModel>) {
        super('Beverage', init)
    }

    oneLiner() {
        return `${this.name} ${this.description}`
    }
}

/** 
 * The main interface the Vue application will be working with
 * 
 * This hides all of the Parse methods / properties so there is no chance of 
 * using them within the Vue components.
 * 
 * To expose the Parse methods in the store (or where ever query/save/etc should go) just cast it
 *      const beverage = new Beverage()
 *      (beverage as BeverageModel).save() 
 * 
**/
export default expose(BeverageModel)


// This can go in a service registration file or somewhere else but it informs
// Parse to use our custom object for returned beverages
Parse.Object.registerSubclass('Beverage', BeverageModel)

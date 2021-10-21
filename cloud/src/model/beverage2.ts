import Parse from 'parse'
import Base from './base2'

export enum BeverageTypes {
    beer = 'beer',
    spirit = 'spirit'
}

export type BeverageType = keyof typeof BeverageTypes

// The main model interface for properties
export interface BeverageModel {
    id: string
    name: string
    description: string
    country: string
    region: string
    type: BeverageType,
    updatedAt: Date
    createdAt: Date
}

// Declaration merging happens so the properties show up on the class
// Also extending the Base which sets up Parse.Object
export class BeverageModel extends Base<BeverageModel> {
    constructor(init?: Partial<BeverageModel>) {
        super('Beverage', init)
    }

    nameType() {
        return `${this.name} = ${this.type}`
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
interface Beverage extends Omit<BeverageModel, keyof Parse.Object> {}
class Beverage {
    constructor() {
        return new BeverageModel()
    }
}
export default Beverage


// This can go in a service registration file or somewhere else but it informs
// Parse to use our custom object for returned beverages
Parse.Object.registerSubclass('Beverage', BeverageModel)

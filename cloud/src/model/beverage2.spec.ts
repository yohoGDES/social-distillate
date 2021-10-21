import Beverage, { BeverageModel } from './beverage2'

describe('model/beverage2', () => {
    it('can be created', () => {
        const model: Beverage = new Beverage()
        expect(model).toBeDefined()
    })

    it('can get and set values', () => {
        const model: Beverage = new Beverage()
        model.name = 'Skull Splitter'

        expect(model.name).toEqual('Skull Splitter')
    })

    it('can be converted to JSON', () => {
        const model: Beverage = new Beverage()
        model.name = 'Skull Splitter'

        const json = JSON.stringify(model)

        expect(JSON.parse(json)).toEqual({
            name: 'Skull Splitter'
        })
    })

    it('is a hidden Parse.Object', () => {
        const model = new Beverage() as BeverageModel
        expect(model.save).toBeDefined
    })

})
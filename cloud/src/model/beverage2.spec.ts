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

    it('can assign props when created', () => {
        const model = new Beverage({
            name: 'Skull Splitter',
            description: 'yummy'
        })
        
        expect(model.name).toEqual('Skull Splitter')
        expect(model.description).toEqual('yummy')

        const json = JSON.stringify(model)

        expect(JSON.parse(json)).toEqual({
            name: 'Skull Splitter',
            description: 'yummy'
        })
    })

    it('can have custom methods', () => {
        const model = new Beverage({
            name: 'Skull Splitter',
            description: 'is yummy'
        })

        expect(model.oneLiner()).toEqual('Skull Splitter is yummy')
    })

    it('is a hidden Parse.Object', () => {
        const model = new Beverage() as BeverageModel
        expect(model.save).toBeDefined
    })

})
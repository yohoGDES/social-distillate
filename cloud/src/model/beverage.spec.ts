import { Beverage, BeverageModel } from './beverage'

describe('model/beverage', () => {
    it('can be created', () => {
        const beverage = new BeverageModel()
        expect(beverage).toBeDefined()
    })

    it('can be a beverage', () => {
        const beverage: Beverage = new BeverageModel()
        expect(beverage).toBeDefined()
    })

    describe('oneLiner', () => {
        it('works', () => {
            const beverage = new BeverageModel({
                name: 'Skull Splitter',
                description: 'is yummy'
            })
            expect(beverage.name).toEqual('Skull Splitter')
            // expect(beverage.oneLiner()).toEqual('Skull Splitter is yummy')
        })
    })
})
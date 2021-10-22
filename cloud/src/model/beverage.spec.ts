import Beverage from './beverage'

describe('model/beverage', () => {
    it('can be created', () => {
        const beverage = new Beverage()
        expect(beverage).toBeDefined()
    })

    describe('oneLiner', () => {
        it('works', () => {
            const beverage = new Beverage({
                name: 'Skull Splitter',
                description: 'is yummy'
            })
            expect(beverage.name).toEqual('Skull Splitter')
            expect(beverage.oneLiner()).toEqual('Skull Splitter is yummy')
        })
    })
})
import Beverage from './beverage'

describe('model/beverage', () => {
    it('can be created', () => {
        const beverage = new Beverage()
        expect(beverage).toBeDefined()
    })

    describe('test', () => {
        it('works', () => {
            const beverage = new Beverage()
            expect(beverage.test()).toEqual('test')
        })
    })
})
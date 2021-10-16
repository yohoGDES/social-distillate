import Beverage from './beverage'

describe('model/beverage', () => {
    it('can be created', () => {
        const beverage = new Beverage()
        beverage.name = 'foo'

        expect(beverage.test()).toEqual('test')
        expect(beverage.name).toEqual('foo')
        expect(beverage.toJSON()).toEqual({
            name: 'foo'
        })
    })
})
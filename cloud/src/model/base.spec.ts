import Parse from 'parse'
import Base, {expose} from './base'

describe('model/base', () => {

    /**
     * Begin Model Impl
     */
    interface TestModel {
        foo: string
        modelMethod(): string
    }
    class TestModel extends Base<TestModel> {
        constructor(init?: Partial<TestModel>) {
            super('TestModel', init)
        }

        modelMethod() {
            return `foo is ${this.foo}`
        }
    }
    const UnderTest = expose(TestModel)
    /**
     * End Model Impl
     */

    it('a class can be created from it', () => {
        const model = new UnderTest()
        expect(model).toBeDefined()
    })

    it('can set and get properties', () => {
        const model = new UnderTest()
        model.foo = 'bar'

        expect(model.foo).toEqual('bar')
    })

    it('can set properties from the constructor', () => {
        const model = new UnderTest({
            foo: 'bar'
        })
        
        expect(model.foo).toEqual('bar')
    })

    it('can have custom methods', () => {
        const model = new UnderTest({
            foo: 'bar'
        })

        expect(model.modelMethod()).toEqual('foo is bar')
    })

    it('can still access Parse methods', () => {
        const model = new UnderTest({
            foo: 'bar'
        })

        expect((model as TestModel).save).toBeDefined()
    })
})

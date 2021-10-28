import { BaseModel } from './base'

describe('model/base', () => {

    /**
     * Begin Model Impl
     */
    interface TestModel {
        foo: string
        modelMethod(): string
    }
    class TestModel extends BaseModel<TestModel> {
        constructor(init?: Partial<TestModel>) {
            super('TestModel', init)
        }

        modelMethod() {
            return `foo is ${this.foo}`
        }
    }
    /**
     * End Model Impl
     */

    it('a class can be created from it', () => {
        const model = new TestModel()
        expect(model).toBeDefined()
    })

    it('can set and get properties', () => {
        const model = new TestModel()
        model.foo = 'bar'

        expect(model.foo).toEqual('bar')
    })

    it('can set properties from the constructor', () => {
        const model = new TestModel({
            foo: 'bar'
        })
        
        expect(model.foo).toEqual('bar')
    })

    it('can have custom methods', () => {
        const model = new TestModel({
            foo: 'bar'
        })

        expect(model.modelMethod()).toEqual('foo is bar')
    })

    it('can still access Parse methods', () => {
        const model = new TestModel({
            foo: 'bar'
        })

        expect((model as TestModel).save).toBeDefined()
    })
})

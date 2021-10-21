import Parse from 'parse'
import Base, {BaseAttributes} from './base'

describe('model/base', () => {

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

    interface UnderTest extends Omit<TestModel, keyof Parse.Object>, BaseAttributes {}
    class UnderTest {
        constructor(init?: Partial<UnderTest>) {
            return new TestModel(init)
        }
    }

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

})

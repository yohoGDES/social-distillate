import Base from './base'

describe('model/base', () => {
    interface Properties {
        foo: string
    }
    class TestModel extends Base<Properties> {
        protected __modelName = 'TestModel'

        constructor(props: Partial<Properties> = {}) {
            super(props)
        }

        modelMethod() {
            return 'I Ran'
        }
    }
    interface Model extends TestModel, Properties {}
    const UnderTest = TestModel as new (props?: Properties) => Model

    describe('getModelName', () => {
        it('returns the model name', () => {
            const model = new UnderTest()
            expect(model.getModelName()).toEqual('TestModel')
        })
    })

    describe('properties', () => {
        it('can be set when init', () => {
            const model = new UnderTest({
                foo: 'BANG'
            })
            
            expect(model.foo)
        })

        it('sets properties that do not pollute the class', () => {
            const model = new UnderTest()
            model.foo = 'bar'

            for(let k in model) {
                expect(k).not.toEqual('foo')
            }
        })

        it('gets set properties', () => {
            const model = new UnderTest()
            model.foo = 'bar'

            expect(model.foo).toEqual('bar')
        })

        it('only returns properties when toJSON is involed', () => {
            const model = new UnderTest()
            model.foo = 'bar'

            expect(model.toJSON()).toEqual({
                foo: 'bar'
            })
        })
    })

    describe('model methods', () => {
        it('can still be called', () => {
            const model = new UnderTest()
            expect(model.modelMethod()).toEqual('I Ran')
        })
    })
})

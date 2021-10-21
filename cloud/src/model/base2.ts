import Parse from 'parse'

abstract class Base<T> extends Parse.Object {
    constructor(modelName: string) {
        super(modelName)

        return new Proxy(this, {
            set(target: Base<T>, prop: keyof Base<T>, value: any) {
                return target.set(prop, value) ? true : false
            },
            get(target: Base<T>, prop: keyof Base<T>, receiver) {
                if(target.has(prop)) {
                    return target.get(prop)
                }
                
                return Reflect.get(target, prop)
            }
        })
    }
}

export default abstract class BaseModel<T> extends Base<T> {
    constructor(modelName: string, init?: Partial<T>) {
        super(modelName)

        Object.assign(this, init)
    }
} 
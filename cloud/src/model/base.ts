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

abstract class BaseModel<T> extends Base<T> {
    constructor(modelName: string, init?: Partial<T>) {
        super(modelName)
        if(init) {
            Object.assign(this, init)
        }
    }
} 

interface BaseAttributes {
    id: string
    updatedAt: Date
    createdAt: Date
}

export function expose<T extends Base<T>>(modelClass: new (init?: Partial<T>) => T) {
    type Attributes = BaseAttributes & Omit<T, keyof Parse.Object>
    class Model {
        constructor(init?: Partial<T>) {
            return new modelClass(init)
        }
    }
    return Model as new (init?: Partial<T>) => Attributes
}

export default BaseModel

import Parse from 'parse'

interface BaseAttributes {
    id: string
    updatedAt: Date
    createdAt: Date
}

export abstract class BaseModel<T> extends Parse.Object {
    constructor(modelName: string, init?: Partial<T>) {
        super(modelName, init)

        return new Proxy(this, {
            set(target: BaseModel<T>, prop: keyof BaseModel<T>, value: any) {
                return target.set(prop, value) ? true : false
            },
            get(target: BaseModel<T>, prop: keyof BaseModel<T>, receiver) {
                if(target.has(prop)) {
                    return target.get(prop)
                }
                
                return Reflect.get(target, prop)
            }
        })
    }
}

export function expose<T extends BaseModel<T>, P = Parse.Object>(modelClass: new (init?: Partial<T>) => T) {
    type Attributes = BaseAttributes & Omit<T, keyof P>
    class Model {
        constructor(init?: Partial<T>) {
            return new modelClass(init)
        }
    }
    return Model as new (init?: Partial<T>) => Attributes
}

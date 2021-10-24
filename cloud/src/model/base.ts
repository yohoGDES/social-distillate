import {Object as ParseObject, User} from 'parse'

export interface BaseModel<T> {
    id: string
    updatedAt: Date
    createdAt: Date
}

export abstract class BaseModel<T> extends ParseObject {
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

export interface BaseUser<T> {
    username: string
    password: string
    email: string
}

export abstract class BaseUser<T> extends User {
    constructor(init?: Partial<T>) {
        super(init)

        return new Proxy(this, {
            set(target: BaseUser<T>, prop: keyof BaseUser<T>, value: any) {
                return target.set(prop, value) ? true : false
            },
            get(target: BaseUser<T>, prop: keyof BaseUser<T>, receiver) {
                if(target.has(prop)) {
                    return target.get(prop)
                }
                
                return Reflect.get(target, prop)
            }
        })
    }
}

export function expose<T extends (BaseModel<T> | BaseUser<T>)>(modelClass: new (init?: Partial<T>) => T) {
    type P = T extends User ? User : ParseObject
    type Attributes = Omit<T, keyof P>
    class Model {
        constructor(init?: Partial<T>) {
            return new modelClass(init)
        }
    }
    return Model as new (init?: Partial<T>) => Attributes
}

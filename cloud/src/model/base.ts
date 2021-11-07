import {Object as ParseObject, User} from 'parse'

export interface BaseModelAttributes {
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

export interface BaseUserAttributes {
    username: string
    password: string
    email: string
    objectId?: string
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

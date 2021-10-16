export interface Model<T, P> {
    new (props: Partial<P>, ...args: any[]): T
}

export default class Base<P> {
    protected __modelName: undefined | string
    protected __properties: Partial<P>

    constructor(properties: Partial<P> = {}) {
        this.__properties = properties as P

        return new Proxy(this, {
            set(target, prop, value) {
                if(prop.toString().slice(0,2) === '__') {
                    return Reflect.set(target, prop, value)
                }
            
                const p = prop as keyof P
                return target.__properties[p] = value
            },
            get(target, prop, receiver) {
                const p = prop as keyof P
                if(target.__properties[p]) {
                    return target.__properties[p]
                }
                return Reflect.get(target, prop, receiver)
            }
        })
    }

    toJSON() {
        return this.__properties
    }
}

import Parse from 'parse'

export default abstract class Base<T> extends Parse.Object {
    constructor(modelName: string, init?: Partial<T>) {
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
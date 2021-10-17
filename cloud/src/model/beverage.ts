import Base, { ModelConstructor, createModel } from './base'

export interface Properties {
    name: string
    date: Date
}

class Beverage extends Base<Properties> {
    protected __modelName = 'Beverage'
    test() { return 'test' }
}

export default createModel<Beverage, Properties>(Beverage)


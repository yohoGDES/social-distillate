import Base from './base'

export interface Properties {
    name: string
    date: Date
}

class BeverageModel extends Base<Properties> {
    protected __modelName = 'Beverage'
    test() { return 'test' }
}

interface Beverage extends BeverageModel, Properties {}

const impl = BeverageModel as new () => Beverage
export default impl

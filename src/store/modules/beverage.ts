import  { defineStore } from 'pinia'
import { BeverageModel } from 'cloud/src/model/beverage'
import { api } from '@/utilities/api'

export const useBeverageStore = defineStore('beverage', {
  state: () => {
    return {}
  },
  actions: {
    async getBeverage(id: string) {
      console.log('get')
      const query: api.Query = new api.Query('Beverage')
      const result = await query.get(id)
      return result
    },
    async saveBeverage(beverage: BeverageModel) {
      console.log('save')
    }
  }
})
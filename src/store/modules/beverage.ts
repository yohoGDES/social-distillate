import { defineStore } from 'pinia'
import { BeverageModel } from '../../../cloud/src/model/beverage'
import { http } from '@/utilities/http'
export const useBeverageStore = defineStore('beverage', {
  state: () => {
    return {}
  },
  actions: {
    async getBeverage(id: string) {
      try {
        const { data } = await http.get(`/Beverage/${id}`)
        return data
      } catch (error) {
        console.log('Error getting beverage: ', error)
      }
    },
    async saveBeverage(beverage: any) {
      try {
        if (beverage.objectId) {
          const toSave = beverage
          delete toSave.createdAt
          delete toSave.updatedAt
          await http.put(`/Beverage/${beverage.objectId}`, toSave)
        } else {
          const { data } = await http.post(`/Beverage`, beverage)
          return data
        }
      } catch (error) {
        console.log('Error saving beverage: ', error)
      }
    }
  }
})
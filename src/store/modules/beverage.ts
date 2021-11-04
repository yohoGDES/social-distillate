import { defineStore } from 'pinia'
import { BeverageModel } from '../../../cloud/src/model/beverage'
import { api } from '@/utilities/api'
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
    },
    async getBeverages() {
      const { data } = await http.get('/Beverage')
      return data
    },
    /**
     * Retrieve ratings belonging to a beverage
     * @param id : ID of Beverage to retrieve ratings for
     * @returns Object with results array of ratings (rating[])
     * helpful: https://dashboard.back4app.com/apidocs/NgDawUcAizSiYxhLwSYeg0SRhrLeFrgvFt2Zp3hI?shell#queries
     */
    async getBeverageRatings(id: string) {
      try {
        const query = encodeURI(
          `where={"beverage":{"__type":"Pointer","className":"Beverage","objectId":"${id}"}}`
        )
        const { data } = await http.get(`/Rating?${query}`)
        return data.results
      } catch (error) {
        console.log('Error retrieving beverage ratings: ', error)
      }
    }
  }
})
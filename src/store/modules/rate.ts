import { defineStore } from 'pinia'
import { http } from '@/utilities/http'

const ClassPath = 'Rating'

export const useRatingStore = defineStore('rate', {
  state: () => {
    return {}
  },
  actions: {
    async getRating(id: string) {
      try {
        const { data } = await http.get(`/${ClassPath}/${id}`)
        return data
      } catch (e) {
        console.log('Error getting rating: ', e)
      }
    },
    async saveRating(rating: any) {
      try {
        const result = await http.post(`/${ClassPath}`, rating)
        console.log(result)
      } catch (e) {
        console.log('Error saving rating: ', e)
      }
    }
  }
})

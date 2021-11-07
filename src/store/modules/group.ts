import { defineStore } from 'pinia'
import { http } from '@/utilities/http'

const ClassPath = 'Group'

export const useGroupStore = defineStore('group', {
  state: () => {
    return {}
  },
  actions: {
    async getGroup(id: string) {
      try {
        const { data } = await http.get(`/${ClassPath}/${id}`)
        return data
      } catch (e) {
        console.log('Error getting group: ', e)
      }
    },
    async saveGroup(group: any) {
      try {
        const result = await http.post(`/${ClassPath}`, group)
        console.log(result)
      } catch (e) {
        console.log('Error saving group: ', e)
      }
    },
    /**
     * Retrieve ratings belonging to a beverage
     * @param id : ID of Beverage to retrieve ratings for
     * @returns Object with results array of ratings (rating[])
     * helpful: https://dashboard.back4app.com/apidocs/NgDawUcAizSiYxhLwSYeg0SRhrLeFrgvFt2Zp3hI?shell#queries
     */
    async getUserGroups(id: string) {
      try {
        const query = encodeURI(
          `where={"user":{"__type":"Pointer","className":"_User","objectId":"${id}"}}`
        )
        const { data } = await http.get(`/Group?${query}`)
        return data.results
      } catch (error) {
        console.log('Error retrieving user groups: ', error)
      }
    }
  }
})

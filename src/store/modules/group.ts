import { defineStore } from 'pinia'
import { http } from '@/utilities/http'
import { api, query, queryRelation } from '@/utilities/api'

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
     * Retrieve Groups belonging to a User
     * @param id : ID of User to retrieve ratings for
     * @returns Object with results array of groups (group[])
     * helpful: https://dashboard.back4app.com/apidocs/NgDawUcAizSiYxhLwSYeg0SRhrLeFrgvFt2Zp3hI?shell#queries
     */
    async getUserGroups(id: string) {
      try {
        const result = await queryRelation(id, 'members', '_User', 'Group')
        return result
      } catch (error) {
        console.log('Error retrieving user groups: ', error)
      }
    },
    async getGroupMembers(groupId: string) {
      try {
        const result = await query(
          `"$relatedTo": {"object": {"__type":"Pointer","className": "Group","objectId": "${groupId}"},"key": "members"}`,
          '_User'
        )
        return result
      } catch (error) {
        console.log('Error getting group members', error)
      }
    }
  }
})

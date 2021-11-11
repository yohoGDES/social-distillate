import { http } from '@/utilities/http'
import { defineStore } from 'pinia'
import { useAlertStore } from '@/store/modules/alerts'
import { api, query, queryRelation, getRelation, getClassRelationObjects, RelationObject, resolveRelationalChildren } from '@/utilities/api'


const ClassPath = 'Event'

export const useEventStore = defineStore('events', {
  state: () => {
    return {}
  },
  actions: {
    async getEvent(id: string) {
      try {
        const { data } = await http.get(`/${ClassPath}/${id}`)
        const children = await resolveRelationalChildren(data, id, 'Event')

        children.forEach((child) => {
          data[child.key] = child.value
        })

        return data

      } catch (error) {
        console.log('Error getting event: ', error)
      }
    },
    async saveEvent(payload: any) {
      if (payload.objectId) {
        delete payload.createdAt
        delete payload.updatedAt
        const { data } = await http.put(
          `/${ClassPath}/${payload.objectId}`,
          payload
        )
        console.log('updated', data)
      } else {
        const { data } = await http.post(`/${ClassPath}`, payload)
        return data
      }
    },
    async getEvents() {
      const { data } = await http.get(`/${ClassPath}`)
      return data
    },
    async getEventBeverageRatings(beverageId: string, eventId: string) {
      // https://parseapi.back4app.com/classes/Rating?where={"$or":[{"beverage":{"__type":"Pointer","className":"Beverage","objectId":"LLUBGjqOxx"}}, {"tastingId":{"__type":"Pointer","className":"Event","objectId":"hfG2XaMarX"}}]}
      const { data } = await http.get(
        `/Rating?where={"$or":[{"beverage":{"__type":"Pointer","className":"Beverage","objectId":"${beverageId}"}}, {"tastingId":{"__type":"Pointer","className":"Event","objectId":"${eventId}"}}]}`
      )
      console.log(data)
    }
  }
})



/**
 * FOR LATER
  * THIS IS THE MANUAL WAY TO DO THIS.
    const result = await Promise.all([
      await getRelation(id, 'beverages', 'Beverage', 'Event')
      await getRelation(id, 'group', 'Group', 'Event')
      await getRelation(id, 'host', '_User', 'Event')
      await getRelation(id, 'guests', '_User', 'Event')
    ])

    THEN YOU HAVE TO ASSIGN EACH INDEX BACK TO THE DATA OBJECT
    // data.beverages = result[0]
    // data.group = result[1]
    // data.host = result[2]
    // data.guests = result[3]
  */
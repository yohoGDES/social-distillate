import { http } from '@/utilities/http'
import { defineStore } from 'pinia'
import { useAlertStore } from '@/store/modules/alerts'

const ClassPath = 'Event'

export const useEventStore = defineStore('events', {
  state: () => {
    return {}
  },
  actions: {
    async saveEvent(payload: any) {
      const alertStore = useAlertStore()
      try {
        const { data } = await http.post(`/${ClassPath}`, payload)
        alertStore.alertSuccess('🎉 Event saved! 🎉')
        return data
      } catch (error) {
        alertStore.alertError('Failed to save Event 😬')
      }
    }
  }
})
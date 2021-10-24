import { makeId } from '@/utilities'
import { defineStore } from 'pinia'

export enum AlertType {
  SNACKBAR = 'snackbar', // quick notification
  TOAST = 'toast' // dismissable notification
}

export enum MessageType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info'
}

export type Alert = {
  type: AlertType
  messageType: MessageType
  message: string
  id?: string
}

export const useAlertStore = defineStore('alerts', {
  state: () => {
    return {
      alerts: [] as Alert[]
    }
  },
  actions: {
    addAlert(alert: Alert) {
      alert.id = makeId()
      this.alerts.push(alert)
      if (alert.type === AlertType.SNACKBAR) {
        setTimeout(() => {
          this.removeAlert(alert)
        }, 5000)
      }
    },
    removeAlert(alert: Alert) {
      this.alerts = this.alerts.filter((a) => a.id !== alert.id)
    }
  }
})

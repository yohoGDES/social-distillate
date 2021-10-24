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
        }, 4500)
      }
    },
    removeAlert(alert: Alert) {
      this.alerts = this.alerts.filter((a) => a.id !== alert.id)
    },
    alertSuccess(message: string, type = AlertType.SNACKBAR) {
      this.addAlert({
        message,
        type: type,
        messageType: MessageType.SUCCESS
      })
    },
    alertWarning(message: string, type = AlertType.SNACKBAR) {
      this.addAlert({
        message,
        type,
        messageType: MessageType.WARNING
      })
    },
    alertError(message: string, type = AlertType.SNACKBAR) {
      this.addAlert({
        message,
        type,
        messageType: MessageType.ERROR
      })
    },
    alertInfo(message: string, type = AlertType.SNACKBAR){
      this.addAlert({
        message,
        type: type,
        messageType: MessageType.INFO
      })
      if (type === AlertType.TOAST) {
        // TODO: Need to do something here with passing callbacks or a promise so toast actions can trigger other methods for primary (comfirm) / secondary (cancel) actions.
      }
    }
  }
})

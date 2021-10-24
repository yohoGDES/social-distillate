import { defineStore } from 'pinia'
import { api } from '@/utilities/api'
import { UserModel } from '../../../cloud/src/model/user'
import { useAlertStore } from '@/store/modules/alerts'

// Not sure where to put this but I don't think it's working here
api.Object.registerSubclass('_User', UserModel)

// Move these types somewhere more universal
type userRegistration = Pick<UserModel, 'username' | 'email' | 'password'>

// User store will contain specific actions and details about the current user
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      currentUser: api.User.current()
    }
  },
  getters: {
    userAuthenticated: (state) => {
      if (state.currentUser === null) {
        return false
      }

      if (state.currentUser?.authenticated()) {
        return true
      } else {
        return false
      }
    }
  },
  actions: {
    async registerUser(user: userRegistration) {
      const alertStore = useAlertStore()
      try {
        const result = await (user as UserModel).signUp()
        console.log('registerUser:', result)
      } catch (e) {
        console.log('Error registering user: ', e)
        alertStore.alertError(e as string)
      }
    },
    async login(username: string, password: string) {
      const alertStore = useAlertStore()
      try {
        const newSession = await UserModel.logIn(username, password)
        console.log('new session', newSession)
        this.currentUser = api.User.current()
        return newSession
      } catch (e) {
        console.log('Error logging in user: ', e)
        alertStore.alertError(e as string)
      }
    },
    async logout() {
      try {
        await UserModel.logOut()
        this.currentUser = null
      } catch (e) {
        console.log('Error logging out: ', e)
      }
    }
  }
})

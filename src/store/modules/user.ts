import { defineStore } from 'pinia'
import { api, UserDetails } from '@/utilities/api'
import { User, UserModel } from '../../../cloud/src/model/user'
import { useAlertStore } from '@/store/modules/alerts'

// User store will contain specific actions and details about the current user
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      currentUser: api.User.current<UserModel>()
    }
  },
  getters: {
    userAuthenticated: (state) => {
      if (state.currentUser === null) {
        return false
      }

      if ((state.currentUser as UserModel)?.authenticated()) {
        return true
      } else {
        return false
      }
    }
  },
  actions: {
    async registerUser(user: User) {
      const alertStore = useAlertStore()
      try {
        const userModel = new UserModel(user)
        const result = await userModel.signUp()
        console.log('registerUser:', result)
      } catch (e) {
        console.log('Error registering user: ', e)
        alertStore.alertError(e as string)
      }
    },
    async login(username: string, password: string) {
      const alertStore = useAlertStore()
      try {
        // @TODO abstract sessions best as possible
        const newSession = await UserModel.logIn(username, password)
        console.log('new session', newSession)
        this.currentUser = api.User.current<UserModel>()
        return newSession
      } catch (e) {
        console.log('Error logging in user: ', e)
        alertStore.alertError(e as string)
      }
    },
    async logout() {
      try {
        await UserModel.logOut()
        this.currentUser = undefined
      } catch (e) {
        console.log('Error logging out: ', e)
      }
    }
  }
})

import { defineStore } from 'pinia'
import User, { UserModel } from '../../../cloud/src/model/user'

// Not sure where to put this but I don't think it's working here
import Parse from 'parse'
Parse.Object.registerSubclass('_User', UserModel)

// Move these types somewhere more universal
type userRegistration = Pick<UserModel, 'username' | 'email' | 'password'>
type userLogin = Pick<UserModel, 'username' | 'password'>

// User store will contain specific actions and details about the current user
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      currentUser: {}
    }
  },
  actions: {
    // This one works!
    async registerUser(user: userRegistration) {
      try {
        const result = await (user as UserModel).signUp()
        console.log('registerUser:', result)
      } catch (e) {
        console.log('Error registering user: ', e)
      }
    },
    async login(user: userLogin) {
      try {
        this.$state.currentUser = await UserModel.logIn(user.username, user.password)
      } catch (e) {
        console.log('Error logging in user: ', e)
      }
    }
  }
})
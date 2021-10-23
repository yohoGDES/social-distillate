import { defineStore } from 'pinia'
import User, { UserModel } from '../../../cloud/src/model/user'

// Move these types somewhere more universal
type userRegistration = {
  username: string
  email: string
  password: string
}

type userLogin = {
  username: string
  password: string
}

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
        // TODO: Figure out what class to give this, I think it's the same as register
        // const result = await User.logIn(user.username, user.password)
        // console.log('registerUser:', result)
      } catch (e) {
        console.log('Error logging in user: ', e)
      }
    }
  }
})
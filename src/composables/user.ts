import { computed, ref } from 'vue'
import { User } from 'parse'

// TODO: Switch this to a composition API + Provide / Inject model to avoid Vuex
export function setupUser(user: User) {
  const currentUser = ref(user)
  const userSessionActive = computed(() => user.authenticated())
  const sessionToken = computed(() => user.getSessionToken())
  const logout = async () => await User.logOut()

  return {
    currentUser,
    userSessionActive,
    sessionToken,
    logout
  }
}

// Try setting up the provide here for the above and inject it into a user-badge component
export default {
  setup() {
    return {}
  }
}
// type User = {
//   ACL: ACL
//   className: string
//   createdAt: string
//   email: string
//   objectId: string
//   sessionToken: string
//   updatedAt: string
//   username: string
// }

// type ACL = {
//   key: {
//     aclKey: boolean
//   }
// }
// ACL: {*: { read: true }, DBiwK5P8Sy: { read: true, write: true } }

// className: "_User"
// createdAt: "2021-10-21T00:59:42.633Z"
// email: "Jereme.Yoho@gmail.com"
// objectId: "DBiwK5P8Sy"
// sessionToken: "r:b9ff71d95abdca64827654a84dd5d0f4"
// updatedAt: "2021-10-21T00:59:42.633Z"
// username: "jeremeyoho"

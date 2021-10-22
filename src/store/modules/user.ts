interface UserState {
  currentUser: {
    username?: string
  }
}
const state: UserState = {
  currentUser: {}
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

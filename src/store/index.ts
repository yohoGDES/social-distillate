import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import user from './modules/user'

export interface State {
  people: string
}

// Typescript in Vuex is absolutely horrible, adding `any` to keep moving because creating interfaces for namespaced modules is ridiculous.
// Want to play I hate TS and Vuex with me?: https://dev.to/3vilarthas/vuex-typescript-m4j
export const key: InjectionKey<Store<any>> = Symbol()

export const store = createStore<State>({
  modules: {
    user
  },
  state: {
    people: ''
  },
  getters: {},
  mutations: {},
  actions: {}
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}

<template>
  <div class="login">
    <h2>Login</h2>
    <form class="login-form">
      <sc-form-row>
        <sc-form-label label="Username" />
        <sc-form-description></sc-form-description>
        <input
          type="text"
          name="username"
          id="username"
          v-model="userLogin.username"
        />
      </sc-form-row>
      <sc-form-row>
        <sc-form-label label="Password" />
        <sc-form-description></sc-form-description>
        <input
          type="password"
          name="password"
          id="password"
          v-model="userLogin.password"
        />
      </sc-form-row>
      <sc-form-row>
        <sc-button rank="primary" width="full" @clicked="login()">Login</sc-button>
        <sc-button @clicked="getCurrentUser()">Get User</sc-button>
        <a href="">Forgot Password</a>
      </sc-form-row>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'vue'
import { initApi, api } from '@/utilities/api'

type UserLogin = {
  username: string
  password: string
}
export default defineComponent({
  name: 'login-form',
  setup() {
    onBeforeMount(() => {
      initApi()
    })

    const userLogin: UserLogin = reactive({
      username: '',
      password: ''
    })
    const login = async () => {
      try {
        let user = await api.User.logIn(userLogin.username, userLogin.password)
        console.log('Logged in user', user.attributes.username)
        return user
      } catch (error) {
        console.error('Error while logging in user', error)
      }
    }
    const getUser = async (userId: string) => {
      const query: api.Query = new api.Query('User')
      let user: api.Object = await query.get(userId)
      console.log(user.attributes)
    }
    const getCurrentUser = async () => {
      const currentUser = api.User.current()
      if (!currentUser) {
        console.log('User not logged in')
        const newSession = await login()
        console.log('new session: ', newSession)
        return
      }
      console.log('Current user: ', currentUser)
      console.log('Authenticated? ', currentUser.authenticated())
      return currentUser
    }
    return {
      userLogin,
      login,
      getCurrentUser
    }
  }
})
</script>

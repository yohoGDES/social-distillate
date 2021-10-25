<template>
  <div class="login">
    <h2>Login</h2>
    <form class="login-form" v-if="!userStore.userAuthenticated">
      <sc-form-row>
        <sc-form-label>Name</sc-form-label>
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
        <sc-button rank="primary" width="full" @clicked="login()"
          >Login</sc-button
        >
        <a href="">Forgot Password</a>
      </sc-form-row>
    </form>
    <div v-else>
      You're all set!
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'

type UserLogin = {
  username: string
  password: string
}
export default defineComponent({
  name: 'login-form',
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const userLogin: UserLogin = reactive({
      username: '',
      password: ''
    })
    const login = async () => {
      try {
        const user = await userStore.login(
          userLogin.username,
          userLogin.password
        )
        console.log('Logged in user', user?.attributes.username)
        console.log(router)
        // router.back()
        return user
      } catch (error) {
        console.error('Error while logging in user', error)
      }
    }

    return {
      userLogin,
      login,
      userStore
    }
  }
})
</script>

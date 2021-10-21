<template>
  <div class="register">
    <h2>Sign Up</h2>
    <form class="register-form">
      <sc-form-row>
        <sc-form-label label="Username" />
        <sc-form-description></sc-form-description>
        <input
          type="text"
          name="username"
          id="username"
          v-model="userRegistration.username"
        />
      </sc-form-row>
      <sc-form-row>
        <sc-form-label label="Email" />
        <sc-form-description></sc-form-description>
        <input
          type="email"
          name="email"
          id="email"
          v-model="userRegistration.email"
        />
      </sc-form-row>
      <sc-form-row>
        <sc-form-label label="Password" />
        <sc-form-description></sc-form-description>
        <input
          type="password"
          name="password"
          id="password"
          v-model="userRegistration.password"
        />
      </sc-form-row>
      <sc-form-row>
        <sc-form-label label="Confirm Password" />
        <sc-form-description></sc-form-description>
        <input
          type="password"
          name=""
          id="confirm-password"
          v-model="userRegistration.confirmPassword"
        />
      </sc-form-row>
      <sc-form-row>
        <sc-button rank="primary" width="full" @clicked="register()">Register</sc-button>
        <a href="">Forgot Password</a>
      </sc-form-row>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from 'vue'
import { initApi, api } from '@/utilities/api'

type UserRegistration = {
  username: string
  email: string
  password: string
  confirmPassword: string
}
export default defineComponent({
  name: 'register-form',
  setup() {
    onBeforeMount(() => {
      initApi()
    })

    const userRegistration: UserRegistration = reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    const register = async () => {
      const user = new api.User()
      user.set('username', userRegistration.username)
      user.set('email', userRegistration.email)
      user.set('password', userRegistration.password)

      try {
        let userResult = await user.signUp()
        console.log('User signed up', userResult)
      } catch (error) {
        console.error('Error while signing up user', error)
      }
    }
    return {
      userRegistration,
      register
    }
  }
})
</script>

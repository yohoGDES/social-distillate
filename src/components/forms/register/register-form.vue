<template>
  <div class="register">
    <h2>Sign Up</h2>
    <form @submit.prevent="register()" class="register-form">
      <sc-form-row>
        <sc-form-label label="Username" />
        <sc-form-description></sc-form-description>
        <input
          type="text"
          name="username"
          id="username"
          required
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
          required
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
          required
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
          required
          v-model="userRegistration.confirmPassword"
        />
      </sc-form-row>
      <sc-form-row>
        <sc-button type="submit" rank="primary" width="full"
          >Register</sc-button
        >
        <a href="">Forgot Password</a>
      </sc-form-row>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'vue'
import { initApi, api } from '@/utilities/api'
import User from '../../../../cloud/src/model/user'

import { useUserStore } from '@/store/modules/user'

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

    const store = useUserStore()

    const userRegistration: UserRegistration = reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    const checkPasswordValidity = (): boolean => {
      const pw = userRegistration.password
      const conf = userRegistration.confirmPassword
      if (pw === '' || conf === '') return false
      if (pw !== conf) return false

      return true
    }
    const register = async () => {
      if (!checkPasswordValidity()) {
        console.log('Password is not valid')
        return
      }

      await store.registerUser(new User({ ...userRegistration }))
    }
    return {
      userRegistration,
      register
    }
  }
})
</script>

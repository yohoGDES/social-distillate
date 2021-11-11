<template>
  <div class="register">
    <h2>Sign Up</h2>
    <form @submit.prevent="register()" class="register-form">
      <sc-form-row>
        <sc-form-label>Username</sc-form-label>
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
        <sc-form-label>Email</sc-form-label>
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
        <sc-form-label>Password</sc-form-label>
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
        <sc-form-label>Confirm Password</sc-form-label>
        <sc-form-description></sc-form-description>
        <input
          type="password"
          name=""
          id="confirm-password"
          required
          v-model="userRegistration.confirmPassword"
        />
        <span v-if="confirmPasswordIsValid">Matches</span>
      </sc-form-row>
      <sc-form-row>
        <sc-button type="submit" rank="primary" width="full">Sign Up</sc-button>
      </sc-form-row>
    </form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { User } from '../../../../cloud/src/model/user'

import { useUserStore } from '@/store/modules/user'
import { useAlertStore, MessageType, AlertType } from '@/store/modules/alerts'
import { useRouter } from 'vue-router'

type UserRegistration = User & {
  confirmPassword: string
}

export default defineComponent({
  name: 'register-form',
  setup() {
    const userStore = useUserStore()
    const alertStore = useAlertStore()
    const router = useRouter()

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
      if (!confirmPasswordIsValid.value) return false

      return true
    }

    const confirmPasswordIsValid = computed(() => {
      return (
        userRegistration.password === userRegistration.confirmPassword &&
        userRegistration.confirmPassword !== ''
      )
    })
    const register = async () => {
      if (!checkPasswordValidity()) {
        console.log('Password is not valid')
        alertStore.alertWarning('Your passwords are invalid. Please try again!')
        return
      }
      const { username, email, password } = userRegistration
      await userStore.registerUser({
        username,
        email,
        password
      })
      alertStore.alertSuccess('You have successfully registered!')
      router.push('/')
    }
    return {
      userRegistration,
      confirmPasswordIsValid,
      register
    }
  }
})
</script>

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
        <sc-button
          type="submit"
          rank="primary"
          width="full"
          @clicked="register()"
          >Register</sc-button
        >
        <a href="">Forgot Password</a>
      </sc-form-row>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'vue'
import { setupUser } from '@/components/composables/user'
import { initApi, api } from '@/utilities/api'
import User, {UserModel} from '../../../../cloud/src/model/user'

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

      const user = new User({ ...userRegistration })

      try {
        // This will be moved to somewhere else and referenced as a function
        // signup(user) or similar because we want to hide backend calls where possible
        let userResult = await (user as UserModel).signUp()
        console.log('User signed up', userResult)
        setupUser(userResult)
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

<template>
  <div class="login">
    <form class="login-form">
      <rating-form-row>
        <rating-form-label label="Username" />
        <rating-form-description></rating-form-description>
        <input type="text" name="username" id="username" />
      </rating-form-row>
      <rating-form-row>
        <rating-form-label label="Password" />
        <rating-form-description></rating-form-description>
        <input type="password" name="password" id="password" />
      </rating-form-row>
      <rating-form-row>
        <rating-form-label label="Confirm Password" />
        <rating-form-description></rating-form-description>
        <input type="password" name="" id="confirm-password" />
      </rating-form-row>
      <rating-form-row>
        <form-button @clicked="login()">Login</form-button>
        <form-button @clicked="register()">Register</form-button>
        <form-button @clicked="getCurrentUser()">Get User</form-button>
        <a href="">Forgot Password</a>
      </rating-form-row>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from 'vue'
import { initApi, api } from '@/utilities/api'
import ratingFormDescription from '@/components/form/rating-form-description.vue'
import ratingFormLabel from '@/components/form/rating-form-label.vue'
import ratingFormRow from '@/components/form/rating-form-row.vue'
import formButton from '@/components/form/inputs/button.vue'

type UserLoginDetails = {
  username: string
  email: string
  password: string
  confirmPassword: string
}
export default defineComponent({
  name: 'login-form',
  components: {
    ratingFormDescription,
    ratingFormLabel,
    ratingFormRow,
    formButton
  },
  setup() {
    onBeforeMount(() => {
      initApi()
    })
    const activeTab = ref('login')
    const setActiveTab = (tab: string) => {
      activeTab.value = tab
    }
    const userLoginDetails: UserLoginDetails = reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    const login = () => {
      (async () => {
        try {
          // Pass the username and password to logIn function
          let user = await api.User.logIn('yohodesign', '#Password123')
          // Do stuff after successful login
          window.localStorage.setItem('currentUser', user.id)
          console.log('Logged in user', user.attributes.username)
          return user
        } catch (error) {
          console.error('Error while logging in user', error)
        }
      })()
    }
    const getUser = async (userId: string) => {
      const query: api.Query = new api.Query('User')
      let user: api.Object = await query.get(userId)
      console.log(user.attributes)
    }
    const getCurrentUser = () => {
      const currentUser = api.User.current()
      return currentUser
    }
    const register = () => {
      // console.log('register')
      ;(async () => {
        const user = new api.User()
        user.set('username', 'yohodesign')
        user.set('email', 'yoho@yohodesign.com')
        user.set('password', '#Password123')

        try {
          let userResult = await user.signUp()
          console.log('User signed up', userResult)
        } catch (error) {
          console.error('Error while signing up user', error)
        }
      })()
    }
    return {
      activeTab,
      setActiveTab,
      userLoginDetails,
      login,
      register,
      getCurrentUser
    }
  }
})
</script>

<template>
  <div class="user-login">
    <div class="user-login__tabs">
      <a href="" @click.prevent="setActiveTab('login')">Login</a> |
      <a href="" @click.prevent="setActiveTab('register')">Sign Up</a>
    </div>
    <login-form v-if="activeTab === 'login'" />
    <register-form v-if="activeTab === 'register'" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginForm from '@/components/forms/login/login-form.vue'
import RegisterForm from '@/components/forms/register/register-form.vue'
import { useUserStore } from '@/store/modules/user'
export default defineComponent({
  name: 'Login',
  components: {
    LoginForm,
    RegisterForm
  },
  setup() {
    const activeTab = ref('login')
    const setActiveTab = (tab: string) => {
      activeTab.value = tab
    }
    const userStore = useUserStore()

    
    return {
      activeTab,
      setActiveTab,
      userStore
    }
  }
})
</script>

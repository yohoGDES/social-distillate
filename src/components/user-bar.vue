<template>
  <div>
    <div v-if="username">
      Hello {{ username }} | (<a href="" @click.prevent="logout()">Logout</a>)
    </div>
    <div v-else>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const username = computed(() => userStore.currentUser?.username)

    const logout = async () => {
      try {
        await userStore.logout()
        router.push('/login')
      } catch (error) {
        console.error('Error while logging out user', error)
      }
    }
    return {
      userStore,
      username,
      logout
    }
  }
})
</script>

<template>
  <div class="user-bar">
    <template v-if="currentUser">
      <user-badge style="margin-right:3px;" :user="currentUser" /> (<a href="" @click.prevent="logout()">Logout</a>)
    </template>
    <template v-else>
      <router-link to="/login">Login</router-link>
    </template>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import userBadge from '@/components/user/user-badge.vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'user-bar',
  components: { userBadge },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const currentUser = computed(() => userStore.currentUser)

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
      currentUser,
      logout
    }
  }
})
</script>
<style lang="scss">
.user-bar {
  display: flex;
  align-items: center;
  a {
    color: $charcoal;
    &:hover {
      color: $mahogany;
    }
  }
}
</style>

<template>
  <div class="user-login">
    <login-form />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '@/components/login-form/login-form.vue'
export default defineComponent({
  name: 'Login',
  components: {
    LoginForm
  },
  setup() {
    return {}
  },
})
</script>

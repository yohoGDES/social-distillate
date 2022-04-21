<template>
  <button @click.prevent="toggleMenuActive()" class="nav-trigger">Menu</button>
  <drawer-modal
    title="Menu"
    :active="menuActive"
    :showActions="false"
    @update:drawer-cancel="toggleMenuActive()"
  >
    <div id="main-menu">
      <router-link class="main-menu__link" @click="toggleMenuActive()" to="/"
        >Home</router-link
      >
      <router-link
        class="main-menu__link"
        @click="toggleMenuActive()"
        to="/beverages"
        >Beverages</router-link
      >
      <router-link
        class="main-menu__link"
        @click="toggleMenuActive()"
        to="/events/tastings/edit/new"
        >Create Event</router-link
      >
      <user-bar :colorMode="'dark'"></user-bar>
    </div>
  </drawer-modal>
</template>
<script lang="ts">
import userBar from '@/components/user/user-bar.vue'
import drawerModal from '@/components/modals/drawer-modal.vue'
import { defineComponent, ref } from 'vue'
import { toggleBodyClass } from '@/utilities'

export default defineComponent({
  name: 'main-menu',
  components: { userBar, drawerModal },
  setup() {
    const menuActive = ref(false)
    const toggleMenuActive = () => {
      menuActive.value = !menuActive.value
      toggleBodyClass(false, 'modal-open')
    }
    return {
      menuActive,
      toggleMenuActive
    }
  }
})
</script>
<style lang="scss">
#main-menu {
}
.main-menu__link {
  color: white;
  display: block;
  font-weight: bold;
  &.router-link-exact-active {
    color: $tawny;
  }
}
</style>

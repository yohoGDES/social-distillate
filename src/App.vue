<template>
  <div class="header">
    <div class="header-logo">
      <router-link to="/"
        ><img src="./assets/the-social-cask-logo-v1.svg"
      /></router-link>
    </div>
    <main-menu />
  </div>
  <alerts />
  <hr />
  <router-view />
</template>

<script lang="ts">

import mainMenu from '@/components/navigation/main-menu.vue'
export default {
  components: {
    mainMenu
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.header-logo {
  width: 125px;
  img {
    width: 100%;
    height: auto;
  }
}
body {
  &.modal-open {
    overflow-y: hidden;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $charcoal;
  padding: 3%;
  /* Dark Mode
    color: #ebebeb;
    background: #161d24;
  */
}
* {
  box-sizing: border-box;
}
</style>

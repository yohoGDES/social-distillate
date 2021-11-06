<template>
  <h1>The Social Cask</h1>
  <alerts></alerts>
  <user-bar></user-bar>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/rate">Rate</router-link> |
    <router-link to="/beverages">Beverages</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import userBar from '@/components/user-bar/user-bar.vue'
export default {
  components: {
    userBar
  }
}
</script>


<style lang="scss">
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
#nav {
  // padding: 30px;
  margin-bottom: 15px;
  a {
    font-weight: bold;
    color: $charcoal;

    &.router-link-exact-active {
      color: $tawny;
    }
  }
}
</style>

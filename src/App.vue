<template>
  <div class="header">
    <div class="header-logo">
      <router-link to="/"><img src="./assets/the-social-cask-logo-v1.svg" /></router-link>
      
    </div>
    <user-bar></user-bar>

  </div>
  <alerts></alerts>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <!-- <router-link to="/rate">Rate</router-link> | -->
    <router-link to="/beverages">Beverages</router-link> |
    <router-link to="/events/tastings/edit/new">Create Event</router-link>
  </div>
  <hr>
  <router-view />
</template>

<script lang="ts">
import userBar from '@/components/user/user-bar.vue'
export default {
  components: {
    userBar
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

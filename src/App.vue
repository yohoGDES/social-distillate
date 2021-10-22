<template>
  <h1>The Social Cask</h1>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/rate">Rate</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <router-view />
</template>

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

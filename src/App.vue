<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/rate">Rate</router-link>
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
}
* {
  box-sizing: border-box;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $charcoal;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

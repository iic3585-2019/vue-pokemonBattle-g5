<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import "node_modules/bulma/bulma.sass";
</style>

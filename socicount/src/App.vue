<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}

</script>

<style lang="scss">

  #app {
    width: 100%;
    height: 100vh;
    background-color: black;
    box-sizing: border-box;
    overflow: hidden;
  }

</style>

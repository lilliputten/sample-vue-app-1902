<template>
  <div id="app">
    <md-app>
      <md-app-content>
        <ShowTimezone />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  //import HelloWorld from './components/HelloWorld.vue'
  import ShowTimezone from './components/ShowTimezone.vue'

  export default {
    name: 'app',
    components: {
      // HelloWorld,
      ShowTimezone,
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

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
  import ShowTimezone from './components/ShowTimezone.vue'
  export default {
    name: 'app',
    components: {
      ShowTimezone,
    },
  }
</script>

<style lang="scss">
  body {
    background-color: #eee;
    .md-app:not(.md-overlap).md-theme-default,
    .md-content.md-theme-default {
      background-color: rgba(255,255,255,0);
    }
    .md-app .md-content.md-theme-default {
      border: 1px solid transparent;
    }
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding-top: 50px;
  }
</style>

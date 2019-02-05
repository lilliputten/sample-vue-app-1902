<template>
  <div id="app">
    <md-app>
      <md-app-content>
        <Timezone />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import Timezone from './components/Timezone.vue'
  export default {
    name: 'app',
    components: {
      Timezone,
    },
  }
</script>

<style lang="scss">
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    text-align: center;
    padding-top: 50px;
  }
</style>

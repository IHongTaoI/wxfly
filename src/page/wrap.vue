<template>
  <div id="app">
    <router-view></router-view>
    <wx-nav></wx-nav>
  </div>
</template>

<script>
import wxNav from './common/wx-nav'

export default {
  components: {
    wxNav
  },
  name: 'App',
  data() {
    return {}
  },
  computed: {}
}
</script>

<style lang="less">
</style>


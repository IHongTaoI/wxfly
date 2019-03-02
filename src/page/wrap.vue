<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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


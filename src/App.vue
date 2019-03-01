<template>
  <div id="app">测试案例</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {},
  watch: {
    $route(to, from) {}
  }
}
</script>

<style lang="less">
/*基础样式*/
@import 'assets/css/base.css';
/*全局样式*/
@import './assets/less/global.less';
/*过渡效果需要的动画库*/
@import 'assets/css/lib/animate.css';
</style>


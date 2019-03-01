<template>
  <div id="app">
    <router-view></router-view>
    <footer class="app-footer">
      <wx-nav></wx-nav>
    </footer>
  </div>
</template>

<script>
import wxNav from './page/common/wx-nav'

export default {
  components: {
    wxNav
  },
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
/*iconfont 字体*/
@import './assets/css/lib/iconfont/iconfont.css';
</style>


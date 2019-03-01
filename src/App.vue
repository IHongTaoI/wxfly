<template>
  <div id="app">
    <transition
      :enter-active-class="enterAnimate"
      :leave-active-class="leaveAnimate"
    >
      <router-view class="app-content"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      enterAnimate: '',
      leaveAnimate: ''
    }
  },
  computed: {
    routerPathC() {
      return this.$store.state.routerPathC
    }
  },
  watch: {
    $route(to, from) {
      let isHome = ['/', '/read', '/message', 'self'].includes(to.path) //如果是主页
      let hasPath = this.routerPathC.indexOf(to.path)
      let isBack = ~hasPath && to.path === this.routerPathC[this.routerPathC.length - 2] //是返回
      if (isHome || isBack) {
        // 如果有历史记录，则是返回
        this.enterAnimate = 'animated fadeInLeft'
        this.leaveAnimate = 'animated fadeOutRight'
        this.$store.commit('setRouterCache', {isback: true})
      } else {
        this.$store.commit('setRouterCache', {
          isback: false,
          val: to.path
        })
        this.enterAnimate = 'animated fadeInRight'
        this.leaveAnimate = 'animated fadeOutLeft'
      }
    }
  }
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.app-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/*基础样式*/
@import "assets/css/base.css";
/*全局样式*/
@import "./assets/less/global.less";
/*过渡效果需要的动画库*/
@import "assets/css/lib/animate.css";
/*iconfont 字体*/
@import "./assets/css/lib/iconfont/iconfont.css";
</style>


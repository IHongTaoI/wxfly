<template>
  <div id="app">
    <div class="app-content">
      <transition
        name="custom-classes-transition"
        :enter-active-class="enterAnimate"
        :leave-active-class="leaveAnimate"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {},
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      //同一级页面无需设置过渡效果
      if (toDepth === fromDepth) {
        return
      }
      this.enterAnimate =
        toDepth > fromDepth ? 'animated fadeInRight' : 'animated fadeInLeft'
      this.leaveAnimate =
        toDepth > fromDepth ? 'animated fadeOutLeft' : 'animated fadeOutRight'
      // 从店面页进入店内页 需要对店内页重新设置离开动效 因为他们处于不同 name 的 router-view
      if (toDepth === 3) {
        this.leaveAnimate = 'animated fadeOutRight'
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
@import 'assets/css/base.css';
/*全局样式*/
@import './assets/less/global.less';
/*过渡效果需要的动画库*/
@import 'assets/css/lib/animate.css';
/*iconfont 字体*/
@import './assets/css/lib/iconfont/iconfont.css';
</style>


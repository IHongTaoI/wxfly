<template>
  <div id="main">
    <transition
      :enter-active-class="'animated fadeInLeft'"
      :leave-active-class="'animated fadeOutLeft'"
    >
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="app-content"></router-view>
      </keep-alive>
    </transition>
    <transition
      :enter-active-class="'animated fadeInRight'"
      :leave-active-class="'animated fadeOutRight'"
    >
      <div v-if="!$route.meta.keepAlive" class="app-content">
        <transition :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
          <router-view class="app-content"></router-view>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      enterAnimate: "",
      leaveAnimate: ""
    };
  },
  created() {
    this.$store.dispatch("common/initRedDot");
  },
  computed: {
    routerPathC() {
      return this.$store.state.routerPathC;
    }
  },
  watch: {
    $route(to, from) {
      this.$store.commit("setRoutePath", to.path);
      let isHome = ["/", "/read", "/message", "self"].includes(to.path); //如果是主页
      let hasPath = this.routerPathC.indexOf(to.path);
      let isBack =
        ~hasPath && to.path === this.routerPathC[this.routerPathC.length - 2]; //是返回
      if (isBack || isHome) {
        // 如果有历史记录，则是返回
        this.enterAnimate = "animated fadeInLeft";
        this.leaveAnimate = "animated fadeOutRight";
        this.$store.commit("setRouterCache", { isback: true });
      } else {
        this.$store.commit("setRouterCache", {
          isback: false,
          val: to.path
        });
        this.enterAnimate = "animated fadeInRight";
        this.leaveAnimate = "animated fadeOutLeft";
      }
    }
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
}
/*基础样式*/
@import "assets/css/base.css";
/*全局样式*/
@import "./assets/less/global.less";
/*过渡效果需要的动画库*/
@import "assets/css/lib/animate.css";
/*iconfont 字体*/
@import "./assets/css/lib/iconfont/iconfont.css";
/*weui 样式库 非常适合高仿微信*/
@import "./assets/css/lib/weui.min.css";
</style>


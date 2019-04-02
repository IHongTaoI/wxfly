<template>
  <div class="wx-info">
    <div class="mask" v-show="show" @click="close"></div>
    <transition
      :enter-active-class="'animated bounceIn'"
      :leave-active-class="'animated bounceOut'"
    >
      <div class="wrap" v-show="show">
        <span class="closeBnt iconfont icon-guanbi" @click="close"></span>
        <img class="userAva" :src="userava" alt>
        <p class="username">{{username}}</p>
        <van-button type="info" class="msgBtn" @click="gotoDiloag">私聊</van-button>
        <div class="content">
          <h3 class="title">他的动态</h3>
          <div class="cont">
            <loadinganite></loadinganite>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import loadinganite from "./../../../page/home/child/loading-animate.vue";

export default {
  components: {
    loadinganite
  },
  data() {
    return {
      show: false
    };
  },
  props: {
    userava: {
      type: String,
      default: ""
    },
    username: {
      type: String,
      default: ""
    }
  },
  methods: {
    close() {
      this.show = false;
      this.$emit("input", false);
    },
    gotoDiloag() {
      this.close();
      console.log("去私聊页面");
    }
  },
  watch: {
    value(val) {
      this.show = val;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

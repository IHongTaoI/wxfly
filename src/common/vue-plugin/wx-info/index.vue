<template>
  <div class="wx-info">
    <transition :enter-active-class="'animated fadeIn'" :leave-active-class="'animated fadeOut'">
      <div class="mask" v-show="show" @click="close"></div>
    </transition>
    <transition :enter-active-class="animiteEnt" :leave-active-class="animateLev">
      <div class="wrap" v-show="show">
        <span class="closeBnt iconfont icon-guanbi" @click="close"></span>
        <img class="userAva" :src="userava" alt>
        <p class="username">{{username}}</p>
        <van-button type="info" class="msgBtn" @click="gotoDiloag">私聊</van-button>
        <div class="content">
          <h3 class="title">他的动态</h3>
          <div class="cont">
            <loadinganite v-show="loading"></loadinganite>
            <div class="shearItem" v-for="(item, index) in list" :key="index">{{item.shareContent}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import loadinganite from "./../../../page/home/child/loading-animate.vue";
import { getuserInfoShear } from "./../../../utils/api-helper.js";

export default {
  components: {
    loadinganite
  },
  data() {
    return {
      show: false,
      loading: true,
      list: [],
      animiteEnt: "animated bounceIn",
      animateLev: "animated bounceOut"
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
    },
    userid: {
      type: String,
      default: ""
    }
  },
  methods: {
    close() {
      this.animateLev = "animated bounceOut";
      this.show = false;
      this.$emit("input", false);
    },
    close2() {
      this.animateLev = "";
      this.show = false;
      this.$emit("input", false);
    },
    gotoDiloag() {
      this.close2();
      window.vueObj.$router.push({
        name: "dialog",
        params: {
          username: this.username,
          userId: this.userid,
          userava: this.userava
        }
      });
    },
    async getShear() {
      let ret = await getuserInfoShear(this.userid, 1, 10);
      this.list = ret.d.shares;
      this.loading = false;
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.getShear();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.animated2 {
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@import "./index.less";
</style>

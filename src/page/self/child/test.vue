<template>
  <div id="self" class="paddingTopNav">
    <van-nav-bar title="测试页面" left-arrow @click-left="$router.go(-1)" class="topNavBar"/>
    <van-cell-group class="mt20">
      <van-cell title="发送socket消息" is-link @click.native="sendSocketMsg"></van-cell>
      <van-cell title="打开用户信息弹窗" is-link @click.native="openUserinfoPop"></van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  methods: {
    sendSocketMsg() {
      this.$wsHelper.like(this.$store.state.user.token);
    },
    openUserinfoPop() {
      this.$myplug.info.show();
    }
  }
};
</script>
<style lang="less" scoped>
#self {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  overflow-x: hidden;
  overflow-y: auto;
  .userava {
    margin-right: 10px;
    width: 60px;
    height: 60px;
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .iconfrt {
    vertical-align: middle;
    display: inline-block;
  }
  .iconfont {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    margin-right: 8px;
  }
  .self-nickname {
    font-weight: bold;
    font-size: 20px;
  }
  .self-wxid {
    font-size: 14px;
    line-height: 27px;
  }
}
</style>

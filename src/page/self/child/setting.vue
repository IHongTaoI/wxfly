<template>
  <div id="self-setting" class="paddingTopNav">
    <van-nav-bar title="设置" left-arrow @click-left="$router.go(-1)" class="topNavBar"/>
    <div class="weui-cells" style="margin-top:0;">
      <div class="weui-cells" style="margin-top:0;">
        <div class="weui-cell weui-cell_access" @click="signOut">
          <div class="weui-cell__bd">
            <p class="iconfrt">退出</p>
          </div>
          <div class="weui-cell__ft"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    signOut() {
      this.$utils.cookie.delete("seesionuser");
      window.location.reload();
    }
  }
};
</script>
<style lang="less" scoped>
#self-setting {
  background: #ededed;
}
</style>

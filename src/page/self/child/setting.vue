<template>
  <div id="self-setting" class="paddingTopNav">
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      class="topNavBar"
    />
    <van-cell-group class="mt20">
      <van-cell title="退出" is-link @click.native="signOut"></van-cell>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  methods: {
    async signOut() {
      this.$utils.cookie.delete("seesionuser");
      localStorage.setItem("seesionuser", "");
      await this.$utils.apiHelper.outLogin();
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

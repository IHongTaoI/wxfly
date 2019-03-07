<template>
  <div class="paddingTopNav">
    <van-nav-bar title="用户信息" left-arrow @click-left="$router.go(-1)" class="topNavBar"/>
    <div class="weui-cells" style="margin-top:0;padding-top: 12px;">
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">
            <p class="iconfrt">设置</p>
          </div>
          <div class="weui-cell__ft"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
</style>
